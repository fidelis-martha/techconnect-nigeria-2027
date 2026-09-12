const tickets = [
  {
    name: "Regular",
    price: "₦5,000",
    description: "Perfect for anyone who wants to experience TechConnect.",
    features: [
      "Access to the main event",
      "All keynote sessions",
      "Networking opportunities",
    ],
  },
  {
    name: "VIP",
    price: "₦15,000",
    description: "For attendees who want a more premium experience.",
    features: [
      "Everything in Regular",
      "VIP seating",
      "Exclusive networking session",
      "VIP event pass",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₦30,000",
    description: "The ultimate TechConnect experience.",
    features: [
      "Everything in VIP",
      "Premium seating",
      "Meet & greet with speakers",
      "Exclusive event merchandise",
    ],
  },
];

function Tickets() {
  return (
    <section
      id="tickets"
      className="bg-slate-950 px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Tickets
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Choose your experience
          </h2>

          <p className="mt-5 text-lg text-gray-300">
            Pick the ticket that works best for you and join us in Lagos for
            TechConnect Nigeria 2027.
          </p>
        </div>

        {/* Ticket cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.name}
              className={`relative rounded-2xl border bg-slate-900 p-8 ${
                ticket.popular
                  ? "border-blue-600 shadow-xl shadow-blue-950/30"
                  : "border-white/10"
              }`}
            >
              {/* Popular badge */}
              {ticket.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-white">
                {ticket.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {ticket.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-white">
                  {ticket.price}
                </span>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {ticket.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <span className="mt-0.5 text-blue-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-8 w-full rounded-full px-6 py-3 font-semibold transition ${
                  ticket.popular
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                Get {ticket.name} Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tickets;