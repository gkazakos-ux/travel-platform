"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- 1. NAVBAR COMPONENT ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
        <div className="text-2xl font-extrabold tracking-tighter flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full rounded-br-sm bg-[#FF6B35] rotate-45 inline-block"></span>
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
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-[#FF6B35]/30 hover:scale-105 transition-transform">
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

  // Refs για τα animations
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // NATIVE REACT SCROLL LISTENER (Αντικαθιστά το GSAP ακριβώς με τα δικά σου μαθηματικά)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // --- HERO ZOOM OUT MATH ---
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const maxHeroScroll = vh * 1.3; // 230vh - 100vh
        const p = Math.min(1, Math.max(0, -heroRect.top / maxHeroScroll));
        
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

      // --- STORY SCROLL MATH ---
      if (storyRef.current) {
        const storyRect = storyRef.current.getBoundingClientRect();
        const maxStoryScroll = vh * 2.8; // 380vh - 100vh
        const p = Math.min(1, Math.max(0, -storyRect.top / maxStoryScroll));
        
        // Η ακριβής λογική σου
        setActiveStep(p < 0.34 ? 0 : (p < 0.67 ? 1 : 2));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const carouselScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#F3EFE6] text-[#0B2027] relative min-h-screen font-sans w-full overflow-y-auto overflow-x-hidden">
      <Navbar />

      {/* =========================================
          SECTION 1: HERO ZOOM OUT (230vh) 
      ========================================= */}
      <section ref={heroRef} className="relative h-[230vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          <div ref={photoRef} className="absolute inset-0 w-full h-full origin-center will-change-transform bg-gradient-to-br from-[#1d6076] to-[#0c3543] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1900&q=80" 
              alt="Hero Background" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div ref={overlayRef} className="absolute inset-0 bg-[#071419]/45 will-change-opacity z-10" />

          <div ref={copyRef} className="absolute z-20 text-center max-w-[780px] px-6 will-change-transform flex flex-col items-center text-white -translate-y-[6vh]">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] bg-white/10 border border-white/20 px-[14px] py-[7px] rounded-full mb-[22px]">
              ● Real trips, by real travelers
            </span>
            <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-extrabold tracking-tight leading-none mb-[20px] drop-shadow-xl">
              Find a real trip.<br/><em className="text-[#FF6B35] not-italic">Copy it.</em> Make it yours.
            </h1>
            <p className="text-[clamp(1.05rem,2.4vw,1.25rem)] text-white/90 max-w-[46ch] mx-auto leading-relaxed">
              Skip the blank page. Start from an itinerary someone actually travelled.
            </p>
          </div>

          {/* Το κινητό του Hero */}
          <div ref={phoneRef} className="absolute z-30 w-[280px] h-[570px] will-change-transform opacity-0">
            <div className="w-full h-full bg-[#0c2630] border-[9px] border-[#06161c] rounded-[42px] shadow-[0_30px_70px_-22px_rgba(7,20,25,0.6)] p-[13px] relative">
              <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#06161c] rounded-b-[16px] z-50"></div>
              
              <div className="w-full h-full rounded-[30px] overflow-hidden relative bg-[#eef1f0]">
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#173e4b,#0c2630)]">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 570" preserveAspectRatio="none">
                    <path stroke="#FF6B35" strokeWidth="3" fill="none" strokeDasharray="7 8" strokeLinecap="round" d="M40 480 C 110 400, 70 320, 150 280 S 230 200, 210 90"/>
                    <circle cx="40" cy="480" r="6" fill="#fff"/>
                    <circle cx="150" cy="280" r="6" fill="#fff"/>
                    <circle cx="210" cy="90" r="6" fill="#fff"/>
                  </svg>
                  <div className="absolute left-[14px] right-[14px] bottom-[16px] bg-white/95 rounded-[16px] p-[12px_14px] flex items-center gap-[10px] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]">
                    <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E4531F] text-white flex items-center justify-center font-bold text-[13px]">M</div>
                    <div className="text-left">
                      <b className="text-[12px] text-[#0B2027] block leading-tight">8 days in Portugal</b>
                      <small className="text-[10px] text-[#8a9aa1]">Maria · Lisbon → Porto</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-30 text-white text-[11px] tracking-[0.18em] uppercase font-semibold flex flex-col items-center gap-[8px] opacity-85">
            Scroll <span className="w-[1px] h-[40px] bg-gradient-to-b from-white to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SCROLL STORY (380vh) 
      ========================================= */}
      <section ref={storyRef} className="relative h-[380vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[repeating-radial-gradient(circle_at_85%_18%,transparent_0_50px,rgba(11,32,39,0.04)_50px_51px)]">
          <div className="w-full max-w-[1080px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* ΑΡΙΣΤΕΡΑ: ΚΕΙΜΕΝΑ */}
            <div className="relative min-h-[320px] w-full flex flex-col justify-center">
              
              {/* STEP 0 */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 text-center md:text-left ${activeStep === 0 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}`}>
                <div className="text-[13px] text-[#62B6C7] font-semibold tracking-[0.1em] mb-[18px]">01 / 03</div>
                <div className="text-[13px] font-bold text-[#FF6B35] tracking-[0.16em] uppercase mb-[14px]">Discover</div>
                <h2 className="text-[clamp(2rem,4.6vw,3.3rem)] font-extrabold text-[#0B2027] mb-[18px] leading-tight">Find a real trip</h2>
                <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#4a5b63] max-w-[34ch] mx-auto md:mx-0 leading-[1.55]">Browse day-by-day itineraries from travellers who actually went.</p>
                <div className="flex justify-center md:justify-start gap-2 mt-[30px]">
                  <i className="w-[28px] h-[4px] rounded-full transition-all duration-400 bg-[#FF6B35]"></i><i className="w-[28px] h-[4px] bg-[#d7d0c2] rounded-full"></i><i className="w-[28px] h-[4px] bg-[#d7d0c2] rounded-full"></i>
                </div>
              </div>

              {/* STEP 1 */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 text-center md:text-left ${activeStep === 1 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}`}>
                <div className="text-[13px] text-[#62B6C7] font-semibold tracking-[0.1em] mb-[18px]">02 / 03</div>
                <div className="text-[13px] font-bold text-[#FF6B35] tracking-[0.16em] uppercase mb-[14px]">Save</div>
                <h2 className="text-[clamp(2rem,4.6vw,3.3rem)] font-extrabold text-[#0B2027] mb-[18px] leading-tight">Keep the ones you love</h2>
                <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#4a5b63] max-w-[34ch] mx-auto md:mx-0 leading-[1.55]">Bookmark itineraries and build your own shortlist for the trip you're planning.</p>
                <div className="flex justify-center md:justify-start gap-2 mt-[30px]">
                  <i className="w-[28px] h-[4px] bg-[#d7d0c2] rounded-full"></i><i className="w-[28px] h-[4px] rounded-full transition-all duration-400 bg-[#FF6B35]"></i><i className="w-[28px] h-[4px] bg-[#d7d0c2] rounded-full"></i>
                </div>
              </div>

              {/* STEP 2 */}
              <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 text-center md:text-left ${activeStep === 2 ? 'opacity-100 translate-y-0 pointer-events-auto z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}`}>
                <div className="text-[13px] text-[#62B6C7] font-semibold tracking-[0.1em] mb-[18px]">03 / 03</div>
                <div className="text-[13px] font-bold text-[#FF6B35] tracking-[0.16em] uppercase mb-[14px]">Copy</div>
                <h2 className="text-[clamp(2rem,4.6vw,3.3rem)] font-extrabold text-[#0B2027] mb-[18px] leading-tight">Make it your own</h2>
                <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#4a5b63] max-w-[34ch] mx-auto md:mx-0 leading-[1.55]">Copy any itinerary into your own draft in one tap, then tweak every day.</p>
                <div className="flex justify-center md:justify-start gap-2 mt-[30px]">
                  <i className="w-[28px] h-[4px] bg-[#d7d0c2] rounded-full"></i><i className="w-[28px] h-[4px] bg-[#d7d0c2] rounded-full"></i><i className="w-[28px] h-[4px] rounded-full transition-all duration-400 bg-[#FF6B35]"></i>
                </div>
              </div>
            </div>

            {/* ΔΕΞΙΑ: ΤΟ INTERACTIVE DEVICE */}
            <div className="flex justify-center">
              <div className="w-[290px] h-[590px] bg-[#0c2630] border-[9px] border-[#06161c] rounded-[42px] shadow-[0_30px_70px_-22px_rgba(7,20,25,0.6)] p-[13px] relative transform md:scale-100 scale-90 -mt-10 md:mt-0">
                <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#06161c] rounded-b-[16px] z-50"></div>
                
                <div className="w-full h-full bg-gradient-to-b from-[#fbfaf7] to-[#eef1f0] rounded-[30px] overflow-hidden relative pt-[28px] px-[14px] pb-[14px]">
                  
                  {/* --- DISCOVER FEED (STEP 0) --- */}
                  <div className={`absolute inset-[28px_14px_14px] flex flex-col gap-[10px] transition-all duration-500 ${activeStep === 0 ? "opacity-100 translate-y-0 z-20" : "opacity-0 translate-y-[10px] pointer-events-none z-0"}`}>
                    <div className="flex gap-[10px] bg-white rounded-[14px] p-[8px] shadow-[0_8px_18px_-12px_rgba(7,20,25,0.3)]">
                      <div className="w-[54px] h-[54px] rounded-[10px] flex-none bg-gradient-to-br from-[#1d6076] to-[#62b6c7]"></div>
                      <div className="flex flex-col justify-center gap-[5px]">
                        <b className="text-[12px] text-[#0B2027]">8 days in Portugal</b>
                        <div className="h-[7px] w-[120px] bg-[#e8eef0] rounded-[4px]"></div>
                        <div className="h-[7px] w-[80px] bg-[#e8eef0] rounded-[4px]"></div>
                      </div>
                    </div>
                    <div className="flex gap-[10px] bg-white rounded-[14px] p-[8px] shadow-[0_8px_18px_-12px_rgba(7,20,25,0.3)]">
                      <div className="w-[54px] h-[54px] rounded-[10px] flex-none bg-gradient-to-br from-[#c2603a] to-[#ff6b35]"></div>
                      <div className="flex flex-col justify-center gap-[5px]">
                        <b className="text-[12px] text-[#0B2027]">Tokyo in a week</b>
                        <div className="h-[7px] w-[120px] bg-[#e8eef0] rounded-[4px]"></div>
                        <div className="h-[7px] w-[80px] bg-[#e8eef0] rounded-[4px]"></div>
                      </div>
                    </div>
                    <div className="flex gap-[10px] bg-white rounded-[14px] p-[8px] shadow-[0_8px_18px_-12px_rgba(7,20,25,0.3)]">
                      <div className="w-[54px] h-[54px] rounded-[10px] flex-none bg-gradient-to-br from-[#2e4c43] to-[#5a9e6f]"></div>
                      <div className="flex flex-col justify-center gap-[5px]">
                        <b className="text-[12px] text-[#0B2027]">Patagonia road trip</b>
                        <div className="h-[7px] w-[120px] bg-[#e8eef0] rounded-[4px]"></div>
                        <div className="h-[7px] w-[80px] bg-[#e8eef0] rounded-[4px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* --- MAIN CARD (STEP 1 & 2) --- */}
                  <div className={`absolute inset-[28px_14px_14px] bg-white rounded-[20px] shadow-[0_14px_32px_-16px_rgba(7,20,25,0.4)] overflow-hidden flex flex-col transition-all duration-500 ${activeStep >= 1 ? "opacity-100 translate-y-0 scale-100 z-30" : "opacity-0 translate-y-[12px] scale-[0.98] pointer-events-none z-0"}`}>
                    <div className="relative h-[150px] bg-gradient-to-br from-[#13414f] via-[#1d6076] to-[#62b6c7]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 290 150" preserveAspectRatio="none">
                        <path stroke="#FF6B35" strokeWidth="3" fill="none" strokeDasharray="7 8" strokeLinecap="round" d="M28 110 C 90 70, 130 120, 175 60 S 245 40, 268 28"/>
                        <circle cx="28" cy="110" r="5" fill="#fff"/><circle cx="175" cy="60" r="5" fill="#fff"/><circle cx="268" cy="28" r="5" fill="#fff"/>
                      </svg>
                      <span className="absolute top-[12px] right-[12px] bg-[#071419]/55 text-white text-[11px] font-semibold px-[10px] py-[5px] rounded-full">8 days</span>
                      <span className={`absolute top-[12px] left-[12px] bg-[#FF6B35] text-white text-[11px] font-bold px-[11px] py-[5px] rounded-full transition-all duration-400 ${activeStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[6px]"}`}>♥ Saved</span>
                    </div>

                    <div className="p-[14px_16px] flex flex-col flex-1">
                      <div className="flex items-center gap-[10px] mb-[12px]">
                        <span className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E4531F] text-white flex items-center justify-center font-bold text-[14px]">M</span>
                        <div><b className="text-[13px] text-[#0B2027] block leading-tight">Maria</b><small className="text-[11px] text-[#8a9aa1]">Lisbon → Porto</small></div>
                      </div>
                      <div className="font-extrabold text-[19px] text-[#0B2027] mb-[12px]">8 days in Portugal</div>
                      <div className="flex flex-wrap gap-[6px] mb-[16px]">
                        <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-[10px] py-[5px] rounded-[8px]">Day 1</span>
                        <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-[10px] py-[5px] rounded-[8px]">Day 2</span>
                        <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-[10px] py-[5px] rounded-[8px]">Day 3</span>
                        <span className="text-[11px] font-semibold text-[#48707f] bg-[#e8f0f1] px-[10px] py-[5px] rounded-[8px]">+5</span>
                      </div>

                      <div className="mt-auto">
                        <div className="flex gap-[8px]">
                          <button className={`flex-1 flex items-center justify-center gap-[6px] text-[13px] font-bold p-[11px] rounded-[12px] border-[1.5px] transition-all duration-300 ${activeStep === 1 ? "bg-[#FF6B35] border-[#FF6B35] text-white scale-[1.05]" : "bg-white border-[#dfe6e6] text-[#0B2027]"}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[15px] h-[15px]"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                            Save
                          </button>
                          <button className={`flex-1 flex items-center justify-center gap-[6px] text-[13px] font-bold p-[11px] rounded-[12px] border-[1.5px] transition-all duration-300 ${activeStep === 2 ? "bg-[#0B2027] border-[#0B2027] text-white scale-[1.05]" : "bg-white border-[#dfe6e6] text-[#0B2027]"}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[15px] h-[15px]"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>
                            Copy
                          </button>
                        </div>
                        <div className={`mt-[12px] text-center text-[12px] font-bold text-[#E4531F] bg-[#FF6B35]/10 border border-dashed border-[#FF6B35]/40 rounded-[10px] p-[9px] transition-all duration-500 transform ${activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]"}`}>
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] mb-6 tracking-tight">Transform your trip into a Travel Book</h2>
          <p className="text-xl text-gray-500 mb-10">
            A beautiful keepsake of your travel memories. <br className="hidden md:block" /> Created with the push of a button.
          </p>
          <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80" alt="Travel Book" className="rounded-3xl shadow-2xl w-full max-w-3xl mx-auto object-cover h-[400px]" />
        </div>
      </section>

      {/* --- SECTION 4: MASONRY BENTO GRID --- */}
      <section className="py-32 bg-[#F3EFE6] px-6 border-t border-gray-200">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] mb-12 text-center tracking-tight">
            And the best part...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 bg-[#0c2630] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-md">
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Full privacy control</h3>
                <p className="text-gray-300 text-lg">You decide who can see your trip</p>
              </div>
              <div className="relative z-10 flex bg-[#06161c] rounded-full p-1 shadow-inner border border-white/5">
                <span className="bg-[#173e4b] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-2">
                  <span className="text-[#62B6C7]">🌍</span> The entire world
                </span>
                <span className="text-white/50 px-5 py-2 rounded-full text-xs font-medium hover:text-white transition-colors cursor-pointer">
                  Only you
                </span>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-8 flex items-center justify-center text-center shadow-md border border-gray-100">
              <h3 className="text-4xl md:text-5xl font-black text-[#0B2027] tracking-tighter -rotate-3 font-mono">
                IT'S FREE!
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-10 h-[280px] flex flex-col items-center justify-center shadow-md border border-gray-100">
                <p className="text-[#7E94A0] text-xs font-bold tracking-widest uppercase mb-8">Featured in:</p>
                <div className="flex flex-col gap-6 items-center w-full opacity-95">
                  <span className="text-3xl font-serif font-bold text-[#0B2027]">Forbes</span>
                  <span className="text-xl font-serif font-black tracking-tight text-[#0B2027]">🎒 Traveler</span>
                  <span className="text-2xl font-sans font-black tracking-widest text-[#0B2027]">W I R E D</span>
                </div>
              </div>
              <div className="bg-[#0c2630] rounded-[2rem] p-8 flex-1 min-h-[140px] flex items-center justify-center relative overflow-hidden shadow-md">
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center"></div>
                <h3 className="text-2xl font-bold text-white leading-tight relative z-10 text-center">By travelers,<br/> for travelers</h3>
              </div>
            </div>
            <div className="bg-gray-200 rounded-[2rem] min-h-[380px] md:min-h-[450px] relative overflow-hidden shadow-sm group">
              <img src="https://images.unsplash.com/photo-1522199710521-72d69614c71c?auto=format&fit=crop&w=800&q=80" alt="Works offline climber" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c2630]/95 via-[#0c2630]/30 to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                <h3 className="text-3xl font-bold text-white mb-2">Works offline</h3>
                <p className="text-gray-200 text-sm">Keeps tracking — even when you're offgrid</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-[#173e4b] rounded-[2rem] p-8 h-[300px] flex flex-col items-center justify-start text-center shadow-md relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-2 z-10">Battery-efficient</h3>
                <p className="text-white/70 text-xs mb-8 z-10 px-2 leading-relaxed">Typically less than 4% battery per day while tracking</p>
                <div className="absolute bottom-[-20px] w-32 h-44 border-[4px] border-white/10 rounded-2xl flex flex-col justify-end p-1.5 bg-[#06161c]/30 backdrop-blur-sm relative">
                    <div className="bg-gradient-to-t from-[#62B6C7] to-[#8ad2e0] w-full h-[96%] rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(98,182,199,0.25)]">
                      <span className="text-[#0B2027] font-black tracking-tight text-xl">96%</span>
                    </div>
                </div>
              </div>
              <div className="bg-[#FF6B35] rounded-[2rem] p-8 flex-1 min-h-[140px] flex items-center justify-between shadow-md hover:scale-[1.01] transition-transform cursor-pointer">
                <h3 className="text-2xl font-bold text-white leading-tight">Proudly ad-free</h3>
                <span className="text-4xl text-white border-2 border-white/20 rounded-full w-14 h-14 flex items-center justify-center bg-white/10">👋</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: REVIEWS SECTION --- */}
      <section className="bg-white pt-32 pb-20 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight">
          Loved by <br /> explorers everywhere
        </h2>

        <div className="relative w-full max-w-7xl mx-auto px-6 overflow-visible mt-16">
          <button onClick={() => carouselScroll("left")} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 bg-[#0c2630] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❮</button>
          <button onClick={() => carouselScroll("right")} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 bg-[#0c2630] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❯</button>

          <div 
            ref={sliderRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none px-[5%] md:px-[15%] py-4 overflow-visible"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            {/* STACK 1 */}
            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-[#F3EFE6] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-[#e8eef0]">
                <div>
                  <h4 className="text-sm font-bold text-[#0B2027] mb-1">Perfect for tracking trips</h4>
                  <p className="text-[9px] font-bold text-[#7E94A0] mb-2">CONOR, MARCH 9 2026</p>
                  <p className="text-[12px] text-[#4a5b63] leading-relaxed line-clamp-4">
                    I love this app! It's perfect for tracking trips and I've ordered a few of the travel books which are very good quality and really nice.
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-[#F3EFE6] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-[#e8eef0]">
                <div>
                  <h4 className="text-sm font-bold text-[#0B2027] mb-1">See where you've been</h4>
                  <p className="text-[9px] font-bold text-[#7E94A0] mb-2">MARCUS, FEB 22 2026</p>
                  <p className="text-[12px] text-[#4a5b63] leading-relaxed line-clamp-4">
                    It tracks where you've been during the day and you can add your photos and comments later. Great to look back on over the years.
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* STACK 2: Video (Alex Hubin) */}
            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-lg overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" alt="Alex" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2027]/90 via-[#0B2027]/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold text-white">AH</div>
                <div><p className="text-xs font-bold text-white">Alex Hubin</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Adventurer</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
            </div>

            {/* STACK 3 */}
            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-[#F3EFE6] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-[#e8eef0]">
                <div>
                  <h4 className="text-sm font-bold text-[#0B2027] mb-1">Easy to use</h4>
                  <p className="text-[9px] font-bold text-[#7E94A0] mb-2">RACHEL, MARCH 15 2026</p>
                  <p className="text-[12px] text-[#4a5b63] leading-relaxed line-clamp-4">
                    I've been using this app for several trips now. Easy peasy to use. Shared it with family and friends who are using this app as well now.
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-[#F3EFE6] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-[#e8eef0]">
                <div>
                  <h4 className="text-sm font-bold text-[#0B2027] mb-1">Stops me wasting time</h4>
                  <p className="text-[9px] font-bold text-[#7E94A0] mb-2">DEBORAH, MARCH 19 2026</p>
                  <p className="text-[12px] text-[#4a5b63] leading-relaxed line-clamp-4">
                    Just completed a 4 month trip using NomadFlow. Totally love it, stops me wasting time private messaging people about what we are doing!
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* STACK 4 */}
            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-lg overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" alt="Leoni" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2027]/90 via-[#0B2027]/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#62B6C7] flex items-center justify-center text-xs font-bold text-white">LK</div>
                <div><p className="text-xs font-bold text-white">Leoni Kolberg</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Solo Cyclist</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: OUTRO / MOUNTAIN FOOTER --- */}
      <div className="relative bg-[#0B2027] overflow-hidden">
        <div className="w-full overflow-hidden relative z-30 bg-transparent rotate-180">
          <svg viewBox="0 0 100 5" preserveAspectRatio="none" width="100%" height="60" style={{ display: "block" }}>
            <polygon points="-1,0 0,5 101,5" fill="#FFFFFF"></polygon>
          </svg>
        </div>

        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <img 
            src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
            alt="Mountain range" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2027] via-transparent to-[#06161c]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center pt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight max-w-[18ch] leading-tight mb-8">
            Your next trip is <em className="text-[#FF6B35] not-italic">someone's last one.</em>
          </h2>
          
          <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full shadow-[0_14px_26px_-10px_rgba(255,107,53,0.6)] transition-all flex items-center gap-3 mb-32 hover:-translate-y-1 text-sm">
            Start exploring
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
