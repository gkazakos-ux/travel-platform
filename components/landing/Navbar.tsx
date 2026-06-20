"use client";

/**
 * NAVBAR — Liquid Glassmorphism Floating Pill
 *
 * Physics notes:
 *   • Mount spring: stiffness 280 / damping 22 — snappy enter, slight overshoot
 *   • Sliding pill: stiffness 400 / damping 30 — near-instant response, no oscillation
 *   • Glare: CSS radial-gradient tracked via onMouseMove — zero JS animation cost
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAV_LINKS = [
  { id: "explore",  label: "Explore" },
  { id: "how",      label: "How it works" },
  { id: "features", label: "Features" },
];

export function Navbar() {
  const [visible,    setVisible]    = useState(false);
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [glarePos,   setGlarePos]   = useState({ x: 0, y: 0 });
  const navRef                      = useRef<HTMLDivElement>(null);
  const prefersReduced              = useReducedMotion();

  /* Show/hide based on scroll depth */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track mouse for the liquid glare radial gradient */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    /* Outer strip — full-width, pointer-events:none so it doesn't block page */
    <div className="fixed top-0 left-0 right-0 z-[200] flex justify-center pt-5 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ opacity: 0, y: -28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{    opacity: 0, y: -28, scale: 0.92 }}
            transition={{
              type:      "spring",
              stiffness: 280,
              damping:   22,
              mass:      0.8,
            }}
            className="pointer-events-auto relative flex items-center gap-1 px-3 py-2 rounded-full overflow-hidden"
            style={{
              /* Glassmorphism: semi-transparent dark with heavy blur + saturation */
              background:           "rgba(11, 32, 39, 0.62)",
              backdropFilter:       "blur(28px) saturate(200%)",
              WebkitBackdropFilter: "blur(28px) saturate(200%)",
              border:               "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* ── Liquid Glare — radial highlight that follows the cursor ── */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle 90px at ${glarePos.x}px ${glarePos.y}px,
                  rgba(255,255,255,0.13) 0%,
                  transparent 70%)`,
                transition: "background 0.05s linear",
              }}
            />

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 mr-3 shrink-0"
            >
              {/* Orange pill-dot brand mark */}
              <span className="block w-3 h-3 rounded-full rounded-br-none bg-[#FF6B35] rotate-45" />
              <span
                className="text-white text-sm font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                NomadFlow
              </span>
            </Link>

            {/* ── Navigation links with Framer layoutId sliding pill ── */}
            <nav className="flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className="relative px-4 py-2 text-sm font-medium text-white/75
                             hover:text-white transition-colors duration-150"
                  onMouseEnter={() => setHoveredId(id)}
                >
                  {/* Sliding pill highlight — single motion.div shared via layoutId */}
                  {hoveredId === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type:      "spring",
                        stiffness: 400,
                        damping:   30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              ))}
            </nav>

            {/* ── CTA ── */}
            <Link
              href="/signup"
              className="ml-2 px-5 py-2 rounded-full text-sm font-bold text-white
                         bg-[#FF6B35] hover:bg-[#e85520]
                         transition-all duration-200 ease-out
                         hover:-translate-y-px hover:shadow-lg hover:shadow-orange-500/30
                         active:translate-y-0 active:scale-95"
            >
              Start free
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
