import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from "@/lib/supabase/admin"
import { sendPaymentNotificationEmail } from "@/lib/email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// const endpointSecret = "whsec_567df1c5518fec2aeb599299c96d33b3d7ac1935a15d7f8ffaf59b371dfdf386";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;
  let data: any;
  let eventType: string;

  if (signature && endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        endpointSecret,
        300 // Time difference tolerance in seconds
      );
      data = event.data;
      eventType = event.type;
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(err);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }
  } else {
    // Fallback if webhook secret is not configured
    const jsonBody = JSON.parse(body);
    data = jsonBody.data;
    eventType = jsonBody.type;
  }

  try {
    console.log("eventType", eventType);
    switch (eventType) {
      case 'payment_intent.succeeded':
        if (data.object.description && data.object.description.split(" ")[0] === "Upgrade") {
          const upgradeBilling = {
            invoice_id: "",
            customer_id: data.object.customer,
            paid_amount: Number(data.object.amount_received) / 100,
            start_date: data.object.created * 1000,
            description: data.object.description || "Additional Payment for Upgrade Subscription",
          };
          // await Billing.create(upgradeBilling);
        }
        console.log("💰 Payment captured!");
        break;

      case 'payment_intent.payment_failed':
        console.log("❌ Payment failed.");
        break;

      case 'invoice.paid':
        console.log("💰 Payment captured!");

        // Get user data from metadata
        console.log("Invoice data:", data.object)
        console.log("subscription_item_details",data.object.lines.data[0].parent.subscription_item_details)
        
        // Get metadata from subscription
        const metadata = data.object.parent.subscription_details.metadata;
        const customerEmail = data.object.customer_email;
        
        if (!metadata || !customerEmail) {
          console.error("Missing metadata or customer email");
          break;
        }

        // Check if user already exists (including soft-deleted users)
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("id, flag")
          .eq("email", customerEmail.toLowerCase())
          .single();

        if (existingUser) {
          console.log("User already exists, skipping account creation");
          
          // Update subscription info for existing user
          await supabase
            .from("user_subscriptions")
            .update({
              status: "active",
              stripe_subscription_id: data.object.parent.subscription_details.subscription,
              stripe_customer_id: data.object.customer,
              current_period_start: new Date(data.object.lines.data[0].period.start * 1000).toISOString(),
              current_period_end: new Date(data.object.lines.data[0].period.end * 1000).toISOString(),
            })
            .eq("user_id", existingUser.id);
          break;
        }
        console.log("create new user account")
        // Create new user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: customerEmail,
          password: metadata.password,
          options: {
            data: {
              first_name: metadata.firstName,
              last_name: metadata.lastName,
            },
          },
        });

        if (authError || !authData.user) {
          console.error("Failed to create auth user:", authError);
          break;
        }

        // Insert user profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            email: customerEmail.toLowerCase(),
            password: metadata.password,
            first_name: metadata.firstName,
            last_name: metadata.lastName,
            tradingview_username: metadata.tradingviewUsername,
            is_admin: false,
            flag: true, // Active user by default
          });

        if (profileError) {
          console.error("Failed to create profile:", profileError);
          break;
        }

        // Create subscription record
        const { error: subscriptionError } = await supabase
          .from("user_subscriptions")
          .insert({
            user_id: authData.user.id,
            status: "active",
            stripe_subscription_id: data.object.parent.subscription_details.subscription,
            stripe_customer_id: data.object.customer,
            current_period_start: new Date(data.object.lines.data[0].period.start * 1000).toISOString(),
            current_period_end: new Date(data.object.lines.data[0].period.end * 1000).toISOString(),

          });

        if (subscriptionError) {
          console.error("Failed to create subscription:", subscriptionError);
        } else {
          console.log("✅ Account created successfully for:", customerEmail);
          
          // Send welcome email to user
          // const emailResult = await sendWelcomeEmail(customerEmail, metadata.firstName);
          // if (emailResult.success) {
          //   console.log("✅ Welcome email sent successfully to:", customerEmail);
          // } else {
          //   console.error("❌ Failed to send welcome email:", emailResult.error);
          // }
          
          // Send payment notification to server email
          const paidAmount = metadata.billing_cycle === "annual" ? 948 : 99;
          const notificationResult = await sendPaymentNotificationEmail(
            metadata.tradingviewUsername,
            customerEmail, 
            metadata.firstName, 
            metadata.lastName, 
            paidAmount
          );
          if (notificationResult.success) {
            console.log("✅ Payment notification sent successfully to server email");
          } else {
            console.error("❌ Failed to send payment notification:", notificationResult.error);
          }

          // Insert notification into database
          const planLabel = metadata.billing_cycle === "annual" ? "Annual ($948/yr)" : "Monthly ($99/mo)";
          const { error: notificationError } = await supabase
            .from('notifications')
            .insert([
              {
                title: `New ${planLabel} Subscription`,
                content: `User ${metadata.firstName} ${metadata.lastName} (${customerEmail}) signed up for the ${planLabel} plan.`,
                viewed: false
              }
            ]);

          if (notificationError) {
            console.error("❌ Failed to insert payment notification:", notificationError);
          } else {
            console.log("✅ Payment notification inserted into database");
          }
        }

        break;

      case 'invoice.payment_failed':
        console.log(data.object)
        const failedCustomerId = data.object.customer;
        const failedSubscriptionId = data.object.subscription;
        const userEmail_2 = data.object.customer_email;
        if (!userEmail_2) {
          console.error("No email found in invoice data");
          break;
        }
        const { data: userData_2, error: userError_2 } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", userEmail_2.toLowerCase())
          .eq("flag", true)
          .single();

        if (userError_2 || !userData_2) {
          console.error("User not found for email:", userEmail_2, userError_2);
          break;
        }
        const userId_2 = userData_2.id;
        console.log("Found user ID:", userId_2);
        const { error: subscriptionError_2 } = await supabase
           .from("user_subscriptions")
           .update({
             status: data.object.status === 'open' ? "inactive" : "active",
            //  cancel_at_period_end: data.object.cancel_at_period_end,
             current_period_start: new Date(data.object.period_start * 1000).toISOString(),
             current_period_end: new Date(data.object.period_end * 1000).toISOString(),
           })
           .eq("stripe_subscription_id", failedSubscriptionId);
           if (subscriptionError_2) {
            console.error("Failed to update failed subscription:", subscriptionError_2);
          } else {
            console.log("✅ FailedSubscription updated successfully for user:", userId_2);
          }
          break;
        break;
      case 'customer.subscription.created':
        console.log("🔔 Subscription created!");
       
        break;

      case 'customer.subscription.updated':
        console.log("🔔 Subscription updated!");
        console.log(data.object.items.data[0]);
        const updatedSubscriptionId = data.object.id;
        const status = data.object.status;

        console.log(`Subscription ${updatedSubscriptionId} updated with status: ${status}`);

        const userEmail_1 = data.object.metadata.email;
        
        if (!userEmail_1) {
          console.error("No email found in subscription metadata");
          break;
        }

        const { data: userData_1, error: userError_1 } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", userEmail_1.toLowerCase())
          .eq("flag", true)
          .single();

        if (userError_1 || !userData_1) {
          console.error("User not found for email:", userEmail_1, userError_1);
          break;
        }

        const userId_1 = userData_1.id;
        console.log("Found user ID:", userId_1);

         // Update subscription record
         const { error: subscriptionError_1 } = await supabase
           .from("user_subscriptions")
           .update({
             status: status === 'active' ? "active" : "inactive",
             cancel_at_period_end: data.object.cancel_at_period_end,
             current_period_start: new Date(data.object.current_period_start * 1000).toISOString(),
             current_period_end: new Date(data.object.current_period_end * 1000).toISOString(),
           })
           .eq("stripe_subscription_id", updatedSubscriptionId);

        if (subscriptionError_1) {
          console.error("Failed to create subscription:", subscriptionError_1);
        } else {
          console.log("✅ Subscription created successfully for user:", userId_1);
        }
        break;

      default:
        console.log(`Unhandled event type ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 