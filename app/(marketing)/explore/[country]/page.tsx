"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. NAVBAR COMPONENT ---
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
        ref={navRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setHoveredItem(null); }}
        className={`relative flex items-center justify-between w-full transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? "max-w-4xl bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] text-[#0B2027] rounded-full px-6 py-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/20 mt-4" 
            : "max-w-7xl bg-transparent text-[#0B2027] py-[18px]"
        }`}
      >
        {isScrolled && (
          <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ background: `radial-gradient(120px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.6), transparent 100%)` }} />
        )}

        <div className="relative z-10 flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block"></span>
          wayfare
        </div>

        <div className="relative z-10 hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <Link key={item.id} href={item.href} onMouseEnter={() => setHoveredItem(item.id)} className={`relative px-4 py-2 transition-colors rounded-full ${isScrolled ? "text-[#0B2027]" : "text-[#0B2027] hover:text-[#FF6B35]"}`}>
                {hoveredItem === item.id && (
                  <motion.div layoutId="nav-pill" className={`absolute inset-0 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${isScrolled ? "bg-white/60 border border-white/50" : "bg-white/40 backdrop-blur-md border border-white/30"}`} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
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

// --- 2. ΔΕΔΟΜΕΝΑ ΔΕΙΓΜΑΤΟΣ (10 ΠΡΟΦΙΛ & 20 ΠΟΛΕΙΣ) ---
const COUNTRY_RESOURCES: Record<string, { regions: string[]; creators: any[]; trips: any[] }> = {
  greece: {
    regions: ["All Regions", "Cyclades", "Crete", "Ionian Islands", "Peloponnese", "Athens Attica", "Epirus & Meteora", "Dodecanese", "Macedonia"],
    creators: [
      { id: "c1", name: "Waldo Broodryk", handle: "@WALDOBROODRYK", role: "EXPLORER 🧭", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", followers: "128k", designs: "263", imgLeft: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=200&q=80" },
      { id: "c2", name: "Brooklyn Simmons", handle: "@BROOKLYNS", role: "PRINTER 🖨️", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", followers: "165k", designs: "365", imgLeft: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=200&q=80" },
      { id: "c3", name: "Darrell Steward", handle: "@DARRELL_STEW", role: "MODELLER 📦", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", followers: "65k", designs: "1642", imgLeft: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80" },
      { id: "c4", name: "Elena Rostova", handle: "@ELENA_TRAVELS", role: "GUIDE 🗺️", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", followers: "94k", designs: "112", imgLeft: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=200&q=80" },
      { id: "c5", name: "Nikos Papadakis", handle: "@NIKOS_EXPLORES", role: "LOCAL GUIDE 🌿", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", followers: "210k", designs: "419", imgLeft: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=200&q=80" },
      { id: "c6", name: "Sofia Moretti", handle: "@SOFIA_WANDERS", role: "FOODIE 🍜", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", followers: "88k", designs: "94", imgLeft: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=200&q=80" },
      { id: "c7", name: "Liam Evans", handle: "@LIAM_WILD", role: "CAMPING GURU ⛺", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80", followers: "115k", designs: "182", imgLeft: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=200&q=80" },
      { id: "c8", name: "Anna Johansson", handle: "@ANNA_J", role: "BACKPACKER 🎒", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", followers: "73k", designs: "54", imgLeft: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?auto=format&fit=crop&w=200&q=80" },
      { id: "c9", name: "Giorgos Latsis", handle: "@GIORGOS_LAT", role: "LUXURY VIBES 🥂", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80", followers: "195k", designs: "210", imgLeft: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=200&q=80" },
      { id: "c10", name: "Clara Dupont", handle: "@CLARA_WANDERS", role: "HISTORIAN 🏛️", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80", followers: "131k", designs: "138", imgLeft: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=200&q=80" }
    ],
    trips: [
      { id: "t1", region: "Cyclades", title: "7 Days in Cyclades (Santorini & Milos)", author: "Wade Warren", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=500&q=80", likes: "223", saves: "4", comments: "34" },
      { id: "t2", region: "Cyclades", title: "Mykonos Windmills & Ancient Delos Tour", author: "Savannah Nguyen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80", likes: "223", saves: "4", comments: "34" },
      { id: "t3", region: "Cyclades", title: "Naxos Mountain Villages & Sunset Portara", author: "Ronald Richards", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=500&q=80", likes: "223", saves: "4", comments: "34" },
      { id: "t4", region: "Cyclades", title: "Paros Luxury Catamaran & Naoussa Port", author: "Robert Fox", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80", likes: "223", saves: "4", comments: "34" },
      { id: "t5", region: "Crete", title: "Balos Lagoon & Chania Venetian Harbor", author: "Jane Cooper", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=500&q=80", likes: "451", saves: "12", comments: "56" },
      { id: "t6", region: "Crete", title: "Elafonisi Exotic Pink Sand Escape", author: "Guy Hawkins", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=500&q=80", likes: "1.2k", saves: "45", comments: "89" },
      { id: "t7", region: "Crete", title: "Knossos Palace & Archeological Walk", author: "Leslie Alexander", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80", likes: "892", saves: "31", comments: "42" },
      { id: "t8", region: "Ionian Islands", title: "Navagio Beach & Blue Caves Expedition", author: "Cody Fisher", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80", likes: "314", saves: "8", comments: "21" },
      { id: "t9", region: "Ionian Islands", title: "Corfu Old Town Romantic Venetian Alleys", author: "Maria P.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=500&q=80", likes: "654", saves: "23", comments: "44" },
      { id: "t10", region: "Ionian Islands", title: "Lefkada Porto Katsiki Turquoise Cliffs", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=500&q=80", likes: "891", saves: "19", comments: "52" },
      { id: "t11", region: "Peloponnese", title: "Monemvasia Medieval Castle Rock Hidden Route", author: "Nikos Papadakis", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80", likes: "720", saves: "11", comments: "19" },
      { id: "t12", region: "Peloponnese", title: "Nafplio Palamidi Fortress Old Capital Guide", author: "Chloe Bennett", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=500&q=80", likes: "943", saves: "15", comments: "31" },
      { id: "t13", region: "Athens Attica", title: "Acropolis Hill & Hidden Plaka Alleys", author: "Dimitri Kozlov", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=500&q=80", likes: "2.4k", saves: "95", comments: "112" },
      { id: "t14", region: "Athens Attica", title: "Temple of Poseidon Sounio Sunset Route", author: "Sofia Moretti", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=500&q=80", likes: "1.1k", saves: "43", comments: "62" },
      { id: "t15", region: "Epirus & Meteora", title: "Meteora Hanging Monasteries Clifftop Trek", author: "Liam Evans", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80", likes: "1.9k", saves: "54", comments: "77" },
      { id: "t16", region: "Epirus & Meteora", title: "Vikos Gorge Wilderness & Stone Bridges", author: "Anna Johansson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=500&q=80", likes: "834", saves: "22", comments: "41" },
      { id: "t17", region: "Dodecanese", title: "Rhodes Knights Grand Master Palace", author: "Giorgos Latsis", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=500&q=80", likes: "1.2k", saves: "31", comments: "52" },
      { id: "t18", region: "Dodecanese", title: "Symi Island Colorful Neo-Classical Harbor", author: "Clara Dupont", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=500&q=80", likes: "1.6k", saves: "48", comments: "69" },
      { id: "t19", region: "Macedonia", title: "Thessaloniki Waterfront & Ladadika Food Walk", author: "Wade Warren", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=500&q=80", likes: "912", saves: "29", comments: "48" },
      { id: "t20", region: "Macedonia", title: "Mount Olympus Mythical Enipeas Gorge Trek", author: "Savannah Nguyen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?auto=format&fit=crop&w=500&q=80", likes: "2.4k", saves: "81", comments: "93" }
    ]
  },
  japan: {
    regions: ["All Regions", "Kanto (Tokyo)", "Kansai (Kyoto)"],
    creators: [
      { id: "j_c1", name: "Brooklyn Simmons", handle: "@BROOKLYNS", role: "PRINTER 🖨️", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", followers: "165k", designs: "365", imgLeft: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=200&q=80", imgCenter: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80", imgRight: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80" }
    ],
    trips: [
      { id: "j1", region: "Kanto (Tokyo)", title: "Neon Nights & Hidden Shrines", author: "Wade Warren", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=500&q=80", likes: "223", saves: "4", comments: "34" }
    ]
  }
};

const FLAGS: Record<string, string> = { japan: "🇯🇵", greece: "🇬🇷", portugal: "🇵🇹", morocco: "🇲🇦" };

export default function ProfilesListingPage() {
  const params = useParams();
  const router = useRouter();
  
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [isAllCreatorsExpanded, setIsAllCreatorsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); // Ελέγχει ποιο προφίλ είναι στο κέντρο
  
  const countryParam = typeof params?.country === "string" ? params.country : "";
  const country = countryParam.toLowerCase();

  const data = COUNTRY_RESOURCES[country] || { regions: ["All Regions"], creators: [], trips: [] };
  const flag = FLAGS[country] || "🌍";
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  const filteredTrips = activeRegion === "All Regions" 
    ? data.trips 
    : data.trips.filter(t => t.region === activeRegion);

  return (
    <main className="w-full bg-[#000A0F] text-[#0B2027] font-sans flex flex-col min-h-screen overflow-x-hidden">
      
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- UPPER LAYOUT (LIGHT GREY BACKGROUND #F4F5F6) --- */}
      <div className="relative w-full bg-[#F4F5F6] pb-32 pt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          
          {/* Back Action */}
          <button 
            onClick={() => router.push("/explore")}
            className="flex items-center gap-2 text-xs font-black text-[#0B2027]/40 hover:text-[#0B2027] transition-colors mb-8 uppercase tracking-widest"
          >
            ← Back to Globe
          </button>

          {/* --- TOP SECTION HEADER --- */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#FF6B35] font-black text-xs uppercase tracking-widest">
                <span>Top Travelers</span>
                <span>{flag}</span>
              </div>
              <h2 className="text-3xl font-serif mt-1 font-normal">
                Featured creators in <span className="italic text-[#FF6B35]">{countryName}</span>
              </h2>
            </div>
            
            <button 
              onClick={() => setIsAllCreatorsExpanded(!isAllCreatorsExpanded)}
              className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-xs font-extrabold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-sm relative z-20"
            >
              {isAllCreatorsExpanded ? "Show Carousel" : "View All"}
            </button>
          </div>

          {/* --- CREATORS AREA --- */}
          {data.creators.length > 0 ? (
            isAllCreatorsExpanded ? (
              /* --- VIEW ALL MODE: FULL GRID (Isolated Hovers) --- */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {data.creators.map((c) => (
                  <div key={c.id} className="group w-full bg-white border border-gray-100 rounded-[2.2rem] p-5 shadow-[0_12px_35px_rgba(11,32,39,0.02)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(11,32,39,0.06)] hover:border-gray-200/80 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between">
                    onClick={() => router.push('/profile')}
                    <div>
                      <div className="relative grid grid-cols-3 gap-2 items-center h-[115px] mb-8">
                        <div className="h-full rounded-[1.2rem] overflow-hidden bg-gray-100"><img src={c.imgLeft} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-95 group-hover:opacity-40 transition-all duration-500" /></div>
                        <div className="h-[110%] rounded-[1.2rem] overflow-hidden bg-gray-100 shadow-md relative z-10"><img src={c.imgCenter} alt="" className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-all duration-500" /></div>
                        <div className="h-full rounded-[1.2rem] overflow-hidden bg-gray-100"><img src={c.imgRight} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-95 group-hover:opacity-40 transition-all duration-500" /></div>
                        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-20"><img src={c.avatar} alt="" className="w-[4.5rem] h-[4.5rem] rounded-full object-cover border-[4px] border-white shadow-md group-hover:border-[#FF6B35]/30 group-hover:scale-105 transition-all duration-500" /></div>
                      </div>
                      <div className="text-center mt-3">
                        <div className="flex items-center justify-center gap-1"><h3 className="text-[16px] font-extrabold text-[#0B2027] group-hover:text-[#FF6B35] transition-colors">{c.name}</h3><span className="text-[#FF6B35] text-sm">❁</span></div>
                        <p className="text-[11px] font-black text-[#0B2027]/30">{c.handle}</p>
                        <p className="text-[10px] font-bold text-[#0B2027]/40 uppercase mt-1 bg-gray-50 px-2.5 py-1 rounded-md inline-block border border-gray-100">{c.role}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center mt-6 mb-6">
                        <div className="border-r border-gray-100"><p className="text-xl font-black text-[#0B2027]">{c.followers}</p><p className="text-[9px] font-extrabold text-[#0B2027]/40 uppercase">Followers</p></div>
                        <div><p className="text-xl font-black text-[#0B2027]">{c.designs}</p><p className="text-[9px] font-extrabold text-[#0B2027]/40 uppercase">Designs</p></div>
                      </div>
                    </div>
                    <button className="w-full py-3 rounded-xl bg-[#FF6B35] text-white text-xs font-black tracking-wide shadow-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.96] transition-all">Follow +</button>
                  </div>
                ))}
              </div>
            ) : (
              /* --- CAROUSEL MODE: 3D SPOTLIGHT / CENTER ZOOM IN EFFECT --- */
              <div className="relative w-full min-h-[460px] flex items-center justify-start overflow-hidden py-6">
                
                {/* 1. Αριστερό Glass Βελάκι (Εμφανίζεται μόνο όταν είμαστε στο 2ο προφίλ και μετά) */}
                {activeIndex > 0 && (
                  <button 
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 flex items-center justify-center text-lg font-black hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md z-30"
                  >
                    ←
                  </button>
                )}

                {/* 2. Δεξί Glass Βελάκι (Εξαφανίζεται αυτόματα στο τέλος) */}
                {activeIndex < data.creators.length - 1 && (
                  <button 
                    onClick={() => setActiveIndex(activeIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 flex items-center justify-center text-lg font-black hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md z-30"
                  >
                    →
                  </button>
                )}

                {/* 3. Ελεγχόμενο Καρουσέλ με Μαθηματικό Κεντράρισμα */}
                <motion.div 
                  className="flex gap-8 items-center pl-[calc(50vw-180px)] md:pl-[calc(50%-180px)]"
                  animate={{ x: -(activeIndex * 392) }} /* 360px card + 32px gap-8 = 392px step size */
                  transition={{ type: "spring", stiffness: 260, damping: 32 }}
                >
                  {data.creators.map((c, idx) => {
                    const isCenter = idx === activeIndex;
                    const isSide = Math.abs(idx - activeIndex) === 1;

                    return (
                      <motion.div 
                        key={c.id}
                        
                        className="w-[360px] flex-none bg-white border border-gray-100 rounded-[2.2rem] p-5 shadow-[0_12px_35px_rgba(11,32,39,0.02)] flex flex-col justify-between select-none"
                        animate={{
                          scale: isCenter ? 1.06 : 0.92,
                          opacity: isCenter ? 1 : (isSide ? 0.65 : 0.15),
                          zIndex: isCenter ? 20 : 10,
                          filter: isCenter ? "blur(0px)" : "blur(1.5px)"
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      >
                        {/* Εσωτερικό περιεχόμενο κάρτας (Απομονωμένο group hover ανά κάρτα) */}
                        <div className="group flex flex-col h-full w-full">
                          <div className="relative grid grid-cols-3 gap-2 items-center h-[115px] mb-8">
                            <div className="h-full rounded-[1.2rem] overflow-hidden bg-gray-100">
                              <img src={c.imgLeft} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-95 group-hover:opacity-40 transition-all duration-500" />
                            </div>
                            <div className="h-[110%] rounded-[1.2rem] overflow-hidden bg-gray-100 shadow-md relative z-10">
                              <img src={c.imgCenter} alt="" className="w-full h-full object-cover scale-105 group-hover:scale-110 group-hover:rotate-1 transition-all duration-500" />
                            </div>
                            <div className="h-full rounded-[1.2rem] overflow-hidden bg-gray-100">
                              <img src={c.imgRight} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-95 group-hover:opacity-40 transition-all duration-500" />
                            </div>

                            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-20">
                              <img src={c.avatar} alt="" className="w-[4.5rem] h-[4.5rem] rounded-full object-cover border-[4px] border-white shadow-md group-hover:border-[#FF6B35]/30 group-hover:scale-105 transition-all duration-500" />
                            </div>
                          </div>

                          <div className="text-center mt-3">
                            <div className="flex items-center justify-center gap-1">
                              <h3 className="text-[17px] font-extrabold tracking-tight text-[#0B2027] group-hover:text-[#FF6B35] transition-colors duration-300">{c.name}</h3>
                              <span className="text-[#FF6B35] text-sm">❁</span>
                            </div>
                            <p className="text-[11px] font-black text-[#0B2027]/30 tracking-wide">{c.handle}</p>
                            <p className="text-[10px] font-bold text-[#0B2027]/40 uppercase tracking-widest mt-1 bg-gray-50 px-2.5 py-1 rounded-md inline-block border border-gray-100">
                              {c.role}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-center mt-6 mb-6 px-2">
                            <div className="border-r border-gray-100">
                              <p className="text-2xl font-black text-[#0B2027] leading-none">{c.followers}</p>
                              <p className="text-[10px] font-extrabold text-[#0B2027]/40 uppercase mt-1 tracking-wider">Followers</p>
                            </div>
                            <div>
                              <p className="text-2xl font-black text-[#0B2027] leading-none">{c.designs}</p>
                              <p className="text-[10px] font-extrabold text-[#0B2027]/40 uppercase mt-1 tracking-wider">Designs</p>
                            </div>
                          </div>

                          {/* Refined Small Follow Button with isolated Micro-Interactions */}
                          <button className="w-full py-3 rounded-xl bg-[#FF6B35] text-white text-xs font-black tracking-wide shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.96] transition-all">
                            Follow +
                          </button>
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

          {/* --- MIDDLE SECTION: UNIFIED GLASSMORPHIC NAVIGATION DOCK (Premium White Layout) --- */}
          <div className="flex items-center justify-center w-full mb-12 border-t border-gray-200/40 pt-10 mt-6">
            <div className="inline-flex gap-1.5 bg-white/40 backdrop-blur-xl border border-white/70 rounded-full p-1.5 shadow-[0_12px_30px_-10px_rgba(11,32,39,0.03)] overflow-x-auto max-w-full scrollbar-none">
              {data.regions.map((region) => {
                const isActive = activeRegion === region;
                return (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className="relative px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-colors duration-300 select-none outline-none whitespace-nowrap"
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

          {/* --- BOTTOM SECTION: TRIP CONTENT GRID (Full-bleed minimal view) --- */}
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredTrips.map((t) => (
                <div key={t.id} className="flex flex-col h-full group">
                  <div className="relative aspect-[4/3] w-full rounded-[1.4rem] overflow-hidden bg-gray-100 flex-none shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>

                  <div className="pt-3 flex flex-col justify-between flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={t.avatar} alt="" className="w-5 h-5 rounded-full object-cover flex-none shadow-sm" />
                        <span className="text-[12px] font-black text-[#0B2027] truncate">{t.author}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-[11px] font-extrabold text-[#0B2027] flex-none">
                        <span className="flex items-center gap-1 hover:text-[#FF6B35] cursor-pointer">
                          ❤️ <span className="text-[#0B2027]/40 group-hover:text-[#0B2027]/70 transition-colors">{t.likes}</span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#FF6B35] cursor-pointer">
                          🔖 <span className="text-[#0B2027]/40 group-hover:text-[#0B2027]/70 transition-colors">{t.saves}</span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#FF6B35] cursor-pointer">
                          💬 <span className="text-[#0B2027]/40 group-hover:text-[#0B2027]/70 transition-colors">{t.comments}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-[2rem]">
              <p className="text-[#0B2027]/40 font-bold text-sm">No specific routes logged for {activeRegion} yet.</p>
            </div>
          )}

        </div>
      </div>

      {/* --- MOUNTAIN FOOTER --- */}
      <div className="relative bg-[#000A0F] w-full mt-auto z-10 pt-24 pb-4 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[150px] bg-gradient-to-b from-[#F4F5F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" alt="Mountain range" className="w-full h-full object-cover object-center opacity-60 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000A0F] via-[#000A0F]/60 to-transparent" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center pt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight max-w-[18ch] leading-tight mb-8">
            Your next trip is <em className="text-[#FF6B35] not-italic">someone&apos;s last one.</em>
          </h2>
          
          <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full shadow-lg text-sm">
            Start Planning
          </button>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-16 mb-12 text-left">
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Get Started</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Get the app</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Log in</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">About</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">About us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Features</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Travel Planner</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Travel Tracker</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Help & Support</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                </ul>
             </div>
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

    </main>
  );
}