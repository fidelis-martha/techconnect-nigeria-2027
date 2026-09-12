function Footer() {
  return (
    <footer className="bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            TechConnect Nigeria
          </h2>
          <p className="text-gray-400">
            Building the future together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <div className="flex flex-col gap-2 text-gray-400">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#speakers" className="hover:text-white">Speakers</a>
            <a href="#tickets" className="hover:text-white">Tickets</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Connect With Us</h3>

          <p className="text-gray-400 mb-2">
            hello@techconnectnigeria.com
          </p>

          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white">X</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        © 2027 TechConnect Nigeria. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;