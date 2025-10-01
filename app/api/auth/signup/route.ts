import { createServerClient } from "@/lib/supabase/server"
import { getBaseUrl } from "@/lib/utils/site-config"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const supabase = await createServerClient()
    const baseUrl = getBaseUrl()

    // Check if email already exists in profiles table
    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email.toLowerCase())
      .single()

    if (existingProfile) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please use a different email or try logging in." },
        { status: 409 }
      )
    }

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

    // Store email and plain password in profiles table
    // WARNING: Storing plain text passwords is NOT recommended for security reasons
    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({
        email: email.toLowerCase(),
        password_hash: password, // Storing plain text password
      })
      .eq("id", authData.user.id)

    if (profileUpdateError) {
      console.error("Profile update error:", profileUpdateError)
      // Don't fail the signup if profile update fails, but log it
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
