"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Mail, Clock } from "lucide-react"

export default function ConfirmEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailParam = searchParams.get('email')
    const storedEmail = localStorage.getItem('signupEmail')
    
    if (emailParam) {
      setEmail(emailParam)
      localStorage.setItem('signupEmail', emailParam)
    } else if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [searchParams])

  const handleResendEmail = async () => {
    if (!email) {
      setError("Email address is required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Call your resend email API here
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend verification email")
      }

      // Show success message
      setIsVerified(true)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to resend verification email"
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = () => {
    // Clear stored email and redirect to home
    localStorage.removeItem('signupEmail')
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prime Aura Asset Management
            </span>
          </Link>
        </div>

        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <CardTitle className="text-xl sm:text-2xl text-white">Confirm Your Email</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-300">
              {email ? (
                <>We've sent a verification link to <strong className="text-white">{email}</strong></>
              ) : (
                "Please check your email for a verification link"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="bg-red-900/20 border-red-500">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {isVerified && (
              <Alert className="bg-green-900/20 border-green-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  Verification email sent successfully! Please check your inbox.
                </AlertDescription>
              </Alert>
            )}

            <Alert className="bg-gray-700 border-gray-600">
              <Clock className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-gray-300">
                <div className="space-y-2">
                  <p>To complete your account setup:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the verification link in the email</li>
                    <li>Your account will be activated automatically</li>
                  </ol>
                  <p className="text-xs text-gray-400 mt-2">
                    The verification link will expire in 24 hours.
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button 
                onClick={handleResendEmail} 
                disabled={isLoading || !email}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Sending..." : "Resend Verification Email"}
              </Button>

              <Button 
                onClick={handleContinue}
                variant="outline" 
                className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Continue to Dashboard
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">
                Already verified? You can continue to your dashboard.
              </p>
              <Link 
                href="/" 
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Go to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
