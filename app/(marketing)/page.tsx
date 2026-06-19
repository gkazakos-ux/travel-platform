"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// Βγάλαμε εντελώς τα useScroll και useTransform για να μην χτυπάει το Vercel!

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
      <div className="font-display text-2xl font-extrabold tracking-tighter">
        NomadFlow
      </div>
      <div className="hidden md:flex gap-8 text-sm font-bold">
        <Link href="#" className="hover:opacity-70 transition-opacity">Explore</Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">How it works</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="text-sm font-bold px-4 py-2 hover:opacity-70 transition-opacity">Log In</Link>
        <Link href="/signup" className="bg-white text-black text-sm font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform">
          Get the app
        </Link>
      </div>
    </nav>
  );
};

export default function NomadFlowLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Ο custom "κινητήρας" μας που αντικαθιστά το bugged useScroll του Framer Motion
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Υπολογίζει πόσο έχουμε σκρολάρει μέσα στο τεράστιο 300vh section (από 0 έως 1)
      const maxScroll = height - windowHeight;
      let currentProgress = -top / maxScroll;
      
      // Το κλειδώνουμε αυστηρά ανάμεσα στο 0 και το 1
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Τρέχει μια φορά στο φόρτωμα
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Βοηθητική συνάρτηση που μετατρέπει το 0-1 σε pixels/sizes
  const calc = (minP: number, maxP: number, minV: number, maxV: number) => {
    if (progress <= minP) return minV;
    if (progress >= maxP) return maxV;
    return minV + ((progress - minP) / (maxP - minP)) * (maxV - minV);
  };

  // --- POLARSTEPS ANIMATION MATH ---
  // 1. Το κείμενο "σβήνει" και πάει προς τα πάνω (0% - 15% scroll)
  const textOpacity = calc(0, 0.15, 1, 0);
  const textY = calc(0, 0.15, 0, -50);

  // 2. Η εικόνα πίσω μικραίνει (zoom out) και στρογγυλεύει (10% - 40% scroll)
  const bgScale = calc(0.1, 0.4, 1, 0.85); 
  const bgRadius = calc(0.1, 0.4, 0, 48); 

  // 3. Το κινητό ανεβαίνει από κάτω στην οθόνη (20% - 50% scroll)
  const phoneY = calc(0.2, 0.5, 100, 15); // Από 100vh έρχεται στο 15vh (κέντρο)
  const phoneScale = calc(0.2, 0.5, 0.8, 1); // Κάνει λίγο pop up

  return (
    <main className="bg-[#F8F9FA] relative">
      <Navbar />

      {/* Ο "ΣΙΔΗΡΟΔΡΟΜΟΣ" (300vh): 
        Το Section είναι 3 φορές το ύψος της οθόνης για να έχεις χώρο να σκρολάρεις.
      */}
      <section ref={containerRef} className="relative h-[300vh] bg-black">
        
        {/* ΤΟ STICKY ΚΛΕΙΔΩΜΑ: 
          Αυτό μένει καρφωμένο στην οθόνη όσο εσύ σκρολάρεις.
        */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-32">
          
          {/* --- Το Cinematic Background που μικραίνει --- */}
          <div 
            style={{ 
              transform: `scale(${bgScale})`, 
              borderRadius: `${bgRadius}px`,
            }}
            className="absolute inset-0 w-full h-full overflow-hidden origin-bottom z-0 will-change-transform transition-transform duration-75 ease-out"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2000&q=90" 
              alt="Cinematic Jungle River" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- Το Κείμενο που σβήνει --- */}
          <div 
            style={{ 
              opacity: textOpacity, 
              transform: `translateY(${textY}px)` 
            }}
            className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center mt-[10vh] will-change-transform"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              One travel app for <br />
              all your adventures
            </h1>
            <p className="text-xl text-white/90 max-w-xl mb-8 drop-shadow-md">
              Join the travelers who plan, track, and relive their trips with NomadFlow.
            </p>
            <button className="bg-[#FF6B35] text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform text-lg">
              Get the app
            </button>
          </div>

          {/* --- Το Mockup Κινητού που ανεβαίνει (Όπως στο Polarsteps) --- */}
          <div 
            style={{ 
              transform: `translateY(${phoneY}vh) scale(${phoneScale})`,
            }}
            className="absolute bottom-0 z-30 w-[340px] h-[700px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col origin-bottom will-change-transform"
          >
            {/* Η τρύπα της κάμερας (Notch) */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
              <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
            </div>
            
            {/* Ο χάρτης μέσα στο κινητό */}
            <div className="relative w-full h-full bg-[#1A1A1A]">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                alt="Map UI Mockup" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              
              {/* Profile Card μέσα στο κινητό */}
              <div className="absolute top-16 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">👩‍🚀</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Emma Miller</p>
                    <p className="text-[10px] text-gray-500 font-medium tracking-wide">BACKPACKING ASIA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- ΕΠΟΜΕΝΟ SECTION --- 
          Εμφανίζεται ΜΟΝΟ αφού τελειώσει το scroll του Hero!
      */}
      <section className="relative z-40 bg-[#F8F9FA] py-40 border-t border-gray-200 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Plan your next adventure
          </h2>
          <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
            Everything you need exactly when you need it. Build itineraries, discover hidden gems, and track your route automatically.
          </p>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-200 text-center text-sm text-gray-400 font-medium">
        © 2026 NomadFlow. Engineered with precision scroll mapping.
      </footer>
    </main>
  );
}
