import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get("token_hash")
  const type = requestUrl.searchParams.get("type")
  const next = requestUrl.searchParams.get("next") ?? "/"
  const code = requestUrl.searchParams.get("code")
  const error_description = requestUrl.searchParams.get("error_description")

  console.log("Auth callback - token_hash:", !!token_hash, "type:", type, "code:", !!code, "next:", next)

  // Handle error from Supabase
  if (error_description) {
    console.error("Auth callback error from Supabase:", error_description)
    return NextResponse.redirect(
      new URL(`/signup?error=${encodeURIComponent(error_description)}`, request.url),
    )
  }

  // Use route handler client to properly set cookies
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  // Handle email confirmation with token_hash (PKCE flow)
  if (token_hash && type === "email") {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: "email",
      })

      if (error) {
        console.error("Email verification error:", error)
        return NextResponse.redirect(
          new URL(`/?error=${encodeURIComponent("Email verification failed. Please try again.")}`, request.url),
        )
      }

      console.log("Email verified successfully, redirecting to:", next)
      return NextResponse.redirect(new URL(next, request.url))
    } catch (error) {
      console.error("Email verification exception:", error)
      return NextResponse.redirect(new URL("/?error=verification_failed", request.url))
    }
  }

  // Handle OAuth callback with code
  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      console.log("Auth callback - Exchange result:", {
        hasSession: !!data.session,
        userId: data.session?.user?.id,
        error: error?.message,
      })

      if (!error && data.session) {
        console.log("Auth callback - Success, redirecting to:", next)
        return NextResponse.redirect(new URL(next, request.url))
      } else {
        console.error("Auth callback error:", error)
        return NextResponse.redirect(
          new URL(`/signup?error=${encodeURIComponent(error?.message || "Authentication failed")}`, request.url),
        )
      }
    } catch (error) {
      console.error("Auth callback exception:", error)
      return NextResponse.redirect(new URL("/signup?error=authentication_failed", request.url))
    }
  }

  // No valid auth parameters
  console.log("Auth callback - No valid parameters, redirecting to home")
  return NextResponse.redirect(new URL("/", request.url))
}
