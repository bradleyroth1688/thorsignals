"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

function RedirectToastHandlerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const reason = searchParams.get("redirect_reason")
    
    if (!reason) return

    // Define toast messages for different redirect reasons
    const redirectMessages: Record<string, { variant: "default" | "destructive", title: string, description: string }> = {
      account_deactivated: {
        variant: "destructive",
        title: "Account Deactivated",
        description: "Your account has been deactivated by an administrator. Please contact support for assistance.",
      },
      not_admin: {
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have administrator privileges to access this area.",
      },
      auth_required: {
        variant: "default",
        title: "Authentication Required",
        description: "Please log in to access the admin panel.",
      },
      already_authenticated: {
        variant: "default",
        title: "Already Logged In",
        description: "You're already authenticated as an administrator.",
      },
    }

    const message = redirectMessages[reason]
    
    if (message) {
      toast({
        variant: message.variant,
        title: message.title,
        description: message.description,
      })
      
      // Clean up the URL by removing the query parameter
      const currentPath = window.location.pathname
      router.replace(currentPath, { scroll: false })
    }
  }, [searchParams, toast, router])

  return null
}

export function RedirectToastHandler() {
  return (
    <Suspense fallback={null}>
      <RedirectToastHandlerContent />
    </Suspense>
  )
}

