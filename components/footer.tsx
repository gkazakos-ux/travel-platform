"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative bg-[#000A0F] overflow-hidden -mt-[400px] pt-[400px] z-10">
      <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" alt="Mountain range" className="w-full h-full object-cover object-top opacity-80 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000A0F]/90 to-[#001621]" />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center pt-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight max-w-[18ch] leading-tight mb-8">
          Your next trip is <em className="text-[#FF6B35] not-italic">someone&apos;s last one.</em>
        </h2>
        <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full shadow-[0_14px_26px_-10px_rgba(255,107,53,0.6)] transition-all flex items-center gap-3 mb-32 hover:-translate-y-1 text-sm">
          Start Planning
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
          <p>© 2026 Pathlore. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}