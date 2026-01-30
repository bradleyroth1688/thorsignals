import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient({ req: request, res: response })

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
    // Allow everyone to access login page
    return response
  }

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // First check if user has a session
    if (!session) {
      console.log("Middleware - No session, redirecting to admin login")
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }

    // User has session, now verify they are admin and account is active
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin, flag")
      .eq("id", session.user.id)
      .single()

    // Check if account is deactivated
    if (profile?.flag === false) {
      console.log("Middleware - Account deactivated, signing out")
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }

    // Check if user is not an admin
    if (profileError || !profile?.is_admin) {
      console.log("Middleware - Not admin, signing out")
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }

    // User is authenticated admin with active account, allow access
    return response
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes handle auth separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
