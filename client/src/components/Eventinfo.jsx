function EventInfo() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        
        {/* Location */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="mb-3 text-sm font-medium text-blue-400">LOCATION</p>
          <h3 className="text-2xl font-bold text-white">Lagos, Nigeria</h3>
          <p className="mt-2 text-gray-400">
            The heart of Nigeria's tech ecosystem.
          </p>
        </div>

        {/* Date */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="mb-3 text-sm font-medium text-blue-400">DATE</p>
          <h3 className="text-2xl font-bold text-white">2027</h3>
          <p className="mt-2 text-gray-400">
            Date to be announced.
          </p>
        </div>

        {/* Event */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="mb-3 text-sm font-medium text-blue-400">EVENT</p>
          <h3 className="text-2xl font-bold text-white">Tech Conference</h3>
          <p className="mt-2 text-gray-400">
            Learn, connect, build and grow.
          </p>
        </div>

      </div>
    </section>
  );
}

export default EventInfo;