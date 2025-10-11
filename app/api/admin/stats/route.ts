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

    // Get total users (only active users with flag=true)
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("flag", true)

    // Get recent signups (last 30 days, only active users with flag=true)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: recentSignups } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("flag", true)
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
