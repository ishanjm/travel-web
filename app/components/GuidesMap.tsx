"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "./LanguageContext";
import {
  Guide,
  Destination,
  Category,
  categoriesData,
  destinationsData,
} from "../data/guidesData";

// Fix Leaflet marker icons in Next.js/React environment
const getCategoryEmoji = (category: string) => {
  switch (category) {
    case "beach": return "🏖️";
    case "mountain": return "⛰️";
    case "wildlife": return "🐘";
    case "heritage": return "🏛️";
    case "pilgrimage": return "🙏";
    case "adventure": return "🥾";
    case "waterfalls": return "🌿";
    case "tea": return "🍃";
    case "urban": return "🌆";
    case "marine": return "🐋";
    case "eco": return "🌳";
    case "surfing": return "🏄";
    default: return "📍";
  }
};

const createCustomIcon = (category: string, isSelected: boolean) => {
  const emoji = getCategoryEmoji(category);
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-10 w-10 animate-ping rounded-full ${
          isSelected ? "bg-emerald-400/40" : "bg-emerald-500/20"
        } opacity-75"></span>
        <div class="relative flex items-center justify-center rounded-full h-8 w-8 bg-slate-950 border-2 ${
          isSelected ? "border-emerald-400 shadow-lg scale-110" : "border-slate-800 hover:scale-105"
        } text-sm transition-transform duration-300">
          ${emoji}
        </div>
      </div>
    `,
    className: "custom-marker-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Component to dynamically pan and zoom the map
function MapUpdater({ coords, zoom }: { coords: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, zoom, {
      animate: true,
      duration: 1.2,
    });
  }, [coords, zoom, map]);
  return null;
}

export default function GuidesMap() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination>(destinationsData[0]); // Default to first destination
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-[550px] w-full bg-slate-900/50 border border-slate-900 rounded-3xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <span className="text-sm text-slate-400 font-medium">Loading Interactive Map...</span>
        </div>
      </div>
    );
  }

  const isEn = language === "en";

  // Filter destinations based on selected category & search query
  const filteredDestinations = destinationsData.filter((dest) => {
    const matchesCategory = selectedCategory === "all" || dest.categories.includes(selectedCategory);
    const name = isEn ? dest.name.en : dest.name.ja;
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategory = categoriesData.find((cat) => cat.id === selectedCategory) || categoriesData[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setIsCategoryDropdownOpen(false);
    setSearchQuery("");

    // Automatically switch to the first destination available under the new category
    const categoryFiltered = destinationsData.filter((d) => catId === "all" || d.categories.includes(catId));
    if (categoryFiltered.length > 0) {
      const isCurrentStillValid = categoryFiltered.some((d) => d.id === selectedDest.id);
      if (!isCurrentStillValid) {
        setSelectedDest(categoryFiltered[0]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Top Section: Single Row for Dropdowns (left), Guides (middle), and Description (right) */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: Categories & Locations Dropdowns */}
        <div className="lg:col-span-3 bg-slate-900/40 backdrop-blur-md border border-slate-900 p-6 rounded-3xl flex flex-col gap-5 relative z-[1010]">
          
          {/* Dropdown 1: Select Category */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              {isEn ? "Select Category" : "カテゴリを選択"}
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-slate-700 transition-all duration-300 focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <span>{activeCategory.icon}</span>
                  <span>{isEn ? activeCategory.name.en : activeCategory.name.ja}</span>
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 p-2 bg-slate-950 border border-slate-855 rounded-2xl shadow-2xl z-[1020] max-h-60 overflow-y-auto flex flex-col gap-1 custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                  {categoriesData.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2.5 transition-all duration-200 ${
                          isSelected
                            ? "bg-emerald-500 text-slate-950 font-bold"
                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{isEn ? cat.name.en : cat.name.ja}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Dropdown 2: Select Location */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              {isEn ? "Select Location" : "エリアを選択"}
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-955 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-slate-700 transition-all duration-300 focus:outline-none"
              >
                <span>{isEn ? selectedDest.name.en : selectedDest.name.ja}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 p-2 bg-slate-955 border border-slate-850 rounded-2xl shadow-2xl z-[1010] flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Search Input */}
                  <div className="relative p-1">
                    <span className="absolute inset-y-0 left-3 flex items-center pl-1 pointer-events-none">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isEn ? "Search location..." : "エリアを検索..."}
                      className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                    />
                  </div>

                  {/* Option List */}
                  <div className="flex flex-col gap-1 max-h-48 overflow-y-auto custom-scrollbar">
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((dest) => {
                        const isSelected = selectedDest.id === dest.id;
                        return (
                          <button
                            key={dest.id}
                            onClick={() => {
                              setSelectedDest(dest);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                              isSelected
                                ? "bg-emerald-500 text-slate-950 font-bold"
                                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                            }`}
                          >
                            {isEn ? dest.name.en : dest.name.ja}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3.5 py-2.5 text-xs text-slate-500 italic">
                        {isEn ? "No results found" : "結果が見つかりません"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Available Certified Guides */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            {isEn ? "Available Certified Guides" : "公認の専属ガイド一覧"}
          </h4>

          <div className="flex flex-col gap-4">
            {selectedDest.guides && selectedDest.guides.map((guide) => (
              <div
                key={guide.name}
                className="bg-slate-900/40 border border-slate-900 hover:border-slate-850 transition-all duration-300 p-5 rounded-3xl flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-3">
                  {/* Header Row: Avatar & Name/Rating on Left, Inquire Button on Right */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Avatar & Name/Role */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 tracking-wider shrink-0">
                        {guide.avatar}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <h5 className="font-bold text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                            {guide.name}
                          </h5>
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                            ★ {guide.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {isEn ? guide.role.en : guide.role.ja}
                        </p>
                      </div>
                    </div>

                    {/* Right: Inquire Button */}
                    <a
                      href="#concierge"
                      className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-955 border border-emerald-500/20 hover:border-transparent transition-all duration-300 shrink-0"
                    >
                      {isEn ? "Inquire" : "問合せ"}
                    </a>
                  </div>

                  {/* Middle Row: Specialty badge & Language chips */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-800 text-[10px] font-semibold text-slate-400">
                      {isEn ? "Specialty: " : "専門: "}{isEn ? guide.specialty.en : guide.specialty.ja}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio Paragraph */}
                  <p className="text-slate-350 text-xs font-light leading-relaxed">
                    {isEn ? guide.bio.en : guide.bio.ja}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Selected Area Description */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            {isEn ? "Description" : "説明"}
          </h4>
          <div className="bg-slate-900/20 border border-slate-900/80 p-6 rounded-3xl flex flex-col gap-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              {isEn ? selectedDest.name.en : selectedDest.name.ja}
            </h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {isEn ? selectedDest.description.en : selectedDest.description.ja}
            </p>
          </div>
        </div>
      </div>

      {/* Full Width Interactive Map Container */}
      <div className="h-[550px] w-full border-y border-slate-900/50 shadow-2xl overflow-hidden mt-6">
        <MapContainer
          center={selectedDest.coords}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", background: "#020617" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {filteredDestinations.map((dest) => {
            const isSelected = selectedDest.id === dest.id;
            const primaryCat = dest.categories && dest.categories.length > 0 ? dest.categories[0] : "all";
            return (
              <Marker
                key={dest.id}
                position={dest.coords}
                icon={createCustomIcon(primaryCat, isSelected)}
                eventHandlers={{
                  click: () => {
                    setSelectedDest(dest);
                  },
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-2 text-slate-950 font-sans">
                    <h4 className="font-bold text-sm">{isEn ? dest.name.en : dest.name.ja}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {isEn ? `Certified Guides: ${dest.guides.length}` : `登録公認ガイド: ${dest.guides.length}名`}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          <MapUpdater coords={selectedDest.coords} zoom={selectedDest.zoom} />
        </MapContainer>
      </div>
    </div>
  );
}
