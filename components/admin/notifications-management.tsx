"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Bell, Calendar, MessageSquare, CreditCard } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  created_at: string
  title: string
  content: string
  viewed: boolean
}

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 10

  const fetchNotifications = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true)
        setOffset(0)
      } else {
        setLoadingMore(true)
      }

      const currentOffset = reset ? 0 : offset
      const response = await fetch(`/api/notifications?limit=${limit}&offset=${currentOffset}`)
      const data = await response.json()

      if (data.success) {
        if (reset) {
          setNotifications(data.notifications)
        } else {
          setNotifications(prev => [...prev, ...data.notifications])
        }
        
        // Check if there are more notifications
        setHasMore(data.notifications.length === limit)
        setOffset(currentOffset + limit)
      } else {
        console.error('Failed to fetch notifications:', data.error)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = () => {
    fetchNotifications(false)
  }

  const markAsViewed = async (notificationId: string) => {
    // Optimistic update: Update UI immediately
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, viewed: true }
          : notification
      )
    )

    // Trigger event to update badge count in sidebar
    window.dispatchEvent(new CustomEvent('notification-read'))

    // Then sync with backend
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: notificationId }),
      })

      const data = await response.json()

      if (!data.success) {
        console.error('Failed to mark notification as viewed:', data.error)
        // Rollback on failure
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, viewed: false }
              : notification
          )
        )
        // Trigger event to revert badge count
        window.dispatchEvent(new CustomEvent('notification-read'))
      }
    } catch (error) {
      console.error('Error marking notification as viewed:', error)
      // Rollback on error
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, viewed: false }
            : notification
        )
      )
      // Trigger event to revert badge count
      window.dispatchEvent(new CustomEvent('notification-read'))
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.viewed) {
      markAsViewed(notification.id)
    }
  }

  useEffect(() => {
    fetchNotifications(true)
  }, [])

  const getNotificationIcon = (title: string) => {
    if (title.includes('Payment') || title.includes('$99')) {
      return <CreditCard className="h-4 w-4 text-green-500" />
    } else if (title.includes('Contact') || title.includes('Message')) {
      return <MessageSquare className="h-4 w-4 text-blue-500" />
    }
    return <Bell className="h-4 w-4 text-gray-500" />
  }

  const getNotificationType = (title: string) => {
    if (title.includes('Payment') || title.includes('$99')) {
      return 'payment'
    } else if (title.includes('Contact') || title.includes('Message')) {
      return 'contact'
    }
    return 'general'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">View all system notifications and user activities</p>
        </div> */}
        <Badge variant="secondary" className="text-sm">
          {notifications.length} notifications
        </Badge>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-500 text-center">
                Notifications will appear here when users make payments or send contact messages.
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                !notification.viewed 
                  ? 'border-l-4 border-l-blue-500 bg-blue-50/50 shadow-sm' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.title)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-medium truncate ${
                        !notification.viewed ? 'text-gray-900 font-semibold' : 'text-gray-700'
                      }`}>
                        {notification.title}
                        {!notification.viewed && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={getNotificationType(notification.title) === 'payment' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {getNotificationType(notification.title)}
                        </Badge>
                        {!notification.viewed && (
                          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-300">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className={`mb-3 whitespace-pre-wrap ${
                      !notification.viewed ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {notification.content}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {hasMore && notifications.length > 0 && (
          <div className="flex justify-center pt-6">
            <Button 
              onClick={loadMore} 
              disabled={loadingMore}
              variant="outline"
              className="min-w-32"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
