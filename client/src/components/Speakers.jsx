import Speaker1 from "../assets/img/speaker1.jpg";
import Speaker2 from "../assets/img/speaker2.jpg";
import Speaker3 from "../assets/img/speaker3.jpg";


const speakers = [
  {
    name: "Fidelis Martha",
    role: "Software Engineer",
    company: "Tech Innovator",
    image: Speaker1,
  },
  {
    name: "Egiriga Fidelis",
    role: "Founder & CEO",
    company: "Future Labs",
       image: Speaker2,
  },
  {
    name: "Okafor Martha",
    role: "Product Designer",
    company: "Creative Tech",
       image: Speaker3,
  },
];

function Speakers() {
  return (
    <section id="speakers" className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Meet the Speakers
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Learn from people
            <span className="text-blue-500"> building the future.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Hear from experienced builders, founders and creatives shaping the
            future of technology.
          </p>
        </div>

        {/* Speaker cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              {/* Placeholder for speaker image */}
              <img
                src={speaker.image}
                alt={speaker.name}
                className="h-56 w-full rounded-xl object-cover"
              />

              <div className="mt-6">
                <h3 className="text-xl font-bold text-white">{speaker.name}</h3>

                <p className="mt-2 text-blue-400">{speaker.role}</p>

                <p className="mt-1 text-sm text-gray-500">{speaker.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Speakers;
