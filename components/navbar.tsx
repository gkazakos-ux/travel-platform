"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "explore", label: "Explore", href: "/explore" },
    { id: "how-it-works", label: "How it works", href: "#" },
    { id: "login", label: "Log in", href: "/login" },
  ];

  // ΚΑΘΟΛΙΚΟΣ ΕΛΕΓΧΟΣ: Fixed capsule ΜΟΝΟ στην αρχική σελίδα. Absolute παντού αλλού!
  const isHomePage = pathname === "/";
  const navPositionClass = isHomePage ? "fixed" : "absolute";
  const usePillMode = isScrolled && isHomePage;

  return (
    <nav className={`left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${navPositionClass} ${usePillMode ? "top-4 px-4" : "top-0 px-[clamp(20px,5vw,52px)]"}`}>
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setHoveredItem(null); }}
        className={`relative flex items-center justify-between w-full transition-all duration-500 overflow-hidden ${
          usePillMode
            ? "max-w-4xl bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] text-[#0B2027] rounded-full px-6 py-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/20"
            : !isHomePage
              ? "max-w-7xl bg-transparent text-[#0B2027] py-[18px]" // Σκούρα γράμματα για όλες τις εσωτερικές σελίδες
              : "max-w-7xl bg-transparent text-white mix-blend-difference py-[18px]" // Blend mode μόνο για το Home Hero
        }`}
      >
        {usePillMode && (
          <div
            className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
            style={{ background: `radial-gradient(120px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.4), transparent 100%)` }}
          />
        )}

        <Link href="/" className="relative z-10 flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block" />
          Pathlore
        </Link>

        <div className="relative z-10 hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-4 py-2 transition-colors rounded-full ${usePillMode || !isHomePage ? "text-[#0B2027]" : "text-white hover:text-[#FF6B35]"}`}
              >
                {hoveredItem === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${usePillMode || !isHomePage ? "bg-white/40 border border-white/30" : "bg-white/10 backdrop-blur-sm border border-white/10"}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/signup"
            className={`ml-2 px-5 py-2.5 rounded-full transition-transform hover:scale-105 relative z-10 ${usePillMode ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20" : "bg-[#FF6B35] text-white"}`}
          >
            Start Planning
          </Link>

          <button className="relative z-10 flex flex-col justify-center items-center gap-[5px] w-8 h-8 ml-2 hover:opacity-70 transition-opacity">
            <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${usePillMode || !isHomePage ? "bg-[#0B2027]" : "bg-white"}`} />
            <span className={`w-[14px] h-[2px] rounded-full transition-colors duration-500 ${usePillMode || !isHomePage ? "bg-[#0B2027]" : "bg-white"}`} />
            <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${usePillMode || !isHomePage ? "bg-[#0B2027]" : "bg-white"}`} />
          </button>
        </div>

        <button className="relative z-10 md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 hover:opacity-70 transition-opacity">
          <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${usePillMode || !isHomePage ? "bg-[#0B2027]" : "bg-white"}`} />
          <span className={`w-[14px] h-[2px] rounded-full transition-colors duration-500 ${usePillMode || !isHomePage ? "bg-[#0B2027]" : "bg-white"}`} />
          <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${usePillMode || !isHomePage ? "bg-[#0B2027]" : "bg-white"}`} />
        </button>
      </div>
    </nav>
  );
}