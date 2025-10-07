import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { supabase } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body || {}

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


