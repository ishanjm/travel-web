"use client";

import dynamic from "next/dynamic";
import LanguageProvider, { useLanguage } from "../components/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Concierge from "../components/Concierge";

const GuidesMap = dynamic(() => import("../components/GuidesMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[550px] w-full bg-slate-900/50 border border-slate-900 rounded-3xl flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
        <span className="text-sm text-slate-400 font-medium">Loading Interactive Map...</span>
      </div>
    </div>
  ),
});

function GuidesPageContent() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-10 pb-16 w-full flex flex-col items-stretch">
        {/* Page Title & Tagline */}
        <div className="flex flex-col items-center text-center mb-8 gap-3 max-w-7xl mx-auto px-6 w-full">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            {isEn ? "Expert Local Companions" : "精鋭の公認・専属ガイド"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            {isEn ? "Tour Guides & Interactive Map" : "公認専属ガイド & マップ"}
          </h1>
          <p className="max-w-2xl text-slate-450 text-sm sm:text-base font-light leading-relaxed">
            {isEn
              ? "Navigate the Pearl of the Indian Ocean with certified local experts. Click on locations on the map of Sri Lanka below to see localized guides and tailored experiences."
              : "スリランカ全土の主要エリアから厳選された、経験豊富な公認ガイドをご紹介。地図上の各エリアをクリックして、専属ガイドのプロフィールと専門分野をご覧ください。"}
          </p>
        </div>

        {/* Dynamic Leaflet Map Component */}
        <div className="mb-24 w-full">
          <GuidesMap />
        </div>

        {/* Concierge Section */}
        <div className="border-t border-slate-900/60 pt-10 max-w-7xl mx-auto px-6 w-full">
          <Concierge />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function GuidesPage() {
  return (
    <LanguageProvider>
      <GuidesPageContent />
    </LanguageProvider>
  );
}
