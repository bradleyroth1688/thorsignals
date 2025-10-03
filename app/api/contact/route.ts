import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

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

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


