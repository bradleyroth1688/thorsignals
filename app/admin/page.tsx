import { redirect } from "next/navigation"

export default function AdminDashboard() {
  // Redirect to Users page since Overview tab is removed
  redirect("/admin/users")
}
