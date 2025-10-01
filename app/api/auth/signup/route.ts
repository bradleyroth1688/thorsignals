import { createServerClient } from "@/lib/supabase/server"
import { getBaseUrl } from "@/lib/utils/site-config"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    const supabase = await createServerClient()
    const baseUrl = getBaseUrl()

    // Sign up the user with email confirmation
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${baseUrl}/auth/callback?next=/`,
      },
    })

    if (authError) {
      console.error("Signup error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 400 })
    }

    console.log("User created successfully:", authData.user.id)

    return NextResponse.json({
      message: "User created successfully. Please check your email to verify your account.",
      user: authData.user,
      needsEmailVerification: !authData.session,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
