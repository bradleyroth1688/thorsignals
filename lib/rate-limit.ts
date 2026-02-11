// Simple in-memory rate limiter (works in serverless with caveat: resets per cold start)
const hits = new Map<string, number[]>()

// Cleanup old entries periodically
let lastCleanup = Date.now()
function cleanup(windowMs: number) {
  if (Date.now() - lastCleanup < 60_000) return
  lastCleanup = Date.now()
  const now = Date.now()
  for (const [key, timestamps] of hits) {
    const filtered = timestamps.filter(t => now - t < windowMs)
    if (filtered.length === 0) hits.delete(key)
    else hits.set(key, filtered)
  }
}

export function rateLimit(ip: string, prefix: string, maxHits: number, windowMs: number): boolean {
  cleanup(windowMs)
  const key = `${prefix}:${ip}`
  const now = Date.now()
  const timestamps = (hits.get(key) || []).filter(t => now - t < windowMs)
  if (timestamps.length >= maxHits) return false
  timestamps.push(now)
  hits.set(key, timestamps)
  return true
}
