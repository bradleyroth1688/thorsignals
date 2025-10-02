import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Checkout session params:", body);
    
    const session = await stripe.checkout.sessions.create(body);
    console.log("Session created successfully:", session.id);
    
    return NextResponse.json({ session }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json({ 
      error: err.message,
      details: err.detail || "Failed to create checkout session"
    }, { status: 400 });
  }
} 