import { NotificationsManagement } from "@/components/admin/notifications-management"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Monitor user activities and system notifications</p>
      </div>
      <NotificationsManagement />
    </div>
  )
}
