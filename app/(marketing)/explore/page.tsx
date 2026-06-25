"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then(m => m.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then(m => m.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then(m => m.Popup),        { ssr: false });

// --- NAVBAR ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const navLinks = [
    { id: "explore", label: "Explore", href: "/explore" },
    { id: "how-it-works", label: "How it works", href: "#" },
    { id: "login", label: "Log in", href: "/login" },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${isScrolled ? "top-4 px-4" : "top-0 px-[clamp(20px,5vw,52px)]"}`}>
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setHoveredItem(null); }}
        className={`relative flex items-center justify-between w-full transition-all duration-500 overflow-hidden ${
          isScrolled
            ? "max-w-4xl bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] text-[#0B2027] rounded-full px-6 py-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/20 mt-4"
            : "max-w-7xl bg-transparent text-[#0B2027] py-[18px]"
        }`}
      >
        {isScrolled && (
          <div
            className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
            style={{ background: `radial-gradient(120px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.6), transparent 100%)` }}
          />
        )}
        <div className="relative z-10 flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block" />
          wayfare
        </div>
        <div className="relative z-10 hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            {navLinks.map(item => (
              <Link key={item.id} href={item.href} onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-4 py-2 transition-colors rounded-full ${isScrolled ? "text-[#0B2027]" : "text-[#0B2027] hover:text-[#FF6B35]"}`}>
                {hoveredItem === item.id && (
                  <motion.div layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${isScrolled ? "bg-white/60 border border-white/50" : "bg-white/40 backdrop-blur-md border border-white/30"}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
          <Link href="/signup" className={`ml-2 px-5 py-2.5 rounded-full transition-transform hover:scale-105 relative z-10 ${isScrolled ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20" : "bg-[#FF6B35] text-white shadow-[0_8px_20px_rgba(255,107,53,0.25)]"}`}>
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- DATA ---
const REGIONS   = ["All", "Europe", "Asia", "Americas", "Africa"];
const VIBES     = ["Any vibe", "Beach", "City", "Mountains", "Hidden Gems", "Adventure"];
const DURATIONS = ["Any length", "Weekend", "3–5 days", "1 week", "2+ weeks"];

const PINS = [
  { id: "santorini", name: "Santorini",  country: "Greece",   lat: 36.39,  lng: 25.46,   region: "Europe",   vibe: "Beach",       days: 5,  img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", author: "Elena P.",  copies: 228, rating: 4.8, accent: "#4FB0A5" },
  { id: "rome",      name: "Rome",        country: "Italy",    lat: 41.90,  lng: 12.50,   region: "Europe",   vibe: "City",        days: 5,  img: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", author: "Sofia R.",  copies: 410, rating: 4.8, accent: "#FF6B35" },
  { id: "lisbon",    name: "Lisbon",      country: "Portugal", lat: 38.72,  lng: -9.14,   region: "Europe",   vibe: "City",        days: 8,  img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", author: "Maria S.",  copies: 312, rating: 4.9, accent: "#FF6B35" },
  { id: "marrakech", name: "Marrakech",   country: "Morocco",  lat: 31.63,  lng: -7.99,   region: "Africa",   vibe: "Adventure",   days: 10, img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", author: "Amira K.",  copies: 189, rating: 4.7, accent: "#FF6B35" },
  { id: "kyoto",     name: "Kyoto",       country: "Japan",    lat: 35.01,  lng: 135.77,  region: "Asia",     vibe: "Hidden Gems", days: 7,  img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", author: "Kenji M.",  copies: 540, rating: 5.0, accent: "#4FB0A5" },
  { id: "banff",     name: "Banff",       country: "Canada",   lat: 51.18,  lng: -115.57, region: "Americas", vibe: "Mountains",   days: 14, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", author: "Jake T.",   copies: 97,  rating: 4.9, accent: "#4FB0A5" },
  { id: "phi-phi",   name: "Phi Phi",     country: "Thailand", lat: 7.74,   lng: 98.78,   region: "Asia",     vibe: "Beach",       days: 9,  img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80", author: "Lily C.",   copies: 276, rating: 4.9, accent: "#4FB0A5" },
  { id: "kerala",    name: "Kerala",      country: "India",    lat: 9.94,   lng: 76.27,   region: "Asia",     vibe: "Hidden Gems", days: 6,  img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80", author: "Ravi N.",   copies: 143, rating: 4.6, accent: "#7BAE7F" },
  { id: "porto",     name: "Porto",       country: "Portugal", lat: 41.15,  lng: -8.61,   region: "Europe",   vibe: "City",        days: 4,  img: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=600&q=80", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=100&q=80", author: "Ana F.",    copies: 88,  rating: 4.7, accent: "#7BAE7F" },
];

function createLeafletIcon(active: boolean) {
  if (typeof window === "undefined") return undefined;
  const L = require("leaflet");
  return L.divIcon({
    className: "",
    html: `<div style="width:${active ? 44 : 34}px;height:${active ? 44 : 34}px;background:${active ? "#FF6B35" : "#0B2027"};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 14px rgba(0,0,0,0.25);transition:all .2s;"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(45deg);font-size:${active ? 16 : 12}px;">✈</div></div>`,
    iconSize:    [active ? 44 : 34, active ? 44 : 34],
    iconAnchor:  [active ? 22 : 17, active ? 44 : 34],
    popupAnchor: [0, -34],
  });
}

function FlyToPin({ pin }: { pin: typeof PINS[0] | null }) {
  const map = typeof window !== "undefined"
    ? (() => { try { return require("react-leaflet").useMap(); } catch { return null; } })()
    : null;
  useEffect(() => {
    if (map && pin) map.flyTo([pin.lat, pin.lng], 7, { duration: 1.2 });
  }, [pin, map]);
  return null;
}

// --- CARD ---
const Card = ({ item, active, onClick }: { item: typeof PINS[0]; active: boolean; onClick: () => void }) => {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`group relative bg-white rounded-[1.4rem] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col border-2 ${active ? "border-[#FF6B35] shadow-[0_8px_32px_rgba(255,107,53,0.18)]" : "border-transparent shadow-[0_2px_16px_rgba(11,32,39,0.07)] hover:shadow-[0_8px_30px_rgba(11,32,39,0.12)] hover:-translate-y-0.5"}`}
    >
      <div className="relative h-[160px] overflow-hidden flex-shrink-0">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-md bg-black/30 border border-white/20">{item.vibe}</div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-black/30 border border-white/20 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" fill={saved ? "white" : "none"} stroke="white" strokeWidth="2" className="w-4 h-4"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/40 backdrop-blur-sm">{item.days} days</div>
        {active && <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-[#FF6B35]">📍 On map</div>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-2.5 mb-3">
          <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-white" />
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-[14px] text-[#0B2027] leading-tight">{item.name} <span className="font-semibold text-[#0B2027]/40">· {item.country}</span></h3>
            <p className="text-[11px] text-[#0B2027]/50 font-semibold mt-0.5">{item.author}</p>
          </div>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <span className="text-[#FF6B35] text-[11px]">★</span>
            <span className="text-[12px] font-bold text-[#0B2027]">{item.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-[11px] text-[#0B2027]/40 font-semibold">{item.copies} copies</span>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all hover:scale-105"
            style={{ backgroundColor: `${item.accent}18`, color: item.accent }}>
            Copy trip
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN ---
export default function ExplorePage() {
  const router = useRouter();
  const [query, setQuery]               = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeVibe, setActiveVibe]     = useState("Any vibe");
  const [activeDur, setActiveDur]       = useState("Any length");
  const [activePin, setActivePin]       = useState<typeof PINS[0] | null>(null);
  const [mapLoaded, setMapLoaded]       = useState(false);

  // Filters bar hover state (για το Motion pill)
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [glarePos, setGlarePos]           = useState({ x: 0, y: 0 });
  const [isFiltersHovered, setIsFiltersHovered] = useState(false);
  const filtersBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    setTimeout(() => setMapLoaded(true), 100);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleFiltersMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!filtersBarRef.current) return;
    const rect = filtersBarRef.current.getBoundingClientRect();
    setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const filtered = PINS.filter(p => {
    if (activeRegion !== "All" && p.region !== activeRegion) return false;
    if (activeVibe   !== "Any vibe"   && p.vibe !== activeVibe) return false;
    if (activeDur    !== "Any length") {
      if (activeDur === "Weekend"  && p.days > 2)                  return false;
      if (activeDur === "3–5 days" && (p.days < 3 || p.days > 5)) return false;
      if (activeDur === "1 week"   && (p.days < 6 || p.days > 8)) return false;
      if (activeDur === "2+ weeks" && p.days < 14)                 return false;
    }
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) &&
                 !p.country.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const hasFilters = activeRegion !== "All" || activeVibe !== "Any vibe" || activeDur !== "Any length" || query !== "";

  return (
    <main className="w-full bg-[#F3EFE6] text-[#0B2027] font-sans flex flex-col min-h-screen">
      <Navbar />

       {/* HERO SECTION */}
      <div className="relative w-full overflow-hidden bg-[radial-gradient(120%_120%_at_78%_18%,#F8F4EC_0%,#F3EFE6_46%,#ECE6D8_100%)]">

        <style dangerouslySetInnerHTML={{__html: `@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}} />

        {/* Ambient blobs */}
        <div className="absolute w-[520px] h-[520px] -right-[120px] -top-[160px] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.10),transparent_68%)] blur-md pointer-events-none z-0" />
        <div className="absolute w-[460px] h-[460px] -left-[160px] -bottom-[180px] rounded-full bg-[radial-gradient(circle,rgba(79,176,165,0.12),transparent_68%)] blur-md pointer-events-none z-0" />

        <Navbar />

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 md:px-14 pb-16 pt-10 w-full max-w-[1500px] mx-auto">

          {/* LEFT: Text + Search */}
          <div className="flex flex-col justify-center relative z-30">
            <div className="inline-flex items-center gap-2 mt-16 px-3.5 py-1.5 rounded-full bg-[#4FB0A5]/10 text-[#2E7D74] text-[13px] font-bold tracking-wide w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FB0A5] inline-block" />
              128 destinations live
            </div>

            <h1 className="font-serif font-normal text-6xl md:text-[72px] leading-none tracking-tight mt-6">
              Explore the<br/>world, <span className="italic text-[#FF6B35]">beautifully.</span>
            </h1>

            <p className="text-[16px] leading-relaxed text-[#0B2027]/60 mt-6 max-w-[360px]">
              Trace the routes of seasoned travellers and discover hand-picked places glowing across the map.
            </p>

            {/* Search bar */}
            <div className="relative mt-8 w-full max-w-[480px]">
              <div className="relative z-20 flex items-center p-1.5 pl-5 rounded-[1.2rem] bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_14px_36px_rgba(11,32,39,0.10)] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
                <svg className="w-4 h-4 text-[#0B2027]/40 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations..."
                  className="bg-transparent border-none outline-none font-sans text-[15px] font-bold text-[#0B2027] flex-1 min-w-0 ml-3 placeholder:text-[#0B2027]/40"
                />
                <button className="px-6 py-3 ml-2 rounded-xl bg-[#FF6B35] text-white font-sans text-sm font-bold shadow-[0_8px_20px_rgba(255,107,53,0.34)] hover:scale-105 active:scale-95 transition-transform flex-none">
                  Search
                </button>
              </div>
            </div>

            {/* Quick region chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["Europe", "Asia", "Americas", "Africa"].map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-[12px] font-extrabold border transition-all hover:scale-105 ${activeRegion === r.toLowerCase() ? "bg-[#0B2027] text-white border-[#0B2027]" : "bg-white/60 text-[#0B2027] border-white"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Stats + Destination cards preview */}
          <div className="relative flex flex-col justify-center gap-4 lg:pl-8">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-16">
              {[
                { num: "128+", label: "Destinations" },
                { num: "4.9★", label: "Avg. rating" },
                { num: "12k",  label: "Travellers" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm p-4 flex flex-col items-center justify-center">
                  <span className="text-[22px] font-extrabold text-[#0B2027]">{s.num}</span>
                  <span className="text-[11px] font-bold text-[#0B2027]/50 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Featured destination cards */}
            <div className="grid grid-cols-2 gap-3">
              {PINS.slice(0, 4).map((pin, i) => (
                <motion.div
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  style={{ animation: `floaty ${6 + i * 0.7}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
                  className="relative h-[140px] rounded-2xl overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <img src={pin.img} alt={pin.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2027]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="text-white font-extrabold text-[14px]">{pin.name}</div>
                    <div className="text-white/70 text-[11px] font-semibold">{pin.country}</div>
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#FF6B35]/90 text-white text-[10px] font-bold">{pin.tag}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTERS BAR — glassmorphic σαν το navbar ── */}
      <div
        ref={filtersBarRef}
        onMouseMove={handleFiltersMouseMove}
        onMouseEnter={() => setIsFiltersHovered(true)}
        onMouseLeave={() => { setIsFiltersHovered(false); setHoveredFilter(null); }}
        className="relative w-full bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] border-y border-white/30 shadow-[0_4px_24px_rgba(11,32,39,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] overflow-hidden"
      >
        {/* Glare effect — ίδιο με navbar */}
        <div
          className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isFiltersHovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: `radial-gradient(200px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.35), transparent 100%)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">

          {/* Region pills — με Motion layoutId */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                onMouseEnter={() => setHoveredFilter(`region-${r}`)}
                onMouseLeave={() => setHoveredFilter(null)}
                className={`relative px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeRegion === r ? "text-[#FF6B35]" : "text-[#0B2027]/55 hover:text-[#FF6B35]"
                }`}
              >
                {activeRegion === r && (
                  <motion.div
                    layoutId="filter-active-pill"
                    className="absolute inset-0 rounded-full bg-[#FF6B35]/12 border border-[#FF6B35]/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {hoveredFilter === `region-${r}` && activeRegion !== r && (
                  <motion.div
                    layoutId="filter-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/40 border border-white/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{r}</span>
              </button>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-[#0B2027]/10 flex-shrink-0 mx-1" />

          {/* Vibe — pill style */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {VIBES.slice(1).map(v => (
              <button
                key={v}
                onClick={() => setActiveVibe(activeVibe === v ? "Any vibe" : v)}
                onMouseEnter={() => setHoveredFilter(`vibe-${v}`)}
                onMouseLeave={() => setHoveredFilter(null)}
                className={`relative px-3.5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeVibe === v ? "text-[#FF6B35]" : "text-[#0B2027]/45 hover:text-[#FF6B35]"
                }`}
              >
                {activeVibe === v && (
                  <motion.div
                    layoutId="filter-active-pill"
                    className="absolute inset-0 rounded-full bg-[#FF6B35]/12 border border-[#FF6B35]/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {hoveredFilter === `vibe-${v}` && activeVibe !== v && (
                  <motion.div
                    layoutId="filter-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/40 border border-white/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{v}</span>
              </button>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-[#0B2027]/10 flex-shrink-0 mx-1" />

          {/* Duration — pill style */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {DURATIONS.slice(1).map(d => (
              <button
                key={d}
                onClick={() => setActiveDur(activeDur === d ? "Any length" : d)}
                onMouseEnter={() => setHoveredFilter(`dur-${d}`)}
                onMouseLeave={() => setHoveredFilter(null)}
                className={`relative px-3.5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeDur === d ? "text-[#FF6B35]" : "text-[#0B2027]/45 hover:text-[#FF6B35]"
                }`}
              >
                {activeDur === d && (
                  <motion.div
                    layoutId="filter-active-pill"
                    className="absolute inset-0 rounded-full bg-[#FF6B35]/12 border border-[#FF6B35]/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {hoveredFilter === `dur-${d}` && activeDur !== d && (
                  <motion.div
                    layoutId="filter-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/40 border border-white/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{d}</span>
              </button>
            ))}
          </div>

          {/* Clear */}
          <AnimatePresence>
            {hasFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={() => { setActiveRegion("All"); setActiveVibe("Any vibe"); setActiveDur("Any length"); setQuery(""); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-bold text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 hover:bg-[#FF6B35]/20 transition-colors flex-shrink-0 ml-1"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Clear
              </motion.button>
            )}
          </AnimatePresence>

          <div className="ml-auto flex-shrink-0 text-[12px] font-bold text-[#0B2027]/35 pl-4">
            {filtered.length} results
          </div>
        </div>
      </div>

      {/* ── MAP + GRID — bg-white για αντίθεση ── */}
      <div className="w-full bg-white">
        <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full gap-0 lg:gap-6 px-0 lg:px-14 py-0 lg:py-8">

          {/* MAP */}
          <div className="lg:sticky lg:top-0 lg:self-start w-full lg:w-[45%] xl:w-[48%] h-[420px] lg:h-screen flex-shrink-0 overflow-hidden lg:rounded-[1.6rem] shadow-[0_8px_40px_rgba(11,32,39,0.10)]">
            {mapLoaded && (
              <MapContainer center={[30, 15]} zoom={2} style={{ width: "100%", height: "100%" }} zoomControl={false} attributionControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap &copy; CARTO" />
                <FlyToPin pin={activePin} />
                {filtered.map(pin => (
                  <Marker
                    key={pin.id}
                    position={[pin.lat, pin.lng]}
                    icon={createLeafletIcon(activePin?.id === pin.id)}
                    eventHandlers={{ click: () => setActivePin(activePin?.id === pin.id ? null : pin) }}
                  >
                    <Popup className="wayfare-popup">
                      <div className="w-[200px] font-sans">
                        <img src={pin.img} alt={pin.name} className="w-full h-[100px] object-cover rounded-[10px] mb-2" />
                        <div className="font-extrabold text-[14px] text-[#0B2027]">{pin.name}</div>
                        <div className="text-[12px] text-[#0B2027]/50 font-semibold mb-2">{pin.country} · {pin.days} days</div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold text-[#FF6B35]">★ {pin.rating}</span>
                          <button className="px-3 py-1.5 rounded-full bg-[#FF6B35] text-white text-[11px] font-bold hover:scale-105 transition-transform">
                            View trip →
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}

            {/* Active pin bottom overlay */}
            <AnimatePresence>
              {activePin && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                  className="absolute bottom-4 left-4 right-4 z-[1000]"
                >
                  <div className="bg-white/90 backdrop-blur-xl rounded-[1.2rem] p-3 shadow-[0_8px_32px_rgba(11,32,39,0.18)] border border-white flex items-center gap-3">
                    <img src={activePin.img} alt={activePin.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-[14px] text-[#0B2027] truncate">{activePin.name}</div>
                      <div className="text-[12px] text-[#0B2027]/50 font-semibold">{activePin.country} · {activePin.days} days · ★ {activePin.rating}</div>
                      <div className="text-[11px] text-[#0B2027]/40 font-semibold mt-0.5">{activePin.copies} copies</div>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-[#FF6B35] text-white text-[12px] font-bold hover:scale-105 transition-transform flex-shrink-0">
                      View →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CARDS GRID */}
          <div className="flex-1 min-w-0 px-4 md:px-6 lg:px-0 py-6 lg:py-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-extrabold text-[#0B2027]">
                {activeRegion === "All" ? "All itineraries" : activeRegion}
                <span className="ml-2 text-[14px] font-semibold text-[#0B2027]/40">({filtered.length})</span>
              </h2>
              <select className="px-3 py-1.5 rounded-full text-[12px] font-bold bg-[#F3EFE6] border border-gray-200 text-[#0B2027]/60 outline-none appearance-none pr-7 cursor-pointer"
                style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%230B2027' stroke-width='3'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 8px center" }}>
                <option>Most copied</option>
                <option>Top rated</option>
                <option>Shortest</option>
                <option>Longest</option>
              </select>
            </div>

            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map(item => (
                    <Card
                      key={item.id}
                      item={item}
                      active={activePin?.id === item.id}
                      onClick={() => setActivePin(activePin?.id === item.id ? null : item)}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h3 className="text-xl font-extrabold text-[#0B2027] mb-2">No results found</h3>
                  <p className="text-[#0B2027]/50 text-sm">Try adjusting your filters or search term</p>
                  <button onClick={() => { setActiveRegion("All"); setActiveVibe("Any vibe"); setActiveDur("Any length"); setQuery(""); }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#FF6B35] text-white font-bold text-sm hover:scale-105 transition-transform">
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="relative bg-[#000A0F] w-full mt-16 z-10 pt-24 pb-4 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[150px] bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" alt="Mountain range" className="w-full h-full object-cover object-center opacity-60 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000A0F] via-[#000A0F]/60 to-transparent" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center pt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight max-w-[18ch] leading-tight mb-8">
            Your next trip is <em className="text-[#FF6B35] not-italic">someone&apos;s last one.</em>
          </h2>
          <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full shadow-[0_14px_26px_-10px_rgba(255,107,53,0.6)] transition-all flex items-center gap-3 mb-32 hover:-translate-y-1 text-sm">
            Start Planning
          </button>
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-16 mb-12 text-left">
            <div><h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Get Started</h4><ul className="space-y-3.5 text-sm font-medium text-gray-300"><li><Link href="#" className="hover:text-white transition-colors">Get the app</Link></li><li><Link href="#" className="hover:text-white transition-colors">Log in</Link></li></ul></div>
            <div><h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">About</h4><ul className="space-y-3.5 text-sm font-medium text-gray-300"><li><Link href="#" className="hover:text-white transition-colors">About us</Link></li><li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li></ul></div>
            <div><h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Features</h4><ul className="space-y-3.5 text-sm font-medium text-gray-300"><li><Link href="#" className="hover:text-white transition-colors">Travel Planner</Link></li><li><Link href="#" className="hover:text-white transition-colors">Travel Tracker</Link></li></ul></div>
            <div><h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Help & Support</h4><ul className="space-y-3.5 text-sm font-medium text-gray-300"><li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li></ul></div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium text-[#7E94A0] pb-12">
            <p>© 2026 NomadFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .wayfare-popup .leaflet-popup-content-wrapper { border-radius:16px!important;padding:0!important;overflow:hidden;box-shadow:0 12px 40px rgba(11,32,39,0.18)!important;border:none!important; }
        .wayfare-popup .leaflet-popup-content { margin:12px!important; }
        .wayfare-popup .leaflet-popup-tip-container { display:none; }
        .leaflet-container { font-family:inherit; }
      `}</style>
    </main>
  );
}