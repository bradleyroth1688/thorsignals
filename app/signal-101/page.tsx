'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"
import { CheckCircle, Download, Headphones, BarChart3, Shield, Zap, TrendingDown, Eye } from "lucide-react"

export default function Signal101Page() {
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
      const response = await fetch('/api/signal-101-lead', {
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/ico.png" alt="THOR Signals" className="h-8 w-8 object-contain" />
            <span className="ml-2 text-lg font-bold text-white">THOR Signals</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
            <Link href="/signal-101" className="text-purple-400 border-b-2 border-purple-600 pb-1 font-medium">Free Guide</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-[#020204] pt-16">
        {/* Hero Section */}
        <section className="w-full min-h-[60vh] flex items-center justify-center py-16 md:py-24 relative overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.08),transparent_70%)]" />
          
          <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
            <div className="text-center space-y-6">
              <p className="text-purple-400 font-semibold tracking-widest uppercase text-sm">Free Guide</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Portfolio Has a<br />
                <span className="text-purple-400">Noise Problem.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                The free guide that explains how we manage money without gut feelings, predictions, or CNBC.
              </p>
            </div>
          </div>
        </section>

        {/* What's Inside + Form */}
        <section className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              
              {/* Left: What's Inside */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What&apos;s Inside</h2>
                  <p className="text-gray-400">Signal Processing 101 covers everything you need to understand about systematic investing.</p>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Why Most Investors Lose</h3>
                      <p className="text-gray-400 text-sm">The behavioral traps and the math of drawdowns that cost investors half their returns.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">The Noise-Canceling Analogy</h3>
                      <p className="text-gray-400 text-sm">How the same engineering inside your AirPods applies to financial markets.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">How The Signal Works</h3>
                      <p className="text-gray-400 text-sm">From noisy data to filtered signal to regime detection — the four-step framework.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Regime Changes Explained</h3>
                      <p className="text-gray-400 text-sm">2008, COVID, 2022 — why early detection of structural turns is the whole game.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Real Positioning Data</h3>
                      <p className="text-gray-400 text-sm">What The Signal is showing right now across sectors and indices.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Signal vs. Noise</h3>
                      <p className="text-gray-400 text-sm">Why most indicators fail and what structural turns actually look like.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Email Form */}
              <div className="sticky top-24">
                {!isSubmitted ? (
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Get the Free Guide</h3>
                    <p className="text-gray-400 text-sm mb-6">Enter your email and we&apos;ll send you Signal Processing 101 immediately.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 h-12"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 h-12"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-base font-semibold"
                      >
                        {isSubmitting ? 'Sending...' : 'Download the Free Guide'}
                      </Button>
                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-800 space-y-2">
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="text-green-500">✓</span> Rules-based. Systematic. Zero emotion.
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="text-green-500">✓</span> Real signals driving real ETF strategies
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="text-green-500">✓</span> No spam. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8 text-center">
                    <CheckCircle className="h-14 w-14 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Check your email!</h3>
                    <p className="text-gray-400 mb-6">
                      Signal Processing 101 is on its way to <span className="text-purple-400">{email}</span>
                    </p>
                    
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                      <p className="text-gray-300 text-sm mb-3">Or download directly:</p>
                      <a 
                        href="/signal-processing-101.pdf" 
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF Guide
                      </a>
                    </div>

                    <Link href="/signup">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Try THOR Signals Free for 7 Days
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="w-full py-16 border-t border-gray-800/50">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl text-gray-300 font-medium italic leading-relaxed">
              &ldquo;We detect, we don&apos;t predict.&rdquo;
            </blockquote>
            <p className="text-gray-500 mt-4">Brad Roth, CIO — THOR Financial Technologies</p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              This guide is for educational purposes only and does not constitute investment advice. 
              Past performance does not guarantee future results. All investments involve risk, including 
              possible loss of principal. THOR&apos;s systematic approach does not guarantee profits or protect 
              against losses. For more information about THLV and THIR, visit thorfunds.com.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 md:px-6 bg-[#020204]">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#1a1a2e] rounded-2xl border border-gray-800 px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Link href="/" className="flex items-center">
                <img src="/ico.png" alt="THOR Signals" className="w-8 h-8 object-contain" />
              </Link>
              <nav className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/results" className="text-sm text-gray-400 hover:text-white transition-colors">Results</Link>
                <Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link>
              </nav>
              <p className="text-sm text-gray-500">© 2026 THOR Signals</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
