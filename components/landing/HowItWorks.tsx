"use client";

/**
 * HOW IT WORKS — Interactive Sticky Scroll Story (300 vh)
 *
 * Architecture:
 *   Outer section: 300 vh, overflow: clip
 *   Inner sticky div: 100 vh, position: sticky, top: 0
 *     Left column:  Step text that cross-fades using AnimatePresence
 *     Right column: Phone mockup — screen content transitions via AnimatePresence
 *
 * Scroll math (offset ["start start", "end end"]):
 *   progress 0.00 → 0.32 = Step 0  DISCOVER
 *   progress 0.33 → 0.65 = Step 1  SAVE
 *   progress 0.66 → 1.00 = Step 2  COPY
 *
 * Animation notes:
 *   • Text: exit up / enter from below — depth hierarchy motion (MD principle)
 *   • Screen: crossfade + subtle x-slide — fade-crossfade rule from skill
 *   • Progress bar: raw scroll value, no spring — feels physical
 */

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";

/* ── Step definitions ─────────────────────────────────────────────── */
const STEPS = [
  {
    index:   "01",
    keyword: "DISCOVER",
    title:   "Find trips from real explorers",
    body:    "Browse thousands of real itineraries — not AI-generated fluff. Filter by country, vibe, budget, or duration. See exactly what worked.",
    accent:  "#FF6B35",
  },
  {
    index:   "02",
    keyword: "SAVE",
    title:   "Bookmark what inspires you",
    body:    "Hit Save on any itinerary and it lives in your personal collection. Offline. Forever. No account needed to start browsing.",
    accent:  "#00DB9A",
  },
  {
    index:   "03",
    keyword: "COPY",
    title:   "One tap — it's your trip now",
    body:    "Copy any itinerary into your own trip planner. Swap out days, add your own stops, and share the remixed version with friends.",
    accent:  "#62B6C7",
  },
];

/* ─────────────── Phone Screens ────────────────────────────────────── */

/* Step 0 — feed of itinerary cards */
function DiscoverScreen() {
  const cards = [
    { title: "Tokyo in 7 Days",    days: 7,  stars: "4.9", saves: "2.1k", from: "#FF6B35", to: "#0B2027" },
    { title: "Bali Surf Retreat",  days: 5,  stars: "4.8", saves: "1.8k", from: "#00DB9A", to: "#062e22" },
    { title: "Paris Weekend",      days: 3,  stars: "4.7", saves: "3.1k", from: "#62B6C7", to: "#062435" },
    { title: "Morocco Road Trip",  days: 10, stars: "4.9", saves: "940",  from: "#FF6B35", to: "#2d1200" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#0B2027] overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <span className="text-white text-[11px] font-bold tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}>
          Discover
        </span>
        <div className="flex gap-1.5">
          {["Asia","Europe","Americas"].map(f => (
            <span key={f}
              className="px-2 py-0.5 rounded-full text-[8px] font-medium
                         bg-white/8 text-white/60 border border-white/10">
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-2 px-3 pb-3">
        {cards.map((c) => (
          <div key={c.title}
            className="relative rounded-2xl overflow-hidden shrink-0"
            style={{
              height: 74,
              background: `linear-gradient(135deg, ${c.from}66 0%, ${c.to} 100%)`,
            }}
          >
            <div className="absolute inset-0 p-3 flex items-end justify-between">
              <div>
                <p className="text-white text-[10px] font-bold leading-tight">
                  {c.title}
                </p>
                <p className="text-white/50 text-[8px] mt-0.5">
                  {c.days} days · ⭐{c.stars} · {c.saves} saves
                </p>
              </div>
              <div className="w-6 h-6 rounded-lg bg-white/10 backdrop-blur-sm
                              flex items-center justify-center text-[8px]">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Step 1 — detail view with SAVE button highlighted */
function SaveScreen() {
  return (
    <div className="h-full flex flex-col bg-[#0B2027] overflow-hidden">
      {/* Header */}
      <div className="relative h-[110px] shrink-0 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #62B6C7 0%, #001621 100%)" }}>
        <div className="absolute inset-0 flex items-end p-3">
          <button className="flex items-center gap-1 text-white/70 text-[9px] mb-1">
            <span>←</span> Back
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-bold text-[12px]"
            style={{ fontFamily: "var(--font-heading)" }}>
            Paris in 5 Days
          </p>
          <p className="text-white/60 text-[8px] mt-0.5">
            by @Laurent · 12.4k saves · ⭐ 4.9
          </p>
        </div>
      </div>

      {/* Day list */}
      <div className="flex-1 px-3 py-2 overflow-hidden">
        {[
          { day: "Day 1", label: "Eiffel Tower, Champs-Élysées" },
          { day: "Day 2", label: "Louvre, Le Marais, Seine" },
          { day: "Day 3", label: "Versailles day trip" },
          { day: "Day 4", label: "Montmartre, Sacré-Cœur" },
        ].map((d) => (
          <div key={d.day}
            className="flex items-start gap-2 py-2 border-b border-white/6 last:border-0">
            <span className="text-[8px] font-bold text-[#00DB9A] mt-0.5 shrink-0 w-8">
              {d.day}
            </span>
            <span className="text-white/65 text-[8px] leading-relaxed">{d.label}</span>
          </div>
        ))}
      </div>

      {/* CTA row — SAVE highlighted */}
      <div className="px-3 pb-4 flex flex-col gap-2 shrink-0">
        {/* Highlighted Save */}
        <motion.button
          animate={{ boxShadow: ["0 0 0 0 rgba(255,107,53,0)", "0 0 0 6px rgba(255,107,53,0.2)", "0 0 0 0 rgba(255,107,53,0)"] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-full h-9 rounded-full text-white text-[10px] font-bold
                     flex items-center justify-center gap-1.5"
          style={{ background: "linear-gradient(90deg, #FF6B35, #ff8c5a)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Save Itinerary
        </motion.button>
        <button className="w-full h-9 rounded-full text-white/40 text-[10px] font-medium
                           border border-white/10">
          View on map
        </button>
      </div>
    </div>
  );
}

/* Step 2 — Save grayed, Copy highlighted, success toast slides in */
function CopyScreen() {
  return (
    <div className="h-full flex flex-col bg-[#0B2027] overflow-hidden relative">
      {/* Same header */}
      <div className="relative h-[110px] shrink-0 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #62B6C7 0%, #001621 100%)" }}>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-bold text-[12px]"
            style={{ fontFamily: "var(--font-heading)" }}>
            Paris in 5 Days
          </p>
          <p className="text-white/60 text-[8px] mt-0.5">
            by @Laurent · 12.4k saves · ⭐ 4.9
          </p>
        </div>
      </div>

      {/* Day list */}
      <div className="flex-1 px-3 py-2 overflow-hidden">
        {[
          { day: "Day 1", label: "Eiffel Tower, Champs-Élysées" },
          { day: "Day 2", label: "Louvre, Le Marais, Seine" },
          { day: "Day 3", label: "Versailles day trip" },
          { day: "Day 4", label: "Montmartre, Sacré-Cœur" },
        ].map((d) => (
          <div key={d.day}
            className="flex items-start gap-2 py-2 border-b border-white/6 last:border-0">
            <span className="text-[8px] font-bold text-[#00DB9A] mt-0.5 shrink-0 w-8">
              {d.day}
            </span>
            <span className="text-white/65 text-[8px] leading-relaxed">{d.label}</span>
          </div>
        ))}
      </div>

      {/* CTA row — Save grayed, Copy highlighted */}
      <div className="px-3 pb-4 flex flex-col gap-2 shrink-0">
        {/* Grayed out Saved */}
        <button
          disabled
          className="w-full h-9 rounded-full text-white/30 text-[10px] font-bold
                     flex items-center justify-center gap-1.5 border border-white/10"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"
            className="text-[#00DB9A]">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          Saved
        </button>
        {/* Highlighted Copy with teal glow */}
        <motion.button
          animate={{ boxShadow: ["0 0 0 0 rgba(0,219,154,0)", "0 0 0 6px rgba(0,219,154,0.22)", "0 0 0 0 rgba(0,219,154,0)"] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-full h-9 rounded-full text-[#0B2027] text-[10px] font-bold
                     flex items-center justify-center gap-1.5"
          style={{ background: "#00DB9A" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy to My Trips
        </motion.button>
      </div>

      {/* Success toast — slides up from bottom */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-20 left-3 right-3 flex items-center gap-2
                   rounded-2xl px-3 py-2.5"
        style={{
          background:    "rgba(0,219,154,0.15)",
          border:        "1px solid rgba(0,219,154,0.3)",
          backdropFilter: "blur(12px)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#00DB9A">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
        <span className="text-[#00DB9A] text-[9px] font-bold">
          Copied to "My Trips"!
        </span>
      </motion.div>
    </div>
  );
}

const SCREENS = [<DiscoverScreen key="d" />, <SaveScreen key="s" />, <CopyScreen key="c" />];

/* ── Main Component ──────────────────────────────────────────────── */
export function HowItWorks() {
  const sectionRef     = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start start", "end end"],
  });

  /* Progress bar width — maps directly so it feels tied to scroll */
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Derive discrete step from continuous scroll */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if      (v < 0.33) setStep(0);
    else if (v < 0.66) setStep(1);
    else               setStep(2);
  });

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* ── Sticky container ── */}
      <div className="sticky top-0 h-screen flex items-center bg-[#F3EFE6] overflow-hidden">

        {/* Subtle large text watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.04, scale: 1  }}
              exit={{    opacity: 0, scale: 1.05  }}
              transition={{ duration: 0.6 }}
              className="text-[#0B2027] font-black text-[20vw] leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {STEPS[step]!.keyword}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6
                        grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left — Text column ── */}
          <div className="flex flex-col">

            {/* Section label */}
            <p className="text-[#FF6B35] text-xs font-bold tracking-[0.2em] uppercase mb-8">
              How it works
            </p>

            {/* Step indicators */}
            <div className="flex items-center gap-3 mb-10">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  aria-label={`Step ${i + 1}`}
                  className="flex items-center gap-2 transition-all duration-300"
                  onClick={() => {
                    /* Scroll to the corresponding position in the section */
                    if (!sectionRef.current) return;
                    const el = sectionRef.current;
                    const target = el.offsetTop + (el.offsetHeight * (i / 3 + 0.05));
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                >
                  <span
                    className="text-xs font-bold transition-colors duration-300"
                    style={{ color: step === i ? s.accent : "rgba(11,32,39,0.25)" }}
                  >
                    {s.index}
                  </span>
                  <span
                    className="h-px transition-all duration-300"
                    style={{
                      width:      step === i ? 32 : 16,
                      background: step === i ? s.accent : "rgba(11,32,39,0.2)",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Cross-fading text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y:  22 }}
                animate={{ opacity: 1, y:   0 }}
                exit={{    opacity: 0, y: -22 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black
                             text-[#0B2027] leading-[1.05] tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {STEPS[step]!.title}
                </h2>
                <p className="text-[#0B2027]/55 text-base leading-relaxed max-w-sm">
                  {STEPS[step]!.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-10 h-px bg-[#0B2027]/10 max-w-xs rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width:      prefersReduced ? `${(step + 1) * 33}%` : barWidth,
                  background: STEPS[step]!.accent,
                }}
              />
            </div>
          </div>

          {/* ── Right — Phone mockup with animated screen ── */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Ambient glow behind phone — color follows step accent */}
              <AnimatePresence>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1   }}
                  exit={{    opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 -m-16 rounded-full blur-[60px]"
                  style={{ background: `${STEPS[step]!.accent}33` }}
                />
              </AnimatePresence>

              <PhoneMockup size="md" theme="dark">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    className="absolute inset-0 pt-7"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x:  0 }}
                    exit={{    opacity: 0, x: -18 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {SCREENS[step]}
                  </motion.div>
                </AnimatePresence>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
