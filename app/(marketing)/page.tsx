"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-transparent text-white mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tighter">
            NomadFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#" className="hover:opacity-70 transition-opacity">Explore</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">How it works</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">Community</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold px-4 py-2 hover:opacity-70">Log In</Link>
          <Link href="/signup" className="bg-white text-black text-sm font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform">
            Get the app
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function NomadFlowLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Ο custom μηχανισμός μας που διαβάζει ακριβώς το scroll μέσα στο 300vh container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Πόσο έχει σκρολάρει ο χρήστης μέσα σε αυτό το συγκεκριμένο section (0 έως 1)
      const maxScroll = height - windowHeight;
      let currentProgress = -top / maxScroll;
      
      // Κρατάμε την τιμή αυστηρά ανάμεσα στο 0 και το 1
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Αρχικοποίηση
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- ΜΑΘΗΜΑΤΙΚΑ ΓΙΑ ΤΑ ANIMATIONS (σαν το βίντεο του Polarsteps) ---
  
  // Βοηθητική συνάρτηση: "Αν το scroll είναι από X έως Y, άλλαξε την τιμή από Α σε Β"
  const calc = (minP: number, maxP: number, minV: number, maxV: number) => {
    if (progress <= minP) return minV;
    if (progress >= maxP) return maxV;
    return minV + ((progress - minP) / (maxP - minP)) * (maxV - minV);
  };

  // 1. Το κείμενο "σβήνει" (από 0% έως 15% του scroll)
  const textOpacity = calc(0, 0.15, 1, 0);
  const textY = calc(0, 0.15, 0, -50); 

  // 2. Το Background μικραίνει και στρογγυλεύει (από 10% έως 40% του scroll)
  const bgScale = calc(0.1, 0.4, 1, 0.85); // Μικραίνει στο 85%
  const bgRadius = calc(0.1, 0.4, 0, 48); // Στρογγυλεύει τις γωνίες (px)
  
  // 3. Το κινητό ανεβαίνει από κάτω (από 20% έως 50% του scroll)
  const phoneY = calc(0.2, 0.5, 120, 0); // Από 120% (εκτός οθόνης) έρχεται στο 0% (κέντρο)
  const phoneScale = calc(0.2, 0.5, 0.8, 1);

  return (
    <main className="bg-[#F8F9FA] relative">
      <Navbar />

      {/* ΕΔΩ ΕΙΝΑΙ ΤΟ ΜΥΣΤΙΚΟ: h-[300vh]. 
        Αναγκάζει τον χρήστη να σκρολάρει για 3 οθόνες πριν φτάσει στο επόμενο section!
      */}
      <section ref={containerRef} className="relative h-[300vh] w-full bg-[#F8F9FA]">
        
        {/* Αυτό το div "κλειδώνει" στην οθόνη όσο εσύ σκρολάρεις το 300vh */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* --- Το Cinematic Background που μικραίνει --- */}
          <div 
            style={{ 
              transform: `scale(${bgScale})`, 
              borderRadius: `${bgRadius}px`,
            }}
            className="absolute inset-0 w-full h-full overflow-hidden origin-center will-change-transform"
          >
            {/* Dark overlay για να φαίνεται το κείμενο */}
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2000&q=90" 
              alt="Jungle River" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- Το Κείμενο που σβήνει --- */}
          <div 
            style={{ 
              opacity: textOpacity, 
              transform: `translateY(${textY}px)` 
            }}
            className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center will-change-transform mt-[-10vh]"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
              One travel app for <br />
              all your adventures
            </h1>
            <p className="text-xl text-white/90 max-w-xl mb-8">
              Join the travelers who plan, track, and relive their trips with NomadFlow.
            </p>
            <button className="bg-white text-black font-bold px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform">
              Get the app ➔
            </button>
          </div>

          {/* --- Το Mockup Κινητού που ανεβαίνει (Όπως στο Polarsteps) --- */}
          <div 
            style={{ 
              transform: `translateY(${phoneY}vh) scale(${phoneScale})`,
            }}
            className="absolute bottom-[-10vh] z-30 w-[320px] h-[650px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden will-change-transform flex flex-col"
          >
            {/* Η "τρύπα" της κάμερας του iPhone */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
              <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
            </div>
            
            {/* Ο χάρτης μέσα στο κινητό */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
              alt="Map App Mockup" 
              className="w-full h-full object-cover opacity-90"
            />

            {/* Ένα ψεύτικο UI μέσα στο κινητό για ρεαλισμό */}
            <div className="absolute top-16 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">👤</div>
                 <div>
                   <p className="text-xs font-bold text-gray-900">Emma Miller</p>
                   <p className="text-[10px] text-gray-500">Backpacking Asia</p>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- ΕΠΟΜΕΝΟ SECTION --- */}
      <section className="relative z-40 bg-[#F8F9FA] py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">
              Plan your next adventure
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Everything you need exactly when you need it.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-100 text-center text-xs text-gray-400 font-medium">
        © 2026 NomadFlow.
      </footer>
    </main>
  );
}
