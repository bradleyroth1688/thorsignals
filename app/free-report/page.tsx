'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"
import { CheckCircle, Download } from "lucide-react"

export default function FreeReportPage() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/ico.png" alt="THOR Signals" className="h-8 w-8 object-contain" />
            <span className="ml-2 text-lg font-bold text-white">THOR Signals</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
              Results
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/signal-101" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Free Guide
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-[#020204] pt-16">
        <section className="w-full min-h-[80vh] flex items-center justify-center py-12">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <div className="text-center space-y-8">
              {!isSubmitted ? (
                <>
                  {/* Hero */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                      FREE REPORT: The 10 Trades That Made 336%
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                      See every trade the THOR Signal Indicator made on SPY from 2007-2025. 
                      The same signal used to manage $1B+ in institutional assets.
                    </p>
                  </div>

                  {/* Email Capture Form */}
                  <div className="max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 h-12"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 h-12"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg font-semibold"
                      >
                        {isSubmitting ? 'Sending Report...' : 'Get Free Report'}
                      </Button>
                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}
                    </form>
                  </div>

                  {/* Teaser Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">+336%</div>
                      <div className="text-gray-400">Cumulative Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">60%</div>
                      <div className="text-gray-400">Win Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">17</div>
                      <div className="text-gray-400">Years of Data</div>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-2xl mx-auto mt-8">
                    <p className="text-gray-300 text-lg">
                      The THOR Signal Indicator manages <span className="text-green-400 font-semibold">$1B+ in institutional assets</span> and powers <span className="text-blue-400 font-semibold">two publicly traded ETFs</span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="space-y-6">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                      Check your email!
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Your free report is on its way. We've sent the download link to <span className="text-purple-400">{email}</span>
                    </p>
                    
                    {/* Secondary CTA */}
                    <div className="space-y-4 mt-8">
                      <p className="text-gray-400">While you wait, check out our full results →</p>
                      <Link href="/results">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          View Full Results
                        </Button>
                      </Link>
                    </div>

                    {/* Direct Download Link */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 max-w-md mx-auto mt-8">
                      <p className="text-gray-300 mb-3">Or download directly:</p>
                      <a 
                        href="/10-trades-336-percent.pdf" 
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF Report
                      </a>
                    </div>
                  </div>
                </>
              )}

              {/* Disclaimer */}
              {!isSubmitted && (
                <div className="mt-12">
                  <p className="text-xs text-gray-500 max-w-2xl mx-auto">
                    Past performance is not indicative of future results. Trading involves risk of loss. 
                    The THOR Signal Indicator is for informational purposes only and should not be considered investment advice.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 md:px-6 bg-[#020204]">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#1a1a2e] rounded-2xl border border-gray-800 px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <img src="/ico.png" alt="THOR Signals" className="w-8 h-8 object-contain" />
              </Link>

              {/* Navigation Links */}
              <nav className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/results" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Results
                </Link>
                <Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link href="/signal-101" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Free Guide
                </Link>
                <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </nav>

              {/* Copyright */}
              <p className="text-sm text-gray-500">
                Copyright © 2026 THOR Signals
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}