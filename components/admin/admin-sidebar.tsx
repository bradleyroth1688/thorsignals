"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Menu,
  X,
  CreditCard,
  Bell,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Discord", href: "/admin/community", icon: MessageSquare },
  { name: "Notifications", href: "/admin/notifications", icon: Bell, hasNotification: true },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [optimisticPath, setOptimisticPath] = useState<string | null>(null)

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/notifications?unread=true')
        if (response.ok) {
          const data = await response.json()
          setUnreadCount(data.unreadCount || 0)
        }
      } catch (error) {
        console.error('Failed to fetch unread notifications count:', error)
      }
    }

    fetchUnreadCount()
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)
    
    // Listen for notification read events to update immediately
    const handleNotificationRead = () => {
      fetchUnreadCount()
    }
    window.addEventListener('notification-read', handleNotificationRead)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('notification-read', handleNotificationRead)
    }
  }, [])

  // Prefetch all routes on mount for instant navigation
  useEffect(() => {
    navigation.forEach((item) => {
      router.prefetch(item.href)
    })
  }, [router])

  // Reset optimistic path when actual pathname changes
  useEffect(() => {
    if (optimisticPath && pathname === optimisticPath) {
      setOptimisticPath(null)
    }
  }, [pathname, optimisticPath])

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    // Optimistic update: change active tab immediately
    setOptimisticPath(href)
    setSidebarOpen(false)
    // Then navigate
    router.push(href)
  }

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link href="/admin" className="text-xl font-bold text-purple-400">
            Admin Panel
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              // Use optimistic path if set, otherwise use actual pathname
              const currentPath = optimisticPath || pathname
              const isActive = currentPath === item.href
              const showBadge = item.hasNotification && unreadCount > 0
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-150 relative",
                    isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {showBadge && (
                    <span className="ml-auto flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <Link href="/" className="block">
            <Button variant="outline" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
