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

// --- 2. MAIN LANDING PAGE COMPONENT ---
export default function NomadFlowLanding() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  
  const storyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Ο ΠΙΟ ΣΤΑΘΕΡΟΣ ΚΑΙ ΑΠΛΟΣ SCROLL TRACKER - ΧΩΡΙΣ EXTERNAL LIBRARIES
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // 1. Hero Zoom Out
      setHeroProgress(Math.min(1, Math.max(0, scrollY / 600)));
      
      // 2. Interactive Sticky Phone Story
      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        // Πόσο ύψος έχει μείνει να σκρολάρουμε μέσα στο wrapper
        const totalScroll = rect.height - vh;
        // Πόσο έχουμε σκρολάρει (το top είναι αρνητικό καθώς πάμε κάτω)
        const scrolled = -rect.top;

        if (scrolled < 0) {
          setActiveStep(0);
        } else if (scrolled > totalScroll) {
          setActiveStep(2);
        } else {
          const progress = scrolled / totalScroll;
          if (progress < 0.35) {
            setActiveStep(0);
          } else if (progress >= 0.35 && progress < 0.65) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Κουμπιά για το Carousel
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
      <section className="relative h-[120vh] bg-[#F8F9FA] overflow-hidden flex flex-col justify-start pt-32">
        <div 
          style={{ transform: `scale(${heroScale})`, borderRadius: `${heroRadius}px` }}
          className="absolute inset-0 w-full h-full origin-bottom will-change-transform z-0 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://www.getlostmagazine.com/wp-content/uploads/2023/11/GL12-HOT5-1-1500x900-1.jpg" 
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

      {/* --- SECTION 2: INTERACTIVE STICKY PHONE SCROLL STORY --- */}
      {/* Το h-[350vh] μας δίνει αρκετό χώρο για να κάνουμε scroll ενώ η οθόνη "κλειδώνει" */}
      <section ref={storyRef} className="relative h-[350vh] bg-[#F8F9FA]">
        
        {/* Το sticky container */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[repeating-radial-gradient(circle_at_85%_18%,transparent_0_50px,rgba(0,41,61,0.03)_50px_51px)]">
          <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* --- ΑΡΙΣΤΕΡΗ ΣΤΗΛΗ: ΚΕΙΜΕΝΑ --- */}
            <div className="relative h-[250px] md:h-[350px] w-full">
              
              {/* Κείμενο Step 1 */}
              <div className={`absolute inset-0 flex flex-col justify-center text-center md:text-left transition-all duration-700 transform ${activeStep === 0 ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' : 'opacity-0 translate-y-8 z-0 pointer-events-none'}`}>
                <div className="text-[11px] font-bold text-[#00DB9A] tracking-widest uppercase mb-2">01 / 03</div>
                <div className="text-sm font-bold text-[#FF6B35] tracking-widest uppercase mb-3">Discover</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] mb-4 tracking-tight">Find a real trip</h2>
                <p className="text-lg text-gray-500 max-w-md mx-auto md:mx-0">Browse day-by-day itineraries from travellers who actually went, and map out your route before you go.</p>
                <div className="flex justify-center md:justify-start gap-2 mt-8">
                  <span className="w-8 h-1.5 rounded-full bg-[#FF6B35] transition-all"></span>
                  <span className="w-2 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="w-2 h-1.5 rounded-full bg-gray-300"></span>
                </div>
              </div>

              {/* Κείμενο Step 2 */}
              <div className={`absolute inset-0 flex flex-col justify-center text-center md:text-left transition-all duration-700 transform ${activeStep === 1 ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' : 'opacity-0 translate-y-8 z-0 pointer-events-none'}`}>
                <div className="text-[11px] font-bold text-[#00DB9A] tracking-widest uppercase mb-2">02 / 03</div>
                <div className="text-sm font-bold text-[#FF6B35] tracking-widest uppercase mb-3">Save & Track</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] mb-4 tracking-tight">Keep the ones you love</h2>
                <p className="text-lg text-gray-500 max-w-md mx-auto md:mx-0">Bookmark itineraries, build your own shortlist, and capture your route automatically while offline.</p>
                <div className="flex justify-center md:justify-start gap-2 mt-8">
                  <span className="w-2 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="w-8 h-1.5 rounded-full bg-[#FF6B35] transition-all"></span>
                  <span className="w-2 h-1.5 rounded-full bg-gray-300"></span>
                </div>
              </div>

              {/* Κείμενο Step 3 */}
              <div className={`absolute inset-0 flex flex-col justify-center text-center md:text-left transition-all duration-700 transform ${activeStep === 2 ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' : 'opacity-0 translate-y-8 z-0 pointer-events-none'}`}>
                <div className="text-[11px] font-bold text-[#00DB9A] tracking-widest uppercase mb-2">03 / 03</div>
                <div className="text-sm font-bold text-[#FF6B35] tracking-widest uppercase mb-3">Relive</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] mb-4 tracking-tight">Make it your own</h2>
                <p className="text-lg text-gray-500 max-w-md mx-auto md:mx-0">Copy any itinerary into your own draft in one tap, tweak every day, and look back at your memories.</p>
                <div className="flex justify-center md:justify-start gap-2 mt-8">
                  <span className="w-2 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="w-2 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="w-8 h-1.5 rounded-full bg-[#FF6B35] transition-all"></span>
                </div>
              </div>
            </div>

            {/* --- ΔΕΞΙΑ ΣΤΗΛΗ: ΤΟ ΚΙΝΗΤΟ ΜΕ ΤΟ UI ΠΟΥ ΑΛΛΑΖΕΙ --- */}
            <div className="flex justify-center">
              <div className="relative w-[280px] md:w-[310px] h-[580px] md:h-[620px] bg-[#001621] border-[8px] border-gray-900 shadow-2xl rounded-[40px] p-3">
                {/* Το μαύρο notch (κάμερα) */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-xl z-50 pointer-events-none"></div>
                
                {/* Η Οθόνη */}
                <div className="w-full h-full bg-[#fbfaf7] rounded-[28px] overflow-hidden relative">
                  
                  {/* --- SCREEN 1: MAP VIEW --- */}
                  <div className={`absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#173e4b,#0c2630)] transition-opacity duration-700 ${activeStep === 0 ? "opacity-100 z-30" : "opacity-0 pointer-events-none z-0"}`}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 570" fill="none">
                      <path stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,8" d="M40 480 C 110 400, 70 320, 150 280 S 230 200, 210 90"/>
                      <circle cx="40" cy="480" r="5" fill="#fff"/>
                      <circle cx="150" cy="280" r="5" fill="#fff"/>
                      <circle cx="210" cy="90" r="5" fill="#fff"/>
                    </svg>
                    <div className="absolute bottom-6 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E4531F] flex items-center justify-center text-white font-bold text-sm">M</div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 leading-tight">8 days in Portugal</div>
                        <div className="text-[10px] text-gray-500 font-semibold">Maria · Lisbon → Porto</div>
                      </div>
                    </div>
                  </div>

                  {/* --- SCREEN 2 & 3: FEED & CARD VIEW --- */}
                  <div className={`absolute inset-0 pt-10 px-3 pb-3 flex flex-col gap-3 transition-all duration-700 bg-[#fbfaf7] ${activeStep >= 1 ? "opacity-100 z-40" : "opacity-0 pointer-events-none"}`}>
                    
                    {/* Τα μικρά Feed Items (Εξαφανίζονται στο Step 3) */}
                    <div className={`flex flex-col gap-2 transition-all duration-700 transform origin-top ${activeStep === 1 ? "scale-y-100 opacity-100 h-auto" : "scale-y-0 opacity-0 h-0 overflow-hidden"}`}>
                      <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1d6076] to-[#62b6c7]"></div>
                        <div><div className="text-xs font-bold text-gray-900 mb-1">Tokyo in a week</div><div className="w-16 h-1.5 bg-gray-200 rounded-full"></div></div>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c2603a] to-[#ff6b35]"></div>
                        <div><div className="text-xs font-bold text-gray-900 mb-1">Patagonia road trip</div><div className="w-20 h-1.5 bg-gray-200 rounded-full"></div></div>
                      </div>
                    </div>

                    {/* Η Μεγάλη Κάρτα (Μεγαλώνει στο Step 3) */}
                    <div className="flex-1 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-700 relative">
                      <div className="h-[140px] bg-gradient-to-br from-[#13414f] to-[#62b6c7] relative">
                        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 290 150" fill="none" preserveAspectRatio="none">
                          <path stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" d="M28 110 C 90 70, 130 120, 175 60 S 245 40, 268 28"/>
                          <circle cx="28" cy="110" r="4" fill="#fff"/>
                          <circle cx="175" cy="60" r="4" fill="#fff"/>
                        </svg>
                        <span className="absolute top-3 right-3 bg-black/40 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">8 days</span>
                        {/* Εμφάνιση του tag "Saved" στο Step 3 */}
                        <span className={`absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2.5 py-1 rounded-full transition-all duration-500 transform ${activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>♥ Saved</span>
                      </div>
                      
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-xs">M</div>
                          <div><div className="text-xs font-bold text-gray-900">Maria</div><div className="text-[9px] text-gray-500">Lisbon → Porto</div></div>
                        </div>
                        <h3 className="text-[17px] font-extrabold text-gray-900 mb-3">8 days in Portugal</h3>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold bg-[#e8f0f1] text-[#48707f] px-2 py-1 rounded-lg">Day 1</span>
                          <span className="text-[10px] font-bold bg-[#e8f0f1] text-[#48707f] px-2 py-1 rounded-lg">Day 2</span>
                          <span className="text-[10px] font-bold bg-[#e8f0f1] text-[#48707f] px-2 py-1 rounded-lg">+5</span>
                        </div>
                        
                        <div className="mt-auto flex flex-col gap-2">
                          <div className="flex gap-2">
                            <div className={`flex-1 flex justify-center py-2.5 rounded-xl border text-[11px] font-bold transition-all duration-500 ${activeStep === 1 ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md" : "bg-white text-gray-800 border-gray-200"}`}>Save</div>
                            <div className={`flex-1 flex justify-center py-2.5 rounded-xl border text-[11px] font-bold transition-all duration-500 ${activeStep === 2 ? "bg-[#00293D] text-white border-[#00293D] shadow-md" : "bg-white text-gray-800 border-gray-200"}`}>Copy</div>
                          </div>
                          {/* Alert που εμφανίζεται στο τέλος */}
                          <div className={`text-[9px] font-bold text-center text-[#E4531F] bg-[#FF6B35]/10 border border-dashed border-[#FF6B35]/40 py-2 rounded-xl transition-all duration-500 transform ${activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
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
            {/* STACK 1 */}
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

            {/* STACK 2: Video (Alex Hubin) */}
            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-2xl overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" alt="Alex" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">AH</div>
                <div><p className="text-xs font-bold text-white">Alex Hubin</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Adventurer</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
            </div>

            {/* STACK 3 */}
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

            {/* STACK 4 */}
            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-2xl overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" alt="Leoni" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">LK</div>
                <div><p className="text-xs font-bold text-white">Leoni Kolberg</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Solo Cyclist</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
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
