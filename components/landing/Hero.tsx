"use client";

/**
 * HERO — Cinematic Zoom-out & Phone Reveal
 *
 * Scroll-driven animation (useScroll):
 *   Section is 200 vh tall. A sticky inner div (100 vh) holds a "dark card"
 *   that shrinks + gains border-radius as the user scrolls, revealing the
 *   cream background behind it. Simultaneously:
 *     • Hero text  → fades up and out  (progress 0 → 0.30)
 *     • Phone      → scales + slides in (progress 0.25 → 0.75)
 *
 * Spring commentary:
 *   No spring on scroll transforms — we map directly to stay in sync
 *   with the user's finger. Spring values used for the mount animation only.
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";

/* Inline SVG icons (no external icon lib required) */
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ── Hero Phone Screen Content ────────────────────────────────────── */
function HeroScreen() {
  return (
    <div className="h-full flex flex-col bg-[#0B2027] overflow-hidden">
      {/* App bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <span
          className="text-white text-xs font-bold tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Discover
        </span>
        <div className="w-7 h-7 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
          <span className="text-[#FF6B35] text-[10px]">4</span>
        </div>
      </div>

      {/* Search */}
      <div className="mx-3 mb-3 h-7 rounded-full bg-white/5 border border-white/10
                      flex items-center px-3 gap-2">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.4)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-white/30 text-[9px]">Search itineraries...</span>
      </div>

      {/* Cards */}
      {[
        { title: "Tokyo in 7 Days",   sub: "23 stops · ⭐ 4.9", from: "#FF6B35", to: "#0B2027" },
        { title: "Bali Surf Retreat",  sub: "14 stops · ⭐ 4.8", from: "#00DB9A", to: "#0B2027" },
        { title: "Paris Weekend",      sub: "11 stops · ⭐ 4.7", from: "#62B6C7", to: "#0B2027" },
      ].map((card) => (
        <div
          key={card.title}
          className="mx-3 mb-2 h-[88px] rounded-2xl overflow-hidden relative shrink-0"
          style={{ background: `linear-gradient(135deg, ${card.from}55 0%, ${card.to} 100%)` }}
        >
          <div className="absolute inset-0 p-3 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm" />
            <div>
              <p className="text-white text-[10px] font-bold leading-tight">
                {card.title}
              </p>
              <p className="text-white/50 text-[8px] mt-0.5">{card.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */
export function Hero() {
  const sectionRef     = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start start", "end start"],
  });

  /* Dark card shrinks from full-bleed to 78% centered */
  const cardScale  = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const cardRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "28px"]);

  /* Text fades up and out early in the scroll */
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.28], ["0%", "-12%"]);

  /* Phone rises from below, timed to appear as text disappears */
  const phoneOpacity = useTransform(scrollYProgress, [0.22, 0.52], [0, 1]);
  const phoneY       = useTransform(scrollYProgress, [0.22, 0.65], ["60px", "0px"]);
  const phoneScale   = useTransform(scrollYProgress, [0.22, 0.65], [0.82, 1]);

  /* Disable parallax transforms when reduced-motion is requested */
  const noAnim = prefersReduced;

  return (
    /* Outer section — 200 vh gives the scroll room for the animation to play */
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
      id="hero"
    >
      {/* Sticky viewport — cream bg visible at the edges when card shrinks */}
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center
                   justify-center bg-[#F3EFE6]"
      >
        {/* ── Dark cinematic card — scales & gains corner radius on scroll ── */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            scale:       noAnim ? 1 : cardScale,
            borderRadius: noAnim ? "0px" : cardRadius,
            /* Multi-layer background: deep gradient + subtle radial glows */
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%,  #1a4055 0%, transparent 70%),
              radial-gradient(ellipse 60% 40% at 80% 80%, #FF6B35 0%, transparent 60%),
              linear-gradient(160deg, #0B2027 0%, #001621 60%, #071820 100%)
            `,
          }}
        >
          {/* Subtle landscape photo overlay — very low opacity for depth */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=60')",
              backgroundSize:     "cover",
              backgroundPosition: "center 30%",
              opacity:            0.08,
              mixBlendMode:       "luminosity",
            }}
          />

          {/* Orange accent glow bottom-left */}
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full
                          bg-[#FF6B35] opacity-[0.04] blur-[120px] pointer-events-none" />

          {/* ── Hero text — fades and moves up as you scroll ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center
                       px-6 text-center z-10"
            style={{
              opacity: noAnim ? 1 : textOpacity,
              y:       noAnim ? 0 : textY,
            }}
          >
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
                         bg-white/8 border border-white/12 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DB9A] animate-pulse" />
              <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
                47,000 trips shared this week
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[88px]
                         font-black text-white leading-[0.92] tracking-[-0.04em] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Travel stories
              <br />
              <em className="not-italic text-[#FF6B35]">worth copying.</em>
            </h1>

            {/* Sub-headline */}
            <p className="text-white/55 text-base sm:text-lg max-w-md leading-relaxed mb-10">
              Real itineraries from real explorers.
              Discover, save, and one-tap copy any trip — then make it yours.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <a
                href="/signup"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full
                           bg-[#FF6B35] text-white font-bold text-sm
                           shadow-[0_12px_32px_-6px_rgba(255,107,53,0.55)]
                           hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-6px_rgba(255,107,53,0.65)]
                           active:translate-y-0 transition-all duration-200"
              >
                <PlayIcon />
                Start exploring free
              </a>
              <a
                href="#how"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full
                           text-white/75 hover:text-white font-medium text-sm
                           border border-white/15 hover:border-white/30
                           hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-200"
              >
                See how it works
                <ChevronDown />
              </a>
            </div>
          </motion.div>

          {/* ── Phone Mockup — rises from below as text fades out ── */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
            style={{
              opacity: noAnim ? 1 : phoneOpacity,
              y:       noAnim ? 0 : phoneY,
              scale:   noAnim ? 1 : phoneScale,
            }}
          >
            {/* Soft glow behind phone */}
            <div
              className="absolute inset-x-0 -top-8 mx-auto w-48 h-48 rounded-full
                         bg-[#FF6B35] opacity-20 blur-[60px] pointer-events-none"
            />
            <PhoneMockup size="lg" theme="dark">
              <HeroScreen />
            </PhoneMockup>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
