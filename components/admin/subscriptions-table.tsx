"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils/format"
import { Search, ChevronLeft, ChevronRight, CreditCard, User, Calendar, DollarSign } from "lucide-react"

interface SubscriptionItem {
  id: string
  price_id: string
  amount: number | null
  interval: string | null
  quantity: number
}

interface Subscription {
  id: string
  customer_id: string
  customer_name: string
  customer_email: string | null
  status: string
  created: number
  current_period_start: number
  current_period_end: number
  currency: string
  items: SubscriptionItem[]
}

interface SubscriptionsResponse {
  subscriptions: Subscription[]
  has_more: boolean
  total_count: number
  page: number
  limit: number
}

export function SubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [startingAfterCursor, setStartingAfterCursor] = useState<string | undefined>(undefined)
  const [endingBeforeCursor, setEndingBeforeCursor] = useState<string | undefined>(undefined)

  const safeFormatDate = (timestamp: number | null | undefined): string => {
    if (!timestamp || timestamp <= 0) return 'N/A'
    try {
      const date = new Date(timestamp * 1000)
      if (isNaN(date.getTime())) return 'N/A'
      return formatDate(date.toISOString())
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'N/A'
    }
  }

  const fetchSubscriptions = async (
    page: number = 1,
    search: string = "",
    opts?: { starting_after?: string; ending_before?: string }
  ) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(opts?.starting_after ? { starting_after: opts.starting_after } : {}),
        ...(opts?.ending_before ? { ending_before: opts.ending_before } : {})
      })
      
      const response = await fetch(`/api/admin/subscriptions?${params}`)
      const data: SubscriptionsResponse = await response.json()
      
      setSubscriptions(data.subscriptions || [])
      setHasMore(data.has_more || false)
      setTotalCount(data.total_count || 0)
      setCurrentPage(page)
      // Reset cursors after each fetch; they are determined from the current page
      setStartingAfterCursor(undefined)
      setEndingBeforeCursor(undefined)
    } catch (error) {
      console.error("Error fetching subscriptions:", error)
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }

  // Only fetch data when component is actually visible/needed
  useEffect(() => {
    if (initialLoad) {
      fetchSubscriptions(1, searchTerm)
    }
  }, [initialLoad])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
    fetchSubscriptions(1, value)
  }

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (subscriptions.length === 0) return
    if (direction === 'next') {
      const lastId = subscriptions[subscriptions.length - 1]?.id
      if (!lastId) return
      setStartingAfterCursor(lastId)
      const targetPage = currentPage + 1
      fetchSubscriptions(targetPage, searchTerm, { starting_after: lastId })
    } else {
      const firstId = subscriptions[0]?.id
      if (!firstId) return
      setEndingBeforeCursor(firstId)
      const targetPage = Math.max(1, currentPage - 1)
      if (targetPage === 1) {
        // For the first page, fetch without cursor so has_more reflects forward availability
        fetchSubscriptions(1, searchTerm)
      } else {
        fetchSubscriptions(targetPage, searchTerm, { ending_before: firstId })
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800'
      case 'unpaid':
        return 'bg-orange-100 text-orange-800'
      case 'trialing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatAmount = (amount: number | null, currency: string) => {
    if (!amount) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  if (loading && initialLoad) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscriptions
          </CardTitle>
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
    )
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Subscriptions ({totalCount})
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{subscription.customer_name}</p>
                    <Badge className={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {subscription.customer_id}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Created {safeFormatDate(subscription.created)}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {subscription.items.length > 0 && formatAmount(subscription.items[0].amount, subscription.currency)}
                      {subscription.items.length > 0 && subscription.items[0].interval && `/${subscription.items[0].interval}`}
                    </div>
                  </div>
                  {subscription.customer_email && (
                    <p className="text-xs text-gray-400 mt-1">{subscription.customer_email}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {subscription.current_period_start && subscription.current_period_end 
                    ? `${safeFormatDate(subscription.current_period_start)} - ${safeFormatDate(subscription.current_period_end)}`
                    : 'N/A'
                  }
                </p>
                <p className="text-xs text-gray-500">Current Period</p>
              </div>
            </div>
          ))}
          
          {subscriptions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No subscriptions found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">Showing {subscriptions.length} subscriptions</div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {currentPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange('next')}
              disabled={!hasMore}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      {/* Global loading overlay for pagination/search */}
      {loading && !initialLoad && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white/90 px-4 py-2 shadow-md">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
            <span className="text-sm font-medium text-gray-800">Loading...</span>
          </div>
        </div>
      )}
    </Card>
  )
}
