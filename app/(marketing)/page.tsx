"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold text-[#FF6B35] tracking-tighter">
            NomadFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Explore</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">How it works</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Community</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-gray-900 px-4 py-2 hover:text-[#FF6B35] transition">Log In</Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95">
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function NomadFlowLanding() {
  // Χρησιμοποιούμε state για να παρακολουθούμε το scroll position
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Υπολογίζουμε πόσο έχει σκρολάρει ο χρήστης σε σχέση με το ύψος του Hero (περίπου 600px)
      const totalHeight = 600;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / totalHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Υπολογίζουμε χειροκίνητα τις τιμές του Polarsteps Zoom Out
  const currentScale = 1.25 - scrollProgress * 0.3; // Από 1.25 πέφτει στο 0.95
  const currentRadius = `${scrollProgress * 3}rem`; // Από 0rem πάει σε 3rem στρογγυλάδα
  const currentOpacity = 1 - scrollProgress * 2; // Το κείμενο εξαφανίζεται γρήγορα

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />

      {/* --- HERO SECTION WITH CUSTOM ZOOM OUT (FIXED & SECURE) --- */}
      <section className="relative h-[110vh] flex flex-col justify-between items-center overflow-hidden bg-black">
        
        {/* Ο Καμβάς που κάνει Zoom Out με βάση το state μας */}
        <motion.div 
          style={{ 
            scale: currentScale, 
            borderRadius: currentRadius 
          }}
          className="absolute inset-0 w-full h-full overflow-hidden origin-center z-0 transition-all duration-75 ease-out"
        >
          <img 
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=90" 
            alt="Cinematic Travel Background" 
            className="w-full h-full object-cover brightness-[60%] contrast-[105%]"
          />
        </motion.div>

        {/* Το κείμενο του Hero που ξεθωριάζει */}
        <motion.div 
          style={{ opacity: Math.max(currentOpacity, 0) }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-52 flex flex-col items-center flex-grow justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6">
            ✨ Next-Gen Travel Log System
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6">
            One platform for all <br />
            <span className="text-[#FF6B35]">your adventures.</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-xl mb-10 leading-relaxed">
            Discover secret spots pinned by real experts. Follow authentic logs, track paths, and sync your maps with absolute clarity.
          </p>
          <Link href="/signup" className="bg-[#FF6B35] text-white font-extrabold px-12 py-5 rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-105 transition-all active:scale-95 text-lg">
            Get the App Now ➔
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-12 text-white/50 text-xs font-bold uppercase tracking-widest animate-bounce">
          Scroll down to explore ↓
        </div>
      </section>

      {/* --- ΕΠΟΜΕΝΟ SECTION --- */}
      <section className="relative z-20 bg-[#F8F9FA] py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-4 py-1.5 rounded-full">
              The Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">
              Bypass algorithms. <br />Trust real tracks.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30">
              <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-2xl flex items-center justify-center text-xl font-bold mb-6">🗺️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Path Visualizer</h3>
              <p className="text-gray-500 leading-relaxed">
                Watch timelines connect seamlessly across maps. Every spot is fully archived with coordinates, entry photos, and custom advice.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30">
              <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-2xl flex items-center justify-center text-xl font-bold mb-6">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Node Feeds</h3>
              <p className="text-gray-500 leading-relaxed">
                Filter your discovery stream by specific expert tiers. Find what you need without wading through sponsored ads or spam reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-100 text-center text-xs text-gray-400 font-medium">
        © 2026 NomadFlow. Engineered with custom native scroll listeners.
      </footer>
    </main>
  );
}
