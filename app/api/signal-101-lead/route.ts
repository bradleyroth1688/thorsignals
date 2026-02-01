import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const { firstName, email } = await request.json()

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
      console.error('Error checking existing lead:', checkError)
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      )
    }

    // Insert new lead
    if (!existingLead) {
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          email: email.toLowerCase(),
          first_name: firstName.trim(),
          source: 'signal-101'
        })

      if (insertError) {
        console.error('Error inserting lead:', insertError)
        return NextResponse.json(
          { error: 'Failed to save. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Send email with PDF
    try {
      await resend.emails.send({
        from: `THOR Signals <${process.env.SERVER_EMAIL}>`,
        to: email,
        subject: 'Your Free Guide: Signal Processing 101',
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #020204; color: #D1D5DB; padding: 40px;">
          <h1 style="color: white; font-size: 24px;">Hey ${firstName},</h1>
          <p style="font-size: 16px; line-height: 1.6;">Thanks for downloading Signal Processing 101. This guide explains the science behind how we manage money — no gut feelings, no predictions, just the signal.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="https://www.thorsignals.com/signal-processing-101.pdf" style="background: #7C3AED; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Download Your Free Guide</a>
          </p>
          <p style="font-size: 15px; line-height: 1.6;">Inside you'll find:</p>
          <ul style="font-size: 14px; line-height: 1.8; color: #9CA3AF;">
            <li>Why most investors earn half the market's return</li>
            <li>The noise-canceling headphones analogy for markets</li>
            <li>How The Signal detects regime changes</li>
            <li>Real positioning data from our ETF strategies</li>
            <li>Why traditional indicators fail</li>
          </ul>
          <p style="font-size: 15px; line-height: 1.6; margin-top: 24px;">Want to follow The Signal in real-time?</p>
          <p><a href="https://www.thorsignals.com/signup" style="color: #7C3AED; font-weight: bold; font-size: 15px;">Start your 7-day free trial →</a></p>
          <p style="margin-top: 24px;"><a href="https://thorfunds.beehiiv.com" style="color: #9CA3AF; font-size: 14px;">Subscribe to The Signal newsletter →</a></p>
          <hr style="border-color: #374151; margin: 30px 0;" />
          <p style="font-size: 11px; color: #6B7280;">THOR Financial Technologies, LLC — thorfunds.com | thorsignals.com<br/>This guide is for educational purposes only. Past performance is not indicative of future results.</p>
        </div>`
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
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
