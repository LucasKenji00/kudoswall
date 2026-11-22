"use client";

import { useState } from "react";
import { COLORS, PRICE_IN_CENTS, type Color } from "@/lib/constants";

const COLOR_STYLES: Record<Color, string> = {
  black: "bg-gray-900 border-gray-600",
  white: "bg-white border-gray-300",
  blue: "bg-blue-600 border-blue-400",
  red: "bg-red-600 border-red-400",
};

const COLOR_LABELS: Record<Color, string> = {
  black: "Black",
  white: "White",
  blue: "Blue",
  red: "Red",
};

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [colorPrimary, setColorPrimary] = useState<Color>("black");
  const [colorSecondary, setColorSecondary] = useState<Color | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = (PRICE_IN_CENTS * quantity) / 100;

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity,
          colorPrimary,
          colorSecondary: colorSecondary || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-8 space-y-6 w-full max-w-md">
      {/* Quantity */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          How many medals do you display?
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full bg-gray-800 text-white text-xl hover:bg-gray-700 transition"
          >
            −
          </button>
          <span className="text-2xl font-bold text-white w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(50, quantity + 1))}
            className="w-10 h-10 rounded-full bg-gray-800 text-white text-xl hover:bg-gray-700 transition"
          >
            +
          </button>
          <span className="text-gray-400 text-sm ml-2">pieces</span>
        </div>
      </div>

      {/* Primary color */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Primary color
        </label>
        <div className="flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setColorPrimary(c.value)}
              title={c.label}
              className={`w-10 h-10 rounded-full border-2 transition ${COLOR_STYLES[c.value]} ${
                colorPrimary === c.value
                  ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-gray-900"
                  : ""
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">{COLOR_LABELS[colorPrimary]}</p>
      </div>

      {/* Secondary color (optional) */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Second color{" "}
          <span className="text-gray-600">(optional — for two-tone look)</span>
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setColorSecondary("")}
            title="None"
            className={`w-10 h-10 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center transition ${
              colorSecondary === ""
                ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-gray-900"
                : ""
            }`}
          >
            <span className="text-gray-400 text-xs">✕</span>
          </button>
          {COLORS.filter((c) => c.value !== colorPrimary).map((c) => (
            <button
              key={c.value}
              onClick={() => setColorSecondary(c.value)}
              title={c.label}
              className={`w-10 h-10 rounded-full border-2 transition ${COLOR_STYLES[c.value]} ${
                colorSecondary === c.value
                  ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-gray-900"
                  : ""
              }`}
            />
          ))}
        </div>
        {colorSecondary && (
          <p className="text-xs text-gray-500 mt-1">
            {COLOR_LABELS[colorPrimary]} + {COLOR_LABELS[colorSecondary as Color]}
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-gray-800 pt-4">
        <span className="text-gray-400 text-sm">
          {quantity} × €16.90 + free shipping
        </span>
        <span className="text-2xl font-bold text-amber-400">
          €{total.toFixed(2)}
        </span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-4 bg-amber-400 text-gray-950 font-bold text-lg rounded-full hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting to checkout…" : "Order now →"}
      </button>

      <p className="text-center text-xs text-gray-600">
        Secure payment via Stripe · Ships across Europe
      </p>
    </div>
  );
}
