"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { RedirectToastHandler } from "@/components/redirect-toast-handler"
import { AlertCircle, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
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
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Check the reason for failure
        if (data.reason === "account_deactivated") {
          setError(data.error)
          toast({
            title: "Account Deactivated",
            description: data.error || "Your account has been deactivated by an administrator. Please contact support for assistance.",
            variant: "destructive",
          })
          return
        }

        if (data.reason === "not_admin") {
          setError(data.error)
          toast({
            title: "Access Denied",
            description: data.error || "You don't have administrator privileges to access this area.",
            variant: "destructive",
          })
          return
        }

        // Invalid credentials or other errors
        setError(data.error || "Invalid email or password")
        toast({
          title: "Sign In Failed",
          description: data.error || "Invalid email or password",
          variant: "destructive",
        })
        return
      }

      // Successful admin login
      toast({
        title: "Welcome Admin!",
        description: "Successfully signed in. Redirecting to admin panel...",
      })

      // Use window.location to force a full page reload with new session
      // This ensures the middleware picks up the authenticated session
      window.location.href = "/admin"
    } catch (error) {
      setError("An unexpected error occurred")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBackToHome = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Logout before going back to home
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Error logging out:", error)
    }
    
    // Redirect to home page with full reload to clear session
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-8 px-4 sm:px-6 lg:px-8">
      <RedirectToastHandler />
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <a href="/" className="flex items-center justify-center mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              THOR Signals
            </span>
          </a>
        </div>

        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-12 w-12 text-purple-500" />
            </div>
            <CardTitle className="text-xl sm:text-2xl text-center text-white">Admin Login</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base text-gray-300">
              Enter your credentials to access the admin panel
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
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  disabled={loading}
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
                  className="h-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20 h-10 sm:h-11"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleBackToHome}
                  className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  ← Back to Home
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

