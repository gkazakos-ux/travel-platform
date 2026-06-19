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

// --- 2. MAIN LANDING PAGE ---
export default function NomadFlowLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Hero Zoom Progress (0 έως 500px scroll)
      const maxHeroScroll = 500;
      setHeroProgress(Math.min(1, Math.max(0, scrollY / maxHeroScroll)));

      // 2. Σταθερά Offsets για το Sticky Phone (Αποτρέπει τα "πηδήματα" στο scroll)
      // Step 0: 600px - 1200px
      // Step 1: 1200px - 1800px
      // Step 2: > 1800px
      if (scrollY < 1100) {
        setActiveStep(0);
      } else if (scrollY >= 1100 && scrollY < 1800) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const carouselScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const heroScale = 1.25 - (heroProgress * 0.3);
  const heroRadius = heroProgress * 48;
  const heroTextOpacity = 1 - (heroProgress * 2); 

  return (
    <main className="bg-[#F8F9FA] relative min-h-screen font-sans w-full overflow-x-hidden">
      <Navbar />

      {/* --- SECTION 1: HERO ZOOM OUT --- */}
      <section className="relative h-[100vh] bg-black overflow-hidden flex flex-col justify-start pt-32">
        <div 
          style={{ transform: `scale(${heroScale})`, borderRadius: `${heroRadius}px` }}
          className="absolute inset-0 w-full h-full origin-bottom will-change-transform z-0 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://img.magnific.com/free-photo/person-traveling-enjoying-their-vacation_23-2151383050.jpg?t=st=1781893352~exp=1781896952~hmac=f3489fdfc724d5430d28b3267f6305f763687ca784c2a5f33c2eca937ec306eb&w=1480" 
            alt="Hero Background" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div 
          style={{ opacity: Math.max(0, heroTextOpacity) }}
          className="relative z-20 text-center max-w-4xl mx-auto px-6 mt-[5vh] flex flex-col items-center"
        >
          <div className="flex gap-3 mb-6">
            <span className="text-white/90 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">✨ 20,000+ Secret Spots</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
            One travel app for <br /> all your adventures
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 drop-shadow-md">
            Join the travelers who plan, track, and relive their trips with NomadFlow. Bypass tourist traps forever.
          </p>
          <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(255,107,53,0.3)]">
            Get the app
          </button>
        </div>
      </section>

import { useEffect, useRef, useState } from "react";

// Μέσα στο component σου, αντικατέστησε το Section 2 με αυτό:
export default function LocationStepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Παίρνουμε τη θέση του section σε σχέση με το viewport
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      
      // Πόσο τοις εκατό του section έχει σκρολαριστεί
      // Το rect.top θα είναι αρνητικό καθώς σκρολάρουμε προς τα κάτω
      const scrolledIntoSection = -rect.top;
      const totalScrollableDist = sectionHeight - window.innerHeight;

      if (totalScrollableDist > 0) {
        const progress = scrolledIntoSection / totalScrollableDist;
        
        // Μοιράζουμε το progress (0 έως 1) στα 3 βήματα
        if (progress < 0.33) {
          setActiveStep(0);
        } else if (progress >= 0.33 && progress < 0.66) {
          setActiveStep(1);
        } else {
          setActiveStep(2);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    {/* --- SECTION 2: INTERACTIVE STICKY PHONE SCROLL STORY --- */}
    {/* Αφαιρέθηκε τελείως το snap-y. Το ύψος h-[260vh] εγγυάται αρκετό χώρο για να «κλειδώσει» το sticky */}
    <section ref={containerRef} className="relative h-[260vh] bg-[#F8F9FA]">
      
      {/* Το sticky container κρατάει το κινητό και τα κείμενα πάντα κεντραρισμένα στην οθόνη */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Αριστερή Στήλη: Κείμενα (Σταθερό ύψος για να μην κουνιέται το layout) */}
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0 relative h-[250px] md:h-[350px]">
            {/* STEP 1 */}
            <div className={`absolute inset-0 w-full transition-all duration-500 flex flex-col justify-center ${activeStep === 0 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 pointer-events-none z-0'}`}>
              <div className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-2">01 / 03 · PLAN</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Plan your next adventure</h2>
              <p className="text-base text-gray-500 max-w-md mx-auto md:mx-0">Get personalized travel tips, map out your route before you go, and explore without the blank page syndrome.</p>
              <div className="flex gap-1.5 mt-6 justify-center md:justify-start"><span className="w-6 h-1.5 bg-[#FF6B35] rounded-full transition-all"></span><span className="w-2 h-1.5 bg-gray-300 rounded-full"></span><span className="w-2 h-1.5 bg-gray-300 rounded-full"></span></div>
            </div>

            {/* STEP 2 */}
            <div className={`absolute inset-0 w-full transition-all duration-500 flex flex-col justify-center ${activeStep === 1 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 pointer-events-none z-0'}`}>
              <div className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-2">02 / 03 · TRACK</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Capture your route automatically</h2>
              <p className="text-base text-gray-500 max-w-md mx-auto md:mx-0">Keep your phone in your pocket. NomadFlow tracks and maps your route, stats, and milestones completely offline.</p>
              <div className="flex gap-1.5 mt-6 justify-center md:justify-start"><span className="w-2 h-1.5 bg-gray-300 rounded-full"></span><span className="w-6 h-1.5 bg-[#FF6B35] rounded-full transition-all"></span><span className="w-2 h-1.5 bg-gray-300 rounded-full"></span></div>
            </div>

            {/* STEP 3 */}
            <div className={`absolute inset-0 w-full transition-all duration-500 flex flex-col justify-center ${activeStep === 2 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 pointer-events-none z-0'}`}>
              <div className="text-xs font-bold text-[#FF6B35] tracking-widest uppercase mb-2">03 / 03 · RELIVE</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Relive the adventure</h2>
              <p className="text-base text-gray-500 max-w-md mx-auto md:mx-0">See your travel stats grow, look back at your pins, and generate full keep-sakes of your travel lifetime.</p>
              <div className="flex gap-1.5 mt-6 justify-center md:justify-start"><span className="w-2 h-1.5 bg-gray-300 rounded-full"></span><span className="w-2 h-1.5 bg-gray-300 rounded-full"></span><span className="w-6 h-1.5 bg-[#FF6B35] rounded-full transition-all"></span></div>
            </div>
          </div>

          {/* Δεξιά Στήλη: Το Κινητό (Πάντα σταθερό στο κέντρο λόγω του sticky) */}
          <div className="flex-1 flex justify-center z-20 relative">
            <div className="relative w-[280px] md:w-[320px] h-[540px] md:h-[620px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col text-gray-900">
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-[60] pointer-events-none">
                <div className="w-28 h-4 bg-gray-900 rounded-b-2xl"></div>
              </div>

              <div className="relative w-full h-full bg-[#f4f6f8] pt-6 flex flex-col overflow-hidden">
                
                {/* STEP 0 SCREEN LAYOUT (MAP VIEW) */}
                <div className={`absolute inset-0 w-full h-full bg-[#E5E9EC] transition-all duration-500 p-4 pt-10 flex flex-col justify-between ${activeStep === 0 ? "opacity-100 scale-100 z-30" : "opacity-0 scale-95 pointer-events-none z-0"}`}>
                  <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full text-[#FF6B35]" viewBox="0 0 280 570" fill="none">
                      <path stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,8" d="M40 480 C 110 400, 70 320, 150 280 S 230 200, 210 90" />
                      <circle cx="40" cy="480" r="7" fill="#00293D" stroke="white" strokeWidth="2"/>
                      <circle cx="150" cy="280" r="7" fill="#FF6B35" stroke="white" strokeWidth="2"/>
                      <circle cx="210" cy="90" r="7" fill="#00293D" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="relative z-10 bg-white/95 backdrop-blur rounded-2xl p-3.5 shadow-md flex items-center gap-3 border border-white">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm shadow-sm">M</div>
                    <div className="text-left flex-1">
                      <p className="text-xs font-black text-gray-900">8 days in Portugal</p>
                      <p className="text-[10px] text-gray-400 font-bold">Maria · Lisbon → Porto</p>
                    </div>
                  </div>
                </div>

                {/* STEP 1 & 2 SCREEN LAYOUT */}
                <div className={`absolute inset-0 w-full h-full p-3 pt-8 flex flex-col gap-3 transition-all duration-500 ${activeStep >= 1 ? "opacity-100 z-40" : "opacity-0 pointer-events-none"}`}>
                  <div className={`flex flex-col gap-2 transition-all duration-700 transform ${activeStep === 1 ? "translate-y-0 opacity-100 h-auto" : "-translate-y-12 opacity-0 h-0 overflow-hidden"}`}>
                    <div className="bg-white rounded-2xl p-2.5 flex items-center gap-3 border border-gray-100 shadow-xs">
                      <div className="w-10 h-10 bg-gray-200 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=100')` }}></div>
                      <div className="flex-1 text-left"><p className="text-[11px] font-bold">Tokyo in a week</p><div className="h-1.5 w-16 bg-gray-100 rounded mt-1"></div></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col flex-1 bg-white">
                    <div className="h-32 bg-gray-900 relative overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
                      <svg className="absolute inset-0 w-full h-full text-white" fill="none" viewBox="0 0 290 150">
                        <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M28 110 C 90 70, 130 120, 175 60 S 245 40, 268 28" />
                        <circle cx="28" cy="110" r="4" fill="#FF6B35" stroke="white" strokeWidth="1.5"/>
                        <circle cx="175" cy="60" r="4" fill="#FF6B35" stroke="white" strokeWidth="1.5"/>
                      </svg>
                      <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white bg-[#FF6B35] shadow transition-transform duration-500 ${activeStep === 2 ? "scale-100 opacity-100" : "scale-70 opacity-0"}`}>♥ Saved</span>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1 text-left">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center font-bold text-xs text-[#FF6B35]">M</span>
                          <div className="leading-none"><b className="text-xs font-black">Maria</b><br/><small className="text-[9px] text-gray-400">Lisbon → Porto</small></div>
                        </div>
                        <div className="text-sm font-black text-gray-900 mb-1.5">8 days in Portugal</div>
                      </div>

                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex gap-2 w-full">
                          <button className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold border rounded-xl py-2 transition-all ${activeStep === 1 ? "bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20" : "bg-gray-50 text-gray-400 border-gray-100"}`}>Save</button>
                          <button className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold rounded-xl py-2 border transition-all ${activeStep === 2 ? "bg-[#00293D] text-white border-[#00293D] scale-105" : "bg-white text-gray-700 border-gray-200"}`}>Copy</button>
                        </div>
                        <div className={`text-[9px] font-bold p-2 text-center rounded-xl transition-all duration-700 border ${activeStep === 2 ? "bg-emerald-50 text-emerald-700 border-emerald-100 translate-y-0 opacity-100" : "bg-gray-50 text-transparent border-transparent translate-y-2 opacity-0"}`}>
                          ✓ Saved to your trips · Draft ready to edit
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
  );
}
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

{/* --- SECTION 5: ΚΑΘΑΡΟ REVIEWS SECTION --- */}
      {/* ΑΥΞΗΘΗΚΕ ΤΟ pt-32 ΓΙΑ ΝΑ ΔΩΣΕΙ ΧΩΡΟ ΚΑΤΩ ΑΠΟ ΤΟΝ ΤΙΤΛΟ */}
      <section className="bg-[#F8F9FA] pt-32 pb-20 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] tracking-tight">
          Loved by <br /> explorers everywhere
        </h2>

        <div className="relative w-full max-w-7xl mx-auto px-6 overflow-visible">
          {/* Arrows */}
          <button onClick={() => carouselScroll("left")} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 bg-[#00293D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❮</button>
          <button onClick={() => carouselScroll("right")} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 bg-[#00293D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❯</button>

          {/* Carousel Tracks */}
          {/* ΑΛΛΑΓΗ ΕΔΩ: mt-16 ΑΝΤΙ ΓΙΑ mt-4 ΓΙΑ ΝΑ ΠΕΣΟΥΝ ΠΙΟ ΚΑΤΩ ΟΙ ΚΑΡΤΕΣ */}
          <div 
            ref={sliderRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none px-[5%] md:px-[15%] py-4 mt-50 overflow-visible"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            {/* STACK 1: Δύο κάρτες κειμένου */}
            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-md flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Perfect for tracking trips</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">CONOR, MARCH 9 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">I love this app! It's perfect for tracking trips and I've ordered a few of the travel books which are very good quality and really nice.</p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-md flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">See where you've been</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">MARCUS, FEB 22 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">It tracks where you've been during the day and you can add your photos and comments later. Great to look back on over the years.</p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* STACK 2: Ψηλή Κάρτα Βίντεο (Alex Hubin) */}
            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-md overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" alt="Alex" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">AH</div>
                <div><p className="text-xs font-bold text-white">Alex Hubin</p><p className="text-[9px] text-white/60 uppercase font-black">Adventurer</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer">▶</span></div>
              <span className="absolute bottom-4 left-6 text-[9px] font-black tracking-widest text-white/50 uppercase">Pioneers</span>
            </div>

            {/* STACK 3: Δύο κάρτες κειμένου */}
            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-md flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Easy to use</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">RACHEL, MARCH 15 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">I've been using this app for several trips now. Easy peasy to use. Shared it with family and friends who are using this app as well now.</p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 h-[218px] shadow-md flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Stops me wasting time</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">DEBORAH, MARCH 19 2026</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-4">Just completed a 4 month trip using NomadFlow. Totally love it, stops me wasting time private messaging people about what we are doing!</p>
                </div>
                <div className="text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            {/* STACK 4: Ψηλή Κάρτα Βίντεο (Leoni Kolberg) */}
            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-md overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" alt="Leoni" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">LK</div>
                <div><p className="text-xs font-bold text-white">Leoni Kolberg</p><p className="text-[9px] text-white/60 uppercase font-black">Solo Cyclist</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer">▶</span></div>
              <span className="absolute bottom-4 left-6 text-[10px] font-black tracking-widest text-white/50 uppercase">Pioneers Shorts</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: THE TRUE DIAGONAL MOUNTAIN FOOTER --- */}
      {/* Η εικόνα ξεκινάει ακριβώς εδώ, με τη διαγώνια κοπή στην κορυφή της */}
      <div className="relative bg-[#000A0F] overflow-hidden">
        
        {/* Η διαγώνια σφήνα */}
        <div className="w-full overflow-hidden relative z-30 bg-transparent rotate-180">
          <svg viewBox="0 0 100 5" preserveAspectRatio="none" width="100%" height="60" style={{ display: "block" }}>
            <polygon points="-1,0 0,5 101,5" fill="#F8F9FA"></polygon>
          </svg>
        </div>

        {/* Η εικόνα της οροσειράς (Framer bM3zU8ikfSHFLRniHcb1d8qGW8.jpg) */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <img 
            src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
            alt="Mountain range" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000A0F] via-transparent to-[#001621]" />
        </div>

        {/* Content του Footer (CTA + Links) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center pt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight max-w-2xl leading-tight mb-8 drop-shadow-md">
            Join 20M+ explorers by downloading Polarsteps today!
          </h2>
          
          <button className="bg-white text-[#000A0F] font-bold px-7 py-3.5 rounded-xl shadow-2xl transition-all flex items-center gap-3 mb-32 hover:scale-105 group text-sm">
            <span className="w-5 h-5 rounded-md bg-gradient-to-b from-[#FC1547] to-[#FE4367] flex items-center justify-center text-[10px] text-white font-bold">🧭</span>
            Get the app
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
                  <li><Link href="#" className="hover:text-white transition-colors">Stories</Link></li>
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
                  <li><Link href="#" className="hover:text-white transition-colors">Contact us</Link></li>
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
