"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatDate } from "@/lib/utils/format"
import { Search, MoreHorizontal, Mail, Trash2 } from "lucide-react"

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
  is_admin: boolean
  tradingview_username?: string
  flag?: boolean
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (initialLoad) {
      const fetchUsers = async () => {
        try {
          setLoading(true)
          const response = await fetch("/api/admin/users")
          const data = await response.json()
          setUsers(data.users || [])
        } catch (error) {
          console.error("Error fetching users:", error)
        } finally {
          setLoading(false)
          setInitialLoad(false)
        }
      }

      fetchUsers()
    }
  }, [initialLoad])

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
  }

  const handleConfirmDelete = async () => {
    if (!userToDelete) return

    try {
      setIsDeleting(true)
      setDeletingUserId(userToDelete.id)
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userToDelete.id }),
      })

      if (response.ok) {
        // Remove the user from the list
        setUsers(users.filter((user) => user.id !== userToDelete.id))
        setUserToDelete(null)
      } else {
        const data = await response.json()
        alert(`Failed to delete user: ${data.error}`)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Failed to delete user")
    } finally {
      setIsDeleting(false)
      setDeletingUserId(null)
    }
  }

  const handleCancelDelete = () => {
    setUserToDelete(null)
  }

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading && initialLoad) {
    return (
      <>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </>
    )
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Users ({users.length})</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => {
            return (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user.first_name?.[0]}
                      {user.last_name?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-gray-500">email: {user.email}</p>
                    <p className="text-sm text-gray-500">tradingview username: {user.tradingview_username}</p>
                    <p className="text-xs text-gray-400">Joined {formatDate(user.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {user.is_admin && <Badge className="text-xs bg-purple-100 text-purple-800">Admin</Badge>}
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeleteClick(user)}
                      disabled={deletingUserId === user.id}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>

    {/* Delete Confirmation Dialog */}
    <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && handleCancelDelete()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove <strong>{userToDelete?.first_name} {userToDelete?.last_name}</strong> ({userToDelete?.email}) from the system.
            The user data will be preserved in the database but marked as deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "OK"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  )
}
