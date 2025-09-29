import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { DynamicPricing } from "@/components/home/dynamic-pricing"
import { DynamicCourses } from "@/components/home/dynamic-courses"
import { EnvCheck } from "@/components/env-check"
import { Users, BookOpen, Shield, Award, BarChart3, Target, Clock, DollarSign, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-black text-white sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Prime Aura Asset Management
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors underline-offset-4" href="#about">
            About Our Algorithms
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-400 transition-colors underline-offset-4"
            href="#indicators"
          >
            TradingView Indicators
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-400 transition-colors underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-400 transition-colors underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors underline-offset-4" href="/login">
            Login
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </header>

      <main className="flex-1 bg-black">
        {/* Environment Check (Development Only) */}
        {/* <div className="container px-4 md:px-6 mx-auto pt-4">
          <EnvCheck />
        </div> */}

        {/* Hero Section */}
        <section className="w-full min-h-screen bg-gray-900 relative overflow-hidden flex items-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23374151%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          </div>
          <div className="container px-4 md:px-6 mx-auto relative z-10 w-full">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight text-white">
                  Professional Trading Algorithms
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
                  Access proprietary algorithms used to manage over $1 billion in client assets and two publicly traded ETFs. 
                  Get professional-grade indicators for TradingView and join our exclusive Discord community.
                </p>
              </div>
              <div className="flex flex-col gap-6 mt-10 w-full max-w-md sm:max-w-none sm:flex-col">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                    Access Algorithms
                  </Button>
                </Link>
                <Link href="#about" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                    View Our Algorithms
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 mt-12 sm:mt-16 text-sm text-gray-300 px-4">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span>$1B+ Assets Under Management</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span>2 Publicly Traded ETFs</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>Institutional-Grade Algorithms</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Our Algorithms Section */}
        <section id="about" className="w-full py-8 md:py-16 lg:py-24 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                Professional Trading Algorithms
              </h2>
              <p className="max-w-[900px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
                Our proprietary algorithms are the same ones we use to manage over $1 billion in client assets and two publicly traded ETFs. 
                Get institutional-grade performance indicators that give you the edge of professional asset management.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 md:mb-12">
              <Card className="text-center bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50">
                <CardHeader className="pb-4">
                  <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mx-auto" />
                  <CardTitle className="text-lg sm:text-xl text-white">Proven Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Our algorithms have been battle-tested managing over $1 billion in client assets. 
                    Get the same institutional-grade indicators that power our professional trading operations.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50">
                <CardHeader className="pb-4">
                  <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mx-auto" />
                  <CardTitle className="text-lg sm:text-xl text-white">TradingView Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Access our algorithms directly through TradingView indicators. 
                    Professional-grade signals and analysis tools integrated seamlessly into your trading workflow.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center md:col-span-2 lg:col-span-1 bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50">
                <CardHeader className="pb-4">
                  <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400 mx-auto" />
                  <CardTitle className="text-lg sm:text-xl text-white">Discord Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Join our exclusive Discord community of professional traders. 
                    Get real-time market insights, algorithm updates, and direct access to our trading team.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Market Statistics */}
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white">Trading Market Facts</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-400">$7.5T</div>
                  <div className="text-xs sm:text-sm text-gray-300">Daily Forex Volume</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">24/5</div>
                  <div className="text-xs sm:text-sm text-gray-300">Market Hours</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400">180+</div>
                  <div className="text-xs sm:text-sm text-gray-300">Currency Pairs</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400">$25B</div>
                  <div className="text-xs sm:text-sm text-gray-300">Average Daily Profit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                Success Stories
              </h2>
              <p className="max-w-[900px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
                Real results from real traders who transformed their portfolios using our professional algorithms.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="font-bold text-white text-sm sm:text-base">SM</span>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="font-semibold text-sm sm:text-base text-white">Sarah M.</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Former Teacher</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">
                    "I went from complete beginner to profitable trader in my first year. The algorithms provided here
                    actually work!"
                  </p>
                  <div className="text-green-400 font-semibold text-sm sm:text-base">+9,900% Return</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="font-bold text-white text-sm sm:text-base">MJ</span>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="font-semibold text-sm sm:text-base text-white">Mike J.</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">
                    "Trading now generates significant monthly income. The algorithm support is incredible."
                  </p>
                  <div className="text-green-400 font-semibold text-sm sm:text-base">Consistent Profits</div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-1 bg-gray-800 border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="font-bold text-white text-sm sm:text-base">AL</span>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="font-semibold text-sm sm:text-base text-white">Alex L.</h4>
                      <p className="text-xs sm:text-sm text-gray-400">College Student</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">
                    "Started as a college student with small capital. Now I'm financially independent at 22!"
                  </p>
                  <div className="text-green-400 font-semibold text-sm sm:text-base">Financial Independence</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dynamic Courses Section */}
        <DynamicCourses />

        {/* Features Section */}
        <section id="features" className="w-full py-8 md:py-16 lg:py-24 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Why Choose Our Algorithms?
                </h2>
                <p className="max-w-[900px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
                  Our proprietary algorithms are battle-tested in managing over $1 billion in client assets and two publicly traded ETFs. 
                  Get institutional-grade indicators that give you the same edge our professional traders use.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-8 md:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 h-full flex flex-col">
                <CardHeader className="pb-4">
                  <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
                  <CardTitle className="text-lg sm:text-xl text-white">Proven Strategies</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Learn battle-tested trading strategies used by professional traders. Our methods have generated
                    consistent profits for over 5 years across all market conditions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 h-full flex flex-col">
                <CardHeader className="pb-4">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
                  <CardTitle className="text-lg sm:text-xl text-white">Expert Community</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Join our exclusive Discord community with 500+ active traders. Get real-time market alerts, trade
                    ideas, and support from experienced professionals 24/7.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 h-full flex flex-col">
                <CardHeader className="pb-4">
                  <Target className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
                  <CardTitle className="text-lg sm:text-xl text-white">Personalized Mentoring</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Get one-on-one guidance from professional traders. Review your trades, refine your strategy, and
                    accelerate your learning with personalized feedback.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dynamic Pricing Section */}
        <DynamicPricing />

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-r bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Ready to Access Our Algorithms?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 text-base sm:text-lg md:text-xl px-4">
                  Join 500+ successful traders and get instant access to our Discord community, proven algorithms, and
                  professional indicators.
                </p>
              </div>
              <div className="w-full max-w-md sm:max-w-none">
                <Link href="/signup" className="w-full sm:w-auto block">
                  <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                    Access Algorithms
                  </Button>
                </Link>
              </div>
              <p className="text-blue-100 text-sm text-center px-4">
                30-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-gray-900">
        <p className="text-xs text-gray-400 text-center sm:text-left">© 2025 Prime Aura Asset Management. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6 sm:ml-auto justify-center sm:justify-end">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white" href="#">
            Risk Disclosure
          </Link>
        </nav>
      </footer>
    </div>
  )
}
