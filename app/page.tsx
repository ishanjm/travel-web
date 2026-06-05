"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"accommodation" | "transport" | "guides">("accommodation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" id="brand-logo">
            <svg
              className="w-8 h-8 text-emerald-400 transition-transform duration-500 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
            </svg>
            <span className="text-xl font-bold tracking-widest bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              VOYAGE CEYLON
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#destinations" className="hover:text-emerald-400 transition-colors" id="nav-destinations">Destinations</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors" id="nav-services">Services</a>
            <a href="#concierge" className="hover:text-emerald-400 transition-colors" id="nav-concierge">Guides</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors" id="nav-about">About Us</a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#search"
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5"
              id="cta-book"
            >
              Plan Your Trip
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-900 bg-slate-950/95 backdrop-blur-lg px-6 py-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Destinations
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Services
            </a>
            <a
              href="#concierge"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Guides
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              About Us
            </a>
            <a
              href="#search"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Plan Your Trip
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-24 px-6 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/sri_lanka_hero.png"
              alt="Sigiriya fortress in Sri Lanka"
              fill
              priority
              className="object-cover object-center opacity-40 scale-105 animate-[pulse_10s_infinite_alternate] transition-transform duration-[10000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider uppercase animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SRI LANKA PREMIUM TRAVEL
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-white">
              Discover the Wonders of <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Pearl of the Indian Ocean
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              Plan your ultimate escape with our boutique accommodations, premium private drivers, and expert travel guides. Tailored itineraries built for your travel style.
            </p>

            {/* Search Widget */}
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
                  Accommodation
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
                  Private Transport
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
                  Travel Guides
                </button>
              </div>

              {/* Dynamic Input Fields */}
              {activeTab === "accommodation" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left">
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Destination</span>
                    <input
                      type="text"
                      placeholder="e.g., Ella, Galle, Sigiriya"
                      className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
                      id="search-dest-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Check In</span>
                    <input
                      type="date"
                      className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full [color-scheme:dark]"
                      id="check-in-date"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</span>
                    <select
                      className="bg-transparent text-sm text-slate-300 focus:outline-none w-full border-none"
                      id="accommodation-type"
                    >
                      <option className="bg-slate-950" value="villa">Boutique Villa</option>
                      <option className="bg-slate-950" value="hotel">Luxury Resort</option>
                      <option className="bg-slate-950" value="lodge">Eco Lodge</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="w-full h-full min-h-[52px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
                    id="search-stays-submit"
                  >
                    Find Stays
                  </button>
                </div>
              )}

              {activeTab === "transport" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left">
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">From</span>
                    <input
                      type="text"
                      placeholder="e.g., Colombo Airport (CMB)"
                      className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
                      id="transport-from"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">To</span>
                    <input
                      type="text"
                      placeholder="e.g., Kandy or Mirissa"
                      className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
                      id="transport-to"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vehicle Class</span>
                    <select
                      className="bg-transparent text-sm text-slate-300 focus:outline-none w-full border-none"
                      id="transport-class"
                    >
                      <option className="bg-slate-950" value="suv">Luxury SUV (Prado/Montero)</option>
                      <option className="bg-slate-950" value="van">Premium Chauffeur Van (KDH)</option>
                      <option className="bg-slate-950" value="sedan">Executive Sedan</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="w-full h-full min-h-[52px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
                    id="search-transport-submit"
                  >
                    Book Driver
                  </button>
                </div>
              )}

              {activeTab === "guides" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left">
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Experience / Area</span>
                    <input
                      type="text"
                      placeholder="e.g., Safaris, Historical Tours"
                      className="bg-transparent text-sm text-slate-100 placeholder-slate-550 focus:outline-none w-full"
                      id="guides-area"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tour Date</span>
                    <input
                      type="date"
                      className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full [color-scheme:dark]"
                      id="guides-date"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-slate-950/40 rounded-2xl border border-slate-850 hover:border-slate-700 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Language</span>
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
                    Find Guide
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Sri Lanka Destinations */}
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

        {/* Services Section */}
        <section id="services" className="bg-slate-900/20 border-y border-slate-900 py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Info */}
            <div className="flex flex-col gap-8">
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">OUR TRAVEL FACILITIES</span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Seamless Arrangements <br />
                Across Sri Lanka
              </h2>
              <p className="text-slate-400 text-base font-light leading-relaxed">
                Whether arriving at Colombo Airport or traveling deep into the hill country, we provide thoroughly vetted facilities to make your journey effortless.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">100%</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Licensed Tourist Drivers</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">45+</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Bespoke Villas & Resorts</span>
                </div>
              </div>
            </div>

            {/* Right Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Facility 1 */}
              <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Bespoke Stays</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Carefully selected boutique guest villas, high-end bungalows, and eco-retreats overlooking scenic vistas.
                </p>
              </div>

              {/* Facility 2 */}
              <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Chauffeur Transport</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Safe, air-conditioned SUVs and private vans with certified tourist drivers for airport pick-ups and inter-city travel.
                </p>
              </div>

              {/* Facility 3 */}
              <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Expert Local Guides</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Certified naturalists, historical guides, and tour leaders who speak your native language fluently.
                </p>
              </div>

              {/* Facility 4 */}
              <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-all duration-300">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Customized Itineraries</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  From Yala safaris to the Cultural Triangle, we schedule routes that optimize your time and ease of travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Guides Newsletter */}
        <section id="concierge" className="py-32 px-6 max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 items-center">
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">PLANNING CONCIERGE</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Connect with an Expert Sri Lankan Planner
              </h2>
              <p className="max-w-md text-slate-400 text-sm font-light leading-relaxed">
                Submit your email below, and our lead travel coordinator will reach out within 12 hours with accommodation suggestions and driver quotes.
              </p>

              {subscribed ? (
                <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-2xl animate-fade-in">
                  Ayubowan! Our travel planning coordinator will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 w-full max-w-md flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-grow px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-550 focus:outline-none focus:border-emerald-500/60 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/30 whitespace-nowrap"
                  >
                    Get Connected
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className="border-t border-slate-900 bg-slate-950 py-16 px-6 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
              </svg>
              <span className="text-base font-bold tracking-widest text-white">VOYAGE CEYLON</span>
            </a>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Providing bespoke, premium travel arrangements across Sri Lanka. Specialist agency for private transport, boutique villas, and licensed guides.
            </p>
          </div>

          {/* Dest col */}
          <div className="flex flex-col gap-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Top Destinations</h4>
            <a href="#destinations" className="hover:text-emerald-400 transition-colors">Sigiriya & Dambulla</a>
            <a href="#destinations" className="hover:text-emerald-400 transition-colors">Ella & Nuwara Eliya</a>
            <a href="#destinations" className="hover:text-emerald-400 transition-colors">Galle Fort & Hikkaduwa</a>
            <a href="#destinations" className="hover:text-emerald-400 transition-colors">Mirissa Beach (Whale Watching)</a>
          </div>

          {/* Quick links col */}
          <div className="flex flex-col gap-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Our Services</h4>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Private Chauffeur Fleet</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Boutique Villas & Hotels</a>
            <a href="#concierge" className="hover:text-emerald-400 transition-colors">Licensed Tourist Guides</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Airport VIP Transfers</a>
          </div>

          {/* Support col */}
          <div className="flex flex-col gap-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Contact Ceylon Office</h4>
            <span className="text-slate-500 font-light">Plan inquiry: reservations@voyageceylon.lk</span>
            <span className="text-slate-500 font-light">Hotline: +94 (11) 255-CEYLON</span>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Voyage Ceylon. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
