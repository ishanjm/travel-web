"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
  );
}
