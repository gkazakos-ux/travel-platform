"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

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
  // 1. Reference the tall container that controls the scroll timeline
  const targetRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll progress specifically within this target container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // --- ANIMATION TIMELINES (Mapped to scrollYProgress from 0 to 1) ---

  // Text Animation: Fades out and moves up early in the scroll (0% to 15%)
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Background Animation: Zooms out and rounds corners (10% to 40%)
  const bgScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.85]);
  const bgRadius = useTransform(scrollYProgress, [0.1, 0.4], ["0rem", "3rem"]);

  // Phone Animation: Slides up from the bottom (20% to 50%)
  const phoneY = useTransform(scrollYProgress, [0.2, 0.5], ["100vh", "15vh"]);
  const phoneScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);

  return (
    <main className="bg-[#F8F9FA] relative">
      <Navbar />

      {/* THE SCROLL TRACK
        This container is 300vh tall. It provides the scrolling space needed 
        to scrub through the animations. 
      */}
      <section ref={targetRef} className="relative h-[300vh] bg-black">
        
        {/* THE STICKY VIEWPORT
          This locks to the screen while the user scrolls through the 300vh track above.
        */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-32">
          
          {/* --- THE ZOOMING BACKGROUND --- */}
          <motion.div 
            style={{ 
              scale: bgScale, 
              borderRadius: bgRadius 
            }}
            className="absolute inset-0 w-full h-full overflow-hidden origin-bottom z-0"
          >
            {/* Dark gradient overlay so text is readable */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2000&q=90" 
              alt="Cinematic Jungle River" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* --- THE FADING TEXT --- */}
          <motion.div 
            style={{ 
              opacity: textOpacity, 
              y: textY 
            }}
            className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center mt-[10vh]"
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
          </motion.div>

          {/* --- THE RISING PHONE MOCKUP --- */}
          <motion.div 
            style={{ 
              y: phoneY,
              scale: phoneScale
            }}
            className="absolute bottom-0 z-30 w-[340px] h-[700px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col origin-bottom"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
              <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
            </div>
            
            {/* Phone Content (The Map) */}
            <div className="relative w-full h-full bg-[#1A1A1A]">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                alt="Map UI Mockup" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              
              {/* Fake UI Overlay inside the phone */}
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
          </motion.div>

        </div>
      </section>

      {/* --- NEXT SECTION --- 
          This will only scroll into view AFTER the user has scrolled past the 300vh sticky section.
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
