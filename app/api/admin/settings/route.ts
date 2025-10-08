import { checkAdminAccess } from "@/lib/auth/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { isAdmin, error } = await checkAdminAccess()

    if (!isAdmin) {
      return NextResponse.json({ error: error || "Admin access required" }, { status: 403 })
    }

    // For now, return default settings
    // In production, you'd store these in a settings table
    const settings = {
      general: {
        siteName: "THOR Signals",
        siteDescription: "Professional Trading Algorithms for Institutional-Grade Performance",
        maintenanceMode: false,
        registrationEnabled: true,
      },
      subscription: {
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
        trialPeriodDays: 7,
        allowCancellation: true,
        prorationEnabled: true,
      },
      discord: {
        botToken: process.env.DISCORD_BOT_TOKEN || "",
        guildId: process.env.DISCORD_GUILD_ID || "",
        welcomeChannelId: "",
        autoRoleEnabled: true,
      },
      email: {
        provider: "resend",
        fromEmail: "onboarding@resend.dev",
        fromName: "THOR Signals",
        smtpHost: "",
        smtpPort: 587,
      },
      security: {
        passwordMinLength: 8,
        requireSpecialChars: true,
        sessionTimeoutMinutes: 60,
        maxLoginAttempts: 5,
      },
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Admin settings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { isAdmin, error } = await checkAdminAccess()

    if (!isAdmin) {
      return NextResponse.json({ error: error || "Admin access required" }, { status: 403 })
    }

    const { category, settings } = await request.json()

    // In production, you'd save these to a settings table
    // For now, we'll just return success
    console.log(`Updating ${category} settings:`, settings)

    return NextResponse.json({
      success: true,
      message: `${category} settings updated successfully`,
    })
  } catch (error) {
    console.error("Admin settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
