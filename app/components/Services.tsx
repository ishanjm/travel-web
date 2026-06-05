"use client";

import { useLanguage } from "./LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const servicesIcons = [
    // Stays icon
    (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    // Transport icon
    (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    // Guides icon
    (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    // Itinerary icon
    (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  ];

  return (
    <section id="services" className="bg-slate-900/20 border-y border-slate-900 py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Info */}
        <div className="flex flex-col gap-8">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            {t.services.tagline}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t.services.title}
          </h2>
          <p className="text-slate-400 text-base font-light leading-relaxed">
            {t.services.description}
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">100%</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.services.statDrivers}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">45+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.services.statVillas}
              </span>
            </div>
          </div>
        </div>

        {/* Right Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.services.items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                {servicesIcons[idx]}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
