import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, BarChart3, Shield, Award, Target, Users, BookOpen } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/about" className="text-white border-b-2 border-purple-600 pb-1">
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
          <div className="md:hidden"><MobileNav /></div>
        </div>
      </header>

      <main className="flex-1 bg-[#020204] pt-16">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                About THOR Signals
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The institutional-grade trading technology behind $1B+ in assets and two publicly traded ETFs.
              </p>
            </div>
          </div>
        </section>

        {/* Brad Roth Bio Section */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-600 mb-4">
                  <img src="/brad-headshot.jpg" alt="Brad Roth" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Meet Brad Roth
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Founder & CIO of THOR Financial Technologies (THOR Funds)
                </p>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Brad Roth is the visionary behind THOR Signals, with over two decades of experience 
                    in institutional asset management. As the Founder and Chief Investment Officer of 
                    THOR Financial Technologies, Brad oversees more than $1 billion in assets under management.
                  </p>
                  <p>
                    Under his leadership, THOR Funds has launched two successful publicly traded ETFs: 
                    THLV and THIR, which have consistently delivered strong performance for institutional 
                    and retail investors alike.
                  </p>
                  <p className="text-purple-400 font-semibold text-lg">
                    "We built the THOR Signal Indicator to manage institutional money. Now we're making it 
                    available to individual traders."
                  </p>
                  <p>
                    The THOR Signal Indicator represents years of research and development in algorithmic 
                    trading, market structure analysis, and risk management. What was once exclusive to 
                    institutional clients is now accessible to individual traders on TradingView.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-6">Track Record</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-6 w-6 text-green-400" />
                      <div>
                        <p className="text-white font-semibold">$1B+ Assets Under Management</p>
                        <p className="text-sm text-gray-400">Institutional-scale portfolio management</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-6 w-6 text-blue-400" />
                      <div>
                        <p className="text-white font-semibold">Two Publicly Traded ETFs</p>
                        <p className="text-sm text-gray-400">THLV and THIR delivering consistent performance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-purple-400" />
                      <div>
                        <p className="text-white font-semibold">20+ Years Experience</p>
                        <p className="text-sm text-gray-400">Institutional asset management expertise</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-yellow-400" />
                      <div>
                        <p className="text-white font-semibold">CIO & Founder</p>
                        <p className="text-sm text-gray-400">THOR Financial Technologies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Story Section */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The THOR Signal Story
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From institutional necessity to individual trader empowerment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-400 mb-4" />
                  <CardTitle className="text-white">The Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Managing $1B+ in institutional assets required precision tools that could 
                    identify market opportunities with institutional-grade accuracy and speed.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <BarChart3 className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">The Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Years of research and development resulted in the THOR Signal Indicator suite - 
                    a comprehensive algorithmic trading system used to manage real ETFs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-400 mb-4" />
                  <CardTitle className="text-white">The Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Making institutional-grade trading technology available to individual traders, 
                    democratizing access to professional-level market analysis tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                This Isn't Another Retail Indicator
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                The THOR Signal Indicator is the same tool that runs real ETFs with real assets under management. 
                It's not theoretical - it's proven in live markets with institutional capital.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">What Makes Us Different</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Battle-tested with $1B+ in real institutional assets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-blue-400 mt-0.5" />
                      <span>Powers two publicly traded ETFs (THLV and THIR)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-purple-400 mt-0.5" />
                      <span>Developed by a CIO with 20+ years of experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <span>Continuously refined based on institutional performance</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Advantage</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    When you use the THOR Signal Indicator, you're not just getting another technical analysis tool. 
                    You're gaining access to the same algorithmic edge that institutional money managers rely on 
                    to outperform the market.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This is your opportunity to trade with institutional-grade technology that has been proven 
                    in the most demanding financial environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Trade Like an Institution?
              </h2>
              <p className="text-xl text-gray-300">
                Start your 7-day free trial and experience the same indicator suite that manages $1B+ in assets.
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