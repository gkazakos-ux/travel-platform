"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const stops = [
  {
    day: "Day 01",
    city: "Lisbon",
    country: "Portugal",
    tag: "Arrival",
    note: "Landed at dusk. The city smells like salt and tile dust. Checked into a narrow guesthouse in Alfama — the kind where the stairs creak and the view makes up for everything.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80",
    color: "#FF6B35",
    coords: { x: 8, y: 82 },
  },
  {
    day: "Day 03",
    city: "Sintra",
    country: "Portugal",
    tag: "Day trip",
    note: "Rented a tuk-tuk at 7am before the tour buses arrive. The fog hadn't lifted yet. Pena Palace floated above the trees like something invented for a fairy tale.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    color: "#4FB0A5",
    coords: { x: 26, y: 58 },
  },
  {
    day: "Day 05",
    city: "Douro Valley",
    country: "Portugal",
    tag: "Off the beaten path",
    note: "No signal for two days. Woke up to terraced vineyards catching the first light. We shared a bottle of Tawny on a boat with a retired schoolteacher who knew every bend in the river.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    color: "#C9A84C",
    coords: { x: 50, y: 34 },
  },
  {
    day: "Day 07",
    city: "Porto",
    country: "Portugal",
    tag: "Final stop",
    note: "Walked the Dom Luís bridge twice — once for the view, once because we didn't want it to end. Saved the itinerary. Next time: Azores.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    color: "#FF6B35",
    coords: { x: 82, y: 18 },
  },
];

// Each stop occupies an equal segment of [0,1] scroll progress
// Stop i is active when progress is in [i/N, (i+1)/N)
const N = stops.length;

const ROUTE_PATH = "M 8,82 C 14,74 20,68 26,58 C 34,46 42,42 50,34 C 60,24 70,20 82,18";

// ─── STOP CARD ───────────────────────────────────────────────────────────────

function StopCard({ stop, active }: { stop: (typeof stops)[0]; active: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={stop.city}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col"
        >
          {/* Photo */}
          <div className="relative w-full h-[260px] rounded-[28px] overflow-hidden mb-6 shrink-0 shadow-[0_8px_32px_rgba(11,32,39,0.12)]">
            <motion.img
              src={stop.image}
              alt={stop.city}
              className="w-full h-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2027]/50 to-transparent" />
            <div
              className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ background: stop.color }}
            >
              {stop.tag}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: stop.color }}
              >
                {stop.day}
              </span>
              <span className="text-[#0B2027]/40 text-[10px] uppercase tracking-widest font-semibold">
                {stop.country}
              </span>
            </div>

            <h3 className="text-[42px] font-black text-[#0B2027] leading-none tracking-tighter">
              {stop.city}
            </h3>

            <p className="text-[14px] text-[#0B2027]/55 leading-[1.75] font-medium max-w-[380px]">
              {stop.note}
            </p>

            <button className="mt-4 w-max flex items-center gap-2 text-[12px] font-bold text-[#0B2027]/50 hover:text-[#0B2027] transition-colors group">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center border border-[#0B2027]/15 group-hover:border-[#0B2027]/30 transition-colors"
                style={{ background: stop.color + "18" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5" style={{ color: stop.color }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              Copy this stop
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStop, setActiveStop] = useState(0);
  const [drawProgress, setDrawProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Sync: raw scroll → draw progress + active stop (no spring, 1:1 mapping)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const clamped = Math.min(1, Math.max(0, p));
    setDrawProgress(clamped);

    // Each stop owns 1/N of the scroll range.
    // Clamp to N-1 so the last stop stays active at p=1.
    const idx = Math.min(N - 1, Math.floor(clamped * N));
    setActiveStop(idx);
  });

  // ── Draw path via strokeDashoffset
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len * (1 - drawProgress)}`;
  }, [drawProgress]);

  // ── Interpolate dot position along the path
  const [dotPos, setDotPos] = useState(stops[0].coords);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    const pt = el.getPointAtLength(drawProgress * len);
    // SVG viewBox is 0-100, path coords are in that space
    const svgEl = el.ownerSVGElement;
    if (!svgEl) return;
    const vb = svgEl.viewBox.baseVal;
    setDotPos({
      x: (pt.x / vb.width) * 100,
      y: (pt.y / vb.height) * 100,
    });
  }, [drawProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      style={{ height: `${N * 120}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#ededed] flex items-center">

        {/* Subtle warm vignette edges */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 60%, rgba(200,185,160,0.18) 100%)"
          }}
        />

        {/* Accent glow behind map — follows stop color */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[42%] pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 40% 55%, ${stops[activeStop].color}14 0%, transparent 75%)`
          }}
        />

        {/* ── LEFT: Route map ── */}
        <div className="relative flex-shrink-0 w-[42%] h-full flex items-center justify-center pl-[max(48px,5vw)] pr-10">

          {/* Section label */}
          <div className="absolute top-12 left-[max(48px,5vw)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B2027]/40">
              Trip Log · Portugal 2026
            </span>
          </div>

          {/* Route SVG */}
          <div className="relative w-full" style={{ paddingBottom: "95%" }}>
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ghost path */}
              <path
                d={ROUTE_PATH}
                fill="none"
                stroke="rgba(11,32,39,0.08)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="2 4"
              />

              {/* Drawn path */}
              <path
                ref={pathRef}
                d={ROUTE_PATH}
                fill="none"
                stroke="#FF6B35"
                strokeWidth="1.1"
                strokeLinecap="round"
              />

              {/* Stop dots + labels */}
              {stops.map((stop, i) => {
                const reached = i <= activeStop;
                const isActive = i === activeStop;
                const labelRight = stop.coords.x > 50;
                return (
                  <g key={stop.city}>
                    {isActive && (
                      <motion.circle
                        cx={stop.coords.x}
                        cy={stop.coords.y}
                        r="4"
                        fill="none"
                        stroke={stop.color}
                        strokeWidth="0.5"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                        style={{ transformOrigin: `${stop.coords.x}px ${stop.coords.y}px` }}
                      />
                    )}

                    {/* White bg ring so dot pops on light bg */}
                    <circle
                      cx={stop.coords.x}
                      cy={stop.coords.y}
                      r={isActive ? 3.2 : 2}
                      fill="white"
                    />
                    <motion.circle
                      cx={stop.coords.x}
                      cy={stop.coords.y}
                      r={isActive ? 2.4 : 1.4}
                      fill={reached ? stop.color : "rgba(11,32,39,0.15)"}
                      animate={{ r: isActive ? 2.4 : 1.4 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* City label */}
                    <motion.text
                      x={stop.coords.x + (labelRight ? 5 : -5)}
                      y={stop.coords.y - 3}
                      textAnchor={labelRight ? "start" : "end"}
                      fontSize="4.2"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="800"
                      letterSpacing="0.2"
                      animate={{
                        opacity: reached ? 1 : 0.25,
                        fill: isActive ? stop.color : "#0B2027",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {stop.city.toUpperCase()}
                    </motion.text>

                    {/* Day label */}
                    <motion.text
                      x={stop.coords.x + (labelRight ? 5 : -5)}
                      y={stop.coords.y + 5.5}
                      textAnchor={labelRight ? "start" : "end"}
                      fontSize="2.8"
                      fontFamily="monospace"
                      animate={{ opacity: reached ? 0.45 : 0.12, fill: "#0B2027" }}
                      transition={{ duration: 0.4 }}
                    >
                      {stop.day}
                    </motion.text>
                  </g>
                );
              })}

              {/* Traveller dot — rides the drawn path tip */}
              <motion.g
                animate={{ x: dotPos.x, y: dotPos.y }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                style={{ transformOrigin: "0px 0px" }}
              >
                <circle r="4" fill={stops[activeStop].color} opacity="0.18" />
                <circle r="2" fill={stops[activeStop].color} />
                <circle r="0.8" fill="white" />
              </motion.g>
            </svg>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-[max(48px,5vw)] right-10 flex flex-col gap-2">
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#0B2027]/35 mb-1">
              <span>Start</span>
              <span>{Math.round(drawProgress * 100)}% explored</span>
            </div>
            <div className="h-[2px] bg-[#0B2027]/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#FF6B35] transition-none"
                style={{ width: `${drawProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 w-[1px] h-[55%] bg-[#0B2027]/10 self-center" />

        {/* ── RIGHT: Stop detail ── */}
        <div className="flex-1 h-full flex flex-col justify-center px-[5vw] relative">

          {/* Step dots top right */}
          <div className="absolute top-12 right-[5vw] flex items-center gap-2">
            {stops.map((s, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: i === activeStop ? 24 : 6,
                  height: 6,
                  background: i === activeStop ? stops[activeStop].color : "rgba(11,32,39,0.15)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Card */}
          <div className="relative w-full max-w-[440px]" style={{ height: 480 }}>
            {stops.map((stop, i) => (
              <StopCard key={stop.city} stop={stop} active={i === activeStop} />
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            className="absolute bottom-12 left-[5vw]"
            animate={{ opacity: drawProgress > 0.88 ? 1 : 0, y: drawProgress > 0.88 ? 0 : 8 }}
            transition={{ duration: 0.5 }}
          >
            <button className="flex items-center gap-3 bg-[#FF6B35] text-white px-6 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_10px_24px_rgba(255,107,53,0.3)]">
              Plan a trip like this
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}