import { createServerClient } from "@/lib/supabase/server"
import { checkAdminAccess } from "@/lib/auth/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { isAdmin, error } = await checkAdminAccess()

    if (!isAdmin) {
      return NextResponse.json({ error: error || "Admin access required" }, { status: 403 })
    }

    const supabase = await createServerClient()

    // Get total users
    const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    // Get recent signups (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: recentSignups } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo.toISOString())

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers || 0,
        recentSignups: recentSignups || 0,
      },
    })
  } catch (error) {
    console.error("Admin stats fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
