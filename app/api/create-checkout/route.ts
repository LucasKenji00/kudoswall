import { NextRequest, NextResponse } from "next/server";
import { stripe, PRODUCT } from "@/lib/stripe";
import { COLORS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { quantity, colorPrimary, colorSecondary } = body;

  if (
    !quantity ||
    quantity < 1 ||
    quantity > 50 ||
    !COLORS.find((c) => c.value === colorPrimary)
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const colorDescription = colorSecondary
    ? `${colorPrimary} + ${colorSecondary}`
    : colorPrimary;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity,
        price_data: {
          currency: PRODUCT.currency,
          unit_amount: PRODUCT.priceInCents,
          product_data: {
            name: PRODUCT.name,
            description: `${PRODUCT.description} Color: ${colorDescription}`,
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: [
        "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
        "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
        "PL", "PT", "RO", "SK", "SI", "ES", "SE",
      ],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "eur" },
          display_name: "Standard shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ],
    metadata: {
      colorPrimary,
      colorSecondary: colorSecondary ?? "",
      quantity: String(quantity),
    },
    success_url: `${appUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/#order`,
  });

  return NextResponse.json({ url: session.url });
}
