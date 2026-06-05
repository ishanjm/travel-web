export default function Destinations() {
  const destinations = [
    {
      id: "dest-sigiriya",
      title: "Sigiriya Rock Fortress",
      category: "Heritage & History",
      price: "$120 / guide & entry",
      rating: "5.0",
      imageGrad: "from-amber-600/25 to-stone-900/90",
      description: "Climb the ancient Lion Rock citadel rising from the central forest canopy, featuring historic gardens and 5th-century frescoes.",
    },
    {
      id: "dest-ella",
      title: "Ella Tea Valleys",
      category: "Nature & Hiking",
      price: "$95 / villa night",
      rating: "4.9",
      imageGrad: "from-emerald-600/25 to-zinc-900/90",
      description: "Enjoy mist-covered mountain peaks, the iconic Nine Arch Bridge, hiking trails, and beautiful rolling tea plantations.",
    },
    {
      id: "dest-galle",
      title: "Galle Dutch Fort",
      category: "Coastal Culture",
      price: "$150 / private tour",
      rating: "4.8",
      imageGrad: "from-blue-600/25 to-slate-900/90",
      description: "Walk the 400-year-old ramparts, browse boutique shops, and relax in luxurious heritage villas on the southern coast.",
    },
  ];

  return (
    <section id="destinations" className="py-32 px-6 max-w-7xl mx-auto border-t border-slate-900/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">ISLAND HIGHLIGHTS</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Explore Core Destinations
          </h2>
        </div>
        <p className="max-w-md text-slate-400 text-sm font-light leading-relaxed">
          Explore the rich biodiversity, cultural landmarks, and serene coastal retreats of Sri Lanka with our premium transportation and guide packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="group relative h-[420px] rounded-3xl overflow-hidden border border-slate-900 bg-slate-900/40 hover:border-slate-800 transition-all duration-500 flex flex-col justify-end p-8"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${dest.imageGrad} z-0 transition-transform duration-[8000ms] group-hover:scale-110`} />
            <div className="absolute top-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              ★ {dest.rating}
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-[10px] font-bold text-emerald-400/90 uppercase tracking-widest">
                {dest.category}
              </span>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {dest.title}
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500">
                {dest.description}
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/60 mt-2">
                <span className="text-xs text-slate-400">Estimated cost</span>
                <span className="text-sm font-semibold text-emerald-400">{dest.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
