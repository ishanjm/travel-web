"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function Concierge() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="concierge" className="py-32 px-6 max-w-4xl mx-auto text-center">
      <div className="p-12 rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 items-center">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            {t.concierge.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t.concierge.title}
          </h2>
          <p className="max-w-md text-slate-400 text-sm font-light leading-relaxed">
            {t.concierge.description}
          </p>

          {subscribed ? (
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-2xl animate-fade-in">
              {t.concierge.success}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 w-full max-w-md flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.concierge.placeholder}
                className="flex-grow px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-550 focus:outline-none focus:border-emerald-500/60 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/30 whitespace-nowrap"
              >
                {t.concierge.button}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
