"use client";

/**
 * DESTINATION SHOWCASE — Scroll-driven fullscreen destination reveal
 *
 * Layout (inspired by Foxico):
 *   • Full-bleed background image — crossfades between destinations on scroll
 *   • Destination name + description + CTA — bottom-left overlay
 *   • Stacked card carousel — right side, cards fan out showing next destinations
 *   • Scroll progress dots — bottom center
 *
 * Scroll mechanic:
 *   Section is N×100vh. Sticky inner holds the full-screen composition.
 *   useScroll maps progress → active destination index.
 *   AnimatePresence handles crossfade of bg image + text + active card highlight.
 */

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

/* ── Destination data ──────────────────────────────────────────────── */
const DESTINATIONS = [
  {
    id:          "thailand",
    name:        "Thailand",
    tagline:     "Land of Smiles",
    description: "Ancient Buddhist temples, vibrant street markets, and emerald-water islands. Thailand rewards every kind of traveller.",
    image:       "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=75",
    card:        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70",
    accent:      "#FF6B35",
    rating:      4.9,
    trips:       "12.4k",
  },
  {
    id:          "bali",
    name:        "Bali",
    tagline:     "Island of the Gods",
    description: "Volcanic mountains draped in jungle, terraced rice paddies glowing gold, and beaches where the surf never stops.",
    image:       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=75",
    card:        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=70",
    accent:      "#00DB9A",
    rating:      4.8,
    trips:       "9.2k",
  },
  {
    id:          "kerala",
    name:        "Kerala",
    tagline:     "God's Own Country",
    description: "Backwater canals fringed with palms, spice-scented hillside plantations, and an unbroken horizon of warm Arabian Sea.",
    image:       "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=75",
    card:        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=70",
    accent:      "#62B6C7",
    rating:      4.7,
    trips:       "6.8k",
  },
  {
    id:          "iceland",
    name:        "Iceland",
    tagline:     "Land of Fire & Ice",
    description: "Aurora-lit skies, black-sand beaches, geysers shooting steam, and waterfalls that dwarf anything you've imagined.",
    image:       "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1920&q=75",
    card:        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=70",
    accent:      "#A78BFA",
    rating:      4.9,
    trips:       "7.6k",
  },
] as const;

/* ── Star rating helper ───────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#FBBF24" : "rgba(255,255,255,0.2)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ── Destination card (right stack) ──────────────────────────────── */
function DestCard({
  dest,
  offset,   /* 0 = active, 1 = next, 2 = after-next … */
  onClick,
}: {
  dest: (typeof DESTINATIONS)[number];
  offset: number;
  onClick: () => void;
}) {
  const isActive = offset === 0;

  /* Cards fan to the right, scale down, rotate slightly */
  const x        = offset * 88;
  const y        = offset * -18;
  const scale    = 1 - offset * 0.1;
  const rotate   = offset * 4;
  const zIndex   = 10 - offset;
  const opacity  = offset > 2 ? 0 : 1 - offset * 0.15;

  return (
    <motion.div
      layout
      animate={{ x, y, scale, rotate, opacity, zIndex }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onClick={onClick}
      className="absolute top-0 left-0 w-[180px] h-[240px] rounded-3xl overflow-hidden
                 cursor-pointer shadow-2xl"
      style={{ transformOrigin: "bottom left" }}
      whileHover={isActive ? {} : { scale: scale + 0.03, transition: { duration: 0.2 } }}
    >
      {/* Photo */}
      <img
        src={dest.card}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Bookmark icon */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: isActive ? dest.accent : "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      </div>

      {/* Name + rating */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-black leading-tight tracking-tight">
          {dest.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <Stars rating={dest.rating} />
          <span className="text-white/60 text-[9px]">{dest.rating}</span>
        </div>
      </div>

      {/* Active glow border */}
      {isActive && (
        <motion.div
          layoutId="active-card-border"
          className="absolute inset-0 rounded-3xl"
          style={{ boxShadow: `0 0 0 2.5px ${dest.accent}, 0 16px 48px -8px ${dest.accent}80` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export function DestinationShowcase() {
  const sectionRef               = useRef<HTMLElement>(null);
  const [active, setActive]      = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start start", "end start"],
  });

  /* Map scroll progress → active destination index */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      DESTINATIONS.length - 1,
      Math.floor(v * DESTINATIONS.length),
    );
    if (idx !== active) {
      setDirection(idx > active ? 1 : -1);
      setActive(idx);
    }
  });

  const dest = DESTINATIONS[active]!;

  /* Build ordered card list starting from active */
  const cardOrder = DESTINATIONS.map((_, i) =>
    (i - active + DESTINATIONS.length) % DESTINATIONS.length,
  );

  return (
    <section
      ref={sectionRef}
      id="destinations"
      style={{ height: `${DESTINATIONS.length * 100}vh` }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background images (crossfade) ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={dest.id + "-bg"}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1,  scale: 1    }}
            exit={{    opacity: 0,  scale: 0.96 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* Dark vignette so text reads clearly */}
            <div className="absolute inset-0 bg-gradient-to-r
              from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t
              from-black/60 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* ── Accent colour tint (bottom-left) ── */}
        <AnimatePresence>
          <motion.div
            key={dest.id + "-tint"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 0% 100%, ${dest.accent}28 0%, transparent 70%)`,
            }}
          />
        </AnimatePresence>

        {/* ── LEFT: Destination text ── */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20 max-w-2xl">

          {/* Tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={dest.id + "-tag"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -8  }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: dest.accent }}
            >
              {dest.tagline}
            </motion.p>
          </AnimatePresence>

          {/* Country name */}
          <div className="overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={dest.id + "-name"}
                initial={{ y: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{    y: direction > 0 ? "-60%" : "60%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(56px,10vw,120px)] font-black text-white
                           leading-none tracking-[-0.04em] uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {dest.name}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={dest.id + "-desc"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1,  y: 0  }}
              exit={{    opacity: 0,  y: -8  }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mb-8"
            >
              {dest.description}
            </motion.p>
          </AnimatePresence>

          {/* Stats row */}
          <AnimatePresence mode="wait">
            <motion.div
              key={dest.id + "-stats"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1,  y: 0  }}
              exit={{    opacity: 0,  y: -6  }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-5 mb-8"
            >
              <div>
                <Stars rating={dest.rating} />
                <p className="text-white/40 text-[10px] mt-1">{dest.rating} avg rating</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <p className="text-white font-bold text-sm">{dest.trips}</p>
                <p className="text-white/40 text-[10px] mt-0.5">saved itineraries</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA button */}
          <motion.a
            href="/signup"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full
                       text-white font-bold text-sm w-fit
                       hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-200"
            style={{
              background:   dest.accent,
              boxShadow: `0 12px 36px -8px ${dest.accent}88`,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </div>

        {/* ── RIGHT: Stacked destination cards ── */}
        <div
          className="absolute right-12 md:right-20 top-1/2 -translate-y-1/2"
          style={{ width: 180 + 88 * 2, height: 240 }}
        >
          {DESTINATIONS.map((d, i) => {
            const offset = cardOrder[i]!;
            return (
              <DestCard
                key={d.id}
                dest={d}
                offset={offset}
                onClick={() => {
                  if (offset !== 0) {
                    setDirection(offset > 0 ? 1 : -1);
                    setActive(i);
                  }
                }}
              />
            );
          })}
        </div>

        {/* ── Bottom: scroll progress dots ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {DESTINATIONS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className="relative h-1.5 rounded-full transition-all duration-300 overflow-hidden"
              style={{
                width:      i === active ? 28 : 6,
                background: i === active ? "transparent" : "rgba(255,255,255,0.25)",
              }}
              aria-label={`Go to ${d.name}`}
            >
              {i === active && (
                <motion.span
                  layoutId="dot-fill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: dest.accent }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Scroll hint (fades out after first scroll) ── */}
        <motion.div
          className="absolute bottom-8 right-10 md:right-20 flex flex-col items-center gap-1.5"
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            <svg width="12" height="16" viewBox="0 0 12 20" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="1" y="1" width="10" height="18" rx="5"/>
              <path d="M6 5v4"/>
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
