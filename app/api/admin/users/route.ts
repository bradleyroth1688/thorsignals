import { supabase } from "@/lib/supabase/admin"
import { checkAdminAccess } from "@/lib/auth/admin"
import { NextResponse } from "next/server"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { isAdmin, error } = await checkAdminAccess()

    if (!isAdmin) {
      return NextResponse.json({ error: error || "Admin access required" }, { status: 403 })
    }

    // Fetch users with their profiles
    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 400 })
    }

    // Get user emails from auth.users (requires service role)
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    // Merge profile data with auth data
    const enrichedUsers = users?.map((user) => {
      const authUser = authUsers?.users?.find((au) => au.id === user.id)
      return {
        ...user,
        email: authUser?.email,
        email_confirmed_at: authUser?.email_confirmed_at,
        last_sign_in_at: authUser?.last_sign_in_at,
      }
    })

    return NextResponse.json({ users: enrichedUsers })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { isAdmin, error } = await checkAdminAccess()

    if (!isAdmin) {
      return NextResponse.json({ error: error || "Admin access required" }, { status: 403 })
    }

    const { userId, updates } = await request.json()

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error("Admin user update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
