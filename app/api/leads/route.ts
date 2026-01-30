import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const { firstName, email } = await request.json()

    // Validate input
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingLead, error: checkError } = await supabase
      .from('leads')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" which is what we want
      console.error('Error checking existing lead:', checkError)
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      )
    }

    // If email doesn't exist, insert new lead
    if (!existingLead) {
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          email: email.toLowerCase(),
          first_name: firstName.trim(),
          source: 'free-report'
        })

      if (insertError) {
        console.error('Error inserting lead:', insertError)
        return NextResponse.json(
          { error: 'Failed to save lead. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Send email with PDF download link
    try {
      await resend.emails.send({
        from: `THOR Signals <${process.env.SERVER_EMAIL}>`,
        to: email,
        subject: 'Your Free Report: The 10 Trades That Made 336%',
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #020204; color: #D1D5DB; padding: 40px;">
          <h1 style="color: white; font-size: 24px;">Hey ${firstName},</h1>
          <p>Thanks for downloading our free report. Here's your copy:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="https://www.thorsignals.com/10-trades-336-percent.pdf" style="background: #7C3AED; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Download Your Free Report</a>
          </p>
          <p>This report shows every THOR Signal trade on SPY from 2007 to 2025 — the same signal used to manage $1B+ in institutional assets.</p>
          <p>Ready to get the signals yourself?</p>
          <p><a href="https://www.thorsignals.com/signup" style="color: #7C3AED; font-weight: bold;">Start your 7-day free trial →</a></p>
          <hr style="border-color: #374151; margin: 30px 0;" />
          <p style="font-size: 12px; color: #6B7280;">THOR Financial Technologies, LLC<br/>Past performance is not indicative of future results.</p>
        </div>`
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails - they can still download directly
    }

    return NextResponse.json({
      success: true,
      message: 'Check your email!'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}