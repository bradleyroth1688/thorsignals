"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  first_name: string
  last_name: string
  tradingview_username?: string
}

export default function WelcomePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 3

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()
        
        if (response.ok && data.profile) {
          setProfile(data.profile)
          setLoading(false)
        } else {
          // Retry a few times in case session is still being set
          if (retryCount < maxRetries) {
            retryCount++
            console.log(`Retrying profile fetch (${retryCount}/${maxRetries})...`)
            setTimeout(fetchProfile, 500) // Wait 500ms before retry
          } else {
            // After all retries, redirect to home
            console.log("Failed to fetch profile after retries, redirecting to home")
            router.push("/")
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        if (retryCount < maxRetries) {
          retryCount++
          setTimeout(fetchProfile, 500)
        } else {
          router.push("/")
        }
      }
    }

    fetchProfile()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome to THOR Signal, {profile.first_name}!
          </h1>
          <p className="text-gray-400 text-lg">
            Setup, Manual, and Screener Access
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              You're All Set! Here's What's Next
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-300">
            <p>
              Thank you for subscribing to the THOR Signal Indicator on TradingView.
            </p>
            <p>
              You now have access to both the <strong className="text-white">THOR Signal</strong> and the{" "}
              <strong className="text-white">THOR Screener – Prob + Target</strong> tools. These work together to help you 
              identify high-conviction directional trends and scan for trade opportunities based on historical probabilities.
            </p>

            {/* Step 1 */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm">1</span>
                Confirm Your TradingView Username
              </h3>
              <p className="mb-3">
                If you haven't already, please reply with your exact TradingView username. Once access is granted, you'll find both tools under:
              </p>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-3">
                <code className="text-green-400">
                  TradingView → Indicators → Invite-Only Scripts
                </code>
              </div>
              {!profile.tradingview_username && (
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 flex items-start gap-3">
                  <Mail className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-200 font-semibold mb-1">Action Required</p>
                    <p className="text-yellow-300 text-sm">
                      Please email your TradingView username to{" "}
                      <span className="font-semibold text-yellow-100">
                        info@thorsignals.com
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm">2</span>
                How to Use THOR Signal
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Open any chart and apply <strong className="text-white">"THOR Signal"</strong> from your Invite-Only Scripts list.</li>
                <li><strong className="text-white">Recommended chart types:</strong> Weekly, Daily, or Renko</li>
                <li>Wait for bar-close confirmation before acting:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><span className="text-green-400 font-semibold">Green Dot</span> = Long-favorable regime</li>
                    <li><span className="text-red-400 font-semibold">Red Dot</span> = Short or risk-off regime</li>
                  </ul>
                </li>
                <li>Use this as a directional filter to guide your swing trades (typically 3–30 bar holds).</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm">3</span>
                How to Use the THOR Pine Screener
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Open TradingView → Screener → <strong className="text-white">Pine Script Screener</strong> (bottom panel of your screen).</li>
                <li>In the screener menu, choose <strong className="text-white">"THOR Screener – Prob + Target"</strong> from your Invite-Only scripts.</li>
                <li>Add your desired watchlist (e.g., S&P 500, ETFs, crypto).</li>
                <li>The following columns will populate with real-time signals and stats:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
                    <li><code className="text-purple-400">thor_state</code>: Current regime (+1 = long, -1 = short)</li>
                    <li><code className="text-purple-400">bars_since_signal</code>: Time since last signal change</li>
                    <li><code className="text-purple-400">last_signal_price</code>: Price at which current signal began</li>
                    <li><code className="text-purple-400">samples_used</code>: Number of historical samples used for stats</li>
                    <li><code className="text-purple-400">prob_hit_pct</code>: Probability of the current signal hitting the threshold</li>
                    <li><code className="text-purple-400">exp_ret_pct</code>: Expected return based on history</li>
                    <li><code className="text-purple-400">exp_target_price</code>: Price forecast over the next N bars (default is 10)</li>
                  </ul>
                </li>
              </ol>
              <p className="mt-3 text-sm">
                This screener allows you to identify which assets are currently in a favorable regime and filter by expected 
                return or hit rate—so you can focus your time and capital on the most statistically promising setups.
              </p>
            </div>

            {/* Support */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
              <p className="mb-2">If you have questions or need support:</p>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Email us directly at:</p>
                <p className="text-white font-semibold text-lg">
                  info@thorsignals.com
                </p>
              </div>
            </div>

            {/* Footer Message */}
            <div className="border-t border-gray-700 pt-6 text-center">
              <p className="text-gray-400 italic">
                Thanks again for joining us — we're excited to help you trade with more clarity, confidence, and precision.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link href="/">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-lg"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

