function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20 bg-slate-950">
      {/* Logo */}
      <div>
        <h2 className="text-xl font-bold text-gray-300">
          TechConnect<span className="text-blue-300">.</span>
        </h2>
      </div>

      {/* Navigation links */}
      <div className="hidden items-center gap-8 md:flex">
        <a
          href="#home"
          className="text-sm font-medium text-gray-300 transition hover:text-blue-600"
        >
          Home
        </a>

        <a
          href="#about"
          className="text-sm font-medium text-gray-300 transition hover:text-blue-600"
        >
          About
        </a>

        <a
          href="#speakers"
          className="text-sm font-medium text-gray-300 transition hover:text-blue-600"
        >
          Speakers
        </a>

        <a
          href="#tickets"
          className="text-sm font-medium text-gray-300 transition hover:text-blue-600"
        >
          Tickets
        </a>
      </div>

      {/* CTA */}
      <button className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
        Get Your Ticket
      </button>
    </nav>
  );
}

export default Navbar;