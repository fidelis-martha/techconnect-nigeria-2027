function About() {
  return (
    <section id="about" className="px-6 py-4 md:px-12 lg:px-20 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        
        {/* Heading */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            About TechConnect
          </p>

          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Where ideas meet
            <span className="text-blue-500"> opportunity.</span>
          </h2>
        </div>

        {/* Description */}
        <div>
          <p className="text-lg leading-8 text-gray-300">
            TechConnect Nigeria is a gathering for young people passionate
            about technology, innovation and building meaningful solutions.
            It is a space to learn from experienced professionals, connect
            with like-minded people and discover new opportunities.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Whether you're a developer, designer, founder, student, creator,
            or simply curious about technology, TechConnect is a place to
            learn, build and grow together.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;