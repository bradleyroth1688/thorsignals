import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/admin'
import { TwitterApi } from 'twitter-api-v2'

// TradingView sends webhooks as POST requests
// Alert message format we expect (set in TradingView):
// {"ticker":"{{ticker}}","signal":"{{strategy.order.action}}","price":"{{close}}","timeframe":"{{interval}}","secret":"thor-signal-webhook-2026"}
// 
// {{strategy.order.action}} returns "buy" or "sell" automatically
// This means ONE alert message handles both long and exit signals

// Simple auth token to prevent random POSTs
const WEBHOOK_SECRET = process.env.TRADINGVIEW_WEBHOOK_SECRET || 'thor-signal-webhook-2026'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    let data: any

    // Try parsing as JSON first
    try {
      data = JSON.parse(body)
    } catch {
      // If not JSON, try to parse as plain text
      // Format: "TICKER SIGNAL PRICE"
      const parts = body.trim().split(' ')
      if (parts.length >= 3) {
        data = {
          ticker: parts[0],
          signal: parts[1],
          price: parts[2],
        }
      } else {
        console.error('Invalid webhook body:', body)
        return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
      }
    }

    // Validate secret if provided
    if (data.secret && data.secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ticker = (data.ticker || '').toUpperCase().replace('$', '')
    const signal = (data.signal || '').toLowerCase()
    const price = data.price || ''
    const timeframe = data.timeframe || 'W'
    const name = data.name || 'THOR Signal'

    if (!ticker || !signal) {
      return NextResponse.json({ error: 'Missing ticker or signal' }, { status: 400 })
    }

    // Determine signal type
    const isLong = ['long', 'buy', 'green', 'entry'].includes(signal)
    const isExit = ['exit', 'sell', 'red', 'short', 'close'].includes(signal)

    if (!isLong && !isExit) {
      return NextResponse.json({ error: 'Invalid signal type' }, { status: 400 })
    }

    const signalType = isLong ? 'long' : 'exit'
    const signalEmoji = isLong ? '🟢' : '🔴'
    const signalText = isLong ? 'Go Long' : 'Exit / Sell'
    const timeframeLabels: Record<string, string> = {
      'W': 'Weekly',
      'D': 'Daily',
      '1W': 'Weekly',
      '1D': 'Daily',
      '4H': '4-Hour',
      '1H': '1-Hour',
    }
    const timeframeLabel = timeframeLabels[timeframe] || timeframe

    // Store in Supabase
    const { error: insertError } = await supabase
      .from('signals')
      .insert({
        ticker,
        signal_type: signalType,
        price: parseFloat(price) || null,
        timeframe,
        source: 'tradingview',
        raw_data: data,
      })

    if (insertError) {
      console.error('Error storing signal:', insertError)
      // Don't fail - still want to process even if DB write fails
    }

    // Format tweet text (ready for when X API is connected)
    const tweetText = `${signalEmoji} THOR Signal Alert: $${ticker}

${signalText} at $${price}
${timeframeLabel} chart

The same signal managing $1B+ in institutional assets.

Get signals for every ticker: thorsignals.com/signup`

    // Store the formatted tweet for later posting
    const { error: tweetError } = await supabase
      .from('pending_tweets')
      .insert({
        ticker,
        signal_type: signalType,
        tweet_text: tweetText,
        status: 'pending',
      })

    if (tweetError) {
      console.error('Error storing pending tweet:', tweetError)
    }

    // Post tweet via X API
    let tweetPosted = false
    if (process.env.X_API_KEY && process.env.X_ACCESS_TOKEN) {
      try {
        const twitterClient = new TwitterApi({
          appKey: process.env.X_API_KEY!,
          appSecret: process.env.X_API_SECRET!,
          accessToken: process.env.X_ACCESS_TOKEN!,
          accessSecret: process.env.X_ACCESS_SECRET!,
        })
        
        await twitterClient.v2.tweet(tweetText)
        tweetPosted = true
        
        // Update pending tweet status
        if (!tweetError) {
          await supabase
            .from('pending_tweets')
            .update({ status: 'posted', posted_at: new Date().toISOString() })
            .eq('ticker', ticker)
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .limit(1)
        }
        
        console.log(`Tweet posted for ${ticker} ${signalType}`)
      } catch (tweetPostError: any) {
        console.error('Error posting tweet:', tweetPostError)
        return NextResponse.json({
          success: true,
          ticker,
          signal: signalType,
          price,
          tweet: tweetText,
          tweetPosted: false,
          tweetError: tweetPostError?.message || tweetPostError?.data || String(tweetPostError),
        })
      }
    }

    console.log(`Signal received: ${ticker} ${signalType} at ${price}`)

    return NextResponse.json({
      success: true,
      ticker,
      signal: signalType,
      price,
      tweet: tweetText,
      tweetPosted,
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Also handle GET for testing
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'TradingView webhook endpoint is active',
    xApiConfigured: !!(process.env.X_API_KEY && process.env.X_ACCESS_TOKEN),
    envCheck: {
      X_API_KEY: !!process.env.X_API_KEY,
      X_API_SECRET: !!process.env.X_API_SECRET,
      X_ACCESS_TOKEN: !!process.env.X_ACCESS_TOKEN,
      X_ACCESS_SECRET: !!process.env.X_ACCESS_SECRET,
    },
  })
}
// updated tokens Fri Jan 30 16:37:03 EST 2026
