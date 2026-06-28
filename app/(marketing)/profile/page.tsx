"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ΓΙΑ ΤΟ PROFILE ---
const USER_PROFILE = {
  name: "Elena Rostova",
  handle: "@elena_travels",
  bio: "Chasing the sun across the globe ☀️. Digital nomad, coffee addict, and lover of hidden alleys and vibrant street food. Based in nowhere, currently everywhere.",
  avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
  stats: {
    trips: 34,
    followers: "94.2k",
    following: 412,
    countries: 18
  }
};

const USER_TRIPS = [
  { id: "t1", name: "Santorini Escape", country: "Greece", vibe: "Beach", days: 5, img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 228, rating: 4.8, accent: "#4FB0A5" },
  { id: "t2", name: "Lefkada Cliffs", country: "Greece", vibe: "Adventure", days: 4, img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 145, rating: 4.9, accent: "#FF6B35" },
  { id: "t3", name: "Amalfi Coast", country: "Italy", vibe: "Coastal", days: 7, img: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 512, rating: 5.0, accent: "#7BAE7F" },
  { id: "t4", name: "Kyoto Temples", country: "Japan", vibe: "Culture", days: 10, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 890, rating: 4.9, accent: "#FF6B35" },
  { id: "t5", name: "Swiss Alps", country: "Switzerland", vibe: "Mountains", days: 6, img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 310, rating: 4.7, accent: "#4FB0A5" },
  { id: "t6", name: "Bali Surf", country: "Indonesia", vibe: "Beach", days: 14, img: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 1024, rating: 4.8, accent: "#7BAE7F" },
];

const TABS = ["Trips", "Saved", "Map View"];

// --- 1. NAVBAR COMPONENT ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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
            ? "max-w-4xl bg-white/40 backdrop-blur-[40px] backdrop-saturate-[150%] text-[#0B2027] rounded-full px-6 py-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/40 mt-4"
            : "max-w-7xl bg-transparent text-white mix-blend-difference py-[18px]"
        }`}
      >
        {isScrolled && (
          <div
            className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: `radial-gradient(120px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.8), transparent 100%)` }}
          />
        )}

        <div className="relative z-10 flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block"></span>
          wayfare
        </div>

        <div className="relative z-10 hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-4 py-2 transition-colors rounded-full ${isScrolled ? "text-[#0B2027]" : "text-white hover:text-[#FF6B35]"}`}
              >
                {hoveredItem === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${isScrolled ? "bg-white/60 border border-white/50" : "bg-white/10 backdrop-blur-sm border border-white/10"}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/signup"
            className={`ml-2 px-5 py-2.5 rounded-full transition-transform hover:scale-105 relative z-10 ${isScrolled ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20" : "bg-[#FF6B35] text-white"}`}
          >
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- 2. CARD COMPONENT (Επαναχρησιμοποιήσιμο) ---
const TripCard = ({ item }: { item: typeof USER_TRIPS[0] }) => {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-[1.4rem] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col border-2 border-transparent shadow-[0_2px_16px_rgba(11,32,39,0.04)] hover:shadow-[0_8px_30px_rgba(11,32,39,0.08)] hover:-translate-y-1"
    >
      <div className="relative h-[180px] overflow-hidden flex-shrink-0">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-md bg-black/30 border border-white/20">{item.vibe}</div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-black/30 border border-white/20 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" fill={saved ? "white" : "none"} stroke="white" strokeWidth="2" className="w-4 h-4"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/40 backdrop-blur-sm">{item.days} days</div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-[16px] text-[#0B2027] leading-tight">{item.name}</h3>
            <p className="text-[12px] text-[#0B2027]/50 font-semibold mt-1">{item.country}</p>
          </div>
          <div className="flex items-center gap-0.5 flex-shrink-0 bg-gray-50 px-2 py-1 rounded-lg">
            <span className="text-[#FF6B35] text-[11px]">★</span>
            <span className="text-[12px] font-bold text-[#0B2027]">{item.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-[11px] text-[#0B2027]/40 font-bold">{item.copies} copies</span>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all hover:scale-105"
            style={{ backgroundColor: `${item.accent}15`, color: item.accent }}>
            View trip
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PROFILE PAGE ---
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Trips");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <main className="w-full bg-[#F3EFE6] text-[#0B2027] font-sans flex flex-col min-h-screen">
      <Navbar />

      {/* --- HEADER: COVER & INFO --- */}
      <section className="relative w-full">
        {/* Cover Photo */}
        <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
          <img 
            src={USER_PROFILE.cover} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          {/* Ομαλό σβήσιμο της φωτογραφίας στο χρώμα του background (#F3EFE6) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F3EFE6] via-transparent to-black/30" />
        </div>

        {/* Profile Info Container */}
        <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-24 md:-mt-32 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
            
            {/* Avatar */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <img 
                src={USER_PROFILE.avatar} 
                alt={USER_PROFILE.name}
                className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-[6px] border-[#F3EFE6] shadow-[0_10px_30px_rgba(11,32,39,0.15)] bg-gray-200"
              />
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#4FB0A5] border-[3px] border-[#F3EFE6] rounded-full flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
            </motion.div>

            {/* User Details & Actions */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:pb-4 w-full">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B2027]">
                  {USER_PROFILE.name}
                </h1>
                <p className="text-[15px] font-bold text-[#0B2027]/40 mt-1">
                  {USER_PROFILE.handle}
                </p>
                <p className="text-[14px] font-medium text-[#0B2027]/70 mt-3 max-w-lg leading-relaxed">
                  {USER_PROFILE.bio}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 rounded-full bg-[#FF6B35] text-white text-[14px] font-bold shadow-[0_6px_16px_rgba(255,107,53,0.25)] hover:scale-105 transition-transform">
                  Follow
                </button>
                <button className="w-10 h-10 rounded-full bg-white text-[#0B2027] border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-white text-[#0B2027] border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center md:justify-start gap-8 mt-8 border-t border-gray-200/60 pt-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{USER_PROFILE.stats.trips}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Trips</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{USER_PROFILE.stats.followers}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Followers</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{USER_PROFILE.stats.following}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Following</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{USER_PROFILE.stats.countries}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY TABS DOCK --- */}
      <div className="sticky top-6 z-50 w-full flex justify-center px-4 pointer-events-none mb-8">
        <div className="pointer-events-auto flex items-center p-1.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_16px_40px_-10px_rgba(11,32,39,0.12)]">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={() => setHoveredTab(tab)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-6 py-2.5 rounded-full text-[13px] font-extrabold whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTab === tab ? "text-[#FF6B35]" : "text-[#0B2027]/60 hover:text-[#0B2027]"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="profile-active-tab"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-gray-100"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {hoveredTab === tab && activeTab !== tab && (
                <motion.div
                  layoutId="profile-hover-tab"
                  className="absolute inset-0 rounded-full bg-white/50"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <section className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24">
        {activeTab === "Trips" ? (
          <AnimatePresence mode="popLayout">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {USER_TRIPS.map(trip => (
                <TripCard key={trip.id} item={trip} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-20 text-center bg-white/40 rounded-[2rem] border border-white/60 shadow-sm"
          >
            <div className="text-5xl mb-4 grayscale opacity-60">🚧</div>
            <h3 className="text-xl font-extrabold text-[#0B2027] mb-2">{activeTab} coming soon</h3>
            <p className="text-[#0B2027]/50 text-sm max-w-[250px]">This section is currently under construction.</p>
          </motion.div>
        )}
      </section>

    </main>
  );
}