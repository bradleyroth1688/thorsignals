import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Users, BookOpen, MessageCircle, Target, Shield, Clock } from "lucide-react"

export default function PricingPage() {
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
            <Link href="/pricing" className="text-white border-b-2 border-purple-600 pb-1">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-[#020204] pt-16">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get institutional-grade trading signals with our 7-day free trial. No setup fees, cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Monthly Plan */}
              <Card className="bg-gray-800 border-gray-700 relative">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">Monthly Plan</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-white">$99</div>
                    <div className="text-gray-400">per month</div>
                    <div className="text-sm text-green-400 font-semibold">7-day free trial included</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Link href="/signup" className="w-full">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Start Free Trial
                    </Button>
                  </Link>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Full THOR Signal Indicator Suite</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">TradingView Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Cancel Anytime</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Annual Plan */}
              <Card className="bg-gray-800 border-purple-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    SAVE 20%
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">Annual Plan</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl text-gray-500 line-through">$99</div>
                      <div className="text-4xl font-bold text-white">$79</div>
                    </div>
                    <div className="text-gray-400">per month</div>
                    <div className="text-sm text-gray-400">Billed annually at $948</div>
                    <div className="text-sm text-green-400 font-semibold">7-day free trial included</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Link href="/signup" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Start Free Trial - Save $240/year
                    </Button>
                  </Link>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Full THOR Signal Indicator Suite</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">TradingView Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Save $240 per year</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">Cancel Anytime</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What's Included in Every Plan
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get full access to the same indicator suite used to manage $1B+ in institutional assets
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-400 mb-4" />
                  <CardTitle className="text-white">#1 Indicator Suite</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Instant access to our complete suite of institutional-grade indicators for all markets and timeframes on TradingView.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">24/7 Expert Opinions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Get round-the-clock expert analysis from our network of professional traders with chart request capabilities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-green-400 mb-4" />
                  <CardTitle className="text-white">Detailed Strategy Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Comprehensive guides covering the indicator suite and our proprietary in-house trading strategies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-yellow-400 mb-4" />
                  <CardTitle className="text-white">Private Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Exclusive invitation to our private trading community focused on researching 10X trading opportunities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Shield className="h-12 w-12 text-red-400 mb-4" />
                  <CardTitle className="text-white">Secret Toolkits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Access to our proprietary toolkits designed to enhance your trading experience with the indicator suite.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Clock className="h-12 w-12 text-orange-400 mb-4" />
                  <CardTitle className="text-white">Automated Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Your indicator suite automatically updates to ensure you always have the latest and most effective setup.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">How does the 7-day free trial work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Sign up today and get immediate access to the full THOR Signal Indicator suite. You won't be charged for 7 days. 
                    Cancel anytime during the trial period with no charges. If you continue past the trial, billing begins automatically.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Can I cancel my subscription anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Yes, you can cancel your subscription at any time. There are no cancellation fees or penalties. 
                    Your access will continue until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">What's the difference between monthly and annual billing?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Both plans include the same features. Annual billing saves you 20% ($240/year) and is billed once per year at $948. 
                    Monthly billing is $99/month with no long-term commitment.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Do I need TradingView to use THOR Signals?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Yes, our indicator suite integrates with TradingView. You'll need a TradingView account to use our indicators. 
                    TradingView offers free and paid plans - our indicators work with any TradingView plan.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    We accept all major credit cards (Visa, Mastercard, American Express) and debit cards. 
                    All payments are processed securely through Stripe.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Is this really the same indicator used for institutional funds?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Yes, the THOR Signal Indicator is the same proprietary technology used to manage over $1B in assets 
                    and powers two publicly traded ETFs (THLV and THIR). This isn't a retail-focused product - it's 
                    institutional-grade technology made available to individual traders.
                  </p>
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
                Start Your Free Trial Today
              </h2>
              <p className="text-xl text-gray-300">
                Join the institutional advantage with our 7-day free trial. No risk, cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">
                  7-day free trial • No setup fees • Cancel anytime
                </p>
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
              <nav className="flex gap-6 items-center">
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
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