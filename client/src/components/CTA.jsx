function CTA() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900 px-8 py-16 text-center md:px-16">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Be part of the future
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white md:text-5xl">
          Ready to connect, learn and build?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          Join developers, founders, creators and technology enthusiasts
          coming together to build the future of technology in Nigeria.
        </p>

        <a
          href="#tickets"
          className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
        >
          Get Your Ticket
        </a>

      </div>
    </section>
  );
}

export default CTA;