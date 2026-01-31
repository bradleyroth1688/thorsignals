import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Circle, TrendingUp, BarChart3, Clock, Target, AlertTriangle, BookOpen, Download, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
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
            <Link href="/how-it-works" className="text-white border-b-2 border-purple-600 pb-1">
              How It Works
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
          <div className="md:hidden"><MobileNav /></div>
        </div>
      </header>

      <main className="flex-1 bg-[#020204] pt-16">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                How the THOR Signal Works
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Simple, institutional-grade signals for TradingView. Precision over frequency.
              </p>
            </div>
          </div>
        </section>

        {/* Signal System Section */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Signal System
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Two simple signals. Maximum clarity. No confusion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Circle className="h-8 w-8 text-white fill-current" />
                  </div>
                  <CardTitle className="text-white text-2xl">Green Dot = Go Long</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-lg">
                    Buy signal. Enter long positions when the green dot appears on your chart.
                  </p>
                  <div className="mt-6 p-4 bg-green-600/20 rounded-lg border border-green-600/50">
                    <p className="text-green-400 font-semibold">Action: BUY / LONG</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700 hover:border-red-600/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Circle className="h-8 w-8 text-white fill-current" />
                  </div>
                  <CardTitle className="text-white text-2xl">Red Dot = Go Short / Exit</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 text-lg">
                    Sell signal. Exit long positions or enter short when the red dot appears.
                  </p>
                  <div className="mt-6 p-4 bg-red-600/20 rounded-lg border border-red-600/50">
                    <p className="text-red-400 font-semibold">Action: SELL / SHORT / EXIT</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recommended Setup Section */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Recommended Setup
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Different timeframes for different trading styles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Weekly Candlesticks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    <span className="text-green-400 font-semibold">Ideal</span> for swing trades (5-30 days). Best balance of signal quality and frequency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Target className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Renko Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    <span className="text-purple-400 font-semibold">Preferred</span> by advanced users. Filters out time-based noise and focuses purely on price movement.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Clock className="h-8 w-8 text-yellow-400 mb-2" />
                  <CardTitle className="text-white">Daily Timeframe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    <span className="text-yellow-400 font-semibold">Works well</span> for intermediate signals. Good for position traders.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-red-700">
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
                  <CardTitle className="text-white">Lower Timeframes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    <span className="text-red-400 font-semibold">Not recommended.</span> Too much noise, false signals increase significantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ideal Use Case Section */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ideal Use Case
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Built for precision, not frequency
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-6">✓ Best For:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-gray-300">Trend-following strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-gray-300">Position trading (weeks to months)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-gray-300">Signal confirmation with other indicators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span className="text-gray-300">Risk-conscious investors</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-6">✗ Not Ideal For:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <span className="text-gray-300">Scalping (seconds to minutes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <span className="text-gray-300">Intraday high-frequency trading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <span className="text-gray-300">Day traders seeking constant action</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <span className="text-gray-300">Impatient traders</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-gray-800">
                <p className="text-2xl text-purple-400 font-bold mb-4">
                  "Only 10 trades in 17 years on SPY — this is about precision, not frequency"
                </p>
                <p className="text-gray-300">
                  The THOR Signal focuses on identifying major market turns, not generating daily trade signals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                How to Use the THOR Signal
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Simple steps for maximum effectiveness
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Apply the Indicator</h3>
                <p className="text-gray-300">
                  Add the THOR Signal Indicator to your TradingView chart on your preferred timeframe.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Watch for Signals</h3>
                <p className="text-gray-300">
                  Monitor for Green Dots (long signals) or Red Dots (exit/short signals) on your chart.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Confirm with Analysis</h3>
                <p className="text-gray-300">
                  Use volume, support/resistance, and trendlines to confirm signal quality before entering.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Enter on Close</h3>
                <p className="text-gray-300">
                  Wait for candle close to confirm the signal before executing your trade entry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pro Tips for Success
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Maximize your edge with these proven practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Use Higher Timeframes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Higher timeframes reduce market noise and improve signal quality. Weekly and daily charts work best.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Clock className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Wait for Candle Close</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Always wait for the candle to fully close before acting on a signal. This prevents false entries.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Target className="h-8 w-8 text-yellow-400 mb-2" />
                  <CardTitle className="text-white">Respect Support & Resistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Avoid trading signals near major support/resistance zones. Wait for clear breaks or bounces.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Layer Your Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Use THOR as one component in your broader trading strategy, not as a standalone system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Complete Documentation
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Full documentation available to all subscribers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-colors">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-xl">User Manual</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-300">
                    Complete setup guide, signal explanations, and best practices for using the THOR Signal Indicator.
                  </p>
                  <Link href="/thor-user-manual.pdf" target="_blank">
                    <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download User Manual
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-colors">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-xl">Advanced Manual</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-300">
                    Advanced strategies, portfolio management, and institutional-level techniques used by professional traders.
                  </p>
                  <Link href="/thor-advanced-manual.pdf" target="_blank">
                    <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download Advanced Manual
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Start Trading Like an Institution?
              </h2>
              <p className="text-xl text-gray-300">
                Get the same signals that manage $1B+ in assets with our 7-day free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/results">
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full sm:w-auto">
                    View Results
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                7-day free trial • No setup fees • Cancel anytime
              </p>
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