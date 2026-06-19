"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Link from "next/link";

// --- 1. NAVBAR COMPONENT ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 text-gray-900 shadow-sm" 
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tighter">
          NomadFlow
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold drop-shadow-md">
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Explore</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">How it works</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold hover:text-[#FF6B35] transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform">
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- 2. MAIN LANDING PAGE COMPONENT ---
export default function NomadFlowLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Refs για το Hero Section Animation
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Ref για το Story Section
  const storyRef = useRef<HTMLDivElement>(null);

  // Φόρτωση του GSAP μέσω CDN για να μην χρειάζεται Terminal/npm install
  useEffect(() => {
    // Συνάρτηση που αρχιζει τα animations αφού φορτωθούν τα scripts
    const initGSAP = () => {
      const globalWindow = window as any;
      if (!globalWindow.gsap || !globalWindow.ScrollTrigger) return;

      const gsap = globalWindow.gsap;
      const ScrollTrigger = globalWindow.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      // 1. HERO ANIMATION (Zoom-out + Phone Grow)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self: any) => {
          const p = self.progress;
          
          if (photoRef.current) {
            photoRef.current.style.transform = `scale(${1.12 - p * 0.34})`;
            photoRef.current.style.borderRadius = `${p * 46}px`;
          }
          if (overlayRef.current) {
            overlayRef.current.style.opacity = `${0.45 - p * 0.32}`;
          }
          if (copyRef.current) {
            copyRef.current.style.opacity = `${Math.max(0, 1 - p * 1.7)}`;
            copyRef.current.style.transform = `translateY(${-6 - p * 6}vh)`;
          }
          if (phoneRef.current) {
            const ph = Math.min(1, p * 1.45);
            phoneRef.current.style.opacity = `${ph}`;
            phoneRef.current.style.transform = `translateY(${40 - ph * 40}px) scale(${0.78 + ph * 0.22})`;
          }
        }
      });

      // 2. SCROLL STORY ANIMATION (Αλλαγή Steps χωρίς κενά)
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self: any) => {
          const p = self.progress;
          const step = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
          setActiveStep(step);
        }
      });
    };

    // Αν το GSAP υπάρχει ήδη, το τρέχουμε
    if ((window as any).gsap && (window as any).ScrollTrigger) {
      initGSAP();
    } else {
      // Αλλιώς δημιουργούμε τα script tags δυναμικά
      const gsapScript = document.createElement("script");
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.async = true;

      const triggerScript = document.createElement("script");
      triggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      triggerScript.async = true;

      gsapScript.onload = () => {
        document.body.appendChild(triggerScript);
      };

      triggerScript.onload = () => {
        initGSAP();
      };

      document.body.appendChild(gsapScript);
    }
  }, []);

  const carouselScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white relative min-h-screen font-sans w-full overflow-y-auto overflow-x-hidden text-gray-900">
      <Navbar />

      {/* --- SECTION 1: HERO ZOOM OUT (230vh) --- */}
      <section ref={heroRef} className="relative h-[230vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          <div ref={photoRef} className="absolute inset-0 w-full h-full origin-center will-change-transform bg-gradient-to-br from-[#1d6076] to-[#0c3543] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1900&q=80" 
              alt="Hero Background" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div ref={overlayRef} className="absolute inset-0 bg-black/45 will-change-opacity z-10" />

          <div ref={copyRef} className="absolute z-20 text-center max-w-4xl mx-auto px-6 will-change-transform flex flex-col items-center text-white">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/14 border border-white/25 px-[14px] py-[7px] rounded-full mb-[22px]">✨ 20,000+ Secret Spots</span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none mb-5 drop-shadow-md">
              One travel app for <br /> all your adventures
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl opacity-90 leading-relaxed">
              Join the travelers who plan, track, and relive their trips with NomadFlow. Bypass tourist traps forever.
            </p>
          </div>

          {/* Το κινητό που μεγαλώνει μέσα στο Hero */}
          <div ref={phoneRef} className="absolute z-30 w-[280px] h-[570px] will-change-transform opacity-0 pointer-events-none">
            <div className="w-full h-full bg-[#0c2630] border-[9px] border-[#06161c] rounded-[42px] shadow-2xl p-[13px] relative">
              <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#06161c] rounded-b-[16px] z-50"></div>
              <div className="w-full h-full rounded-[30px] overflow-hidden relative bg-[#eef1f0]">
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#173e4b,#0c2630)] p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full text-[#FF6B35]" viewBox="0 0 280 570" fill="none" preserveAspectRatio="none">
                      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="7,8" d="M40 480 C 110 400, 70 320, 150 280 S 230 200, 210 90" />
                      <circle cx="40" cy="480" r="6" fill="white"/>
                      <circle cx="150" cy="280" r="6" fill="white"/>
                      <circle cx="210" cy="90" r="6" fill="white"/>
                    </svg>
                  </div>
                  <div className="mt-auto relative z-10 bg-white/95 rounded-[16px] p-[12px] py-[14px] shadow-lg flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E4531F] text-white flex items-center justify-center font-bold text-xs">M</div>
                    <div className="text-left">
                      <b className="text-xs font-bold text-gray-900 block leading-tight">8 days in Portugal</b>
                      <small className="text-[10px] text-[#8a9aa1]">Maria · Lisbon → Porto</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-30 text-white text-[11px] tracking-[0.18em] uppercase font-semibold flex flex-col items-center gap-2 opacity-85">
            Scroll <span className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent animate-pulse" />
          </div>

        </div>
      </section>

      {/* --- SECTION 2: INTERACTIVE STICKY PHONE SCROLL STORY (380vh) --- */}
      <section ref={storyRef} className="relative h-[380vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[repeating-radial-gradient(circle_at_85%_18%,transparent_0_50px,rgba(11,32,39,0.04)_50px_51px)]">
          <div className="w-full max-w-[1080px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Αριστερή Στήλη: Κείμενα */}
            <div className="relative min-h-[320px] w-full flex items-center">
              {/* STEP 1 */}
              <div className={`absolute inset-0 w-full flex flex-col justify-center transition-all duration-500 transform ${activeStep === 0 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}`}>
                <div className="text-xs font-semibold text-[#62B6C7] tracking-wider mb-[18px]">01 / 03</div>
                <div className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-3">Discover</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-[18px] tracking-tight leading-tight">Find a real trip</h2>
                <p className="text-base md:text-lg text-[#4a5b63] max-w-[34ch] leading-relaxed">Browse day-by-day itineraries from travellers who actually went.</p>
                <div className="flex gap-2 mt-8"><span className={`w-7 h-1 rounded-full transition-all duration-300 ${activeStep === 0 ? 'bg-[#FF6B35]' : 'bg-[#d7d0c2]'}`}></span><span className="w-7 h-1 bg-[#d7d0c2] rounded-full"></span><span className="w-7 h-1 bg-[#d7d0c2] rounded-full"></span></div>
              </div>

              {/* STEP 2 */}
              <div className={`absolute inset-0 w-full flex flex-col justify-center transition-all duration-500 transform ${activeStep === 1 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}`}>
                <div className="text-xs font-semibold text-[#62B6C7] tracking-wider mb-[18px]">02 / 03</div>
                <div className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-3">Save</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-[18px] tracking-tight leading-tight">Keep the ones you love</h2>
                <p className="text-base md:text-lg text-[#4a5b63] max-w-[34ch] leading-relaxed">Bookmark itineraries and build your own shortlist for the trip you're planning.</p>
                <div className="flex gap-2 mt-8"><span className="w-7 h-1 bg-[#d7d0c2] rounded-full"></span><span className={`w-7 h-1 rounded-full transition-all duration-300 ${activeStep === 1 ? 'bg-[#FF6B35]' : 'bg-[#d7d0c2]'}`}></span><span className="w-7 h-1 bg-[#d7d0c2] rounded-full"></span></div>
              </div>

              {/* STEP 3 */}
              <div className={`absolute inset-0 w-full flex flex-col justify-center transition-all duration-500 transform ${activeStep === 2 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}`}>
                <div className="text-xs font-semibold text-[#62B6C7] tracking-wider mb-[18px]">03 / 03</div>
                <div className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-3">Copy</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-[18px] tracking-tight leading-tight">Make it your own</h2>
                <p className="text-base md:text-lg text-[#4a5b63] max-w-[34ch] leading-relaxed">Copy any itinerary into your own draft in one tap, then tweak every day.</p>
                <div className="flex gap-2 mt-8"><span className="w-7 h-1 bg-[#d7d0c2] rounded-full"></span><span className="w-7 h-1 bg-[#d7d0c2] rounded-full"></span><span className={`w-7 h-1 rounded-full transition-all duration-300 ${activeStep === 2 ? 'bg-[#FF6B35]' : 'bg-[#d7d0c2]'}`}></span></div>
              </div>
            </div>

            {/* Δεξιά Στήλη: Η Συσκευή (Device) */}
            <div className="flex justify-center">
              <div className="w-[290px] h-[590px] bg-[#0c2630] border-[9px] border-[#06161c] rounded-[42px] shadow-2xl p-[13px] relative">
                <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#06161c] rounded-b-[16px] z-50"></div>
                
                <div className="w-full h-full bg-gradient-to-b from-[#fbfaf7] to-[#eef1f0] rounded-[30px] overflow-hidden relative pt-7 px-3.5 pb-3.5">
                  
                  {/* --- DISCOVER FEED (Step 0) --- */}
                  <div className={`absolute inset-x-3.5 top-7 bottom-3.5 flex flex-col gap-2.5 transition-all duration-500 transform ${activeStep === 0 ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-[10px] pointer-events-none z-0"}`}>
                    <div className="flex gap-2.5 bg-white rounded-[14px] p-2 shadow-sm border border-gray-100">
                      <div className="w-[54px] h-[54px] rounded-[10px] bg-gradient-to-br from-[#1d6076] to-[#62b6c7] flex-shrink-0" />
                      <div className="flex flex-col justify-center gap-1.5 text-left"><b className="text-[12px] font-bold">8 days in Portugal</b><div className="h-[7px] w-[120px] bg-[#e8eef0] rounded-[4px]" /><div className="h-[7px] w-[80px] bg-[#e8eef0] rounded-[4px]" /></div>
                    </div>
                    <div className="flex gap-2.5 bg-white rounded-[14px] p-2 shadow-sm border border-gray-100">
                      <div className="w-[54px] h-[54px] rounded-[10px] bg-gradient-to-br from-[#c2603a] to-[#ff6b35] flex-shrink-0" />
                      <div className="flex flex-col justify-center gap-1.5 text-left"><b className="text-[12px] font-bold">Tokyo in a week</b><div className="h-[7px] w-[120px] bg-[#e8eef0] rounded-[4px]" /><div className="h-[7px] w-[80px] bg-[#e8eef0] rounded-[4px]" /></div>
                    </div>
                    <div className="flex gap-2.5 bg-white rounded-[14px] p-2 shadow-sm border border-gray-100">
                      <div className="w-[54px] h-[54px] rounded-[10px] bg-gradient-to-br from-[#2e4c43] to-[#5a9e6f] flex-shrink-0" />
                      <div className="flex flex-col justify-center gap-1.5 text-left"><b className="text-[12px] font-bold">Patagonia road trip</b><div className="h-[7px] w-[120px] bg-[#e8eef0] rounded-[4px]" /><div className="h-[7px] w-[80px] bg-[#e8eef0] rounded-[4px]" /></div>
                    </div>
                  </div>

                  {/* --- MAIN CARD VIEW (Step 1 & 2) --- */}
                  <div className={`absolute inset-x-3.5 top-7 bottom-3.5 bg-white rounded-[20px] shadow-xl overflow-hidden flex flex-col transition-all duration-500 transform ${activeStep >= 1 ? "opacity-100 translate-y-0 scale-100 pointer-events-auto z-20" : "opacity-0 translate-y-[12px] scale-[0.98] pointer-events-none z-0"}`}>
                    <div className="h-[150px] bg-gradient-to-br from-[#13414f] via-[#1d6076] to-[#62b6c7] relative flex-shrink-0">
                      <svg className="absolute inset-0 w-full h-full text-white" viewBox="0 0 290 150" preserveAspectRatio="none" fill="none">
                        <path stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" strokeDasharray="7,8" d="M28 110 C 90 70, 130 120, 175 60 S 245 40, 268 28" />
                        <circle cx="28" cy="110" r="5" fill="white"/>
                        <circle cx="175" cy="60" r="5" fill="white"/>
                        <circle cx="268" cy="28" r="5" fill="white"/>
                      </svg>
                      <span className="absolute top-3 right-3 bg-[#071419]/55 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">8 days</span>
                      <span className={`absolute top-3 left-3 bg-[#FF6B35] text-white text-[11px] font-bold px-3 py-1 rounded-full transition-all duration-400 ${activeStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"}`}>♥ Saved</span>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1 text-left">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="w-[34px] h-[34px] bg-gradient-to-br from-[#FF6B35] to-[#E4531F] text-white flex items-center justify-center font-bold text-sm rounded-full">M</span>
                          <div className="leading-tight"><b className="text-[13px] font-bold block">Maria</b><small className="text-[11px] text-[#8a9aa1]">Lisbon → Porto</small></div>
                        </div>
                        <div className="font-extrabold text-lg text-gray-900 mb-3">8 days in Portugal</div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-2.5 py-1 rounded-[8px]">Day 1</span>
                          <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-2.5 py-1 rounded-[8px]">Day 2</span>
                          <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-2.5 py-1 rounded-[8px]">Day 3</span>
                          <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-2.5 py-1 rounded-[8px]">+5</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex gap-2 w-full">
                          <button className={`flex-1 flex items-center justify-center gap-1.5 text-[13px] font-bold border rounded-[12px] py-[11px] transition-all duration-300 ${activeStep === 1 ? "bg-[#FF6B35] text-white border-[#FF6B35] scale-105 shadow-md" : "bg-white text-gray-900 border-[#dfe6e6]"}`}>
                            Save
                          </button>
                          <button className={`flex-1 flex items-center justify-center gap-1.5 text-[13px] font-bold border rounded-[12px] py-[11px] transition-all duration-300 ${activeStep === 2 ? "bg-gray-950 text-white border-gray-950 scale-105 shadow-md" : "bg-white text-gray-900 border-[#dfe6e6]"}`}>
                            Copy
                          </button>
                        </div>
                        <div className={`text-xs font-bold p-2.5 text-center rounded-[10px] bg-[#FF6B35]/10 border border-dashed border-[#FF6B35]/40 text-[#E4531F] transition-all duration-500 transform ${activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                          Saved to your trips · Draft ready to edit
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

      {/* --- SECTION 3: TRAVEL BOOK --- */}
      <section className="py-32 bg-white text-center px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-[#FF6B35] font-bold tracking-widest uppercase text-sm mb-4">In your hands</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Transform your trip into a Travel Book</h2>
          <p className="text-xl text-gray-500 mb-10">
            A beautiful keepsake of your travel memories. <br className="hidden md:block" /> Created with the push of a button.
          </p>
          <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80" alt="Travel Book" className="rounded-3xl shadow-2xl w-full max-w-3xl mx-auto object-cover h-[400px]" />
        </div>
      </section>

      {/* --- SECTION 4: MASONRY BENTO GRID --- */}
      <section className="py-32 bg-[#F8F9FA] px-6 border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] mb-12 text-center tracking-tight">
            And the best part...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 bg-[#001621] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-md">
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Full privacy control</h3>
                <p className="text-gray-400 text-lg">You decide who can see your trip</p>
              </div>
              <div className="relative z-10 flex bg-[#00293D] rounded-full p-1 shadow-inner border border-white/5">
                <span className="bg-[#001621] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-2">
                  <span className="text-[#00DB9A]">🌍</span> The entire world
                </span>
                <span className="text-white/50 px-5 py-2 rounded-full text-xs font-medium hover:text-white transition-colors cursor-pointer">
                  Only you
                </span>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-8 flex items-center justify-center text-center shadow-md border border-gray-100">
              <h3 className="text-4xl md:text-5xl font-black text-[#00293D] tracking-tighter -rotate-3 font-mono">
                IT'S FREE!
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-10 h-[280px] flex flex-col items-center justify-center shadow-md border border-gray-100">
                <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-8">Featured in:</p>
                <div className="flex flex-col gap-6 items-center w-full opacity-95">
                  <span className="text-3xl font-serif font-bold text-[#00293D]">Forbes</span>
                  <span className="text-xl font-serif font-black tracking-tight text-[#00293D]">🎒 Traveler</span>
                  <span className="text-2xl font-sans font-black tracking-widest text-[#00293D]">W I R E D</span>
                </div>
              </div>
              <div className="bg-[#001621] rounded-[2rem] p-8 flex-1 min-h-[140px] flex items-center justify-center relative overflow-hidden shadow-md">
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center"></div>
                <h3 className="text-2xl font-bold text-white leading-tight relative z-10 text-center">By travelers,<br/> for travelers</h3>
              </div>
            </div>
            <div className="bg-gray-200 rounded-[2rem] min-h-[380px] md:min-h-[450px] relative overflow-hidden shadow-sm group">
              <img src="https://images.unsplash.com/photo-1522199710521-72d69614c71c?auto=format&fit=crop&w=800&q=80" alt="Works offline climber" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001621]/95 via-[#001621]/30 to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                <h3 className="text-3xl font-bold text-white mb-2">Works offline</h3>
                <p className="text-gray-300 text-sm">Keeps tracking — even when you're offgrid</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-[#2E4C43] rounded-[2rem] p-8 h-[300px] flex flex-col items-center justify-start text-center shadow-md relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-2 z-10">Battery-efficient</h3>
                <p className="text-white/60 text-xs mb-8 z-10 px-2 leading-relaxed">Typically less than 4% battery per day while tracking</p>
                <div className="absolute bottom-[-20px] w-32 h-44 border-[4px] border-white/10 rounded-2xl flex flex-col justify-end p-1.5 bg-black/10 backdrop-blur-sm relative">
                    <div className="bg-gradient-to-t from-[#00DB9A] to-[#26f5b9] w-full h-[96%] rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(0,219,154,0.25)]">
                      <span className="text-[#00293D] font-black tracking-tight text-xl">96%</span>
                    </div>
                </div>
              </div>
              <div className="bg-[#F11F4C] rounded-[2rem] p-8 flex-1 min-h-[140px] flex items-center justify-between shadow-md hover:scale-[1.01] transition-transform cursor-pointer">
                <h3 className="text-2xl font-bold text-white leading-tight">Proudly ad-free</h3>
                <span className="text-4xl text-white border-2 border-white/20 rounded-full w-14 h-14 flex items-center justify-center bg-white/10">👋</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: REVIEWS SECTION --- */}
      <section className="bg-[#F8F9FA] pt-32 pb-20 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] tracking-tight">
          Loved by <br /> explorers everywhere
        </h2>

        <div className="relative w-full max-w-7xl mx-auto px-6 overflow-visible">
          <button onClick={() => carouselScroll("left")} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 bg-[#00293D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❮</button>
          <button onClick={() => carouselScroll("right")} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 bg-[#00293D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❯</button>

          <div 
            ref={sliderRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none px-[5%] md:px-[15%] py-4 mt-16 overflow-visible"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            {/* Review Cards */}
            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-2xl flex flex-col justify-between border border-gray-100/50">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Perfect for tracking trips</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">CONOR, MARCH 9 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">
                    I love this app! It's perfect for tracking trips and I've ordered a few of the travel books which are very good quality and really nice.
                  </p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-2xl flex flex-col justify-between border border-gray-100/50">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">See where you've been</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">MARCUS, FEB 22 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">
                    It tracks where you've been during the day and you can add your photos and comments later. Great to look back on over the years.
                  </p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-2xl overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" alt="Alex" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">AH</div>
                <div><p className="text-xs font-bold text-white">Alex Hubin</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Adventurer</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
            </div>

            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-2xl flex flex-col justify-between border border-gray-100/50">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Easy to use</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">RACHEL, MARCH 15 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">
                    I've been using this app for several trips now. Easy peasy to use. Shared it with family and friends who are using this app as well now.
                  </p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-2xl flex flex-col justify-between border border-gray-100/50">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Stops me wasting time</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">DEBORAH, MARCH 19 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">
                    Just completed a 4 month trip using NomadFlow. Totally love it, stops me wasting time private messaging people about what we are doing!
                  </p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: OUTRO / MOUNTAIN FOOTER --- */}
      <div className="relative bg-[#000A0F] overflow-hidden">
        <div className="w-full overflow-hidden relative z-30 bg-transparent rotate-180">
          <svg viewBox="0 0 100 5" preserveAspectRatio="none" width="100%" height="60" style={{ display: "block" }}>
            <polygon points="-1,0 0,5 101,5" fill="#F8F9FA"></polygon>
          </svg>
        </div>

        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <img 
            src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
            alt="Mountain range" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000A0F] via-transparent to-[#001621]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center pt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight max-w-2xl leading-tight mb-8 drop-shadow-md">
            Your next trip is someone's last one.
          </h2>
          
          <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all flex items-center gap-3 mb-32 hover:scale-105 text-sm">
            Start exploring
          </button>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-16 mb-12 text-left">
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">Get Started</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Get the app</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Log in</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">About</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">About us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">Features</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Travel Planner</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Travel Tracker</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">Help & Support</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                </ul>
             </div>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium text-[#527585] pb-12">
            <p>© 2026 NomadFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
