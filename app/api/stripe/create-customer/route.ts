import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const customerData = await req.json();
    const customer = await stripe.customers.create(customerData);
    return NextResponse.json({ customer }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}