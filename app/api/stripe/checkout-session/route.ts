import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil",
});

// Server-defined plans only. The client picks a plan name; every Stripe
// parameter (price, mode, trial) is constructed here. The request body is
// never passed through to Stripe.
const PLAN_PRICE_IDS: Record<"monthly" | "annual", string | undefined> = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN,
  annual: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PLAN,
};

const TRIAL_PERIOD_DAYS = 7;

function cleanString(value: unknown, maxLen = 200): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const planInput: unknown = body?.plan;
    if (planInput !== "monthly" && planInput !== "annual") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    const plan: "monthly" | "annual" = planInput;

    const priceId = PLAN_PRICE_IDS[plan];
    if (!priceId) {
      console.error(`Stripe price ID not configured for plan: ${plan}`);
      return NextResponse.json({ error: "Plan not configured" }, { status: 500 });
    }

    // Whitelisted fields only. Password (or anything else the client sends)
    // never reaches Stripe metadata.
    const email = cleanString(body.email, 254);
    const firstName = cleanString(body.firstName, 100);
    const lastName = cleanString(body.lastName, 100);
    const tradingviewUsername = cleanString(body.tradingviewUsername, 100);

    const metadata: Record<string, string> = {
      plan_type: "Basic_plan",
      billing_cycle: plan,
    };
    if (email) metadata.email = email;
    if (firstName) metadata.firstName = firstName;
    if (lastName) metadata.lastName = lastName;
    if (tradingviewUsername) metadata.tradingviewUsername = tradingviewUsername;

    const customer = await stripe.customers.create({
      email,
      name: [firstName, lastName].filter(Boolean).join(" ") || undefined,
      metadata,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${siteUrl}/confirm-email?email=${encodeURIComponent(email || "")}`,
      cancel_url: `${siteUrl}/signup`,
      metadata,
      subscription_data: {
        trial_period_days: TRIAL_PERIOD_DAYS,
        metadata,
      },
    });

    return NextResponse.json(
      { session: { id: session.id, url: session.url } },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Stripe checkout session error:", err?.message || err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 400 }
    );
  }
}
