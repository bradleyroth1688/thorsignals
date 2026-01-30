import Link from "next/link"
import { Button } from "@/components/ui/button"
import TradeResults from "./TradeResults"

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/ico.png" alt="THOR Signals" className="h-8 w-8 object-contain" />
            <span className="ml-2 text-lg font-bold text-white">THOR Signals</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/results" className="text-white border-b-2 border-purple-600 pb-1">Results</Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-[#020204] pt-16">
        {/* Hero */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Signal Performance
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real trades. Real results. The THOR Signal Indicator applied to SPY and TSLA, 
              based on trading a $100,000 portfolio with THOR Signal entry and exit points.
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Past performance is not indicative of future results. All results shown are based on hypothetical trades 
              of a $100,000 portfolio using THOR Signal entry and exit points. 
              Results do not account for slippage, commissions, taxes, or other trading costs.
            </p>
          </div>
        </section>

        {/* Trade Results Component */}
        <TradeResults />

        {/* CTA */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Get the Same Signals
            </h2>
            <p className="text-xl text-gray-300">
              Start your 7-day free trial and access the THOR Signal Indicator on TradingView.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Past performance is not indicative of future results. Trading involves risk and may not be suitable for all investors.
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
              <nav className="flex gap-6 items-center">
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/results" className="text-sm text-gray-400 hover:text-white transition-colors">Results</Link>
                <Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link>
              </nav>
              <p className="text-sm text-gray-500">Copyright © 2026 THOR Signals</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}