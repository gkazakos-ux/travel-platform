"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA ---
const REGIONS = ["All Regions", "Europe", "Asia", "Americas", "Africa"];

const PINS = [
  { id: "santorini", city: "Santorini",  country: "Greece",   region: "Europe",    days: 5,  img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80", rating: 4.8 },
  { id: "rome",      city: "Rome",        country: "Italy",    region: "Europe",   days: 5,  img: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=600&q=80", rating: 4.8 },
  { id: "lisbon",    city: "Lisbon",      country: "Portugal", region: "Europe",   days: 8,  img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=80", rating: 4.9 },
  { id: "marrakech", city: "Marrakech",   country: "Morocco",  region: "Africa",   days: 10, img: "https://images.unsplash.com/photo-1533020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80", rating: 4.7 },
  { id: "kyoto",     city: "Kyoto",       country: "Japan",    region: "Asia",     days: 7,  img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", rating: 5.0 },
  { id: "banff",     city: "Banff",       country: "Canada",   region: "Americas", days: 14, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80", rating: 4.9 },
  { id: "phi-phi",   city: "Phi Phi",     country: "Thailand", region: "Asia",     days: 9,  img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80", rating: 4.9 },
  { id: "kerala",    city: "Kerala",      country: "India",    region: "Asia",     days: 6,  img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80", rating: 4.6 },
];

const FilterDropdown = ({ label, options, activeValue, onChange }: { label: string, options: string[], activeValue: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = activeValue !== options[0];

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={options.length <= 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all border ${
          options.length <= 1 ? "opacity-50 cursor-not-allowed border-transparent text-[#0B2027]/40" :
          isActive || isOpen
            ? "bg-white text-[#0B2027] border-[#0B2027]/20 shadow-[0_4px_12px_rgba(11,32,39,0.08)]" 
            : "bg-transparent text-[#0B2027]/60 border-transparent hover:bg-white/50 hover:text-[#0B2027]"
        }`}
      >
        <span>{isActive ? activeValue : label}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && options.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 w-44 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_16px_40px_rgba(11,32,39,0.15)] rounded-2xl p-1.5 z-[9999]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-bold transition-colors flex items-center justify-between ${activeValue === opt ? "bg-[#FF6B35]/10 text-[#FF6B35]" : "text-[#0B2027] hover:bg-gray-100"}`}
              >
                {opt}
                {activeValue === opt && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroDropdown = ({ activeValue, onChange }: { activeValue: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = ["Popular", "Greece", "Italy", "Japan", "Canada", "Thailand"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0 z-[100]" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#F5F4F0] hover:bg-gray-200 px-5 py-3 rounded-full text-[14px] font-extrabold text-[#0B2027] transition-colors outline-none"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        {activeValue}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-3 h-3 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 w-48 bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_16px_40px_rgba(11,32,39,0.15)] rounded-2xl p-1.5"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-bold transition-colors flex items-center justify-between ${activeValue === opt ? "bg-[#FF6B35]/10 text-[#FF6B35]" : "text-[#0B2027] hover:bg-gray-100"}`}
              >
                {opt}
                {activeValue === opt && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeValue, setActiveValue] = useState("Most popular");
  const ref = useRef<HTMLDivElement>(null);
  const options = ["Most popular", "Top rated", "Shortest", "Longest"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0 z-[60]" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2.5 rounded-full text-[13px] font-bold bg-white border border-gray-200 text-[#0B2027] shadow-sm hover:border-gray-300 transition-colors"
      >
        {activeValue}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-44 bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_16px_40px_rgba(11,32,39,0.15)] rounded-2xl p-1.5"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { setActiveValue(opt); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-bold transition-colors flex items-center justify-between ${activeValue === opt ? "bg-[#FF6B35]/10 text-[#FF6B35]" : "text-[#0B2027] hover:bg-gray-100"}`}
              >
                {opt}
                {activeValue === opt && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Card = ({ item, onClick }: { item: typeof PINS[0]; onClick: () => void }) => {
  return (
    <motion.div
      layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative w-full h-[400px] rounded-[1.8rem] overflow-hidden cursor-pointer shadow-[0_8px_20px_rgba(11,32,39,0.06)] hover:shadow-[0_16px_40px_rgba(11,32,39,0.15)] hover:-translate-y-1.5 transition-all duration-300 border border-black/5"
    >
      <img src={item.img} alt={item.city} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <button onClick={e => { e.stopPropagation(); }} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/20 hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold border border-white/10">{item.days} days</span>
          <span className="text-white/90 text-[12px] font-bold flex items-center gap-1 drop-shadow-md"><span className="text-[#FF6B35]">★</span> {item.rating}</span>
        </div>
        <div>
          <h3 className="font-extrabold text-[24px] text-white Stadium leading-tight drop-shadow-md">{item.city}</h3>
          <p className="text-[13px] text-white/70 font-semibold drop-shadow-md flex items-center gap-1 mt-0.5">📍 {item.country}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ExplorePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchCountry, setSearchCountry] = useState("Popular");
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [activeCountry, setActiveCountry] = useState("All Countries");
  const [activeCity, setActiveCity] = useState("All Cities");
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const filtersBarRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isFiltersHovered, setIsFiltersHovered] = useState(false);

  const handleFiltersMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!filtersBarRef.current) return;
    const rect = filtersBarRef.current.getBoundingClientRect();
    setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => { setActiveCountry("All Countries"); setActiveCity("All Cities"); }, [activeRegion]);
  useEffect(() => { setActiveCity("All Cities"); }, [activeCountry]);

  const derivedCountries = ["All Countries", ...Array.from(new Set(PINS.filter(p => activeRegion === "All Regions" || p.region === activeRegion).map(p => p.country)))];
  const derivedCities = ["All Cities", ...Array.from(new Set(PINS.filter(p => {
    const matchRegion = activeRegion === "All Regions" || p.region === activeRegion;
    const matchCountry = activeCountry === "All Countries" || p.country === activeCountry;
    return matchRegion && matchCountry;
  }).map(p => p.city)))];

  const filtered = PINS.filter(p => {
    if (activeRegion !== "All Regions" && p.region !== activeRegion) return false;
    if (activeCountry !== "All Countries" && p.country !== activeCountry) return false;
    if (activeCity !== "All Cities" && p.city !== activeCity) return false;
    if (searchCountry !== "Popular" && p.country !== searchCountry) return false;
    if (query && !p.city.toLowerCase().includes(query.toLowerCase()) && !p.country.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const hasFilters = activeRegion !== "All Regions" || activeCountry !== "All Countries" || activeCity !== "All Cities" || searchCountry !== "Popular" || query !== "";

  return (
    <main className="w-full bg-[#F5F4F0] text-[#0B2027] font-sans flex flex-col min-h-screen">
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full overflow-hidden bg-[#F5F4F0] pt-28 pb-16">
        <div className="absolute top-10 left-[-10%] w-[80%] h-full pointer-events-none z-0 opacity-[0.06]" style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', backgroundSize: 'contain', filter: 'contrast(0)' }} />
        
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-14 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mt-12">
          
          <div className="w-full lg:w-[45%] flex flex-col">
            <h1 className="text-6xl md:text-[80px] font-extrabold text-[#0B2027] leading-[1.05] tracking-tight">
              Choose your <br /> next <span className="text-[#FF6B35] inline-block ml-2 text-[80px] md:text-[100px]" style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Pacifico', cursive", transform: "rotate(-5deg)", lineHeight: "0.6", textShadow: "2px 2px 0px rgba(255,107,53,0.1)" }}>trip</span>
            </h1>

            <div className="flex items-center bg-white rounded-full p-2 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-gray-100 mt-12 w-full relative z-[60]">
              <HeroDropdown activeValue={searchCountry} onChange={setSearchCountry} />
              <input className="flex-1 bg-transparent border-none outline-none px-4 text-[15px] font-semibold text-[#0B2027] placeholder-[#0B2027]/40 min-w-0" placeholder="Search specific city or country..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <button className="bg-[#0B2027] text-white px-8 py-3.5 rounded-full text-[14px] font-extrabold hover:bg-black transition-colors shadow-md flex-shrink-0">Search</button>
            </div>

            <h3 className="text-2xl font-extrabold text-[#0B2027] mt-12 mb-5 relative z-20">Offers</h3>
            
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[280px] w-full max-w-[500px] relative z-20">
              <div className="row-span-2 col-span-1 rounded-[1.5rem] relative overflow-hidden group shadow-sm cursor-pointer border border-white/50 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1533020140153-e479b8c22e70?auto=format&fit=crop&w=400&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md"><span className="text-[#FF6B35] text-[10px]">🔥</span></div>
                <div className="absolute bottom-4 left-4 text-white leading-tight">
                  <div className="font-extrabold text-[15px]">Egypt</div>
                  <div className="text-[10px] text-white/70 font-semibold mt-0.5">Family vacation</div>
                </div>
              </div>
              <div className="col-span-1 row-span-1 bg-[#FF6B35] rounded-[1.5rem] relative p-4 text-white flex flex-col justify-end group cursor-pointer overflow-hidden shadow-sm">
                <div className="absolute top-3 right-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10"/></svg></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <span className="font-extrabold text-[15px] relative z-10">Tours</span>
              </div>
              <div className="col-span-1 row-span-1 rounded-[1.5rem] relative overflow-hidden group shadow-sm cursor-pointer border border-white/50 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white leading-tight z-10">
                  <div className="font-extrabold text-[13px]">Turkey</div>
                  <div className="text-[9px] text-white/70 font-semibold mt-0.5">Holiday for two</div>
                </div>
              </div>
              <div className="col-span-1 row-span-1 rounded-[1.5rem] relative overflow-hidden group shadow-sm cursor-pointer border border-white/50 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white leading-tight z-10">
                  <div className="font-extrabold text-[13px]">Maldives</div>
                  <div className="text-[9px] text-white/70 font-semibold mt-0.5">Honeymoon</div>
                </div>
              </div>
              <div className="col-span-1 row-span-1 bg-[#111111] rounded-[1.5rem] relative p-4 text-white flex flex-col justify-between group cursor-pointer overflow-hidden shadow-sm">
                <span className="font-extrabold text-[15px] relative z-10 self-end">Flights</span>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform self-start"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M17 17H7V7"/></svg></div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[55%] h-[550px] md:h-[650px] rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_60px_rgba(11,32,39,0.15)] group z-20 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-[11px] font-bold border border-white/20 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Active</div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-2">4 days • 3 sites • Guided tour</div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight">Matterhorn</h2>
              <p className="text-xs md:text-sm text-white/70 mb-6 max-w-sm leading-relaxed font-medium">One of the most famous mountains in the Swiss Alps is the Matterhorn. Standing at 4,478 meters high.</p>
              <div className="flex items-center gap-3">
                <button className="bg-white text-[#0B2027] px-6 py-3 rounded-full font-extrabold text-[14px] hover:scale-105 active:scale-95 transition-transform shadow-lg">Book a place</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FILTERS BAR (Σωστά Sticky στα 84px) ── */}
      <div className="sticky top-[84px] z-50 w-full flex justify-center px-4 pointer-events-none mb-6 mt-4 transition-transform">
        <div ref={filtersBarRef} onMouseMove={handleFiltersMouseMove} onMouseEnter={() => setIsFiltersHovered(true)} onMouseLeave={() => { setIsFiltersHovered(false); setHoveredRegion(null); }} className="pointer-events-auto relative flex flex-wrap items-center justify-center p-2 rounded-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_16px_40px_-10px_rgba(11,32,39,0.15)] gap-2">
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-0">
            <div className={`absolute inset-0 transition-opacity duration-500 ${isFiltersHovered ? "opacity-100" : "opacity-0"}`} style={{ background: `radial-gradient(150px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.8), transparent 100%)` }} />
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 px-2 py-1 max-w-full">
            <div className="flex items-center gap-1">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setActiveRegion(r)} onMouseEnter={() => setHoveredRegion(r)} onMouseLeave={() => setHoveredRegion(null)} className={`relative px-4 py-2 rounded-full text-[13px] font-extrabold whitespace-nowrap transition-colors flex-shrink-0 ${activeRegion === r ? "text-[#FF6B35]" : "text-[#0B2027]/55 hover:text-[#0B2027]"}`}>
                  {activeRegion === r && <motion.div layoutId="filter-active-pill" className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  {hoveredRegion === r && activeRegion !== r && <motion.div layoutId="filter-hover-pill" className="absolute inset-0 rounded-full bg-white/40" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative z-10">{r}</span>
                </button>
              ))}
            </div>
            <div className="hidden md:block w-[1px] h-6 bg-[#0B2027]/10 flex-shrink-0 mx-2" />
            <div className="flex items-center gap-2">
              <FilterDropdown label="Country" options={derivedCountries} activeValue={activeCountry} onChange={setActiveCountry} />
              <FilterDropdown label="City" options={derivedCities} activeValue={activeCity} onChange={setActiveCity} />
              <AnimatePresence>
                {hasFilters && (
                  <motion.button initial={{ opacity: 0, scale: 0.85, width: 0 }} animate={{ opacity: 1, scale: 1, width: "auto" }} exit={{ opacity: 0, scale: 0.85, width: 0 }} onClick={() => { setActiveRegion("All Regions"); setActiveCountry("All Countries"); setActiveCity("All Cities"); setSearchCountry("Popular"); setQuery(""); }} className="flex items-center gap-1.5 px-3 py-2 ml-1 rounded-full text-[12px] font-bold text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 hover:bg-[#FF6B35]/20 transition-colors flex-shrink-0 overflow-hidden">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 flex-shrink-0"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>Clear
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── FULL WIDTH VERTICAL GRID ── */}
      <div className="w-full bg-white border-t border-gray-100 flex-1 relative z-20">
        <div className="max-w-[1500px] mx-auto w-full px-6 md:px-14 pb-24 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-extrabold text-[#0B2027] flex items-center">
              {activeRegion === "All Regions" ? "All itineraries" : activeRegion}
              <span className="ml-3 text-[14px] font-bold text-[#0B2027]/40 bg-[#0B2027]/5 px-3 py-1 rounded-full border border-gray-200">{filtered.length}</span>
            </h2>
            <SortDropdown />
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {filtered.map(item => (
                  // ΕΔΩ ΣΥΝΔΕΕΤΑΙ ΜΕ ΤΗ ΣΕΛΙΔΑ ΤΗΣ ΧΩΡΑΣ ΔΥΝΑΜΙΚΑ!
                  <Card key={item.id} item={item} onClick={() => router.push(`/explore/${item.country.toLowerCase()}`)} />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-[2rem] border border-gray-200/60 shadow-sm mt-4">
                <div className="text-5xl mb-4 grayscale opacity-60">🗺️</div>
                <h3 className="text-xl font-extrabold text-[#0B2027] mb-2">No routes found</h3>
                <p className="text-[#0B2027]/50 text-sm max-w-[250px]">We couldn't find any trips matching your exact filters.</p>
                <button onClick={() => { setActiveRegion("All Regions"); setActiveCountry("All Countries"); setActiveCity("All Cities"); setSearchCountry("Popular"); setQuery(""); }} className="mt-6 px-6 py-2.5 rounded-full bg-[#FF6B35] text-white font-bold text-sm hover:scale-105 transition-transform shadow-md shadow-[#FF6B35]/20">Clear all filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}