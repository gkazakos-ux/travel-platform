"use client";

/**
 * BENTO GRID — Feature Cards (Privacy · Offline · Battery · Ad-free)
 *
 * Grid layout (3-col on md+):
 *   ┌──────┬──────────────────┐
 *   │ [1]  │      [2]         │
 *   │ prv  │  works offline   │
 *   │ 2row ├────────┬─────────┤
 *   │      │ [3]bat │ [4] ads │
 *   └──────┴────────┴─────────┘
 *
 * Hover interaction:
 *   scale(1.025) + slight translate-y — snappy spring, 0 bounce
 *   Icon scales up (1 → 1.15)
 *   Inner gradient brightens
 *
 * Entrance: stagger 80 ms per card from bottom (useInView)
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Inline SVG Icons (stroke style, consistent 2px weight) ── */
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>
);
const WifiOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="2" x2="22" y2="22"/>
    <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
    <path d="M2 8.82a15 15 0 0 1 4.17-2.65"/>
    <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/>
    <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/>
    <path d="M5 12.55a10 10 0 0 1 5.17-2.39"/>
    <line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>
);
const BatteryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2"/>
    <path d="M23 13v-2"/>
    <path d="M7 10l-2 2 2 2"/>
    <path d="M13 10l2 2-2 2"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);

/* ── Card data ─────────────────────────────────────────────────── */
const CARDS = [
  {
    id:       "privacy",
    icon:     <LockIcon />,
    tag:      "Private",
    title:    "Your trips stay yours",
    body:     "Zero tracking. No location data sold. Your travel history is encrypted end-to-end and lives only on your device.",
    bg:       "#0B2027",
    iconClr:  "#00DB9A",
    textClr:  "#ffffff",
    subClr:   "rgba(255,255,255,0.5)",
    tagBg:    "rgba(0,219,154,0.12)",
    tagClr:   "#00DB9A",
    accent:   "rgba(0,219,154,0.06)",
    span:     "row-span-2",  /* tall card */
  },
  {
    id:       "offline",
    icon:     <WifiOffIcon />,
    tag:      "Offline",
    title:    "Works where signal doesn't",
    body:     "Saved itineraries work in airplane mode, deep valleys, and remote islands. Download before you go, open anywhere.",
    bg:       "#F3EFE6",
    iconClr:  "#FF6B35",
    textClr:  "#0B2027",
    subClr:   "rgba(11,32,39,0.5)",
    tagBg:    "rgba(255,107,53,0.10)",
    tagClr:   "#FF6B35",
    accent:   "rgba(255,107,53,0.05)",
    span:     "col-span-2",  /* wide card */
  },
  {
    id:       "battery",
    icon:     <BatteryIcon />,
    tag:      "Efficient",
    title:    "Built for long-haul batteries",
    body:     "No background sync, no heavy maps in the dock. Uses a fraction of the power of Google Maps.",
    bg:       "#001621",
    iconClr:  "#62B6C7",
    textClr:  "#ffffff",
    subClr:   "rgba(255,255,255,0.45)",
    tagBg:    "rgba(98,182,199,0.12)",
    tagClr:   "#62B6C7",
    accent:   "rgba(98,182,199,0.05)",
    span:     "",
  },
  {
    id:       "ads",
    icon:     <ShieldIcon />,
    tag:      "Clean",
    title:    "Zero ads. Ever.",
    body:     "No sponsored itineraries. No algorithmic noise. Just real trips from real travellers — ranked by saves, not spend.",
    bg:       "#FF6B35",
    iconClr:  "#ffffff",
    textClr:  "#ffffff",
    subClr:   "rgba(255,255,255,0.65)",
    tagBg:    "rgba(255,255,255,0.15)",
    tagClr:   "#ffffff",
    accent:   "rgba(255,255,255,0.06)",
    span:     "",
  },
] as const;

/* ── Card component ─────────────────────────────────────────────── */
function FeatureCard({
  card, delay, inView,
}: {
  card: (typeof CARDS)[number];
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        /* Spring: stiff enough to feel responsive, damp enough not to overshoot */
        y: -6,
        scale: 1.025,
        transition: { type: "spring", stiffness: 360, damping: 28 },
      }}
      className={`relative rounded-3xl overflow-hidden p-7 flex flex-col
                  cursor-default select-none ${card.span}`}
      style={{ background: card.bg }}
    >
      {/* Radial accent gradient — brightens on hover via CSS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${card.accent}, transparent 70%)`,
        }}
      />

      {/* Bottom-right decorative circle */}
      <div
        className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-10"
        style={{ background: card.iconClr }}
      />

      {/* Tag badge */}
      <span
        className="inline-flex self-start px-2.5 py-1 rounded-full text-[10px]
                   font-bold tracking-wider uppercase mb-5"
        style={{ background: card.tagBg, color: card.tagClr }}
      >
        {card.tag}
      </span>

      {/* Icon */}
      <motion.div
        className="mb-5"
        style={{ color: card.iconClr }}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {card.icon}
      </motion.div>

      {/* Title */}
      <h3
        className="text-lg font-black leading-tight tracking-tight mb-2"
        style={{ color: card.textClr, fontFamily: "var(--font-heading)" }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p
        className="text-sm leading-relaxed mt-auto pt-2"
        style={{ color: card.subClr }}
      >
        {card.body}
      </p>
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */
export function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 px-6 bg-[#F8F9FA]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-[#FF6B35] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Why NomadFlow
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#0B2027]
                       leading-tight tracking-tight max-w-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built different,
            <br />
            by design.
          </h2>
        </motion.div>

        {/* Bento grid — 3 cols on md, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
          {CARDS.map((card, i) => (
            <FeatureCard
              key={card.id}
              card={card}
              delay={i * 0.08}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
