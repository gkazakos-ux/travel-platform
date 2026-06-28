"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

const destinations = [
  {
    id: 1,
    country: "THAILAND",
    title: "Phi Phi Islands",
    location: "Thailand",
    days: 8,
    saves: "3.1k",
    description: "Thailand is a Southeast Asian country known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha.",
    bgImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80",
    accent: "#4FB0A5",
  },
  {
    id: 2,
    country: "INDONESIA",
    title: "Broken Beach, Bali",
    location: "Indonesia",
    days: 10,
    saves: "2.4k",
    description: "Explore the breathtaking cliffs and natural arches of Nusa Penida. Indonesia offers thousands of volcanic islands with unique landscapes and vibrant cultures.",
    bgImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1920&q=80",
    accent: "#C9A84C",
  },
  {
    id: 3,
    country: "INDIA",
    title: "Kerala Backwaters",
    location: "India",
    days: 7,
    saves: "1.8k",
    description: "India is a vast South Asian country with diverse terrain. Cruise through the peaceful, palm-lined backwaters of Kerala on a traditional houseboat.",
    bgImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80",
    accent: "#FF6B35",
  },
  {
    id: 4,
    country: "JAPAN",
    title: "Mount Fuji",
    location: "Japan",
    days: 12,
    saves: "4.7k",
    description: "Experience the harmonious blend of ancient traditions and futuristic innovation. From tranquil zen gardens to the bustling neon streets of Tokyo.",
    bgImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
    accent: "#8B6FBF",
  },
];

const N = destinations.length;

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(N - 1, Math.floor(p * N));
    if (idx !== active) {
      setDirection(idx > active ? 1 : -1);
      setPrev(active);
      setActive(idx);
    }
  });

  // Global progress for the section number indicator
  const progress = useTransform(scrollYProgress, [0, 1], [0, N]);

  const dest = destinations[active];

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B2027] flex">

        {/* ── LEFT HALF: Text ── */}
        <div className="relative w-1/2 h-full flex flex-col justify-between px-[6vw] py-16 z-20 overflow-hidden">

          {/* Dark base */}
          <div className="absolute inset-0 bg-[#0B2027] z-0" />

          {/* Accent color wash — transitions with destination */}
          <AnimatePresence>
            <motion.div
              key={active}
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `radial-gradient(ellipse 80% 60% at 0% 100%, ${dest.accent}28 0%, transparent 70%)`,
              }}
            />
          </AnimatePresence>

          {/* Top: counter */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                Explore the world
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/30 text-[11px] font-mono font-bold">
              <motion.span
                key={active}
                initial={{ y: direction > 0 ? 12 : -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="text-white/70"
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
              <span className="mx-1">/</span>
              <span>{String(N).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Middle: main text */}
          <div className="relative z-10 flex flex-col gap-8">
            {/* Country name — massive, clips out on change */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`country-${active}`}
                  className="text-[clamp(52px,7vw,96px)] font-black text-white leading-none tracking-tighter"
                  initial={{ y: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {dest.country}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Title */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${active}`}
                  className="text-[clamp(18px,2.2vw,28px)] font-semibold text-white/60 leading-snug tracking-tight"
                  initial={{ y: direction > 0 ? 30 : -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction > 0 ? -30 : 30, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                >
                  {dest.title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                className="text-[14px] text-white/45 leading-relaxed max-w-[380px] font-medium"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {dest.description}
              </motion.p>
            </AnimatePresence>

            {/* Stats row */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-${active}`}
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[22px] font-black text-white">{dest.days}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/35">days avg</span>
                </div>
                <div className="w-[1px] h-8 bg-white/15" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[22px] font-black text-white">{dest.saves}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/35">trips saved</span>
                </div>
                <div className="w-[1px] h-8 bg-white/15" />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: dest.accent, boxShadow: `0 0 12px ${dest.accent}88` }}
                />
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-3 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
                style={{
                  background: dest.accent,
                  boxShadow: `0 10px 24px ${dest.accent}44`,
                }}
              >
                Explore itineraries
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom: destination dots nav */}
          <div className="relative z-10 flex items-center gap-3">
            {destinations.map((d, i) => (
              <div key={d.id} className="flex flex-col gap-1.5 cursor-default">
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: i === active ? 28 : 6,
                    height: 6,
                    background: i === active ? dest.accent : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            ))}
            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-white/25">
              scroll to explore
            </span>
          </div>
        </div>

        {/* ── RIGHT HALF: Image with clip-path reveal ── */}
        <div className="relative w-1/2 h-full overflow-hidden z-10">

          {/* Images stack — clip-path slides in from bottom/top */}
          <AnimatePresence>
            <motion.div
              key={`img-${active}`}
              className="absolute inset-0"
              initial={{
                clipPath: direction > 0
                  ? "inset(100% 0% 0% 0%)"
                  : "inset(0% 0% 100% 0%)",
              }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{
                clipPath: direction > 0
                  ? "inset(0% 0% 100% 0%)"
                  : "inset(100% 0% 0% 0%)",
              }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                src={dest.bgImage}
                alt={dest.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

              {/* Location badge — bottom left of image */}
              <motion.div
                className="absolute bottom-8 left-8 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: dest.accent }}
                />
                <span className="text-white text-[12px] font-bold tracking-wide">
                  {dest.location}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Vertical divider line — accent color */}
          <motion.div
            className="absolute left-0 top-[10%] bottom-[10%] w-[2px] z-30"
            animate={{ background: dest.accent }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* ── VERTICAL PROGRESS BAR (far right) ── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-[40vh] w-[2px] bg-white/10 rounded-full z-30 flex flex-col justify-end overflow-hidden">
          <motion.div
            className="w-full rounded-full"
            style={{ background: dest.accent }}
            animate={{
              height: `${((active + 1) / N) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Index number watermark */}
        <div className="absolute bottom-12 right-[max(60px,5vw)] z-20 pointer-events-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              className="block text-[180px] font-black leading-none text-white/[0.03] select-none"
              initial={{ y: direction > 0 ? 80 : -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -80 : 80, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}