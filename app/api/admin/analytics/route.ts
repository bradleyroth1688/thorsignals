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

    // Get user growth data (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: userGrowth, error: userGrowthError } = await supabase
      .from("profiles")
      .select("created_at")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true })

    // Get total users
    const { count: totalUsers, error: totalUsersError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })

    // Get active subscriptions from user_subscriptions table
    const { count: activeSubscriptionsCount, error: subscriptionsError } = await supabase
      .from("user_subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")

    // Calculate monthly revenue (single Thor Signals plan)
    const THOR_SIGNALS_PRICE = 99 // Update this to match your actual plan price
    const monthlyRevenue = (activeSubscriptionsCount || 0) * THOR_SIGNALS_PRICE

    // Process user growth data by day
    const userGrowthByDay =
      userGrowth?.reduce((acc: any, user) => {
        const date = new Date(user.created_at).toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {}) || {}

    const analytics = {
      overview: {
        totalUsers: totalUsers || 0,
        activeSubscriptions: activeSubscriptionsCount || 0,
        monthlyRevenue: monthlyRevenue,
      },
      userGrowth: userGrowthByDay,
    }

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error("Admin analytics fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
