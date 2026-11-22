import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const shippingDetails = session.collected_information?.shipping_details;
    const address = shippingDetails?.address;

    await supabaseAdmin.from("orders").insert({
      customer_name: shippingDetails?.name ?? "Unknown",
      customer_email: session.customer_details?.email ?? "Unknown",
      quantity: Number(session.metadata?.quantity ?? 1),
      color_primary: session.metadata?.colorPrimary ?? "black",
      color_secondary: session.metadata?.colorSecondary || null,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string | null,
      status: "paid",
      shipping_address: address
        ? [address.line1, address.city, address.postal_code, address.country]
            .filter(Boolean)
            .join(", ")
        : "Unknown",
      amount_total: session.amount_total ?? 0,
    });
  }

  return NextResponse.json({ received: true });
}
