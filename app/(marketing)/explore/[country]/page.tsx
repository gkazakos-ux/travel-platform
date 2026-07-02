"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- 2. ΔΕΔΟΜΕΝΑ ΔΕΙΓΜΑΤΟΣ (MAPPED WITH REAL USER_NAMES & SLUGS) ---
const COUNTRY_RESOURCES: Record<string, { regions: string[]; creators: any[]; trips: any[] }> = {
  greece: {
    regions: ["All Regions", "Cyclades", "Crete", "Ionian Islands", "Peloponnese", "Athens Attica", "Epirus & Meteora"],
    creators: [
      { id: "c1", name: "Elena Rostova", handle: "@elena_travels", role: "GUIDE 🗺️", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", followers: "94k", designs: "112", imgLeft: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=200&q=80" },
      { id: "c2", name: "Nikos Papadakis", handle: "@nikos_explores", role: "LOCAL 🌿", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", followers: "210k", designs: "419", imgLeft: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=200&q=80" },
      { id: "c3", name: "Sofia Moretti", handle: "@sofia_wanders", role: "FOODIE 🍜", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", followers: "88k", designs: "94", imgLeft: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=200&q=80" }
    ],
    trips: [
      { id: "t1", region: "Cyclades", title: "7 Days in Cyclades (Santorini & Milos)", author: "Elena Rostova", username: "elena_travels", slug: "santorini-escape", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=500&q=80", likes: "2.3k", saves: "4", days: 7, rating: "4.9" },
      { id: "t2", region: "Crete", title: "Balos Lagoon & Chania Venetian Harbor", author: "Nikos Papadakis", username: "nikos_explores", slug: "balos-lagoon", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=500&q=80", likes: "4.1k", saves: "12", days: 5, rating: "4.8" },
      { id: "t3", region: "Ionian Islands", title: "Navagio Beach & Blue Caves Expedition", author: "Sofia Moretti", username: "sofia_wanders", slug: "navagio-expedition", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80", likes: "1.2k", saves: "8", days: 4, rating: "4.7" },
    ]
  },
  japan: {
    regions: ["All Regions", "Kanto (Tokyo)", "Kansai (Kyoto)"],
    creators: [
      { id: "j_c1", name: "Brooklyn Simmons", handle: "@brooklyns", role: "EXPLORER 🧭", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", followers: "165k", designs: "365", imgLeft: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80" }
    ],
    trips: [
      { id: "j1", region: "Kanto (Tokyo)", title: "Neon Nights & Hidden Shrines", author: "Brooklyn Simmons", username: "brooklyns", slug: "tokyo-neon-nights", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=500&q=80", likes: "2.1k", saves: "4", days: 10, rating: "5.0" }
    ]
  }
};

const FLAGS: Record<string, string> = { japan: "🇯🇵", greece: "🇬🇷", portugal: "🇵🇹", morocco: "🇲🇦" };

// --- SORT DROPDOWN ---
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
            className="absolute top-full mt-2 right-0 w-44 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_16px_40px_rgba(11,32,39,0.15)] rounded-2xl p-1.5"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { setActiveValue(opt); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-bold transition-colors flex items-center justify-between ${activeValue === opt ? "bg-[#FF6B35]/10 text-[#FF6B35]" : "text-[#0B2027] hover:bg-gray-50"}`}
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

// --- COMPACT TICKET STUB CARD COMPONENT (Vertical / Instagram Style) ---
const TicketCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
  return (
    <motion.div 
      layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative w-full bg-white rounded-[1.8rem] flex flex-col overflow-hidden cursor-pointer shadow-[0_8px_24px_rgba(11,32,39,0.06)] hover:shadow-[0_16px_40px_rgba(11,32,39,0.12)] hover:-translate-y-1.5 transition-all border border-[#0B2027]/5"
    >
      <div className="relative aspect-[4/5] w-full bg-gray-100 flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[#0B2027] text-[10px] font-black uppercase tracking-widest shadow-sm">
          {item.days} Days
        </div>
        <div className="absolute top-4 right-4 bg-[#FF6B35] text-white px-2.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1">
          ★ {item.rating}
        </div>
      </div>

      <div className="w-full flex items-center relative -mt-3 mb-0 z-10">
        <div className="absolute -left-3 w-6 h-6 rounded-full bg-white shadow-inner border border-gray-100 z-10" />
        <div className="flex-1 border-t-2 border-dashed border-[#0B2027]/15" />
        <div className="absolute -right-3 w-6 h-6 rounded-full bg-white shadow-inner border border-gray-100 z-10" />
      </div>

      <div className="px-5 pb-5 pt-3 flex flex-col gap-2 relative z-0 bg-white flex-1">
        <h4 className="text-[16px] font-extrabold text-[#0B2027] leading-tight line-clamp-2 group-hover:text-[#FF6B35] transition-colors">{item.title}</h4>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#0B2027]/5">
          <div className="flex items-center gap-2">
            <img src={item.avatar} alt="" className="w-6 h-6 rounded-full object-cover shadow-sm border border-gray-100" />
            <span className="text-[11px] text-[#0B2027]/60 font-semibold tracking-wide"><span className="text-[#0B2027] font-bold">{item.author}</span></span>
          </div>
          <div className="text-[11px] font-bold text-[#0B2027]/40">
            ❤️ {item.likes}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default function ProfilesListingPage() {
  const params = useParams();
  const router = useRouter();
  
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [isAllCreatorsExpanded, setIsAllCreatorsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); 
  
  const countryParam = typeof params?.country === "string" ? params.country : "";
  const country = countryParam.toLowerCase();

  const data = COUNTRY_RESOURCES[country] || { regions: ["All Regions"], creators: [], trips: [] };
  const flag = FLAGS[country] || "🌍";
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  const filteredTrips = activeRegion === "All Regions" 
    ? data.trips 
    : data.trips.filter(t => t.region === activeRegion);

  return (
    <main className="w-full bg-[#F3EFE6] text-[#0B2027] font-sans flex flex-col min-h-screen relative">

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- UPPER LAYOUT (Beige + Map Route Background) --- */}
      <div className="relative w-full bg-[#F3EFE6] pb-24 pt-32 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <svg className="w-full h-full text-[#FF6B35]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M-10,50 Q20,80 50,40 T110,60" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 1.5" />
            <path d="M-10,20 Q30,10 60,60 T110,30" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.5 1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10">
          
          <button 
            onClick={() => router.push("/explore")}
            className="flex items-center gap-2 text-xs font-black text-[#0B2027]/40 hover:text-[#0B2027] transition-colors mb-8 uppercase tracking-widest cursor-pointer"
          >
            ← Back to Globe
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#FF6B35] font-black text-xs uppercase tracking-widest">
                <span>Top Travelers</span>
                <span>{flag}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mt-2 font-normal text-[#0B2027] tracking-tight">
                Editorial picks in <span className="italic text-[#FF6B35] font-semibold">{countryName}</span>
              </h2>
            </div>
            
            <button 
              onClick={() => setIsAllCreatorsExpanded(!isAllCreatorsExpanded)}
              className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-xs font-extrabold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              {isAllCreatorsExpanded ? "Show Carousel" : "View Grid"}
            </button>
          </div>

          {/* --- PHOTO-EDITORIAL CREATORS AREA --- */}
          {data.creators.length > 0 ? (
            isAllCreatorsExpanded ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {data.creators.map((c) => (
                  <motion.div 
                    key={c.id} 
                    onClick={() => router.push("/profile")}
                    className="w-full h-[420px] flex-none rounded-[2rem] overflow-hidden shadow-xl relative group cursor-pointer border border-[#0B2027]/5"
                  >
                    <img src={c.imgCenter} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2027] via-[#0B2027]/30 to-transparent opacity-90" />
                    
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                       <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                         {c.role}
                       </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center z-10">
                       <img src={c.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xl mb-3 group-hover:-translate-y-2 transition-transform duration-500" />
                       <h3 className="text-2xl font-serif text-white mb-1 drop-shadow-md">{c.name}</h3>
                       <p className="text-[#FF6B35] text-[10px] font-black tracking-[0.2em] uppercase mb-5 drop-shadow-md">{c.handle}</p>
                       
                       <div className="flex items-center justify-center gap-6 text-white/70 text-[9px] font-extrabold uppercase tracking-widest w-full border-t border-white/20 pt-4">
                         <div><span className="block text-lg font-black text-white mb-0.5">{c.followers}</span> Followers</div>
                         <div className="w-[1px] h-6 bg-white/20" />
                         <div><span className="block text-lg font-black text-white mb-0.5">{c.designs}</span> Trips</div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="relative w-full min-h-[500px] flex items-center justify-start overflow-hidden py-6 -mx-6 md:-mx-0 px-6 md:px-0">
                {activeIndex > 0 && (
                  <button 
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 flex items-center justify-center text-lg font-black hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg z-30 cursor-pointer text-[#0B2027]"
                  >
                    ←
                  </button>
                )}

                {activeIndex < data.creators.length - 1 && (
                  <button 
                    onClick={() => setActiveIndex(activeIndex + 1)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 flex items-center justify-center text-lg font-black hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg z-30 cursor-pointer text-[#0B2027]"
                  >
                    →
                  </button>
                )}

                <motion.div 
                  className="flex gap-8 items-center pl-[calc(50vw-190px)] md:pl-[calc(50%-180px)]"
                  animate={{ x: -(activeIndex * 392) }}
                  transition={{ type: "spring", stiffness: 260, damping: 32 }}
                >
                  {data.creators.map((c, idx) => {
                    const isCenter = idx === activeIndex;
                    const isSide = Math.abs(idx - activeIndex) === 1;

                    return (
                      <motion.div 
                        key={c.id}
                        onClick={() => router.push("/profile")}
                        className="w-[360px] h-[480px] flex-none rounded-[2.5rem] overflow-hidden shadow-2xl relative group cursor-pointer border border-[#0B2027]/5"
                        animate={{
                          scale: isCenter ? 1.04 : 0.9,
                          opacity: isCenter ? 1 : (isSide ? 0.6 : 0.1),
                          zIndex: isCenter ? 20 : 10,
                          filter: isCenter ? "blur(0px)" : "blur(2px)"
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      >
                        <img src={c.imgCenter} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2027] via-[#0B2027]/30 to-transparent opacity-90" />
                        
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                           <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                             {c.role}
                           </span>
                           <span className="text-white/60 font-serif italic text-sm">Vol. {idx + 1}</span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center z-10">
                           <img src={c.avatar} alt="" className="w-20 h-20 rounded-full object-cover border-[3px] border-white shadow-xl mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
                           <h3 className="text-3xl font-serif text-white mb-1 drop-shadow-md">{c.name}</h3>
                           <p className="text-[#FF6B35] text-xs font-black tracking-[0.2em] uppercase mb-6 drop-shadow-md">{c.handle}</p>
                           
                           <div className="flex items-center justify-center gap-8 text-white/70 text-[10px] font-extrabold uppercase tracking-widest w-full border-t border-white/20 pt-5">
                             <div><span className="block text-xl font-black text-white mb-0.5">{c.followers}</span> Followers</div>
                             <div className="w-[1px] h-8 bg-white/20" />
                             <div><span className="block text-xl font-black text-white mb-0.5">{c.designs}</span> Trips</div>
                           </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            )
          ) : (
            <p className="text-sm text-[#0B2027]/40 font-bold mb-16">No creators highlighted for this region yet.</p>
          )}
        </div>
      </div>

      {/* --- MIDDLE SECTION: STICKY DOCK PILL FILTER --- */}
      <div className="sticky top-6 z-50 w-full flex justify-center px-4 pointer-events-none mb-10 transition-transform">
        <div className="pointer-events-auto inline-flex gap-1.5 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-full p-1.5 shadow-[0_16px_40px_-10px_rgba(11,32,39,0.15)] overflow-x-auto max-w-full scrollbar-none">
          {data.regions.map((region) => {
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className="relative px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-colors duration-300 select-none outline-none whitespace-nowrap cursor-pointer"
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-region-dock-pill" 
                    className="absolute inset-0 bg-white rounded-full shadow-[0_4px_14px_rgba(11,32,39,0.04)] border border-white/60" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} 
                  />
                )}
                <span className={`relative z-10 transition-colors ${isActive ? "text-[#FF6B35]" : "text-[#0B2027]/60 hover:text-[#0B2027]"}`}>
                  {region}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION 2: TICKET-STUB ITINERARIES GRID (White Background) ─── */}
      <div className="w-full bg-white border-t border-gray-100 flex-1 relative z-20 px-6 md:px-14 pb-32 pt-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[24px] font-extrabold text-[#0B2027] flex items-center">
              {activeRegion === "All Regions" ? "Top Itineraries" : activeRegion}
              <span className="ml-3 text-[14px] font-bold text-[#0B2027]/40 bg-[#0B2027]/5 px-3 py-1 rounded-full border border-gray-200">{filteredTrips.length}</span>
            </h2>
            <SortDropdown />
          </div>

          <AnimatePresence mode="popLayout">
            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredTrips.map((item) => (
                  <TicketCard 
                    key={item.id} 
                    item={item} 
                    // ─── ΟΡΙΣΤΙΚΗ ΣΥΝΔΕΣΗ ΜΕ ΤΟ JOURNEY ───
                    onClick={() => router.push(`/trips/${item.username}/${item.slug}`)} 
                  />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-[2rem] border border-gray-200/60 shadow-sm mt-4">
                <div className="text-5xl mb-4 grayscale opacity-60">🗺️</div>
                <h3 className="text-xl font-extrabold text-[#0B2027] mb-2">No routes found</h3>
                <p className="text-[#0B2027]/50 text-sm max-w-[250px]">We couldn't find any trips matching your exact filters.</p>
                <button onClick={() => setActiveRegion("All Regions")}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#FF6B35] text-white font-bold text-sm hover:scale-105 transition-transform shadow-md shadow-[#FF6B35]/20">
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
      
      <BackToTop />
    </main>
  );
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[120] bg-[#FF6B35] hover:bg-[#c0440a] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl cursor-pointer border border-white/10 transition-colors duration-200"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform -rotate-90">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}