import { CoursesManagement } from "@/components/admin/courses-management"

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Algorithm Management</h1>
        <p className="text-gray-600">Create, edit, and manage your trading algorithms and indicators</p>
      </div>

      <CoursesManagement />
    </div>
  )
}
