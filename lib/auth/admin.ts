import { createApiClient } from "@/lib/supabase/server"

export async function checkAdminAccess() {
  const supabase = await createApiClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.log("checkAdminAccess - No user or error:", userError?.message)
    return { isAdmin: false, user: null, error: "Unauthorized" }
  }

  // Check if user is admin and account is active
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin, flag")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.log("checkAdminAccess - Profile error:", profileError.message)
    return { isAdmin: false, user, error: "Failed to fetch profile" }
  }

  if (!profile?.is_admin) {
    console.log("checkAdminAccess - Not admin")
    return { isAdmin: false, user, error: "Admin access required" }
  }

  if (profile?.flag === false) {
    console.log("checkAdminAccess - Account deactivated")
    return { isAdmin: false, user, error: "Account deactivated" }
  }

  return { isAdmin: true, user, error: null }
}
