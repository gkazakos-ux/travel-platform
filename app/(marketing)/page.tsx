"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- Βοηθητικό Component για το Κινητό ---
const PhoneMockup = ({ activeStep }: { activeStep: number }) => {
  const screens = [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80", // Plan Map
    "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80", // Track Route
    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=600&q=80"  // Relive Photos
  ];

  return (
    <div className="relative w-[300px] md:w-[340px] h-[600px] md:h-[700px] bg-white rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
        <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
      </div>
      
      {/* Οθόνες που αλλάζουν με βάση το Scroll */}
      <div className="relative w-full h-full bg-gray-100">
        {screens.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Screen ${index}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeStep === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        
        {/* Profile Overlay */}
        <div className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl overflow-hidden border border-orange-200">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Emma Miller</p>
              <p className="text-[10px] text-[#FF6B35] font-bold uppercase tracking-wider">Backpacking Asia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NomadFlowLanding() {
  const [globalProgress, setGlobalProgress] = useState(0);

  // Ο κεντρικός μηχανισμός Scroll της σελίδας
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      
      // Υπολογισμός για το Hero Zoom (Πρώτα 600px)
      const heroP = Math.max(0, Math.min(1, scrollY / 600));
      
      // Υπολογισμός για το Sticky Story (Μετά τα πρώτα 600px)
      const storyStart = 600;
      const storyEnd = storyStart + (windowH * 3);
      let storyP = 0;
      if (scrollY > storyStart) {
        storyP = Math.max(0, Math.min(1, (scrollY - storyStart) / (storyEnd - storyStart)));
      }

      setGlobalProgress({ hero: heroP, story: storyP });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Μαθηματικά για το Hero
  const heroScale = 1.25 - (globalProgress.hero * 0.3); // 1.25 -> 0.95
  const heroRadius = globalProgress.hero * 48; // 0 -> 48px
  const heroTextOpacity = 1 - (globalProgress.hero * 2); 

  // Υπολογισμός ενεργού βήματος για το κινητό (0, 1, 2)
  let activeStep = 0;
  if (globalProgress.story > 0.33 && globalProgress.story <= 0.66) activeStep = 1;
  if (globalProgress.story > 0.66) activeStep = 2;

  return (
    <main className="bg-white relative min-h-screen font-sans">
      
      {/* Navbar - Καθαρή, με το #FF6B35 λογότυπο */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex justify-between items-center text-white mix-blend-difference">
        <div className="text-2xl font-extrabold tracking-tighter text-white">NomadFlow</div>
        <div className="hidden md:flex gap-8 text-sm font-bold">
          <Link href="#" className="hover:opacity-70 transition-opacity">Explore</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">How it works</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold hover:opacity-70 transition-opacity">Log In</Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* --- SECTION 1: HERO ZOOM OUT --- */}
      <section className="relative h-[120vh] bg-black overflow-hidden flex flex-col justify-start pt-32">
        <div 
          style={{ transform: `scale(${heroScale})`, borderRadius: `${heroRadius}px` }}
          className="absolute inset-0 w-full h-full origin-bottom will-change-transform z-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2000&q=90" alt="Hero Background" className="w-full h-full object-cover" />
        </div>

        <div 
          style={{ opacity: heroTextOpacity }}
          className="relative z-20 text-center max-w-4xl mx-auto px-6 mt-[5vh] flex flex-col items-center"
        >
          <div className="flex gap-3 mb-6">
            <span className="text-white/90 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">✨ 20,000+ Secret Spots</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
            One travel app for <br /> all your adventures
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10">
            Join the travelers who plan, track, and relive their trips with NomadFlow. Bypass tourist traps forever.
          </p>
          <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(255,107,53,0.3)]">
            Get the app
          </button>
        </div>
      </section>

      {/* --- SECTION 2: THE STICKY PHONE SCROLL STORY --- */}
      {/* 300vh ύψος για να υπάρχει χώρος για το scroll, με φόντο το δικό σου #F8F9FA */}
      <section className="relative h-[300vh] bg-[#F8F9FA]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between">
            
            {/* Αριστερό κείμενο που αλλάζει */}
            <div className="flex-1 text-center md:text-left mb-10 md:mb-0 relative h-[150px] md:h-[300px]">
              {/* STEP 1 TEXT */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-full transition-all duration-700 ${activeStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <h3 className="text-[#FF6B35] font-bold tracking-widest uppercase text-sm mb-2">Itinerary builder</h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Plan your next adventure</h2>
                <p className="text-lg text-gray-500">Get personalized travel tips and map out your route before you go.</p>
              </div>

              {/* STEP 2 TEXT */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-full transition-all duration-700 ${activeStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                <h3 className="text-[#FF6B35] font-bold tracking-widest uppercase text-sm mb-2">Trip Tracker</h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Capture your route automatically</h2>
                <p className="text-lg text-gray-500">Share the journey with family and friends through step-by-step updates.</p>
              </div>

              {/* STEP 3 TEXT */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-full transition-all duration-700 ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                <h3 className="text-[#FF6B35] font-bold tracking-widest uppercase text-sm mb-2">A recap of your trip</h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Relive the adventure</h2>
                <p className="text-lg text-gray-500">See your travel stats grow and look back at your memories.</p>
              </div>
            </div>

            {/* Το Κινητό στο Κέντρο */}
            <div className="flex-1 flex justify-center z-20">
              <PhoneMockup activeStep={activeStep} />
            </div>

            {/* Δεξί spacer για ισορροπία στο desktop */}
            <div className="hidden md:block flex-1"></div>
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

      {/* --- SECTION 4: AND THE BEST PART (BENTO GRID - Με τα χρώματά σου) --- */}
      <section className="py-32 bg-[#F8F9FA] px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-16 text-center tracking-tight">And the best part...</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Privacy (Σκούρο για αντίθεση) */}
            <div className="md:col-span-2 bg-gray-900 rounded-3xl p-10 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Full privacy control</h3>
                <p className="text-gray-400 text-lg">You decide who can see your trip</p>
              </div>
              <div className="relative z-10 flex gap-2">
                 <span className="bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20">🔒 Only you</span>
                 <span className="bg-white/10 text-white/50 px-4 py-2 rounded-full text-sm">Friends</span>
              </div>
            </div>

            {/* Box 2: Free */}
            <div className="bg-white rounded-3xl p-10 flex items-center justify-center text-center shadow-sm border border-gray-100">
              <h3 className="text-5xl font-black text-[#FF6B35] tracking-tighter">It's free!</h3>
            </div>

            {/* Box 3: Travelers */}
            <div className="bg-[#FF6B35] rounded-3xl p-10 flex items-center justify-center text-center shadow-lg shadow-orange-500/20">
              <h3 className="text-3xl font-bold text-white leading-tight">By travelers, <br/> for travelers</h3>
            </div>

            {/* Box 4: Offline */}
            <div className="md:col-span-2 bg-white rounded-3xl p-10 border border-gray-100 flex flex-col justify-center relative overflow-hidden shadow-sm">
               <img src="https://images.unsplash.com/photo-1522199710521-72d69614c71c?auto=format&fit=crop&w=800&q=80" alt="Offline Mode" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover opacity-90 rounded-l-[4rem]" />
               <div className="relative z-10 w-1/2">
                 <div className="w-10 h-10 bg-orange-50 text-[#FF6B35] flex items-center justify-center rounded-xl mb-4 text-xl">📵</div>
                 <h3 className="text-3xl font-bold text-gray-900 mb-2">Works offline</h3>
                 <p className="text-gray-500">Keeps tracking — even when you're offgrid</p>
               </div>
            </div>
            
            {/* Box 5: Battery */}
            <div className="md:col-span-2 bg-white rounded-3xl p-10 text-center relative overflow-hidden flex flex-col items-center justify-center border border-gray-100 shadow-sm">
               <div className="w-20 h-10 border-4 border-gray-200 rounded-xl mb-4 relative flex items-center p-1">
                  <div className="bg-[#FF6B35] h-full w-[96%] rounded-md"></div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-gray-200 rounded-r-sm"></div>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">Battery-efficient</h3>
               <p className="text-gray-500">Typically less than 4% battery per day</p>
            </div>

            {/* Box 6: Ad Free */}
            <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center border border-gray-100 shadow-sm">
               <span className="text-4xl mb-4 text-[#FF6B35]">🚫</span>
               <h3 className="text-3xl font-bold text-gray-900 leading-tight">Proudly <br/> ad-free</h3>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER (Καθαρό, Φωτεινό, NomadFlow) --- */}
      <footer className="bg-white pt-24 pb-12 text-gray-500 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-100 pb-12 mb-8">
           <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-900 mb-6 uppercase">Get Started</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/signup" className="hover:text-[#FF6B35] transition-colors">Get the app</Link></li>
                <li><Link href="/login" className="hover:text-[#FF6B35] transition-colors">Log in</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-900 mb-6 uppercase">About</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">About us</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">News & press</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-900 mb-6 uppercase">Features</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Travel Planner</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Trip Tracker</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Travel Books</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-xs font-bold tracking-widest text-gray-900 mb-6 uppercase">Help & Support</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Contact us</Link></li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-medium">
          <div className="flex gap-4 mb-4 md:mb-0">
            <span>© 2026 NomadFlow</span>
            <span>·</span>
            <Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
          </div>
          <div className="flex gap-4">
             <span className="hover:text-[#FF6B35] cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-[#FF6B35] cursor-pointer transition-colors">TikTok</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
