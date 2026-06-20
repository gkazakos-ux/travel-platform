"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- DUMMY DATA ΓΙΑ ΤΙΣ ΤΟΠΟΘΕΣΙΕΣ ---
const destinations = [
  {
    id: "portugal",
    name: "Portugal",
    region: "Europe",
    x: 48, // % position on map
    y: 35, // % position on map
    itineraries: 124,
    topTravelers: ["M", "AH", "LK"],
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c71c?auto=format&fit=crop&w=600&q=80",
    color: "#FF6B35"
  },
  {
    id: "japan",
    name: "Japan",
    region: "Asia",
    x: 85,
    y: 38,
    itineraries: 312,
    topTravelers: ["K", "SJ", "M"],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    color: "#00DB9A"
  },
  {
    id: "patagonia",
    name: "Patagonia",
    region: "South America",
    x: 32,
    y: 75,
    itineraries: 89,
    topTravelers: ["AH", "LK"],
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80",
    color: "#62B6C7"
  }
];

export default function ExploreMapPage() {
  const [activePin, setActivePin] = useState<typeof destinations[0] | null>(null);
  const mapConstraintsRef = useRef(null);

  return (
    <main className="relative w-full h-screen bg-[#000A0F] overflow-hidden text-white font-sans selection:bg-[#FF6B35] selection:text-white">
      
      {/* --- FLOATING NAVBAR (Απλοποιημένη για τον χάρτη) --- */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer pointer-events-auto">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block"></span>
          wayfare
        </Link>
        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-bold pointer-events-auto hover:bg-white/20 transition-colors">
          Close Map ✕
        </button>
      </nav>

      {/* --- MAP CONTAINER (Draggable) --- */}
      <motion.div 
        ref={mapConstraintsRef}
        className="absolute inset-0 z-0"
      >
        <motion.div
          drag
          dragConstraints={mapConstraintsRef}
          dragElastic={0.2}
          initial={{ scale: 1.2, x: -200, y: -100 }} // Ξεκινάει ελαφρώς zoomαρισμένο
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] cursor-grab active:cursor-grabbing"
        >
          {/* Το φόντο του χάρτη (Svg / Image + Grid) */}
          <div className="absolute inset-0 bg-[#001621] opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center pointer-events-none mix-blend-screen"></div>
          
          {/* Subtle Grid overlay για την αίσθηση του ραντάρ/χάρτη */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          {/* --- MAP PINS --- */}
          {destinations.map((dest) => (
            <div 
              key={dest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
            >
              {/* Pulsing Dot */}
              <div 
                onClick={() => setActivePin(dest)}
                className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <div 
                  className={`absolute inset-0 rounded-full opacity-40 animate-ping`}
                  style={{ backgroundColor: dest.color }}
                ></div>
                <div 
                  className={`relative w-4 h-4 rounded-full border-2 border-[#000A0F] shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:scale-150`}
                  style={{ backgroundColor: dest.color }}
                ></div>
              </div>

              {/* Tooltip on Hover (αν δεν είναι ήδη επιλεγμένο) */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#001621]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                <p className="text-xs font-bold text-white">{dest.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* --- GLASSMORPHIC SIDEBAR PANEL (Όταν επιλέγεις τοποθεσία) --- */}
      <motion.div 
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: activePin ? "0%" : "-100%", opacity: activePin ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-0 bottom-0 left-0 w-full md:w-[420px] bg-[#000A0F]/60 backdrop-blur-3xl border-r border-white/10 z-40 p-8 flex flex-col pt-24 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
      >
        {activePin && (
          <>
            <motion.div 
              key={activePin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: activePin.color }}>
                {activePin.region}
              </div>
              <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                {activePin.name}
              </h2>

              <div className="w-full h-48 rounded-2xl overflow-hidden mb-8 relative">
                <img src={activePin.image} alt={activePin.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000A0F] to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-black text-white mb-1">{activePin.itineraries}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Itineraries</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center">
                  <div className="flex -space-x-3 mb-2">
                    {activePin.topTravelers.map((initial, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#000A0F] flex items-center justify-center text-[10px] font-bold text-[#000A0F]" style={{ backgroundColor: activePin.color }}>
                        {initial}
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Top Travelers</div>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                Explore real, day-by-day routes created by travelers who have navigated the streets of {activePin.name}. Copy their drafts and make them your own.
              </p>

              {/* Call to Action -> Πάει στο Listing Page */}
              <Link 
                href={`/destinations/${activePin.id}`} 
                className="mt-auto w-full py-4 rounded-full text-center font-bold text-sm text-white transition-transform hover:scale-[1.02] active:scale-95 shadow-lg"
                style={{ backgroundColor: activePin.color, shadowColor: `${activePin.color}40` }}
              >
                Explore {activePin.itineraries} Trips
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* --- INSTRUCTIONS OVERLAY (Εξαφανίζεται όταν κλικάρεις κάτι) --- */}
      <motion.div 
        animate={{ opacity: activePin ? 0 : 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full pointer-events-none z-30"
      >
        <p className="text-sm font-bold text-white flex items-center gap-2">
          <span className="text-xl">✋</span> Drag to navigate. Click a pin to explore.
        </p>
      </motion.div>
      
    </main>
  );
}