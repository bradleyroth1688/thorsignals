import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Resend email confirmation
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })

    if (error) {
      console.error("Resend verification error:", error)
      return NextResponse.json({ error: "Failed to resend verification email" }, { status: 400 })
    }

    return NextResponse.json({ message: "Verification email sent successfully" })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
