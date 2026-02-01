"use client"

import { MobileNav } from "@/components/mobile-nav"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to log in")
      }

      toast({
        title: "Success!",
        description: "Logged in successfully!",
      })

      // Redirect to dashboard or home page
      router.push("/")
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to log in"
      setError(errorMsg)
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email")
      }

      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to send reset email"
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header with Navigation */}
      <header className="w-full bg-black/90 backdrop-blur-sm border-b border-gray-800">
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
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/signal-101" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Free Guide
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-white border-b-2 border-purple-600 pb-1">
              Login
            </Link>
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
          </nav>
          <div className="md:hidden"><MobileNav /></div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300">
              Sign in to access your THOR Signal Indicator
            </p>
          </div>

          <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl sm:text-2xl text-center text-white">Sign In</CardTitle>
              <CardDescription className="text-center text-sm sm:text-base text-gray-300">
                Enter your credentials to access your account
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
                    className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                  />
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
                    className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20 h-10 sm:h-11" 
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-300">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                    Start your free trial
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Need help? <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">Contact support</Link>
            </p>
          </div>
        </div>
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