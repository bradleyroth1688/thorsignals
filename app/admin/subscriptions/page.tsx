import { SubscriptionsTable } from "@/components/admin/subscriptions-table"

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Subscriptions Management</h1>
        <p className="text-gray-600">Manage customer subscriptions and billing information</p>
      </div>

      <SubscriptionsTable />
    </div>
  )
}
