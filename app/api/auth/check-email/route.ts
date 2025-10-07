import { supabase } from "@/lib/supabase/admin"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email already exists in profiles table
    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email.toLowerCase())
      .single()

    // Return true if email exists, false if it doesn't
    const exists = !!existingProfile && !checkError

    return NextResponse.json({ exists })
  } catch (error) {
    console.error("Email check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

