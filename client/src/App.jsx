import Navbar from "./components/Navbar";
import EventInfo from "./components/Eventinfo";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Speakers from "./components/Speakers";
import Tickets from "./components/Tickets";
import About from "./components/About";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <Hero />
      <EventInfo />
      <About />
      <Speakers />
      <Tickets />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;