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
      
      // Provide user-friendly error messages
      let errorMessage = "Failed to create account. Please try again."
      
      if (authError.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please try logging in instead."
      } else if (authError.message.includes("Password should be")) {
        errorMessage = "Password is too weak. Please use a stronger password."
      } else if (authError.message.includes("valid email")) {
        errorMessage = "Please enter a valid email address."
      }
      
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 400 })
    }

    // Insert user data into profiles table
    // WARNING: Storing plain text passwords is NOT recommended for security reasons
    const { error: profileInsertError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        email: email.toLowerCase(),
        password: password, // Storing plain text password
        first_name: firstName,
        last_name: lastName,
        is_admin: false, // Default to non-admin
      })

    if (profileInsertError) {
      console.error("Profile insert error:", profileInsertError)
      // If profile creation fails, we should probably delete the auth user
      // But for now, just log the error
      return NextResponse.json(
        { error: "Failed to create user profile. Please try again." },
        { status: 500 }
      )
    }

    // Create default subscription entry if user_subscriptions table exists
    // You can modify this to assign a specific plan
    const { error: subscriptionError } = await supabase
      .from("user_subscriptions")
      .insert({
        user_id: authData.user.id,
        status: "free", // or "active" if you have a default plan
        // plan_id: "your-default-plan-id", // Add if you have a default plan
      })

    if (subscriptionError) {
      console.error("Subscription insert error:", subscriptionError)
      // Continue even if subscription insert fails
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
