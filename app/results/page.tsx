import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BarChart3, TrendingUp, Target, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight, Shield } from "lucide-react"

const trades = [
  { id: 1, entry: "2007-04-17", exit: "2008-10-08", entryPrice: 140.01, exitPrice: 104.99, pnl: -25021.77, pnlPct: -25.03, cumPnlPct: -25.02 },
  { id: 2, entry: "2010-04-06", exit: "2018-07-17", entryPrice: 112.01, exitPrice: 272.99, pnl: 107669.87, pnlPct: 143.67, cumPnlPct: 82.65 },
  { id: 3, entry: "2019-12-26", exit: "2020-02-27", entryPrice: 315.01, exitPrice: 307.99, pnl: -4100.65, pnlPct: -2.25, cumPnlPct: 78.55 },
  { id: 4, entry: "2020-04-27", exit: "2020-11-05", entryPrice: 280.01, exitPrice: 342.99, pnl: 40078.57, pnlPct: 22.47, cumPnlPct: 118.63 },
  { id: 5, entry: "2020-12-01", exit: "2021-12-27", entryPrice: 357.01, exitPrice: 468.99, pnl: 68481.21, pnlPct: 31.34, cumPnlPct: 187.11 },
  { id: 6, entry: "2022-08-12", exit: "2022-09-21", entryPrice: 420.01, exitPrice: 384.99, pnl: -23973.64, pnlPct: -8.36, cumPnlPct: 163.13 },
  { id: 7, entry: "2022-11-30", exit: "2024-08-05", entryPrice: 399.01, exitPrice: 524.99, pnl: 82959.93, pnlPct: 31.55, cumPnlPct: 246.09 },
  { id: 8, entry: "2024-11-06", exit: "2025-01-21", entryPrice: 581.01, exitPrice: 594.99, pnl: 8248.13, pnlPct: 2.39, cumPnlPct: 254.34 },
  { id: 9, entry: "2025-02-25", exit: "2025-02-27", entryPrice: 602.01, exitPrice: 594.99, pnl: -4148.17, pnlPct: -1.19, cumPnlPct: 250.19 },
  { id: 10, entry: "2025-04-24", exit: "2025-11-26", entryPrice: 539.01, exitPrice: 671.99, pnl: 86225.43, pnlPct: 24.65, cumPnlPct: 336.42 },
]

const winningTrades = trades.filter(t => t.pnl > 0)
const losingTrades = trades.filter(t => t.pnl < 0)
const winRate = ((winningTrades.length / trades.length) * 100).toFixed(0)
const avgWin = (winningTrades.reduce((sum, t) => sum + t.pnlPct, 0) / winningTrades.length).toFixed(1)
const avgLoss = (losingTrades.reduce((sum, t) => sum + t.pnlPct, 0) / losingTrades.length).toFixed(1)
const bestTrade = trades.reduce((best, t) => t.pnlPct > best.pnlPct ? t : best)
const totalReturn = trades[trades.length - 1].cumPnlPct

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

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
            <Link href="/signal-101" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">Free Guide</Link>
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
              Real trades. Real results. The THOR Signal Indicator applied to SPY from 2007 to present, 
              based on trading a $100,000 portfolio in SPY only.
            </p>
            <p className="text-sm text-gray-400 max-w-3xl mx-auto">
              This is an example of our SPY long-term model. Results can vary based on your trading frequency 
              preference — this is just one example of many different variations of what you can do with our signals.
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Past performance is not indicative of future results. All results shown are based on hypothetical trades 
              of a $100,000 portfolio trading SPY (S&P 500 ETF) only, using THOR Signal entry and exit points. 
              Results do not account for slippage, commissions, taxes, or other trading costs.
            </p>
          </div>
        </section>

        {/* Key Stats */}
        <section className="w-full pb-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-600/20 to-green-800/10 rounded-2xl p-6 border border-green-800/30 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-green-400">+{totalReturn}%</p>
                <p className="text-sm text-gray-400 mt-1">Cumulative Return</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/10 rounded-2xl p-6 border border-blue-800/30 text-center">
                <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-blue-400">{winRate}%</p>
                <p className="text-sm text-gray-400 mt-1">Win Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/10 rounded-2xl p-6 border border-purple-800/30 text-center">
                <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-purple-400">+{avgWin}%</p>
                <p className="text-sm text-gray-400 mt-1">Avg Winning Trade</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/10 rounded-2xl p-6 border border-yellow-800/30 text-center">
                <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-yellow-400">10</p>
                <p className="text-sm text-gray-400 mt-1">Total Trades (17 yrs)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="w-full pb-16">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-gray-800 text-center space-y-4">
              <Shield className="h-10 w-10 text-purple-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">Built for Downside Protection</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                The THOR Signal went to cash before both the 2008 Financial Crisis and the 2020 COVID crash. 
                Only 10 trades in 17 years — this isn't about overtrading. It's about precision timing.
              </p>
            </div>
          </div>
        </section>

        {/* Trade History Table */}
        <section className="w-full py-16 bg-[#0a0a0a]">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Complete Trade History
              </h2>
              <p className="text-gray-300 text-lg">
                Every THOR Signal trade on SPY since 2007 — based on trading $100,000 in SPY only
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">#</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Entry Date</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Exit Date</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Entry</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Exit</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">P&L</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Return</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Cumulative</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade) => (
                    <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{trade.id}</td>
                      <td className="py-4 px-4 text-gray-300">{formatDate(trade.entry)}</td>
                      <td className="py-4 px-4 text-gray-300">{formatDate(trade.exit)}</td>
                      <td className="py-4 px-4 text-right text-gray-300">${trade.entryPrice.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right text-gray-300">${trade.exitPrice.toFixed(2)}</td>
                      <td className={`py-4 px-4 text-right font-medium ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 px-4 text-right font-semibold ${trade.pnlPct >= 0 ? "text-green-400" : "text-red-400"}`}>
                        <span className="inline-flex items-center gap-1">
                          {trade.pnlPct >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          {trade.pnlPct >= 0 ? "+" : ""}{trade.pnlPct.toFixed(2)}%
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-right font-medium ${trade.cumPnlPct >= 0 ? "text-blue-400" : "text-red-400"}`}>
                        {trade.cumPnlPct >= 0 ? "+" : ""}{trade.cumPnlPct.toFixed(2)}%
                      </td>
                      <td className="py-4 px-4 text-center">
                        {trade.pnl >= 0 ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {trades.map((trade) => (
                <div key={trade.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Trade #{trade.id}</span>
                    {trade.pnl >= 0 ? (
                      <span className="flex items-center gap-1 text-green-400 font-semibold">
                        <CheckCircle className="h-4 w-4" /> Win
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 font-semibold">
                        <XCircle className="h-4 w-4" /> Loss
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Entry</p>
                      <p className="text-gray-300">{formatDate(trade.entry)} @ ${trade.entryPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Exit</p>
                      <p className="text-gray-300">{formatDate(trade.exit)} @ ${trade.exitPrice}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                    <span className={`font-semibold ${trade.pnlPct >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {trade.pnlPct >= 0 ? "+" : ""}{trade.pnlPct.toFixed(2)}%
                    </span>
                    <span className="text-sm text-blue-400">
                      Cumulative: {trade.cumPnlPct >= 0 ? "+" : ""}{trade.cumPnlPct.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" /> Winning Trades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-3xl font-bold text-green-400">{winningTrades.length} / {trades.length}</p>
                  <p className="text-gray-400">Average gain: +{avgWin}%</p>
                  <p className="text-gray-400">Best trade: +{bestTrade.pnlPct.toFixed(2)}% ({formatDate(bestTrade.entry)} — {formatDate(bestTrade.exit)})</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-400" /> Losing Trades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-3xl font-bold text-red-400">{losingTrades.length} / {trades.length}</p>
                  <p className="text-gray-400">Average loss: {avgLoss}%</p>
                  <p className="text-gray-400">Losses are contained — max drawdown controlled</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" /> $100K → $436K
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-3xl font-bold text-blue-400">+336%</p>
                  <p className="text-gray-400">Cumulative return over 17 years trading $100K in SPY</p>
                  <p className="text-gray-400">Only 10 trades — patience over frequency</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

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
              <nav className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
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
