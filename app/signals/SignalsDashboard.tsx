'use client'

import { useState } from 'react'

interface Signal {
  id: string
  ticker: string
  signal_type: string
  price: string
  timeframe: string
  created_at: string
}

interface Tweet {
  id: string
  ticker: string
  signal_type: string
  tweet_text: string
  status: string
  created_at: string
}

export default function SignalsDashboard({ signals, tweets }: { signals: Signal[], tweets: Tweet[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>THOR Signal Alerts</h1>
          <a href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.875rem' }}>Back to site</a>
        </div>

        {tweets.length === 0 && (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: '#666',
            border: '1px dashed #333',
            borderRadius: '8px',
          }}>
            No signals yet. Waiting for TradingView alerts...
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tweets.map((tweet) => {
            const isLong = tweet.signal_type === 'long'
            const signal = signals.find(s => s.ticker === tweet.ticker && s.signal_type === tweet.signal_type && s.created_at === tweet.created_at) || signals.find(s => s.ticker === tweet.ticker)

            return (
              <div key={tweet.id} style={{
                background: '#111',
                border: `1px solid ${isLong ? '#0f3d0f' : '#3d0f0f'}`,
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      fontSize: '1.5rem',
                    }}>
                      {isLong ? '🟢' : '🔴'}
                    </span>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>${tweet.ticker}</span>
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isLong ? '#0f3d0f' : '#3d0f0f',
                        color: isLong ? '#4ade80' : '#f87171',
                      }}>
                        {tweet.signal_type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span style={{ color: '#666', fontSize: '0.75rem' }}>
                    {formatDate(tweet.created_at)}
                  </span>
                </div>

                <pre style={{
                  background: '#0a0a0a',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: '0 0 0.75rem 0',
                  color: '#e5e5e5',
                  border: '1px solid #222',
                }}>
                  {tweet.tweet_text}
                </pre>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => copyToClipboard(tweet.tweet_text, tweet.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: copiedId === tweet.id ? '#16a34a' : '#222',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      transition: 'background 0.2s',
                    }}
                  >
                    {copiedId === tweet.id ? 'Copied!' : 'Copy Tweet'}
                  </button>
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(tweet.tweet_text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#1d9bf0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    Post on X
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
