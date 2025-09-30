import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function DynamicPricing() {
  const features = [
    "Access to THOR Signal Indicator for TradingView",
    "Institutional-grade trading signals",
    "Real-time market analysis",
    "Exclusive Discord community access",
    "Direct support from our trading team",
    "Algorithm updates and improvements",
    "Educational resources and workshops",
    "30-day money-back guarantee"
  ]

  return (
    <section id="pricing" className="w-full py-8 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] text-gray-300 text-base sm:text-lg md:text-xl px-4">
              Get full access to the THOR Signal Indicator and our exclusive trading community for one simple monthly price.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-md py-8 md:py-12">
          <Card className="w-full bg-gray-800 border-2 border-purple-500 relative">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-white">
                THOR Signal Indicator
              </CardTitle>
              <CardDescription className="text-gray-300">
                Full access to institutional-grade trading signals
              </CardDescription>
              <div className="pt-4">
                <span className="text-5xl sm:text-6xl font-bold text-white">$99</span>
                <span className="text-gray-400 text-lg">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="w-full block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">
                  Get Started Now
                </Button>
              </Link>
              <p className="text-center text-sm text-gray-400">
                Cancel anytime • No setup fees • 30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
