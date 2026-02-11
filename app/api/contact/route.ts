import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { supabase } from "@/lib/supabase/admin"
import { verifyTurnstile } from '@/lib/turnstile'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limit: 5 per 10 minutes per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!rateLimit(ip, 'contact', 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const { firstName, lastName, email, subject, message, honeypot, turnstileToken } = body || {}

    // Honeypot check - silently reject bots
    if (honeypot) {
      return NextResponse.json({ ok: true }) // Fake success to confuse bots
    }

    // Turnstile verification
    if (!turnstileToken) {
      return NextResponse.json({ error: 'CAPTCHA verification required' }, { status: 400 })
    }
    const turnstileValid = await verifyTurnstile(turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 403 })
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await sendContactEmail({ firstName, lastName, email, subject: subject || '', message })
    if (!result.success) {
      const raw: any = result.error || {}
      const status = raw.statusCode && Number.isInteger(raw.statusCode) ? raw.statusCode : 500
      const message = raw?.message || 'Failed to send email'
      return NextResponse.json({ error: message }, { status })
    }

    // Insert notification into database
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert([
        {
          title: `New Contact Form Message`,
          content: `User ${firstName} ${lastName} (${email}) sent a message with subject: "${subject || 'No subject'}". Message: ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}`,
          viewed: false
        }
      ]);

    if (notificationError) {
      console.error("❌ Failed to insert contact notification:", notificationError);
    } else {
      console.log("✅ Contact notification inserted into database");
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


