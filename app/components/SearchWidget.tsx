"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function SearchWidget() {
  const [activeTab, setActiveTab] = useState<"accommodation" | "transport" | "guides">("accommodation");
  const { t } = useLanguage();

  return (
    <div
      id="search"
      className="w-full max-w-4xl mt-8 p-1.5 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-emerald-950/20"
    >
      {/* Tabs */}
      <div className="flex gap-2 p-1.5 border-b border-slate-800/50">
        <button
          onClick={() => setActiveTab("accommodation")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
            activeTab === "accommodation"
              ? "bg-slate-800 text-emerald-400 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          id="tab-stays"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {t.search.accommodation}
        </button>
        <button
          onClick={() => setActiveTab("transport")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
            activeTab === "transport"
              ? "bg-slate-800 text-emerald-400 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          id="tab-transport"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {t.search.transport}
        </button>
        <button
          onClick={() => setActiveTab("guides")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
            activeTab === "guides"
              ? "bg-slate-800 text-emerald-400 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          id="tab-guides"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {t.search.guides}
        </button>
      </div>

      {/* Dynamic Input Fields */}
      {activeTab === "accommodation" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left animate-in fade-in duration-300">
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.destination}</span>
            <input
              type="text"
              placeholder={t.search.placeholders.destination}
              className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
              id="search-dest-input"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.checkIn}</span>
            <input
              type="date"
              className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full [color-scheme:dark]"
              id="check-in-date"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.type}</span>
            <select
              className="bg-transparent text-sm text-slate-300 focus:outline-none w-full border-none"
              id="accommodation-type"
            >
              <option className="bg-slate-950" value="villa">{t.search.types.villa}</option>
              <option className="bg-slate-950" value="hotel">{t.search.types.hotel}</option>
              <option className="bg-slate-950" value="lodge">{t.search.types.lodge}</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full h-full min-h-[52px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
            id="search-stays-submit"
          >
            {t.search.buttons.accommodation}
          </button>
        </div>
      )}

      {activeTab === "transport" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left animate-in fade-in duration-300">
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.from}</span>
            <input
              type="text"
              placeholder={t.search.placeholders.from}
              className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
              id="transport-from"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.to}</span>
            <input
              type="text"
              placeholder={t.search.placeholders.to}
              className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
              id="transport-to"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.vehicleClass}</span>
            <select
              className="bg-transparent text-sm text-slate-300 focus:outline-none w-full border-none"
              id="transport-class"
            >
              <option className="bg-slate-950" value="suv">{t.search.vehicles.suv}</option>
              <option className="bg-slate-950" value="van">{t.search.vehicles.van}</option>
              <option className="bg-slate-950" value="sedan">{t.search.vehicles.sedan}</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full h-full min-h-[52px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
            id="search-transport-submit"
          >
            {t.search.buttons.transport}
          </button>
        </div>
      )}

      {activeTab === "guides" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left animate-in fade-in duration-300">
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.experienceArea}</span>
            <input
              type="text"
              placeholder={t.search.placeholders.experience}
              className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
              id="guides-area"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.tourDate}</span>
            <input
              type="date"
              className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full [color-scheme:dark]"
              id="guides-date"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.search.labels.language}</span>
            <select
              className="bg-transparent text-sm text-slate-300 focus:outline-none w-full border-none"
              id="guides-lang"
            >
              <option className="bg-slate-950" value="en">English</option>
              <option className="bg-slate-950" value="de">Deutsch (German)</option>
              <option className="bg-slate-950" value="fr">Français (French)</option>
              <option className="bg-slate-950" value="zh">Mandarin</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full h-full min-h-[52px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
            id="search-guides-submit"
          >
            {t.search.buttons.guides}
          </button>
        </div>
      )}
    </div>
  );
}
