import OrderForm from "@/components/OrderForm";

export default function HomePage() {
  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-white">
            Kudos<span className="text-amber-400">Wall</span>
          </span>
          <a
            href="#order"
            className="px-5 py-2 bg-amber-400 text-gray-950 font-semibold rounded-full text-sm hover:bg-amber-300 transition"
          >
            Order now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase">
              3D Printed · Modular · Handmade
            </p>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Every medal
              <br />
              <span className="text-amber-400">deserves a wall.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Hexagonal display stands that let your achievements shine — not
              collect dust in a drawer. Modular, customizable, and compatible
              with any sport medal.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#order"
                className="px-8 py-4 bg-amber-400 text-gray-950 font-bold rounded-full hover:bg-amber-300 transition text-lg"
              >
                Order from €16.90
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 border border-gray-700 text-gray-300 font-semibold rounded-full hover:border-gray-500 transition text-lg"
              >
                See how it works
              </a>
            </div>
            <div className="flex items-center gap-6 pt-2 text-sm text-gray-500">
              <span>🚚 Free shipping in Europe</span>
              <span>🖨️ Made to order</span>
            </div>
          </div>

          {/* Product image — replace div with <Image> once you have photos */}
          <div className="relative aspect-square bg-gray-900 rounded-3xl overflow-hidden flex items-center justify-center">
            <div className="text-center text-gray-700 space-y-2">
              <div className="text-8xl">🏅</div>
              <p className="text-sm">Product photo coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-900" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for athletes who{" "}
            <span className="text-amber-400">keep pushing</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔷",
                title: "Universal fit",
                desc: "Top slot holds any medal ribbon — triathlon, running, swimming, cycling, martial arts and more.",
              },
              {
                icon: "🧩",
                title: "Modular design",
                desc: "Start with one. Add more as you earn them. Each piece connects to build a stunning wall composition.",
              },
              {
                icon: "🎨",
                title: "Your colors",
                desc: "Choose from Black, White, Blue, or Red — single color or a unique two-tone combination.",
              },
              {
                icon: "🔩",
                title: "Easy install",
                desc: "Includes dowel and screw for wall mounting. Or just place it on any surface — no tools needed.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-gray-800 rounded-2xl p-6 space-y-3"
              >
                <div className="text-4xl">{f.icon}</div>
                <h3 className="font-bold text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product details */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo gallery — replace placeholders with real images */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-900 rounded-2xl flex items-center justify-center text-gray-700"
              >
                <span className="text-4xl">📷</span>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Precision-printed.{" "}
              <span className="text-amber-400">Ready to display.</span>
            </h2>
            <p className="text-gray-400">
              Each KudosWall piece is 3D printed in PLA — a durable,
              lightweight material with a clean finish. Dimensions:{" "}
              <span className="text-white">13 cm × 11.2 cm × 1.2 cm</span>.
            </p>
            <ul className="space-y-3 text-gray-300">
              {[
                "No glue, screws, or tools to hold your medal — just slide the ribbon",
                "Mix and match colors to create a wall that's uniquely yours",
                "Lightweight and sturdy — PLA withstands daily use",
                "An original gift for any athlete at any level",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-amber-400 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Order section */}
      <section className="py-20 px-6 bg-gray-900" id="order">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              Customize your{" "}
              <span className="text-amber-400">KudosWall</span>
            </h2>
            <p className="text-gray-400 text-lg">
              How many medals are waiting to be displayed? Choose your quantity
              and colors — we&apos;ll print and ship your order in 5–10 business
              days anywhere in Europe.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>📦 Ships within 3–5 days of order</p>
              <p>🚚 Free shipping across Europe</p>
              <p>💳 Secure payment via Stripe</p>
              <p>🖨️ Made to order in PLA</p>
            </div>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Common questions</h2>
          {[
            {
              q: "Will it fit my medal?",
              a: "Yes. If your medal has a ribbon or tape, it fits. The slot at the top is designed to hold any standard ribbon width. Compatible with triathlon, running, swimming, cycling, football, martial arts, and more.",
            },
            {
              q: "Can I order different colors in one purchase?",
              a: "Currently you select one color scheme per order. For mixed batches, place separate orders or contact us at hello@kudoswall.com and we'll sort it out.",
            },
            {
              q: "How do I mount it on the wall?",
              a: "Each piece comes with a dowel and screw. Mark the spot, drill a small hole, insert the dowel, drive the screw, and hang. Or just stand it on any surface without any tools.",
            },
            {
              q: "Where do you ship?",
              a: "Across all 27 EU countries. Shipping is always free.",
            },
            {
              q: "What is PLA?",
              a: "PLA (Polylactic acid) is a plant-based plastic widely used in 3D printing. It's durable, lightweight, and has a clean professional finish. Your KudosWall is designed to last.",
            },
          ].map((item) => (
            <div key={item.q} className="border-b border-gray-800 pb-6">
              <h3 className="font-semibold text-white mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-800 text-center text-gray-600 text-sm">
        <p className="mb-2">
          Kudos<span className="text-amber-400">Wall</span> — Handmade in
          Spain, shipped across Europe.
        </p>
        <p>
          <a
            href="mailto:hello@kudoswall.com"
            className="hover:text-gray-400 transition"
          >
            hello@kudoswall.com
          </a>
        </p>
      </footer>
    </main>
  );
}
