"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-[100] px-6 py-6 flex justify-between items-center text-white">
      <div className="font-display text-2xl font-extrabold tracking-tighter">
        NomadFlow
      </div>
      <div className="hidden md:flex gap-8 text-sm font-bold drop-shadow-md">
        <Link href="#" className="hover:opacity-70 transition-opacity">Explore</Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">How it works</Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">Community</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="text-sm font-bold px-4 py-2 hover:opacity-70 transition-opacity">Log In</Link>
        {/* Το ακριβές κουμπί "Get the app" μεταφρασμένο σε Tailwind */}
        <Link href="/signup" className="flex items-center gap-2 bg-gradient-to-b from-[#FC1547] to-[#FE4367] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-[0_10px_18px_-3.75px_rgba(66,0,16,0.25)] hover:scale-105 transition-transform border-t border-white/20">
          Get the app
        </Link>
      </div>
    </nav>
  );
};

export default function NomadFlowLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Custom Scroll Listener για να μην χτυπάει το Vercel
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const maxScroll = height - windowHeight;
      let currentProgress = -top / maxScroll;
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calc = (minP: number, maxP: number, minV: number, maxV: number) => {
    if (progress <= minP) return minV;
    if (progress >= maxP) return maxV;
    return minV + ((progress - minP) / (maxP - minP)) * (maxV - minV);
  };

  // --- POLARSTEPS ANIMATION TIMELINE ---
  const textOpacity = calc(0, 0.15, 1, 0);
  const textY = calc(0, 0.15, 0, -50);
  const bgScale = calc(0.1, 0.4, 1, 0.85); 
  const bgRadius = calc(0.1, 0.4, 0, 48); 
  const phoneY = calc(0.2, 0.5, 100, 15); 
  const phoneScale = calc(0.2, 0.5, 0.8, 1); 

  return (
    <main className="bg-[#F8F9FA] relative">
      <Navbar />

      {/* --- POLARSTEPS STICKY HERO (300vh Scroll Track) --- */}
      <section ref={containerRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-32">
          
          {/* Το Background που μικραίνει */}
          <div 
            style={{ transform: `scale(${bgScale})`, borderRadius: `${bgRadius}px` }}
            className="absolute inset-0 w-full h-full overflow-hidden origin-bottom z-0 will-change-transform"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2000&q=90" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Τα ακριβή κείμενα από το Inspect Element σου */}
          <div 
            style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
            className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center mt-[10vh] will-change-transform"
          >
            <div className="flex gap-4 mb-6">
               <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">⭐ Editors Choice</span>
               <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">🏆 App of the Day</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              One travel app for <br /> all your adventures
            </h1>
            <p className="text-xl text-white/90 max-w-xl mb-8 drop-shadow-md">
              Join the 20M+ travelers who plan, track, and relive their trips with NomadFlow.
            </p>
            {/* Το ακριβές κουμπί από τον κώδικά σου */}
            <button className="flex items-center gap-3 bg-gradient-to-b from-[#FC1547] to-[#FE4367] text-white px-8 py-4 rounded-full shadow-[0_10px_18px_-3.75px_rgba(66,0,16,0.25)] hover:scale-105 transition-transform border-t border-white/20">
              <span className="font-bold text-lg">Get the app</span>
            </button>
          </div>

          {/* Το Κινητό που ανεβαίνει */}
          <div 
            style={{ transform: `translateY(${phoneY}vh) scale(${phoneScale})` }}
            className="absolute bottom-0 z-30 w-[340px] h-[700px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col origin-bottom will-change-transform"
          >
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
              <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
            </div>
            <div className="relative w-full h-full bg-[#1A1A1A]">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                alt="Map Mockup" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-16 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">👩‍🚀</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Emma Miller</p>
                    <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Backpacking Asia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ΕΔΩ ΕΙΝΑΙ ΤΑ ΔΙΚΑ ΜΑΣ SECTIONS ΓΙΑ ΝΑ ΜΗΝ ΤΑ ΧΑΣΟΥΜΕ --- */}
      <section className="relative z-40 bg-[#F8F9FA] py-32 border-t border-gray-200 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Features</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Everything you need, in one place.</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-[400px]">
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-2xl">📍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Interactive Maps</h3>
            <p className="text-gray-500 max-w-sm">Visualize your entire journey. Pin spots, calculate routes, and optimize your daily exploring with ease.</p>
          </div>
          <div className="group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-[400px]">
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-2xl">✨</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">AI Magic</h3>
            <p className="text-gray-500">Get smart suggestions for hidden gems based on your group&apos;s vibe.</p>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-100 text-center text-sm text-gray-400 font-medium">
        © 2026 NomadFlow. Rebuilt with custom code based on exact references.
      </footer>
    </main>
  );
}
