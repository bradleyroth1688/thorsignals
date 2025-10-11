import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { RedirectToastHandler } from "@/components/redirect-toast-handler"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <RedirectToastHandler />
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
