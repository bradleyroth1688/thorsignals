import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Use route handler client for API routes to properly handle cookies
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Sign in the user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      // Provide user-friendly error messages
      let errorMessage = "Invalid email or password"
      
      if (authError.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials and try again."
      } else if (authError.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email address before signing in."
      } else if (authError.message.includes("User not found")) {
        errorMessage = "No account found with this email address. Please check your email or sign up."
      }
      
      return NextResponse.json({ error: errorMessage }, { status: 401 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to sign in. Please try again." }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", authData.user.id)
      .single()

    if (profileError) {
      console.error("Profile fetch error:", profileError)
      return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
    }

    if (!profile?.is_admin) {
      // Sign out the user since they're not an admin
      await supabase.auth.signOut()
      return NextResponse.json({ error: "Access denied. Admin privileges required.", isNotAdmin: true }, { status: 403 })
    }

    return NextResponse.json({
      message: "Sign in successful",
      user: authData.user,
      isAdmin: true,
    })
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

