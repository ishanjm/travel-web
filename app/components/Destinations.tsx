"use client";

import { useLanguage } from "./LanguageContext";

export default function Destinations() {
  const { t } = useLanguage();

  const destinationsMeta = [
    {
      id: "dest-sigiriya",
      imageGrad: "from-amber-600/25 to-stone-900/90",
    },
    {
      id: "dest-ella",
      imageGrad: "from-emerald-600/25 to-zinc-900/90",
    },
    {
      id: "dest-galle",
      imageGrad: "from-blue-600/25 to-slate-900/90",
    },
  ];

  return (
    <section id="destinations" className="py-32 px-6 max-w-7xl mx-auto border-t border-slate-900/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            {t.destinations.tagline}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t.destinations.title}
          </h2>
        </div>
        <p className="max-w-md text-slate-400 text-sm font-light leading-relaxed">
          {t.destinations.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinationsMeta.map((meta, idx) => {
          const dest = t.destinations.items[idx];
          if (!dest) return null;

          return (
            <div
              key={meta.id}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-slate-900 bg-slate-900/40 hover:border-slate-800 transition-all duration-500 flex flex-col justify-end p-8"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${meta.imageGrad} z-0 transition-transform duration-[8000ms] group-hover:scale-110`} />
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
                  <span className="text-xs text-slate-400">{t.destinations.costLabel}</span>
                  <span className="text-sm font-semibold text-emerald-400">{dest.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
