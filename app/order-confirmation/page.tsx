import Link from "next/link";
import { stripe } from "@/lib/stripe";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Invalid confirmation link.</p>
          <Link href="/" className="text-amber-400 underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const name = session.collected_information?.shipping_details?.name ?? "there";
  const quantity = Number(session.metadata?.quantity ?? 1);
  const colorPrimary = session.metadata?.colorPrimary ?? "black";
  const colorSecondary = session.metadata?.colorSecondary || null;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="text-6xl">🏅</div>
        <h1 className="text-3xl font-bold text-amber-400">Order confirmed!</h1>
        <p className="text-gray-300 text-lg">
          Thank you, <strong>{name}</strong>! Your{" "}
          <strong>
            {quantity} KudosWall{quantity > 1 ? "s" : ""}
          </strong>{" "}
          in{" "}
          <strong>
            {colorSecondary ? `${colorPrimary} + ${colorSecondary}` : colorPrimary}
          </strong>{" "}
          {quantity > 1 ? "are" : "is"} on the way.
        </p>
        <div className="bg-gray-900 rounded-xl p-6 text-left space-y-2 text-sm text-gray-400">
          <p>
            A confirmation email has been sent to{" "}
            <span className="text-white">
              {session.customer_details?.email}
            </span>
          </p>
          <p>Estimated delivery: 5–10 business days within Europe.</p>
          <p>
            Questions? Reach us at{" "}
            <a
              href="mailto:hello@kudoswall.com"
              className="text-amber-400 underline"
            >
              hello@kudoswall.com
            </a>
          </p>
        </div>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-amber-400 text-gray-950 font-bold rounded-full hover:bg-amber-300 transition"
        >
          Back to KudosWall
        </Link>
      </div>
    </div>
  );
}
