"use client";

/**
 * STATS CARD — Digital Travel Legacy (Dark Mode)
 *
 * Layout: dark card (#001621) centred on cream bg.
 *   Left:  animated stat counters (Countries, Cities, Days off-grid)
 *   Right: abstract world map — dot-grid + SVG flight path
 *          animated pathLength 0→1 on viewport entry
 *          glassmorphic "Top 5% Explorer" floating badge
 *
 * pathLength animation:
 *   Spring damping=0, stiffness=60, restDelta=0.001 — creates a smooth
 *   "drawing" feel, slightly elastic at completion (intentional).
 */

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";

/* ── Animated counter hook ─────────────────────────────────────── */
function useCounter(target: number, inView: boolean) {
  const mv   = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20, restDelta: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    /* Small delay so multiple counters stagger naturally */
    const t = setTimeout(() => mv.set(target), 200);
    return () => clearTimeout(t);
  }, [inView, target, mv]);

  useEffect(() =>
    spring.on("change", (v) => setDisplay(Math.round(v))),
  [spring]);

  return display;
}

/* ── Stat block ────────────────────────────────────────────────── */
function Stat({
  value, suffix, label, inView, delay,
}: {
  value: number; suffix?: string; label: string; inView: boolean; delay: number;
}) {
  const count = useCounter(value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <span
        className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight tabular-nums"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-white/40 text-sm font-medium mt-2 tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

/* ── City dot on the abstract "world" ──────────────────────────── */
function CityDot({
  x, y, name, inView, delay,
}: {
  x: string; y: string; name: string; inView: boolean; delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Outer ring pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#FF6B35]"
        animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        style={{ width: 8, height: 8, margin: -2 }}
      />
      {/* Core dot */}
      <div className="w-2 h-2 rounded-full bg-[#FF6B35] relative z-10" />
      {/* Label */}
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[8px]
                   font-medium text-white/50 whitespace-nowrap"
      >
        {name}
      </span>
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */
export function StatsCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(cardRef, { once: true, margin: "-15% 0px" });

  /* SVG flight path draw animation */
  const pathProgress = useSpring(0, {
    stiffness: 55,
    damping:   18,
    restDelta: 0.001,
  });
  useEffect(() => {
    if (inView) pathProgress.set(1);
  }, [inView, pathProgress]);

  return (
    <section className="py-24 px-6 bg-[#F3EFE6]">
      <div ref={cardRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden grain"
          style={{ background: "#001621" }}
        >
          {/* Dot-grid overlay */}
          <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

          {/* Decorative ambient blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full
                          bg-[#FF6B35] opacity-[0.04] blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full
                          bg-[#62B6C7] opacity-[0.05] blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[420px]">

            {/* ── Left — Stats ── */}
            <div className="flex flex-col justify-center p-10 md:p-14
                            border-b md:border-b-0 md:border-r border-white/6">

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-[#00DB9A] text-xs font-bold tracking-[0.2em]
                           uppercase mb-12"
              >
                Your travel legacy
              </motion.p>

              <div className="flex flex-col gap-10">
                <Stat value={42}  suffix="+"  label="Countries explored"   inView={inView} delay={0.1} />
                <Stat value={127}            label="Cities unlocked"        inView={inView} delay={0.2} />
                <Stat value={384} suffix=" d" label="Days spent off-grid"  inView={inView} delay={0.3} />
              </div>

              {/* CTA */}
              <motion.a
                href="/signup"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 inline-flex items-center gap-2 text-[#FF6B35]
                           text-sm font-bold hover:gap-3 transition-all duration-200"
              >
                Start building yours
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </div>

            {/* ── Right — Abstract world map ── */}
            <div className="relative flex items-center justify-center p-8 md:p-12 overflow-hidden">

              {/* Abstract world map — SVG with simplified landmass suggestions */}
              <div className="relative w-full max-w-xs aspect-[4/3]">

                {/* City dots */}
                {inView && [
                  { x: "18%", y: "35%", name: "NYC",      delay: 0.5 },
                  { x: "40%", y: "24%", name: "London",   delay: 0.6 },
                  { x: "58%", y: "30%", name: "Dubai",    delay: 0.7 },
                  { x: "79%", y: "28%", name: "Tokyo",    delay: 0.8 },
                  { x: "76%", y: "60%", name: "Bali",     delay: 0.9 },
                  { x: "27%", y: "70%", name: "BA",       delay: 1.0 },
                ].map((city) => (
                  <CityDot key={city.name} {...city} inView={inView} />
                ))}

                {/* SVG overlay: flight arcs */}
                <svg
                  viewBox="0 0 400 300"
                  className="absolute inset-0 w-full h-full"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="arc1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#62B6C7" />
                    </linearGradient>
                    <linearGradient id="arc2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#62B6C7" />
                      <stop offset="100%" stopColor="#00DB9A" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {/* Subtle continent shapes (stylised blobs for atmosphere) */}
                  <g opacity="0.07">
                    {/* North America blob */}
                    <path d="M40 60 Q90 30 130 60 Q150 90 140 130 Q110 160 70 140 Q30 120 40 60Z"
                      fill="white" />
                    {/* South America blob */}
                    <path d="M80 170 Q110 160 120 200 Q130 240 110 260 Q80 270 65 240 Q55 210 80 170Z"
                      fill="white" />
                    {/* Europe blob */}
                    <path d="M155 30 Q190 20 200 50 Q205 70 195 85 Q170 90 155 70 Q148 50 155 30Z"
                      fill="white" />
                    {/* Africa blob */}
                    <path d="M165 100 Q200 90 215 130 Q225 170 210 210 Q185 230 165 210 Q145 180 155 140 Q158 110 165 100Z"
                      fill="white" />
                    {/* Asia blob */}
                    <path d="M220 25 Q320 15 360 50 Q380 80 360 110 Q310 130 250 120 Q210 100 210 65 Q212 40 220 25Z"
                      fill="white" />
                    {/* Australia blob */}
                    <path d="M300 190 Q340 180 355 210 Q360 235 340 250 Q310 255 295 230 Q285 210 300 190Z"
                      fill="white" />
                  </g>

                  {/* Main flight arc: NYC → Tokyo */}
                  <motion.path
                    d="M72 105 C160 20 280 20 316 84"
                    stroke="url(#arc1)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    style={{ pathLength: pathProgress }}
                  />

                  {/* Secondary arc: London → Bali */}
                  <motion.path
                    d="M160 72 C220 120 280 160 304 180"
                    stroke="url(#arc2)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    strokeLinecap="round"
                    opacity={0.7}
                    style={{ pathLength: pathProgress }}
                  />

                  {/* Tertiary arc: NYC → BA */}
                  <motion.path
                    d="M72 105 C85 170 90 200 108 210"
                    stroke="#FF6B35"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    strokeLinecap="round"
                    opacity={0.5}
                    style={{ pathLength: pathProgress }}
                  />

                  {/* Plane icon at arc endpoint */}
                  <motion.g
                    style={{ opacity: pathProgress }}
                    transform="translate(310, 80)"
                  >
                    <circle r="4" fill="#FF6B35" opacity="0.3" />
                    <circle r="2" fill="#FF6B35" />
                  </motion.g>
                </svg>
              </div>

              {/* ── Glassmorphic Badge ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 200, damping: 18 }}
                className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2.5
                           rounded-full text-white text-xs font-bold"
                style={{
                  background:           "rgba(255,255,255,0.07)",
                  backdropFilter:       "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border:               "1px solid rgba(255,255,255,0.14)",
                  boxShadow:            "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Trophy icon */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B35">
                  <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
                </svg>
                Top 5% Explorer
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
