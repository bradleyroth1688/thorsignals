import { createServerClient } from "@/lib/supabase/server"

export async function checkAdminAccess() {
  const supabase = await createServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { isAdmin: false, user: null, error: "Unauthorized" }
  }

  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (profileError || !profile?.is_admin) {
    return { isAdmin: false, user, error: "Admin access required" }
  }

  return { isAdmin: true, user, error: null }
}
