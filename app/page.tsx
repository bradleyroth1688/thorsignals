import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { DynamicPricing } from "@/components/home/dynamic-pricing"
import { EnvCheck } from "@/components/env-check"
import { FAQSection } from "@/components/home/faq-section"
import { Users, BookOpen, Shield, Award, BarChart3, Target, Clock, DollarSign, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header with Logo Only */}
      <header className="w-full py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl flex justify-center">
          <Link href="/" className="flex items-center bg-[#1a1a2e] rounded-2xl border border-gray-800 px-8 py-4 hover:border-gray-700 transition-colors">
            <img src="/ico.png" alt="Prime Aura Asset Management" className="h-8 w-auto object-contain" />
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b to-slate-900 from-slate-950">
        {/* Environment Check (Development Only) */}
        {/* <div className="container px-4 md:px-6 mx-auto pt-4">
          <EnvCheck />
        </div> */}

        {/* Hero Section */}
        <section className="w-full min-h-screen relative overflow-hidden flex items-center">
          {/* Background Pattern */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23374151%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          </div> */}
          <div className="container px-4 md:px-6 mx-auto relative z-10 w-full">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight text-white">
                  THOR Signal Indicator
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
                Access our custom built proprietary THOR Signal Indicator used to manage our institutional clients and suite of ETFs. Get our indicator for Tradingview to use for your style of trading.
                </p>
              </div>
              <div className="flex flex-col gap-6 mt-10 w-full max-w-md sm:max-w-none sm:flex-col">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                    Access THOR Signal Indicator
                  </Button>
                </Link>
                {/* <Link href="#about" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                    View THOR Signal Indicator
                  </Button>
                </Link> */}
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
                  <span>Institutional-Grade THOR Signal Indicator</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THOR Signal Indicator Suite Section */}
        <section id="about" className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                THOR Signal Indicator
              </h2>
              <p className="max-w-4xl text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                Our proprietary THOR Signal Indicator is the same one we use to manage over $1 billion in client assets and two publicly traded ETFs. Get institutional-grade performance indicators that give you the edge of professional asset management.
              </p>
            </div>

            {/* Feature Cards Grid - 2 rows x 3 columns */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
              {/* Card 1 - #1 Indicator Suite */}
              <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">#1 Indicator Suite</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Instant access to our #1 indicator suite with TradingView, for all markets and timeframes.
                </p>
              </div>

              {/* Card 2 - 24/7 Expert Opinions */}
              <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">24/7 Expert Opinions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Get 24/7 opinions via our network of expert traders and get the ability to request charts.
                </p>
              </div>

              {/* Card 3 - Detailed Strategy Guides */}
              <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Detailed Strategy Guides</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Receive detailed guides covering the suite and all our unique in-house trading strategies.
                </p>
              </div>

              {/* Card 4 - Private Community */}
              <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Private Community</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Exclusive invitation to our private community, where researching 10X trades is the focus.
                </p>
              </div>

              {/* Card 5 - Secret Toolkits */}
              <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Secret Toolkits</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Discover and use our secret toolkits to facilitate your trading experience with the suite.
                </p>
              </div>

              {/* Card 6 - Updates Automated */}
              <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Updates Automated</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your suite comes with automated updates to ensure you always have the best possible setup.
                </p>
              </div>
            </div>

            {/* Trading Market Facts */}
            {/* <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">Trading Market Facts</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-2">$7.5T</div>
                  <div className="text-sm text-gray-400">Daily Forex Volume</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2">24/5</div>
                  <div className="text-sm text-gray-400">Market Hours</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-2">180+</div>
                  <div className="text-sm text-gray-400">Currency Pairs</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-2">$25B</div>
                  <div className="text-sm text-gray-400">Average Daily Profit</div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Interpret Markets at Lightning Speed Section */}
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                Interpret Markets at Lightning Speed
              </h2>
              <p className="max-w-4xl text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                Perfect for beginners and experts, we empower you to focus on what drives trades – pure market flow. With auto-pattern recognition, volumetric order blocks, and advanced market structure insights, it's your solution to making smart money simple.
              </p>
            </div>

            {/* Laptop Image */}
            <div className="relative w-full max-w-5xl mx-auto">
              <img 
                src="/computer.png" 
                alt="Trading Platform Interface" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Seamless Integrations for a Smarter Workflow */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-black">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side - Content */}
              <div className="lg:col-span-5 space-y-6">
                <div  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300 hover:bg-gray-800 transition-colors border border-gray-700">
                  Our Trackers
                  <span className="text-gray-500">→</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Seamless Integrations for a Smarter Workflow
                </h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  Our indicator suite features 10 unique trackers, each designed for a specific purpose. Powered by advanced algorithms for precision, combined with price-action and order flow indicators for reliability:
                </p>
              </div>

              {/* Right Side - Animated Bento Cards */}
              <div className="lg:col-span-7 relative h-[600px] overflow-hidden">
                <div className="absolute inset-0 flex gap-6">
                  {/* Column 1 - Scrolling Up */}
                  <div className="flex-1 flex flex-col gap-6 animate-scroll-up will-change-transform">
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex flex-col gap-6">
                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SUSTAIN</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our momentum gauge that assesses whether current order flow and price action can sustain and hold strong. A go-to tool for timing trade entries and exits.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SYNC</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our goal-tracker that signals when the algorithm's max or min target is reached and in sync within your chosen timeframe. Built for pinpoint accuracy.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">CYCLE</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our rhythm tracker that visually maps the current phase of the market cycle. Pinpoints potential tops and bottoms with striking precision.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SURGE</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our vital indicator that instantly reveals whether the current trend is nearing a critical turning point. A must-have for precision trading.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SHIFT</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our strength sensor that provides sharp insights into market power and vulnerability. For beginners and pros—save time, protect capital.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Column 2 - Scrolling Down */}
                  <div className="flex-1 flex flex-col gap-6 animate-scroll-down will-change-transform">
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex flex-col gap-6">
                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SCOUT</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our dynamic indicator that swiftly detects surges in buying and selling pressure. Designed to align with our suite's other tools for powerful trade confirmation.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SHIELD</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our stability tool that uncovers hidden support and resistance levels. Provides calm, reliable reference points, shielding you in wild market swings.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">PEAK</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our vigilance tool flags makes it easy and fast to see dynamic zones of interest to watch relentlessly. Driven by real-time volatility calculations.
                          </p>
                        </div>

                        <div className="bg-[#0a0a0f] border border-gray-800 rounded-2xl p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <MessageCircle className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">SPARK</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Our decisive indicator that delivers a clear in-or-out call, ensuring fast, confident decisions. The cornerstone of our personal trading arsenal.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Gradient Overlays for Fade Effect */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Dominate the Market with Precision */}
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full text-sm text-purple-300 border border-purple-700/50">
                Plug-and-Play Simplicity
                <span className="text-purple-400">→</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Dominate the Market with Precision
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 - See Moves Before They Unfold */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-6 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="/1.png" 
                      alt="See Moves Before They Unfold" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    See Moves Before They Unfold
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tap into real-time market insights and anticipate shifts with precision before they happen.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 2 - Elite-Level Trading Precision */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-6 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="/2.png" 
                      alt="Elite-Level Trading Precision" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Elite-Level Trading Precision
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    With multiple algorithms, overlays, and full customization, you're equipped to trade like a pro.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 3 - Smart Signals, Live on Chart */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-6 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="/3.png" 
                      alt="Smart Signals, Live on Chart" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Smart Signals, Live on Chart
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Gain access to divergence labels, smart money flow, and hype-wave trend signals—directly on your chart.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 4 - Inside Our Suite */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-6 overflow-hidden hover:border-purple-500/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="/4.png" 
                      alt="Inside Our Suite" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Inside Our Suite
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Take a guided walk-through of our indicator suite and learn how each tool works in sync.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 5 - Clear Direction, Zero Noise */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-6 overflow-hidden hover:border-purple-500/50 transition-all duration-300 md:col-span-2 lg:col-span-2">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src="/5.png" 
                      alt="Clear Direction, Zero Noise" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Clear Direction, Zero Noise
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We show you a clean trajectory with perfect confluence, cutting through market confusion.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Results, Directly From Our Clients */}
        <section className="w-full py-8 md:py-16 lg:py-24 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto mb-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
                Results, Directly From Our Clients.
              </h2>
            </div>
          </div>

          {/* First Row - Scrolling Right */}
          <div className="relative mb-6">
            <div className="flex gap-6 animate-scroll-right will-change-transform">
              {/* Triple duplicate for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 shrink-0">
                  <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 w-80 shrink-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-sm">JD</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-base text-white">Judro</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      I'm trying this! Very good team and vibes, pretty sure the founders are trading with over $20 million and they're doing what they've built. If I were them I wouldn't let anyone else use this software because I'd be greedy.
                    </p>
                  </div>

                  <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 w-80 shrink-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-sm">PT</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-base text-white">Peter</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      The best indicators I've ever seen in my 5 years of trading. I backtest everything and it was perfect. Money printer for sure. Have fun fellas.
                    </p>
                  </div>

                  <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 w-80 shrink-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-sm">WM</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-base text-white">Web3Muse</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      This is NOT like the other BS you see out there. This is pure algorithmic software. I've paid for so many courses and mentors and I promise you this is the best value you'll get out there.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Left */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll-left will-change-transform">
              {/* Triple duplicate for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 shrink-0">
                  <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 w-80 shrink-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-sm">JJ</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-base text-white">JJ</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      To be honest I signed up just to see what they're buying and selling. Buying it made me millions and it's fascinating learning their mindset and thought process.
                    </p>
                  </div>

                  <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 w-80 shrink-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-sm">MM</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-base text-white">Mira Malii</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Feels like these guys popped out of nowhere, and suddenly I'm seeing them all over. You'll need X. Naturally I had to give it a try and I am SO GLAD I did!
                    </p>
                  </div>

                  <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 w-80 shrink-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-white text-sm">SM</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-base text-white">Sarah M.</h4>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      I went from complete beginner to profitable trader in my first year. The THOR Signal Indicator provided here actually works!
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Features Section */}
        {/* <section id="features" className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Why Choose Our THOR Signal Indicator?
                </h2>
                <p className="max-w-[900px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
                  Our proprietary THOR Signal Indicator is battle-tested in managing over $1 billion in client assets and two publicly traded ETFs. 
                  Get institutional-grade indicators that give you the same edge our professional traders use.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-8 md:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 h-full flex flex-col">
                <CardHeader className="pb-4">
                  <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
                  <CardTitle className="text-lg sm:text-xl text-white">Proven Strategies</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Learn battle-tested trading strategies used by professional traders. Our THOR Signal Indicator has generated
                    consistent profits for over 5 years across all market conditions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 h-full flex flex-col">
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
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 h-full flex flex-col">
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
        </section> */}

        {/* Dynamic Pricing Section */}
        {/* <DynamicPricing /> */}

        {/* CTA Section */}
        {/* <section className="w-full py-8 md:py-16 lg:py-24 ">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Ready to Access Our THOR Signal Indicator?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 text-base sm:text-lg md:text-xl px-4">
                  Join 500+ successful traders and get instant access to our Discord community, THOR Signal Indicator, and
                  professional indicators.
                </p>
              </div>
              <div className="w-full max-w-md sm:max-w-none">
                <Link href="/signup" className="w-full sm:w-auto block">
                  <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                    Access THOR Signal Indicator
                  </Button>
                </Link>
              </div>
              <p className="text-blue-100 text-sm text-center px-4">
                30-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#1a1a2e] rounded-2xl border border-gray-800 px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <img src="/ico.png" alt="Prime Aura" className="w-8 h-8 object-contain" />
              </Link>

              {/* Navigation Links */}
              <nav className="flex gap-6 items-center">
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </nav>

              {/* Copyright */}
              <p className="text-sm text-gray-500">
                Copyright © 2025 Startup.io
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
