"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- ΜΑΠ-ΑΡΙΣΜΑ ΟΛΩΝ ΤΩΝ ΠΡΟΦΙΛ ( Elena & Nikos ) ---
const ALL_PROFILES_DATA: Record<
  string, 
  { 
    profile: { name: string; handle: string; bio: string; avatar: string; cover: string; stats: { trips: number; followers: string; following: number; countries: number } };
    trips: any[];
  }
> = {
  elena_travels: {
    profile: {
      name: "Elena Rostova",
      handle: "@elena_travels",
      bio: "Chasing the sun across the globe ☀️. Digital nomad, coffee addict, and lover of hidden alleys and vibrant street food. Based in nowhere, currently everywhere.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
      stats: { trips: 34, followers: "94.2k", following: 412, countries: 18 }
    },
    trips: [
      { id: "t1", name: "Santorini Escape", country: "Greece", vibe: "Beach", days: 5, img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 228, rating: 4.8, accent: "#4FB0A5", slug: "santorini-escape" },
      { id: "t2", name: "Lefkada Cliffs", country: "Greece", vibe: "Adventure", days: 4, img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 145, rating: 4.9, accent: "#FF6B35", slug: "lefkada-cliffs" },
      { id: "t3", name: "Amalfi Coast", country: "Italy", vibe: "Coastal", days: 7, img: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 512, rating: 5.0, accent: "#7BAE7F", slug: "amalfi-coast" },
      { id: "t4", name: "Kyoto Temples", country: "Japan", vibe: "Culture", days: 10, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 890, rating: 4.9, accent: "#FF6B35", slug: "kyoto-temples" },
      { id: "t5", name: "Swiss Alps", country: "Switzerland", vibe: "Mountains", days: 6, img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 310, rating: 4.7, accent: "#4FB0A5", slug: "swiss-alps" },
      { id: "t6", name: "Bali Surf", country: "Indonesia", vibe: "Beach", days: 14, img: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=600&q=80", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", copies: 1024, rating: 4.8, accent: "#7BAE7F", slug: "bali-surf" },
    ]
  },
  nikos_explores: {
    profile: {
      name: "Nikos Papadakis",
      handle: "@nikos_explores",
      bio: "Crete is my home, the world is my playground 🌿. Specialized in off-the-beaten-path adventures, gorge trekking, and authentic local culinary experiences.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      stats: { trips: 12, followers: "210k", following: 1200, countries: 6 }
    },
    trips: [
      { id: "t7", name: "Balos Lagoon", country: "Greece", vibe: "Beach", days: 5, img: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=600&q=80", author: "Nikos Papadakis", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", copies: 4100, rating: 4.8, accent: "#FF6B35", slug: "balos-lagoon" }
    ]
  }
};

const TABS = ["Trips", "Saved", "Map View"];

// --- CARD COMPONENT (Πλήρως πιστό στο δικό σου στυλ) ---
const TripCard = ({ item, username }: { item: any; username: string }) => {
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push(`/trips/${username}/${item.slug}`)}
      className="group relative bg-white rounded-[1.4rem] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col border-2 border-transparent shadow-[0_2px_16px_rgba(11,32,39,0.04)] hover:shadow-[0_8px_30px_rgba(11,32,39,0.08)] hover:-translate-y-1"
    >
      <div className="relative h-[180px] overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-md bg-black/30 border border-white/20">{item.vibe}</div>
        <button 
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-black/30 border border-white/20 hover:scale-110 transition-transform"
        >
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
          <button 
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all hover:scale-105"
            style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
          >
            View trip
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PROFILE PAGE ---
export default function DynamicProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Trips");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const usernameParam = typeof params?.username === "string" ? params.username : "";
  
  // Φέρνει δυναμικά τα σωστά δεδομένα ή κάνει fallback στην Έλενα αν το URL δεν ταιριάζει
  const currentData = ALL_PROFILES_DATA[usernameParam] || ALL_PROFILES_DATA["elena_travels"];
  const { profile, trips } = currentData;

  return (
    <main className="w-full bg-[#F3EFE6] text-[#0B2027] font-sans flex flex-col min-h-screen">
      
      {/* --- HEADER: COVER & INFO --- */}
      <section className="relative w-full">
        {/* Cover Photo */}
        <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.cover} alt="Cover" className="w-full h-full object-cover" />
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={profile.avatar} 
                alt={profile.name}
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
                  {profile.name}
                </h1>
                <p className="text-[15px] font-bold text-[#0B2027]/40 mt-1">
                  {profile.handle}
                </p>
                <p className="text-[14px] font-medium text-[#0B2027]/70 mt-3 max-w-lg leading-relaxed">
                  {profile.bio}
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
              <span className="text-2xl font-black text-[#0B2027]">{profile.stats.trips}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Trips</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{profile.stats.followers}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Followers</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{profile.stats.following}</span>
              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1">Following</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-2xl font-black text-[#0B2027]">{profile.stats.countries}</span>
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
              {trips.map(trip => (
                <TripCard key={trip.id} item={trip} username={usernameParam} />
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