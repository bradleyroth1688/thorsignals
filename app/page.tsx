import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { DynamicPricing } from "@/components/home/dynamic-pricing"
import { EnvCheck } from "@/components/env-check"
import { FAQSection } from "@/components/home/faq-section"
import { Users, BookOpen, Shield, Award, BarChart3, Target, Clock, DollarSign, MessageCircle } from "lucide-react"
import "./page.css";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header with Logo Only */}

      <main className="flex-1 bg-[#020204]">
        {/* Environment Check (Development Only) */}
        {/* <div className="container px-4 md:px-6 mx-auto pt-4">
          <EnvCheck />
        </div> */}
        {/* Hero Section */}
        <section className="main-bacground w-full min-h-[80vh] relative overflow-hidden flex items-center flex-col pt-14 gap-40">
          <div className="container mx-auto max-w-[406px] max-h-[65px] flex justify-center">
            <Link href="/" className="flex items-center justify-center header-container rounded-2xl border border-gray-800 px-8 py-4 hover:border-gray-700 transition-colors">
              <img src="/ico.png" alt="THOR Signals" className="h-10 w-auto object-contain" />
            </Link>
          </div>
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
                  <div className="mx-auto w-[200px] rounded-xl h-[50px] gain_instant_access">Gain Instant Access</div>
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
        <div className="w-full flex items-center justify-center">
          <div className="mark-point"></div>
        </div>

        {/* THOR Signal Indicator Suite Section */}
        <section id="about" className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <h2 className="text-[42px] font-bold tracking-tighter text-white">
                THOR Signal Indicator
              </h2>
              <p className="max-w-4xl text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                Our proprietary THOR Signal Indicator is the same one we use to manage over $1 billion in client assets and two publicly traded ETFs. Get institutional-grade performance indicators that give you the edge of professional asset management.
              </p>
            </div>

            {/* Feature Cards Grid - 2 rows x 3 columns */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
              {/* Card 1 - #1 Indicator Suite */}
              <div className="bg-[#070708]">
                <div className="signal-indicator-content border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="w-16 h-16 signal-indicator-icon rounded-xl flex items-center justify-center mb-2">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">#1 Indicator Suite</h3>
                  <p className="text-[#797b85] text-base leading-relaxed">
                    Instant access to our #1 indicator suite with TradingView, for all markets and timeframes.
                  </p>
                </div>
              </div>

              {/* Card 2 - 24/7 Expert Opinions */}
              <div className="bg-[#070708]">
                <div className="signal-indicator-content border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="w-16 h-16 signal-indicator-icon rounded-xl flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">24/7 Expert Opinions</h3>
                  <p className="text-[#797b85] text-base leading-relaxed">
                    Get 24/7 opinions via our network of expert traders and get the ability to request charts.
                  </p>
                </div>
              </div>

              {/* Card 3 - Detailed Strategy Guides */}
              <div className="bg-[#070708]">
                <div className="signal-indicator-content border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="w-16 h-16 signal-indicator-icon rounded-xl flex items-center justify-center mb-2">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Detailed Strategy Guides</h3>
                  <p className="text-[#797b85] text-base leading-relaxed">
                    Receive detailed guides covering the suite and all our unique in-house trading strategies.
                  </p>
                </div>
              </div>

              {/* Card 4 - Private Community */}
              <div className="bg-[#070708]">
                <div className="signal-indicator-content border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="w-16 h-16 signal-indicator-icon rounded-xl flex items-center justify-center mb-2">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Private Community</h3>
                  <p className="text-[#797b85] text-base leading-relaxed">
                    Exclusive invitation to our private community, where researching 10X trades is the focus.
                  </p>
                </div>
              </div>

              {/* Card 5 - Secret Toolkits */}
              <div className="bg-[#070708]">
                <div className="signal-indicator-content border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="w-16 h-16 signal-indicator-icon rounded-xl flex items-center justify-center mb-2">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Secret Toolkits</h3>
                  <p className="text-[#797b85] text-base leading-relaxed">
                    Discover and use our secret toolkits to facilitate your trading experience with the suite.
                  </p>
                </div>
              </div>

              {/* Card 6 - Updates Automated */}
              <div className="bg-[#070708]">
                <div className="signal-indicator-content border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                  <div className="w-16 h-16 signal-indicator-icon rounded-xl flex items-center justify-center mb-2">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Updates Automated</h3>
                  <p className="text-[#797b85] text-base leading-relaxed">
                    Your suite comes with automated updates to ensure you always have the best possible setup.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/signup" className="w-full sm:w-auto">
                  <div className="mx-auto w-[200px] rounded-xl h-[50px] gain_instant_access">Gain Instant Access</div>
            </Link>
          </div>
        </section>
        <div className="w-full flex items-center justify-center">
          <div className="mark-point"></div>
        </div>

        {/* Interpret Markets at Lightning Speed Section */}
        <section className="w-full">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-[42px]  font-bold tracking-tighter text-white mb-6">
                Interpret Markets at Lightning Speed
              </h2>
              <p className="max-w-2xl text-gray-400 text-base leading-relaxed">
                Perfect for beginners and experts, we empower you to focus on what drives trades – pure market flow. With auto-pattern recognition, volumetric order blocks, and advanced market structure insights, it's your solution to making smart money simple.
              </p>
            </div>

            {/* Laptop Image */}
            <div className="relative w-full max-w-5xl mx-auto">
              <img
                src="/chart.png"
                alt="Trading Platform Interface"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Seamless Integrations for a Smarter Workflow */}
        {/* <section className="w-full py-8 md:py-16 lg:py-24 bg-[#020204]">
          <div className="border-[#262626] border rounded-xl bg-[#0a0a0a] container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-row gap-8 items-start">
             
              <div className="px-8 w-[40%] space-y-6 h-[600px] flex flex-col justify-center items-start">
                <div className="our-tracker min-w-[136px] max-h-[32px] hover:bg-gray-800 transition-colors border border-gray-700">
                  <div className="our-tracker1">
                    Our Trackers
                  </div>
                  <span className="our-tracker1">→</span>
                </div>
                <h2 className="text-[36px] font-bold tracking-tight text-white leading-tight">
                  Seamless Integrations for a Smarter Workflow
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  Our indicator suite features 10 unique trackers, each designed for a specific purpose. Powered by advanced algorithms for precision, combined with price-action and order flow indicators for reliability:
                </p>
              </div>

           
              <div className="w-[60%] relative h-[600px] py-8 px-8 overflow-hidden">
                <div className="absolute inset-0 flex gap-6">
                  
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

             
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        </section> */}
        <div className="w-full flex items-center justify-center">
          <div className="mark-point"></div>
        </div>

        {/* Dominate the Market with Precision */}
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
              <div className="our-tracker">
                <div className="our-tracker1">
                  Plug-and-Play Simplicity
                </div>
                <span className="our-tracker1">→</span>
              </div>
              <h2 className="text-[42px] font-bold tracking-tight text-white">
                Dominate the Market with Precision
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Card 1 - See Moves Before They Unfold */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="dominate-card rounded-2xl overflow-hidden">
                    <img
                      src="/1.png"
                      alt="See Moves Before They Unfold"
                      className="w-full h-62 object-cover"
                    />
                  </div>
                  <div className="px-6 pb-10">
                    <h3 className="text-xl font-bold text-white mb-3">
                      See Moves Before They Unfold
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Tap into real-time market insights and anticipate shifts with precision before they happen.
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 2 - Elite-Level Trading Precision */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="dominate-card rounded-2xl overflow-hidden">
                    <img
                      src="/2.svg"
                      alt="Elite-Level Trading Precision"
                      className="w-full h-62 object-cover"
                    />
                  </div>
                  <div className="px-6 pb-10">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Elite-Level Trading Precision
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      With multiple algorithms, overlays, and full customization, you're equipped to trade like a pro.
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 3 - Smart Signals, Live on Chart */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="dominate-card rounded-2xl overflow-hidden">
                    <img
                      src="/3.png"
                      alt="Smart Signals, Live on Chart"
                      className="w-full h-62 object-cover"
                    />
                  </div>
                  <div className="px-6 pb-10">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Smart Signals, Live on Chart
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Gain access to divergence labels, smart money flow, and hype-wave trend signals—directly on your chart.
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">

              {/* Card 4 - Inside Our Suite */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="dominate-card rounded-2xl overflow-hidden">
                    <img
                      src="/4.png"
                      alt="Inside Our Suite"
                      className="w-full h-62 object-cover"
                    />
                  </div>
                  <div className="px-6 pb-10">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Inside Our Suite
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Take a guided walk-through of our indicator suite and learn how each tool works in sync.
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card 5 - Clear Direction, Zero Noise */}
              <div className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 col-span-1">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="dominate-card rounded-2xl overflow-hidden">
                    <img
                      src="/5.png"
                      alt="Clear Direction, Zero Noise"
                      className="w-full h-62 object-cover"
                    />
                  </div>
                  <div className="px-6 pb-10">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Clear Direction, Zero Noise
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      We show you a clean trajectory with perfect confluence, cutting through market confusion.
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full flex items-center justify-center">
          <div className="mark-point"></div>
        </div>

        {/* Results, Directly From Our Clients */}
        {/* <section className="results-section w-fit py-8 mx-24 overflow-hidden">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <div className="our-tracker">
              <div className="our-tracker1">
                Testimonials
              </div>
              <span className="our-tracker1">→</span>
            </div>
            <h2 className="text-[42px] font-bold tracking-tight text-white">
              Results, Directly From Our Clients.
            </h2>
          </div>

        
          <div className="relative mb-6">
            <div className="flex gap-6 animate-scroll-right will-change-transform">
           
              {[...Array(6)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 shrink-0 h-[282px]">
                  <img width={308} height={282} src="./testimonials/1.avif" className="rounded-2xl"></img>
                  <img width={308} height={282} src="./testimonials/2.avif" className="rounded-2xl"></img>
                  <img width={308} height={282} src="./testimonials/3.avif" className="rounded-2xl"></img>
                  <img width={308} height={282} src="./testimonials/4.avif" className="rounded-2xl"></img>
                  <img width={308} height={282} src="./testimonials/5.avif" className="rounded-2xl"></img>
                  <img width={308} height={282} src="./testimonials/6.avif" className="rounded-2xl"></img>
                </div>
              ))}
            </div>
          </div>

          
          <div className="relative">
            <div className="flex gap-6 animate-scroll-left will-change-transform">
            
              {[...Array(6)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 shrink-0 h-[136px]">
                  <img width={276} height={136} src="./testimonials/11.avif" className="rounded-2xl"></img>
                  <img width={276} height={136} src="./testimonials/22.avif" className="rounded-2xl"></img>
                  <img width={276} height={136} src="./testimonials/33.avif" className="rounded-2xl"></img>
                  <img width={276} height={136} src="./testimonials/44.avif" className="rounded-2xl"></img>
                  <img width={276} height={136} src="./testimonials/55.avif" className="rounded-2xl"></img>
                  <img width={276} height={136} src="./testimonials/66.avif" className="rounded-2xl"></img>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <div className="w-full flex items-center justify-center">
          <div className="mark-point"></div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
        <div className="w-full flex items-center justify-center">
          <div className="mark-point"></div>
        </div>

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
                Copyright © 2025 THOR Signals
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
