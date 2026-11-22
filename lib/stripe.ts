import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const PRODUCT = {
  name: "KudosWall Hexagonal Medal Display",
  description:
    "Modular 3D-printed hexagonal medal holder. 13cm × 11.2cm × 1.2cm. Compatible with any sport medal.",
  priceInCents: 1690,
  currency: "eur",
};

export { COLORS, PRICE_IN_CENTS } from "./constants";
export type { Color } from "./constants";
