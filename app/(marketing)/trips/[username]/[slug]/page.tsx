"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// --- 2. MOCK TRIP DATA ---
const TRIP_DATA = {
  title: "Santorini & Milos: The Ultimate Cyclades Escape",
  description: "A perfect blend of volcanic landscapes, hidden coves, and world-class sunsets. We skipped the massive crowds and found the authentic side of the islands.",
  author: { name: "Elena Rostova", handle: "@elena_travels", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" },
  cover: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1920&q=80",
  meta: { days: 7, budget: "$1,200", season: "Late Sept", rating: 4.9 },
  timeline: [
    {
      day: 1,
      title: "Arrival in the Caldera",
      places: [
        { name: "Oia Cliffside Suites", type: "Stay", time: "14:00", desc: "Checked into our cave hotel. The view is exactly like the postcards.", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80" },
        { name: "Ammoudi Bay", type: "Food", time: "19:00", desc: "Walked down 300 steps for the freshest seafood right on the water. Worth the climb back up." }
      ]
    },
    {
      day: 2,
      title: "Volcanic Trails & Wine",
      places: [
        { name: "Fira to Oia Hike", type: "Activity", time: "08:00", desc: "Started early to beat the heat. 10km of pure breathtaking views along the caldera rim." },
        { name: "Santo Wines", type: "Experience", time: "17:30", desc: "Wine tasting with local Assyrtiko. Book in advance for the sunset table." }
      ]
    },
    {
      day: 3,
      title: "Ferry to Lunar Landscapes",
      places: [
        { name: "Seajets Ferry to Milos", type: "Transport", time: "10:00", desc: "Fast ferry, took about 2 hours. Very smooth." },
        { name: "Sarakiniko Beach", type: "Nature", time: "14:30", desc: "Looks like the moon! White volcanic rock formations against deep blue water.", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  ]
};

// --- ICON HELPER ---
const PlaceIcon = ({ type }: { type: string }) => {
  switch(type) {
    case "Stay": return <span className="text-blue-500">🛏️</span>;
    case "Food": return <span className="text-orange-500">🍽️</span>;
    case "Activity": return <span className="text-green-500">⛰️</span>;
    case "Transport": return <span className="text-purple-500">⛴️</span>;
    case "Nature": return <span className="text-teal-500">🌊</span>;
    default: return <span className="text-gray-500">📍</span>;
  }
};

export default function TripDetailsPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity1 = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className="w-full bg-[#F3EFE6] text-[#0B2027] font-sans flex flex-col min-h-screen relative">

      {/* ─── 1. CINEMATIC HERO ─── */}
      <section className="relative w-full h-[75vh] min-h-[600px] overflow-hidden bg-[#0B2027]">
        <motion.img 
          style={{ y: y1 }}
          src={TRIP_DATA.cover} 
          alt="Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2027]/60 via-transparent to-[#F3EFE6]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3EFE6] via-[#F3EFE6]/10 to-transparent" />

        <motion.div style={{ opacity: opacity1 }} className="absolute bottom-16 left-0 right-0 max-w-[1200px] mx-auto px-6 flex flex-col items-start z-10">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-widest border border-white/20 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
              Verified Route
            </div>
            <div className="bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[11px] font-bold tracking-widest border border-white/10">
              {TRIP_DATA.meta.season}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0B2027] tracking-tight leading-[1.05] max-w-4xl drop-shadow-sm mb-6">
            {TRIP_DATA.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            <Link href={`/profile/${TRIP_DATA.author.handle.replace('@','')}`} className="flex items-center gap-3 bg-white/40 backdrop-blur-md pr-5 pl-2 py-2 rounded-full border border-white/50 hover:bg-white/60 transition-colors cursor-pointer shadow-sm">
              <img src={TRIP_DATA.author.avatar} className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-white" alt=""/>
              <div className="flex flex-col">
                <span className="text-[13px] font-extrabold text-[#0B2027] leading-none">{TRIP_DATA.author.name}</span>
                <span className="text-[10px] font-bold text-[#0B2027]/60 tracking-wider mt-1">{TRIP_DATA.author.handle}</span>
              </div>
            </Link>

            <div className="flex items-center gap-8 bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/50 shadow-sm">
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-[#0B2027] leading-none">{TRIP_DATA.meta.days}</span>
                <span className="text-[9px] font-bold text-[#0B2027]/50 uppercase tracking-widest mt-1">Days</span>
              </div>
              <div className="w-[1px] h-6 bg-[#0B2027]/10" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-[#0B2027] leading-none">{TRIP_DATA.meta.budget}</span>
                <span className="text-[9px] font-bold text-[#0B2027]/50 uppercase tracking-widest mt-1">Budget</span>
              </div>
              <div className="w-[1px] h-6 bg-[#0B2027]/10" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-[#FF6B35] leading-none">★ {TRIP_DATA.meta.rating}</span>
                <span className="text-[9px] font-bold text-[#0B2027]/50 uppercase tracking-widest mt-1">Rating</span>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ─── 2. MAIN CONTENT SPLIT ─── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 pb-32 relative z-20 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: TIMELINE (Span 7) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Description */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-12">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6B35] mb-4">About this trip</h3>
              <p className="text-[16px] text-[#0B2027]/70 leading-relaxed font-medium">
                {TRIP_DATA.description}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight">The Itinerary</h2>
              <div className="h-[2px] flex-1 bg-gray-200/60 rounded-full" />
            </div>

            {/* Timeline Wrapper */}
            <div className="relative pl-4 md:pl-8">
              {/* Main Vertical Line */}
              <div className="absolute top-4 bottom-10 left-[15px] md:left-[31px] w-[3px] bg-gray-200/60 rounded-full" />

              {TRIP_DATA.timeline.map((day, dIdx) => (
                <div key={dIdx} className="relative mb-16">
                  
                  {/* Day Header */}
                  <div className="flex items-center gap-4 mb-8 relative">
                    {/* Day Node */}
                    <div className="absolute -left-[35px] md:-left-[35px] w-8 h-8 rounded-full bg-[#FF6B35] border-4 border-[#F3EFE6] flex items-center justify-center shadow-md z-10">
                      <span className="text-white text-[10px] font-black">{day.day}</span>
                    </div>
                    <div className="ml-2">
                      <span className="text-[10px] font-black text-[#0B2027]/40 uppercase tracking-widest block mb-1">Day {day.day}</span>
                      <h3 className="text-2xl font-extrabold text-[#0B2027]">{day.title}</h3>
                    </div>
                  </div>

                  {/* Places in Day */}
                  <div className="flex flex-col gap-6 ml-2 md:ml-4">
                    {day.places.map((place, pIdx) => (
                      <motion.div 
                        key={pIdx}
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                        className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(11,32,39,0.03)] border border-gray-100 hover:shadow-md transition-shadow relative group"
                      >
                        {/* Place Small Node */}
                        <div className="absolute -left-[33px] md:-left-[41px] top-8 w-4 h-4 rounded-full bg-white border-[3px] border-gray-300 z-10 group-hover:border-[#FF6B35] transition-colors" />

                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                              <PlaceIcon type={place.type} />
                            </div>
                            <div>
                              <h4 className="text-[16px] font-extrabold text-[#0B2027] leading-tight">{place.name}</h4>
                              <span className="text-[11px] font-bold text-[#0B2027]/40 uppercase tracking-wider">{place.type}</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 text-[#0B2027]/60 px-3 py-1 rounded-lg text-[11px] font-bold font-mono">
                            {place.time}
                          </div>
                        </div>
                        
                        <p className="text-[13px] text-[#0B2027]/60 leading-relaxed font-medium mb-4 pl-[52px]">
                          {place.desc}
                        </p>

                        {place.img && (
                          <div className="w-full h-[180px] rounded-xl overflow-hidden ml-0 md:ml-[52px] w-[calc(100%-0px)] md:w-[calc(100%-52px)]">
                            <img src={place.img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
            
            {/* End of Journey Indicator */}
            <div className="flex flex-col items-center justify-center pt-8 text-[#0B2027]/30">
              <span className="w-3 h-3 rounded-full border-2 border-current mb-2" />
              <span className="text-[10px] font-black uppercase tracking-widest">End of Journey</span>
            </div>

          </div>

          {/* RIGHT: STICKY MAP & ACTION BAR (Span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-8 flex flex-col gap-6">
              
              {/* ACTION CARD (The North Star Converter) */}
              <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 flex flex-col">
                <h3 className="text-lg font-extrabold mb-2">Like this trip?</h3>
                <p className="text-xs text-gray-500 font-medium mb-6">Copy this exact itinerary to your drafts. You can edit dates, add places, and make it your own.</p>
                
                <button className="w-full bg-[#FF6B35] hover:bg-[#E4531F] text-white py-4 rounded-xl font-extrabold text-[15px] shadow-[0_8px_20px_rgba(255,107,53,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all flex justify-center items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  Copy to my drafts
                </button>
              </div>

              {/* MAP PLACEHOLDER (Looks Premium) */}
              <div className="w-full h-[400px] md:h-[500px] bg-[#EAF0F2] rounded-[2rem] overflow-hidden relative shadow-inner border border-white/50">
                {/* Fake map background using SVG pattern */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0B2027 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                <svg className="absolute inset-0 w-full h-full text-[#FF6B35]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 20 80 Q 50 20, 80 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeLinecap="round" />
                  <circle cx="20" cy="80" r="3" fill="currentColor" />
                  <circle cx="80" cy="40" r="3" fill="currentColor" />
                  <circle cx="20" cy="80" r="1.5" fill="white" />
                  <circle cx="80" cy="40" r="1.5" fill="white" />
                </svg>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Map View</span>
                  <span className="text-[12px] font-bold text-[#0B2027]">Interactive Route</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="bg-[#0B2027] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-black/20">
                    Map loads here
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- MOUNTAIN FOOTER --- */}
      <div className="relative bg-[#000A0F] w-full mt-auto z-10 pt-24 pb-4 overflow-hidden text-white">
        <div className="absolute top-0 inset-x-0 h-[150px] bg-gradient-to-b from-[#F3EFE6] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" alt="Mountain range" className="w-full h-full object-cover object-center opacity-60 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000A0F] via-[#000A0F]/60 to-transparent" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center pt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight mb-8">
            Your next trip is <em className="text-[#FF6B35] not-italic">someone&apos;s last one.</em>
          </h2>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium text-[#7E94A0] pb-12 mt-20 border-t border-white/10 pt-8">
            <p>© 2026 pathlore. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* ── BACK TO TOP BUTTON ── */}
    </main>
  );
}