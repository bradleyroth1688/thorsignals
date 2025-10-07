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

    // Get recent user activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentUsers, error: recentUsersError } = await supabase
      .from("profiles")
      .select("first_name, last_name, created_at")
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(10)

    // Calculate community engagement metrics
    const totalUsers = await supabase.from("profiles").select("*", { count: "exact", head: true })

    const activeUsers = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("updated_at", sevenDaysAgo.toISOString())

    const engagementRate = totalUsers.count ? Math.round(((activeUsers.count || 0) / totalUsers.count) * 100) : 0

    return NextResponse.json({
      community: {
        recentUsers: recentUsers || [],
        engagement: {
          totalUsers: totalUsers.count || 0,
          activeUsers: activeUsers.count || 0,
          engagementRate,
        },
      },
    })
  } catch (error) {
    console.error("Admin community fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
