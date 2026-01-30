"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tradingviewUsername: "",
    password: "",
    confirmPassword: "",
    plan: "thor",
    billingCycle: "monthly", // monthly or annual
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords do not match"
      setError(errorMsg)
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long"
      setError(errorMsg)
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      })
      return
    }

    setLoading(true)


    //Check if email already exists in database
    try {
      const emailCheckResponse = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      })

      const emailCheckData = await emailCheckResponse.json()

      if (emailCheckData.exists) {
        const errorMsg = "An account with this email already exists. Please use a different email or try logging in."
        setError(errorMsg)
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive",
        })
        setLoading(false)
        return
      }
    } catch (error) {
      console.error("Email check error:", error)
      const errorMsg = "Failed to verify email. Please try again."
      setError(errorMsg)
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      })
      setLoading(false)
      return
    }
    try{
     let customerID, metadata = { 
      "email": (formData.email),
      "password" : (formData.password),
      "firstName" : (formData.firstName),
      "lastName" : (formData.lastName),
      "tradingviewUsername" : (formData.tradingviewUsername),
      "plan_type": "Basic_plan" };
    const customerResponse = await fetch("/api/stripe/create-customer", {
      method: "POST",
      body: JSON.stringify({ email: formData.email, name: formData.firstName + " " + formData.lastName, metadata: metadata }),
    })
    const customerData = await customerResponse.json()
    customerID = customerData.customer.id;
    console.log("customerID--------------",customerID);
    let session_params = {
      "customer": customerID,
      "payment_method_types": ["card"],
      "line_items": [
        {
          "price": process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN,
          "quantity": 1,
        }
      ],
      "mode": "subscription",
      "success_url": `${process.env.NEXT_PUBLIC_SITE_URL}/confirm-email?email=${encodeURIComponent(formData.email)}`, 
      "cancel_url": `${process.env.NEXT_PUBLIC_SITE_URL}/signup`,
      "metadata": metadata,
      "subscription_data": {
        "metadata": metadata
      }
    }

    const session = await fetch("/api/stripe/checkout-session", {
      method: "POST",
      body: JSON.stringify(session_params),
    })
    const sessionData = await session.json();
    if (sessionData.session?.url) {
      // Use window.location.href for external Stripe URLs
      window.location.href = sessionData.session.url
    } else {
      throw new Error('No checkout URL received')
    }

  }
  catch (error) {
    console.error('Subscription error:', error);
    toast({
      title: "Error",
      description: "Failed to process subscription. Please try again.",
      variant: "destructive",
    })
  } finally {
    setLoading(false)
  }
    // try {
    //   const response = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       password: formData.password,
    //       firstName: formData.firstName,
    //       lastName: formData.lastName,
    //       tradingviewUsername: formData.tradingviewUsername,
    //       plan: formData.plan,
    //     }),
    //   })

    //   const data = await response.json()

    //   if (!response.ok) {
    //     throw new Error(data.error || "Failed to create account")
    //   }

    //   if (data.needsEmailVerification) {
    //     setEmailSent(true)
    //     toast({
    //       title: "Check your email!",
    //       description: "We've sent you a verification link to complete your registration.",
    //     })
    //   } else {
    //     toast({
    //       title: "Success!",
    //       description: "Account created successfully!",
    //     })
    //     router.push("/")
    //   }
    // } catch (error) {
    //   const errorMsg = error instanceof Error ? error.message : "Failed to create account"
    //   setError(errorMsg)
    //   toast({
    //     title: "Error",
    //     description: errorMsg,
    //     variant: "destructive",
    //   })
    // } finally {
    //   setLoading(false)
    // }
  }


  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-xl sm:text-2xl text-white">Check Your Email</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-300">
                We've sent a verification link to <strong className="text-white">{formData.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-gray-700 border-gray-600">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-gray-300">
                  Click the link in your email to verify your account and complete registration. The link will expire in
                  24 hours.
                </AlertDescription>
              </Alert>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-300">Didn't receive the email?</p>
                <Button variant="outline" onClick={() => setEmailSent(false)} className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            THOR Signals
            </span>
          </Link>
        </div>

        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl sm:text-2xl text-center text-white">Create Your Account</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base text-gray-300">
              Start your 7-day free trial. Cancel anytime.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-900/20 border-red-500">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradingviewUsername" className="text-sm text-gray-300">
                  TradingView Username
                </Label>
                <Input
                  id="tradingviewUsername"
                  type="text"
                  placeholder="your_tradingview_username"
                  value={formData.tradingviewUsername}
                  onChange={(e) => setFormData({ ...formData, tradingviewUsername: e.target.value })}
                  required
                  className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400">Enter your TradingView username for signal access</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm text-gray-300">
                  Choose Your Plan
                </Label>
                
                {/* Plan Toggle */}
                <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, billingCycle: "monthly" })}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      formData.billingCycle === "monthly"
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, billingCycle: "annual" })}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      formData.billingCycle === "annual"
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Annual
                    <span className="ml-1 text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                      SAVE 20%
                    </span>
                  </button>
                </div>

                {/* Plan Details */}
                <div className="bg-gray-700 p-4 rounded-lg border border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">THOR Signal Indicator</p>
                      <p className="text-sm text-gray-400">
                        Full access to institutional-grade signals • 7-day free trial
                      </p>
                      {formData.billingCycle === "annual" && (
                        <p className="text-xs text-green-400 mt-1">Save $240/year with annual billing</p>
                      )}
                    </div>
                    <div className="text-right">
                      {formData.billingCycle === "monthly" ? (
                        <>
                          <p className="text-2xl font-bold text-white">$99</p>
                          <p className="text-sm text-gray-400">/month</p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-bold text-white">$79</p>
                          <p className="text-sm text-gray-400">/month</p>
                          <p className="text-xs text-gray-500">Billed annually at $948</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20 h-10 sm:h-11" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account & Subscribe"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
