import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Only run Supabase auth checks for admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return response
  }

  // Allow access to admin login page without authentication
  if (request.nextUrl.pathname === "/admin-login") {
    return response
  }

  try {
    const supabase = createMiddlewareClient({ req: request, res: response })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin, flag")
      .eq("id", session.user.id)
      .single()

    if (profile?.flag === false || profileError || !profile?.is_admin) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    // On error, redirect to admin login for admin routes
    return NextResponse.redirect(new URL("/admin-login", request.url))
  }
}

export const config = {
  matcher: [
    // Only match admin routes - public pages don't need middleware
    "/admin/:path*",
    "/admin-login",
  ],
}
