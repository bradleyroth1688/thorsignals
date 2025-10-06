import { NextResponse } from "next/server"
import Stripe from "stripe"
import { checkAdminAccess } from "@/lib/auth/admin"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function GET(request: Request) {
  try {
    const { isAdmin, error } = await checkAdminAccess()

    if (!isAdmin) {
      return NextResponse.json({ error: error || "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const startingAfter = searchParams.get('starting_after') || undefined
    const endingBefore = searchParams.get('ending_before') || undefined

    // Calculate offset for pagination
    const offset = (page - 1) * limit

    // Build Stripe query parameters
    const stripeParams: Stripe.SubscriptionListParams = {
      limit: limit,
    }

    // Add pagination parameters
    if (startingAfter) {
      stripeParams.starting_after = startingAfter
    }
    if (endingBefore) {
      stripeParams.ending_before = endingBefore
    }

    // Fetch subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list(stripeParams)

    // If search term is provided, filter subscriptions
    let filteredSubscriptions = subscriptions.data
    if (search) {
      filteredSubscriptions = subscriptions.data.filter(subscription => {
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id
        const status = subscription.status
        const createdDate = new Date(subscription.created * 1000).toLocaleDateString()
        
        // Search in customer ID, status, and created date
        return (
          customerId.toLowerCase().includes(search.toLowerCase()) ||
          status.toLowerCase().includes(search.toLowerCase()) ||
          createdDate.includes(search)
        )
      })
    }

    // Get customer details for each subscription
    const enrichedSubscriptions = await Promise.all(
      filteredSubscriptions.map(async (subscription) => {
        try {
          // Get customer details
          const customer = await stripe.customers.retrieve(subscription.customer as string)
          
          // Get subscription items for pricing details and period dates
          const subscriptionItems = await stripe.subscriptionItems.list({
            subscription: subscription.id,
            expand: ['data.price']
          })
          console.log("subscriptionItems",subscriptionItems.data[0])
          return {
            id: subscription.id,
            customer_id: subscription.customer,
            customer_name: customer.deleted ? 'Deleted Customer' : (customer.name || customer.email || 'Unknown'),
            customer_email: customer.deleted ? null : customer.email,
            status: subscription.status,
            created: subscription.created || 0,
            current_period_start: subscriptionItems.data[0]?.current_period_start || 0,
            current_period_end: subscriptionItems.data[0]?.current_period_end || 0,
            currency: subscription.currency || 'usd',
            items: subscriptionItems.data.map(item => ({
              id: item.id,
              price_id: item.price.id,
              amount: item.price.unit_amount,
              interval: item.price.recurring?.interval,
              quantity: item.quantity
            }))
          }
        } catch (error) {
          console.error(`Error fetching customer details for subscription ${subscription.id}:`, error)
          return {
            id: subscription.id,
            customer_id: subscription.customer,
            customer_name: 'Unknown Customer',
            customer_email: null,
            status: subscription.status,
            created: subscription.created || 0,
            current_period_start: 0,
            current_period_end: 0,
            currency: subscription.currency || 'usd',
            items: []
          }
        }
      })
    )

    return NextResponse.json({
      subscriptions: enrichedSubscriptions,
      has_more: subscriptions.has_more,
      total_count: subscriptions.data.length,
      page: page,
      limit: limit
    })

  } catch (error) {
    console.error("Admin subscriptions fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
