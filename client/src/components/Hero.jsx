function Hero() {
  return (
    <section
      id="home"
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Lagos • Nigeria • 2027
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-gr md:text-6xl lg:text-7xl">
            Building the
            <span className="text-blue-600"> future </span>
            together.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
            TechConnect Nigeria brings together young builders, developers,
            founders, creators, and technology enthusiasts to learn, connect,
            and build the future of technology.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#tickets"
              className="rounded-full bg-blue-600 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Get Your Ticket
            </a>

            <a
              href="#about"
              className="rounded-full border border-gray-300 px-7 py-3.5 text-center font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;