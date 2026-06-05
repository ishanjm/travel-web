"use client";

import Image from "next/image";
import SearchWidget from "./SearchWidget";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-24 px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sri_lanka_hero.png"
          alt="Sigiriya fortress in Sri Lanka"
          fill
          priority
          className="object-cover object-center opacity-70 scale-105 animate-[pulse_10s_infinite_alternate] transition-transform duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider uppercase animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          {t.hero.tagline}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-white">
          {t.hero.headlinePart1} <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
            {t.hero.headlinePart2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Search Widget */}
        <SearchWidget />
      </div>
    </section>
  );
}
