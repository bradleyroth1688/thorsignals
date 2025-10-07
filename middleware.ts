import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = await createServerClient()

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  // Only log errors that are not "refresh token not found" (expected for non-logged-in users)
  if (error && !error.message.includes("Invalid Refresh Token") && !error.message.includes("Refresh Token Not Found")) {
    console.log("Middleware - Session error:", {
      path: request.nextUrl.pathname,
      error: error.message,
    })
  }

  // Allow access to admin login page without authentication
  if (request.nextUrl.pathname === "/admin-login") {
    // If already authenticated, check if admin and redirect accordingly
    if (session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single()

      if (profile?.is_admin) {
        // Already an admin, redirect to admin panel
        return NextResponse.redirect(new URL("/admin", request.url))
      } else {
        // Not an admin, redirect to home
        return NextResponse.redirect(new URL("/", request.url))
      }
    }
    // Not authenticated, allow access to login page
    return response
  }

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      console.log("Middleware - No session, redirecting to admin login")
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single()

    if (profileError || !profile?.is_admin) {
      console.log("Middleware - Not admin, redirecting to home")
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
