"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import JourneySection from "@/components/JourneySection";
import DestinationsSection from "@/components/DestinationsSection";

// --- MAIN COMPONENT ---
export default function NomadFlowLanding() {
  const [activeStep, setActiveStep] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // --- HERO SCROLL ---
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoScale = useTransform(heroProgress, [0, 1], [1, 0.78]);
  const photoRadius = useTransform(heroProgress, [0, 1], ["0px", "46px"]);
  const copyOpacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const copyY = useTransform(heroProgress, [0, 0.5], ["0px", "-100px"]);
  const phoneOpacity = useTransform(heroProgress, [0.2, 0.6], [0, 1]);
  const phoneY = useTransform(heroProgress, [0.2, 1], ["80px", "0px"]);
  const phoneScale = useTransform(heroProgress, [0.2, 1], [0.85, 1]);

  // --- STORY SCROLL ---
  const { scrollYProgress: storyProgress } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
  useMotionValueEvent(storyProgress, "change", (v) => {
    if (v < 0.33) setActiveStep(0);
    else if (v < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  const carouselScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      sliderRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="bg-[#F3EFE6] text-gray-900 font-sans w-full">

      {/* --- SECTION 1: HERO --- */}
      <section ref={heroRef} className="relative h-[230vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          <motion.div
            style={{ scale: photoScale, borderRadius: photoRadius }}
            className="absolute inset-0 w-full h-full origin-center overflow-hidden bg-[#0c3543] shadow-[0_30px_70px_-22px_rgba(7,20,25,0.6)] z-0"
          >
            <div className="absolute inset-0 bg-[#071419]/45 z-10" />
<img
  src="/images/hero-bg.jpg"
  alt="Pathlore Hero Background"
  className="w-full h-full object-cover"
/>
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-40 text-white text-[11px] tracking-[0.18em] uppercase font-semibold flex flex-col items-center gap-[8px] opacity-85">
              Scroll <span className="w-[1px] h-[40px] bg-gradient-to-b from-white to-transparent animate-[pulse_2s_infinite]" />
            </div>
          </motion.div>

          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center">
            <div className="flex gap-3 mb-6">
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                ✨ 20,000+ Secret Spots
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              One travel app for <br /> all your adventures
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 drop-shadow-md">
              Join the travelers who plan, track, and relive their trips with Pathlore. Bypass tourist traps forever.
            </p>
            <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(255,107,53,0.3)]">
              Start Planning
            </button>
          </motion.div>

          <motion.div style={{ opacity: phoneOpacity, y: phoneY, scale: phoneScale }} className="absolute z-30 w-[280px] h-[580px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 md:mt-0">
            <div className="w-full h-full bg-[#0c2630] border-[9px] border-[#06161c] rounded-[42px] shadow-2xl p-[13px] relative">
              <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#06161c] rounded-b-[16px] z-50" />
              <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#133A4A] relative">
                <svg className="absolute inset-0 w-full h-full text-[#FF6B35]" viewBox="0 0 280 570" fill="none">
                  <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,8" d="M 120 480 C 180 400, 70 320, 150 280 S 230 200, 180 120" />
                  <circle cx="120" cy="480" r="5" fill="#fff" />
                  <circle cx="150" cy="280" r="5" fill="#fff" />
                  <circle cx="180" cy="120" r="5" fill="#fff" />
                </svg>
                <div className="absolute bottom-[40px] left-4 right-4 bg-[#F8F9FA] rounded-[16px] p-4 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-lg shadow-sm">M</div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-[14px] leading-tight mb-1">8 days in Portugal</h3>
                    <p className="text-[11px] text-gray-500 font-semibold">Maria · Lisbon → Porto</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: STICKY STORY (DISCOVER / SAVE / COPY) --- */}
      <section ref={storyRef} className="relative h-[300vh] bg-[#F3EFE6] z-20">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center w-full">
          <div className="absolute inset-0 flex items-center justify-start pl-[2vw] pointer-events-none z-0 overflow-hidden">
            <div className={`absolute text-[20vw] font-black tracking-tighter text-[#0B2027]/[0.03] select-none uppercase font-mono transition-all duration-1000 whitespace-nowrap ${activeStep === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>DISCOVER</div>
            <div className={`absolute text-[24vw] font-black tracking-tighter text-[#0B2027]/[0.03] select-none uppercase font-mono transition-all duration-1000 whitespace-nowrap ${activeStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>SAVE</div>
            <div className={`absolute text-[24vw] font-black tracking-tighter text-[#0B2027]/[0.03] select-none uppercase font-mono transition-all duration-1000 whitespace-nowrap ${activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>COPY</div>
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[350px]">
                <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${activeStep === 0 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-6 pointer-events-none z-0"}`}>
                  <div className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">DISCOVER</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight mb-6 leading-tight">Find a real trip</h2>
                  <p className="text-lg text-gray-500 max-w-xl">Browse day-by-day itineraries from travellers who actually went.</p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-10 h-2 rounded-full bg-[#FF6B35]" /><div className="w-6 h-2 rounded-full bg-gray-300" /><div className="w-6 h-2 rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${activeStep === 1 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-6 pointer-events-none z-0"}`}>
                  <div className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">SAVE</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight mb-6 leading-tight">Keep the ones you love</h2>
                  <p className="text-lg text-gray-500 max-w-xl">Bookmark itineraries and build your own shortlist for the trip you&apos;re planning.</p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-6 h-2 rounded-full bg-gray-300" /><div className="w-10 h-2 rounded-full bg-[#FF6B35]" /><div className="w-6 h-2 rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${activeStep === 2 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-6 pointer-events-none z-0"}`}>
                  <div className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">COPY</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight mb-6 leading-tight">Make it your own</h2>
                  <p className="text-lg text-gray-500 max-w-xl">Copy any itinerary into your own draft in one tap, then tweak every day.</p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-6 h-2 rounded-full bg-gray-300" /><div className="w-6 h-2 rounded-full bg-gray-300" /><div className="w-10 h-2 rounded-full bg-[#FF6B35]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center relative items-center w-full h-[640px]">
                <div className="absolute inset-0 bg-[#0B2027]/5 backdrop-blur-xl rounded-[3.5rem] transform scale-110 -z-10 border border-[#0B2027]/10 shadow-inner" />
                <div className="relative w-[300px] h-[600px]">
                  <div className="absolute inset-0 bg-[#0B2027] rounded-[3rem] border-[8px] border-[#0B2027] shadow-2xl p-2.5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0B2027] rounded-b-2xl z-50" />
                    <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-[#F3EFE6]">
                      <div className={`absolute inset-0 bg-[#F3EFE6] p-4 pt-14 transition-all duration-700 flex flex-col gap-4 ${activeStep === 0 ? "opacity-100 scale-100 z-30" : "opacity-0 scale-95 pointer-events-none z-0"}`}>
                        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#5294A6]" />
                          <div><div className="font-bold text-sm text-[#0B2027] mb-1.5">8 days in Portugal</div><div className="h-2 w-24 bg-gray-100 rounded-full" /></div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#E4531F]" />
                          <div><div className="font-bold text-sm text-[#0B2027] mb-1.5">Tokyo in a week</div><div className="h-2 w-24 bg-gray-100 rounded-full" /></div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#4A7766]" />
                          <div><div className="font-bold text-sm text-[#0B2027] mb-1.5">Patagonia road trip</div><div className="h-2 w-24 bg-gray-100 rounded-full" /></div>
                        </div>
                      </div>

                      <div className={`absolute inset-0 bg-[#F3EFE6] p-4 pt-12 transition-all duration-700 ${activeStep >= 1 ? "opacity-100 scale-100 z-30" : "opacity-0 scale-95 pointer-events-none z-0"}`}>
                        <div className="w-full h-full bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col relative">
                          <div className="h-[140px] relative bg-gradient-to-br from-[#1d6076] to-[#0c3543] w-full overflow-hidden shrink-0">
                            <svg className="absolute inset-0 w-full h-full text-[#FF6B35]" viewBox="0 0 280 150" fill="none">
                              <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5,6" d="M 30 120 Q 90 90, 150 100 T 250 40" />
                              <circle cx="30" cy="120" r="4" fill="#fff" /><circle cx="150" cy="100" r="4" fill="#fff" /><circle cx="250" cy="40" r="4" fill="#fff" />
                            </svg>
                            <div className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                              Saved
                            </div>
                            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">8 days</div>
                          </div>
                          <div className="p-4 flex flex-col flex-1 pb-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-9 h-9 rounded-full bg-[#E4531F] text-white flex items-center justify-center font-bold text-sm shrink-0">M</div>
                              <div className="flex flex-col text-left">
                                <span className="text-[13px] font-extrabold text-[#0B2027]">Maria</span>
                                <span className="text-[10px] text-gray-400 font-medium">Lisbon → Porto</span>
                              </div>
                            </div>
                            <h3 className="text-xl font-extrabold text-[#0B2027] text-left mb-3">8 days in Portugal</h3>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {["Day 1", "Day 2", "Day 3", "+5"].map((tag) => (
                                <span key={tag} className="bg-[#EAF0F2] text-[#4A5B63] text-[10px] font-bold px-3 py-1.5 rounded-full">{tag}</span>
                              ))}
                            </div>
                            <div className="mt-auto flex flex-col gap-3">
                              <div className="flex gap-2 w-full">
                                <button className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all duration-500 ${activeStep === 1 ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg shadow-orange-500/30" : "bg-white border-gray-200 text-[#0B2027]"}`}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                                  Save
                                </button>
                                <button className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all duration-500 ${activeStep === 2 ? "bg-[#0B2027] border-[#0B2027] text-white shadow-lg shadow-slate-800/30" : "bg-white border-gray-200 text-[#0B2027]"}`}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                                  Copy
                                </button>
                              </div>
                              <div className={`overflow-hidden transition-all duration-500 ${activeStep === 2 ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"}`}>
                                <div className="w-full bg-[#FFF4F0] border border-dashed border-[#FF6B35]/40 rounded-xl p-3 text-center">
                                  <span className="text-[10px] font-bold text-[#E4531F] leading-tight block">Saved to your trips · Draft<br />ready to edit</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: DESTINATIONS SPLIT REVEAL --- */}
      <DestinationsSection />

      {/* --- SECTION 4: JOURNEY / TRIP LOG --- */}
      <JourneySection />

{/* --- SECTION 5: REVIEWS --- */}
      <section className="bg-gradient-to-b from-white via-white to-transparent pt-32 pb-10 text-center relative z-20 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-4xl md:text-5xl font-extrabold text-[#00293D] tracking-tight"
        >
          Loved by <br /> explorers everywhere
        </motion.h2>

        <div className="relative w-full max-w-7xl mx-auto px-6 mt-16">
          {/* Αριστερό Βελάκι με Motion */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => carouselScroll("left")} 
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 bg-[#001621] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold transition-transform cursor-pointer"
          >
            ❮
          </motion.button>
          
          {/* Δεξί Βελάκι με Motion */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => carouselScroll("right")} 
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 bg-[#001621] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold transition-transform cursor-pointer"
          >
            ❯
          </motion.button>

          <div
            ref={sliderRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none px-[5%] md:px-[15%] py-4 overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" }}
          >
            
            {/* ΣΤΗΛΗ 1: ΚΕΙΜΕΝΑ (Fade-in από τα δεξιά) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left"
            >
              <motion.div whileHover={{ y: -6 }} className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100 transition-all hover:shadow-md duration-300">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Perfect for tracking trips</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">CONOR, MARCH 9 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">I love this app! It&apos;s perfect for tracking trips and I&apos;ve ordered a few of the travel books which are very good quality and really nice.</p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </motion.div>

              <motion.div whileHover={{ y: -6 }} className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100 transition-all hover:shadow-md duration-300">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">See where you&apos;ve been</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">MARCUS, FEB 22 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">It tracks where you&apos;ve been during the day and you can add your photos and comments later. Great to look back on over the years.</p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </motion.div>
            </motion.div>

            {/* ΣΤΗΛΗ 2: BINTEO CARD ALEX (Με zoom εφέ στην εικόνα και το play) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover="hover"
              className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-lg overflow-hidden snap-center text-left"
            >
              <motion.img 
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.4 }}
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" 
                alt="Alex" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001621]/90 via-[#001621]/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold text-white">AH</div>
                <div><p className="text-xs font-bold text-white">Alex Hubin</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Adventurer</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  variants={{ hover: { scale: 1.15, backgroundColor: "rgba(255,255,255,0.3)" } }}
                  className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-all shadow-md"
                >
                  ▶
                </motion.span>
              </div>
            </motion.div>

            {/* ΣΤΗΛΗ 3: ΚΕΙΜΕΝΑ (Διαδοχική καθυστέρηση) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left"
            >
              <motion.div whileHover={{ y: -6 }} className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100 transition-all hover:shadow-md duration-300">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Easy to use</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">RACHEL, MARCH 15 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">I&apos;ve been using this app for several trips now. Easy peasy to use. Shared it with family and friends who are using this app as well now.</p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </motion.div>

              <motion.div whileHover={{ y: -6 }} className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100 transition-all hover:shadow-md duration-300">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Stops me wasting time</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">DEBORAH, MARCH 19 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">Just completed a 4 month trip using Pathlore. Totally love it, stops me wasting time private messaging people about what we are doing!</p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </motion.div>
            </motion.div>

            {/* ΣΤΗΛΗ 4: BINTEO CARD LEONI */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover="hover"
              className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-lg overflow-hidden snap-center text-left"
            >
              <motion.img 
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.4 }}
                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" 
                alt="Leoni" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001621]/90 via-[#001621]/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00DB9A] text-[#001621] flex items-center justify-center text-xs font-bold">LK</div>
                <div><p className="text-xs font-bold text-white">Leoni Kolberg</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Solo Cyclist</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  variants={{ hover: { scale: 1.15, backgroundColor: "rgba(255,255,255,0.3)" } }}
                  className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-all shadow-md"
                >
                  ▶
                </motion.span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}