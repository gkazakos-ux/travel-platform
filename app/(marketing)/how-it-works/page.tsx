"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

// --- 1. DARK NAVBAR ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "explore", label: "Explore", href: "/explore" },
    { id: "how-it-works", label: "How it works", href: "/how-it-works" },
    { id: "login", label: "Log in", href: "/login" },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${isScrolled ? "top-4 px-4" : "top-0 px-[clamp(20px,5vw,52px)] py-6"}`}>
      <div className={`relative flex items-center justify-between w-full max-w-[1500px] transition-all duration-500 ${
        isScrolled 
          ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-6 py-3 rounded-full" 
          : "bg-transparent text-white"
      }`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-[22px] tracking-tight text-white hover:opacity-80 transition-opacity">
          <span className="w-[16px] h-[16px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block shadow-[0_0_15px_#FF6B35]" />
          pathlore
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
            {navLinks.map(item => (
              <Link 
                key={item.id} 
                href={item.href} 
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-5 py-2 transition-colors rounded-full ${item.id === "how-it-works" ? "text-[#FF6B35]" : "text-white/80 hover:text-white"}`}
              >
                {hoveredItem === item.id && (
                  <motion.div 
                    layoutId="dark-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
          <Link href="/signup" className="ml-2 px-6 py-2.5 rounded-full bg-[#FF6B35] text-white shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:scale-105 active:scale-95 transition-all font-extrabold">
            Start Planning
          </Link>
        </div>

      </div>
    </nav>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Scroll Tracking για το κεντρικό Sticky Section
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActiveStep(0);
    else if (v < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  return (
    <main ref={containerRef} className="w-full bg-[#000A0F] text-white font-sans flex flex-col min-h-screen overflow-x-hidden selection:bg-[#FF6B35] selection:text-white">
      <Navbar />

      {/* ── 1. HIGH-TECH HERO SECTION ── */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        
        {/* Neon Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,107,53,0.15),transparent_60%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,219,154,0.08),transparent_60%)] blur-[80px] pointer-events-none" />
        
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0 mask-image:linear-gradient(to_bottom,black,transparent)" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[13px] font-bold tracking-widest text-white/80 uppercase shadow-[0_0_20px_rgba(255,107,53,0.1)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] shadow-[0_0_10px_#FF6B35] animate-pulse" />
            The Engine behind the journey
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-[90px] font-extrabold tracking-tighter leading-[1.05]"
          >
            Your entire trip, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] filter drop-shadow-[0_0_30px_rgba(255,107,53,0.4)]">
              beautifully orchestrated.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl font-medium leading-relaxed"
          >
            From the first spark of inspiration to the offline navigation in a foreign alley. Discover how pathlore turns chaos into pure adventure.
          </motion.p>
        </div>
      </section>

      {/* ── 2. SCROLL-TELLING SECTION (The Core) ── */}
      {/* 400vh δίνει αρκετό χώρο για 3 γεμάτα scroll steps */}
      <section ref={storyRef} className="relative w-full h-[400vh] bg-[#000A0F]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
          
          <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-20">
            
            {/* LEFT: Changing Text Logic */}
            <div className="flex flex-col relative h-[300px] justify-center">
              
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div 
                    key="step0"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-[#FF6B35] font-extrabold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                      <span className="w-6 h-[2px] bg-[#FF6B35]"></span> Phase 01
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
                      Build your <br/>Master Itinerary.
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md">
                      Clone trips from expert travelers with one click. Drag, drop, and reorganize days effortlessly. Every location is instantly pinned on your private interactive map.
                    </p>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-[#00DB9A] font-extrabold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                      <span className="w-6 h-[2px] bg-[#00DB9A]"></span> Phase 02
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
                      Navigate completely <br/><span className="text-[#00DB9A] drop-shadow-[0_0_15px_rgba(0,219,154,0.4)]">Off-the-Grid.</span>
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md">
                      No signal? No problem. Your entire route, tickets, and notes are cached locally. Our smart compass guides you to your next waypoint without draining your battery.
                    </p>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-[#A259FF] font-extrabold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                      <span className="w-6 h-[2px] bg-[#A259FF]"></span> Phase 03
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
                      Relive and Share <br/>the magic.
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md">
                      Your tracked path automatically turns into a cinematic timeline. Add photos, write your thoughts, and publish it to inspire the next wave of explorers.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {[0, 1, 2].map(step => (
                  <div key={step} className={`w-1.5 transition-all duration-500 rounded-full ${activeStep === step ? "h-8 bg-[#FF6B35] shadow-[0_0_10px_#FF6B35]" : "h-2 bg-white/20"}`} />
                ))}
              </div>
            </div>

            {/* RIGHT: 3D Glassmorphic Phone Container */}
            <div className="relative w-full h-[650px] flex justify-center items-center perspective-[1000px]">
              
              {/* Outer Glow */}
              <div className={`absolute w-[300px] h-[600px] rounded-[3rem] blur-[80px] transition-all duration-1000 ${
                activeStep === 0 ? "bg-[#FF6B35]/30" : activeStep === 1 ? "bg-[#00DB9A]/30" : "bg-[#A259FF]/30"
              }`} />

              {/* The Phone Device */}
              <motion.div 
                className="relative w-[320px] h-[650px] rounded-[3.5rem] bg-[#000508] border-[8px] border-[#1A2E35] shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden z-20 flex flex-col"
                animate={{ rotateX: activeStep === 1 ? 5 : 0, rotateY: activeStep === 2 ? -10 : 0, scale: activeStep === 1 ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Dynamic Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1A2E35] rounded-b-[18px] z-50 flex items-center justify-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-black/50" />
                   <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeStep === 1 ? "bg-[#00DB9A] shadow-[0_0_5px_#00DB9A]" : "bg-black/50"}`} />
                </div>

                {/* Phone Screens (Relative inside the phone) */}
                <div className="relative w-full h-full bg-[#0A1118]">
                  <AnimatePresence mode="popLayout">
                    
                    {/* SCREEN 1: PLAN (Map & Pins) */}
                    {activeStep === 0 && (
                      <motion.div key="sc1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-4 pt-14 flex flex-col gap-3">
                        <div className="w-full h-[220px] bg-[#1A2E35] rounded-3xl relative overflow-hidden">
                          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" fill="none" stroke="#FF6B35" strokeWidth="1" strokeDasharray="4 4"><path d="M10,80 Q30,20 60,50 T90,10" /></svg>
                          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#FF6B35] rounded-full shadow-[0_0_15px_#FF6B35] border-2 border-white -translate-x-1/2 -translate-y-1/2" />
                          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white rounded-full shadow-md border-2 border-[#1A2E35]" />
                          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white rounded-full shadow-md border-2 border-[#1A2E35]" />
                        </div>
                        {["Day 1: Arrival", "Day 2: Coastal Drive", "Day 3: Hiking"].map((txt, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{i+1}</div>
                            <div className="flex-1 h-3 bg-white/20 rounded-full" />
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* SCREEN 2: NAVIGATE (Dark Radar) */}
                    {activeStep === 1 && (
                      <motion.div key="sc2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#000000] flex flex-col items-center justify-center">
                        <div className="absolute top-12 flex items-center gap-2 bg-[#00DB9A]/10 px-4 py-2 rounded-full border border-[#00DB9A]/20">
                          <span className="w-2 h-2 rounded-full bg-[#00DB9A] animate-pulse" />
                          <span className="text-[#00DB9A] text-xs font-bold tracking-widest uppercase">Offline GPS Active</span>
                        </div>
                        
                        <div className="relative w-48 h-48 rounded-full border border-white/10 flex items-center justify-center mt-10">
                          <div className="absolute w-32 h-32 rounded-full border border-white/20" />
                          <div className="absolute w-16 h-16 rounded-full border border-white/30" />
                          <div className="w-4 h-4 rounded-full bg-[#00DB9A] shadow-[0_0_20px_#00DB9A] relative z-10" />
                          {/* Radar Sweep */}
                          <motion.div 
                            animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(0,219,154,0.4)_100%)]"
                          />
                        </div>

                        <div className="mt-16 bg-[#111A18] w-[90%] rounded-3xl p-5 border border-white/5 flex flex-col items-center">
                           <div className="text-4xl font-black text-white tracking-tighter">1.2 km</div>
                           <div className="text-white/40 text-xs font-bold uppercase mt-1">To hidden waterfall</div>
                        </div>
                      </motion.div>
                    )}

                    {/* SCREEN 3: SHARE (Social Feed) */}
                    {activeStep === 2 && (
                      <motion.div key="sc3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0A1118] p-4 pt-16 overflow-hidden">
                        <div className="w-full bg-[#1A2128] rounded-[2rem] p-4 shadow-xl border border-white/5 flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#A259FF] p-[2px]">
                               <div className="w-full h-full bg-[#0A1118] rounded-full border-2 border-[#1A2128]" />
                            </div>
                            <div>
                               <div className="h-2 w-20 bg-white/20 rounded-full mb-2" />
                               <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                            </div>
                          </div>
                          <div className="w-full h-[200px] rounded-2xl bg-[url('https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center" />
                          <div className="flex gap-2">
                             <div className="w-16 h-6 rounded-full bg-white/10" />
                             <div className="w-12 h-6 rounded-full bg-white/10" />
                          </div>
                        </div>
                        
                        <div className="w-full bg-[#1A2128] rounded-[2rem] p-4 shadow-xl border border-white/5 flex flex-col gap-3 mt-4 opacity-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10" />
                            <div className="flex-1 h-3 bg-white/10 rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 3D Floating Elements (Outside the phone) */}
              <AnimatePresence>
                 {activeStep === 0 && (
                   <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: -100 }} exit={{ opacity: 0 }} className="absolute top-1/4 z-30 bg-white text-[#0B2027] px-4 py-2 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2">
                     <span className="text-xl">📍</span> Added to Draft
                   </motion.div>
                 )}
                 {activeStep === 1 && (
                   <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 100 }} exit={{ opacity: 0 }} className="absolute bottom-1/4 z-30 bg-[#00DB9A] text-black px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(0,219,154,0.4)] font-bold text-xs flex items-center gap-2">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> 
                     Battery Saver
                   </motion.div>
                 )}
                 {activeStep === 2 && (
                   <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 120 }} exit={{ opacity: 0 }} className="absolute z-30 bg-[#A259FF] text-white px-5 py-3 rounded-full shadow-[0_0_30px_rgba(162,89,255,0.4)] font-bold text-sm flex items-center gap-2">
                     Published to Community
                   </motion.div>
                 )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HIGH-TECH BENTO GRID ── */}
      <section className="w-full bg-[#000A0F] py-32 relative z-20 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Features that feel like <span className="text-[#FF6B35]">magic.</span></h2>
            <p className="text-white/40 max-w-xl mx-auto font-medium">We obsess over the details so you can focus on the journey. No cluttered UI, no tracking ads. Just pure exploration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1 */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#111A1F] to-[#050A0D] border border-white/10 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between group overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,107,53,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 max-w-sm mb-8 md:mb-0">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  <span className="text-xl">🔐</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Total Privacy Control</h3>
                <p className="text-white/50 leading-relaxed">Share your routes with the world, keep them for a private group, or lock them down just for you. Your data is yours.</p>
              </div>
              <div className="relative z-10 bg-[#000A0F] p-2 rounded-full border border-white/10 flex items-center shadow-inner">
                <div className="bg-white/10 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md">Private</div>
                <div className="text-white/40 px-6 py-2.5 text-sm font-bold">Public</div>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-gradient-to-br from-[#111A1F] to-[#050A0D] border border-white/10 rounded-[2rem] p-10 flex flex-col items-start justify-end group overflow-hidden relative min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#00DB9A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-4xl font-black text-white mb-2 relative z-10">4%</h3>
              <p className="text-white/50 text-sm font-medium relative z-10">Battery used per day while tracking your route on background.</p>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-gradient-to-br from-[#111A1F] to-[#050A0D] border border-white/10 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group overflow-hidden relative">
               <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">🌍</div>
               <h3 className="text-xl font-bold text-white mb-2">Works Offline</h3>
               <p className="text-white/50 text-sm">Download regions instantly.</p>
            </div>

            {/* Bento Card 4 */}
            <div className="md:col-span-2 bg-[#FF6B35] rounded-[2rem] p-10 flex items-center justify-between group overflow-hidden relative min-h-[250px]">
               <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
               <div className="relative z-10 max-w-sm">
                 <h3 className="text-3xl font-extrabold text-white mb-3">Syncs across devices</h3>
                 <p className="text-white/90">Plan on your desktop with the big screen. Navigate in the wild with your phone. Everything updates in real-time.</p>
               </div>
               <div className="hidden md:flex gap-4 relative z-10">
                 <div className="w-16 h-24 bg-white/20 backdrop-blur-md rounded-xl border border-white/40 shadow-xl" />
                 <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-xl border border-white/40 shadow-xl mt-8" />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. THE MOUNTAIN FOOTER ── */}
      <footer className="relative bg-[#000A0F] overflow-hidden pt-32 z-10">
        <div className="absolute top-0 inset-x-0 h-[200px] bg-gradient-to-b from-[#000A0F] to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
            alt="Mountain range" 
            className="w-full h-full object-cover object-top opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000A0F]/80 to-[#000A0F]" />
        </div>

        <div className="relative z-20 max-w-[1500px] mx-auto px-6 md:px-14 flex flex-col items-center pt-24">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white text-center tracking-tight max-w-[18ch] leading-tight mb-8">
            Your next trip is <em className="text-[#FF6B35] not-italic">someone&apos;s last one.</em>
          </h2>
          
          <button className="bg-[#FF6B35] text-white font-extrabold px-10 py-4 rounded-full shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all flex items-center gap-3 mb-32 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,107,53,0.6)]">
            Start Planning
          </button>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-12 mb-8 text-left">
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-white/40 mb-5 uppercase">Platform</h4>
              <ul className="space-y-3.5 text-sm font-medium text-white/80">
                <li><Link href="/explore" className="hover:text-[#FF6B35] transition-colors">Explore</Link></li>
                <li><Link href="/how-it-works" className="hover:text-[#FF6B35] transition-colors">How it works</Link></li>
                <li><Link href="/login" className="hover:text-[#FF6B35] transition-colors">Log in</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-white/40 mb-5 uppercase">Company</h4>
              <ul className="space-y-3.5 text-sm font-medium text-white/80">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-white/40 mb-5 uppercase">Features</h4>
              <ul className="space-y-3.5 text-sm font-medium text-white/80">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Travel Planner</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Offline Maps</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-white/40 mb-5 uppercase">Legal</h4>
              <ul className="space-y-3.5 text-sm font-medium text-white/80">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="w-full flex justify-between items-center text-xs font-medium text-white/30 pb-8">
            <p>© 2026 pathlore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}