"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, BarChart3, TrendingUp, Target, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight, Shield, Zap } from "lucide-react"

const spyTrades = [
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

const tslaTrades = [
  { id: 1, entry: "2021-01-07", exit: "2021-03-04", entryPrice: 260.01, exitPrice: 219.99, pnl: -15386.11, pnlPct: -15.41, cumPnlPct: -15.39 },
  { id: 2, entry: "2021-10-13", exit: "2021-11-17", entryPrice: 260.01, exitPrice: 349.99, pnl: 29223.68, pnlPct: 34.58, cumPnlPct: 13.84 },
  { id: 3, entry: "2022-01-05", exit: "2022-01-19", entryPrice: 380.01, exitPrice: 349.99, pnl: -8757.06, pnlPct: -7.92, cumPnlPct: 5.08 },
  { id: 4, entry: "2022-03-22", exit: "2022-05-06", entryPrice: 310.01, exitPrice: 299.99, pnl: -3407.38, pnlPct: -3.25, cumPnlPct: 1.67 },
  { id: 5, entry: "2022-07-21", exit: "2022-07-21", entryPrice: 260.01, exitPrice: 259.99, pnl: -0.07, pnlPct: -0.03, cumPnlPct: 1.66 },
  { id: 6, entry: "2022-07-21", exit: "2022-10-11", entryPrice: 260.01, exitPrice: 229.99, pnl: -11726.91, pnlPct: -11.56, cumPnlPct: -10.05 },
  { id: 7, entry: "2023-02-01", exit: "2023-08-29", entryPrice: 170.01, exitPrice: 229.99, pnl: 31708.26, pnlPct: 35.25, cumPnlPct: 21.65 },
  { id: 8, entry: "2023-09-22", exit: "2023-10-19", entryPrice: 260.01, exitPrice: 239.99, pnl: -9031.50, pnlPct: -7.72, cumPnlPct: 12.62 },
  { id: 9, entry: "2024-01-11", exit: "2024-01-12", entryPrice: 240.01, exitPrice: 229.99, pnl: -4721.42, pnlPct: -4.19, cumPnlPct: 7.90 },
  { id: 10, entry: "2024-07-02", exit: "2024-12-27", entryPrice: 210.01, exitPrice: 449.99, pnl: 123075.88, pnlPct: 114.23, cumPnlPct: 130.98 },
  { id: 11, entry: "2025-04-04", exit: "2025-04-09", entryPrice: 260.01, exitPrice: 239.99, pnl: -17822.16, pnlPct: -7.72, cumPnlPct: 113.16 },
  { id: 12, entry: "2025-04-09", exit: "2025-07-22", entryPrice: 260.01, exitPrice: 319.99, pnl: 49076.12, pnlPct: 23.04, cumPnlPct: 162.23 },
  { id: 13, entry: "2025-07-24", exit: "2025-11-13", entryPrice: 320.01, exitPrice: 419.99, pnl: 79325.37, pnlPct: 31.22, cumPnlPct: 241.56 },
  { id: 14, entry: "2025-12-29", exit: "2026-01-20", entryPrice: 470.01, exitPrice: 439.99, pnl: -21408.92, pnlPct: -6.41, cumPnlPct: 220.15 },
]

function calculateStats(trades: typeof spyTrades) {
  const winningTrades = trades.filter(t => t.pnl > 0)
  const losingTrades = trades.filter(t => t.pnl < 0)
  const winRate = ((winningTrades.length / trades.length) * 100).toFixed(0)
  const avgWin = winningTrades.length > 0 ? (winningTrades.reduce((sum, t) => sum + t.pnlPct, 0) / winningTrades.length).toFixed(1) : "0"
  const avgLoss = losingTrades.length > 0 ? (losingTrades.reduce((sum, t) => sum + t.pnlPct, 0) / losingTrades.length).toFixed(1) : "0"
  const bestTrade = trades.reduce((best, t) => t.pnlPct > best.pnlPct ? t : best)
  const totalReturn = trades[trades.length - 1].cumPnlPct
  
  return {
    winningTrades,
    losingTrades,
    winRate,
    avgWin,
    avgLoss,
    bestTrade,
    totalReturn
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default function TradeResults() {
  const [activeTab, setActiveTab] = useState<'spy' | 'tsla'>('spy')
  
  const spyStats = calculateStats(spyTrades)
  const tslaStats = calculateStats(tslaTrades)
  
  const currentTrades = activeTab === 'spy' ? spyTrades : tslaTrades
  const currentStats = activeTab === 'spy' ? spyStats : tslaStats

  return (
    <>
      {/* Key Stats */}
      <section className="w-full pb-16">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/10 rounded-2xl p-6 border border-green-800/30 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-green-400">+{currentStats.totalReturn.toFixed(0)}%</p>
              <p className="text-sm text-gray-400 mt-1">Cumulative Return</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/10 rounded-2xl p-6 border border-blue-800/30 text-center">
              <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-blue-400">{currentStats.winRate}%</p>
              <p className="text-sm text-gray-400 mt-1">Win Rate</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/10 rounded-2xl p-6 border border-purple-800/30 text-center">
              <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-purple-400">+{currentStats.avgWin}%</p>
              <p className="text-sm text-gray-400 mt-1">Avg Winning Trade</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/10 rounded-2xl p-6 border border-yellow-800/30 text-center">
              <DollarSign className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-yellow-400">{currentTrades.length}</p>
              <p className="text-sm text-gray-400 mt-1">Total Trades {activeTab === 'spy' ? '(17 yrs)' : '(5 yrs)'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="w-full pb-16">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-gray-800 text-center space-y-4">
            {activeTab === 'spy' ? (
              <>
                <Shield className="h-10 w-10 text-purple-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Built for Downside Protection</h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  The THOR Signal went to cash before both the 2008 Financial Crisis and the 2020 COVID crash. 
                  Only 10 trades in 17 years — this isn't about overtrading. It's about precision timing.
                </p>
              </>
            ) : (
              <>
                <Zap className="h-10 w-10 text-yellow-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Big Winners, Controlled Losses</h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  5 wins vs 9 losses — but the wins are massive. Trade #10 alone returned +114.23% in 6 months. 
                  The THOR Signal doesn't need a high win rate. It needs the right trades.
                </p>
              </>
            )}
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
              Every THOR Signal trade on {activeTab.toUpperCase()} — based on trading $100,000
            </p>
            {activeTab === 'tsla' && (
              <p className="text-sm text-yellow-400/70 max-w-2xl mx-auto">
                TSLA results from TradingView strategy tester with $100K starting capital
              </p>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('spy')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'spy' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                SPY Results
              </button>
              <button
                onClick={() => setActiveTab('tsla')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'tsla' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                TSLA Results
              </button>
            </div>
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
                {currentTrades.map((trade) => (
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
            {currentTrades.map((trade) => (
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
                <p className="text-3xl font-bold text-green-400">{currentStats.winningTrades.length} / {currentTrades.length}</p>
                <p className="text-gray-400">Average gain: +{currentStats.avgWin}%</p>
                <p className="text-gray-400">Best trade: +{currentStats.bestTrade.pnlPct.toFixed(2)}% ({formatDate(currentStats.bestTrade.entry)} — {formatDate(currentStats.bestTrade.exit)})</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-400" /> Losing Trades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-red-400">{currentStats.losingTrades.length} / {currentTrades.length}</p>
                <p className="text-gray-400">Average loss: {currentStats.avgLoss}%</p>
                <p className="text-gray-400">{activeTab === 'spy' ? 'Losses are contained — max drawdown controlled' : 'Small losses keep you in the game for big wins'}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" /> 
                  {activeTab === 'spy' ? '$100K → $436K' : '$100K → $320K'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-blue-400">+{currentStats.totalReturn.toFixed(0)}%</p>
                <p className="text-gray-400">Cumulative return over {activeTab === 'spy' ? '17 years' : '5 years'} trading $100K in {activeTab.toUpperCase()}</p>
                <p className="text-gray-400">{activeTab === 'spy' ? 'Only 10 trades — patience over frequency' : '14 trades — selective entry timing'}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}