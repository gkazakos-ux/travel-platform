"use client";

/**
 * FOOTER — Mountain Parallax Curtain Reveal
 *
 * Technique — pure CSS, no JS needed:
 *   The footer uses `margin-top: -400px` to slide UNDER the preceding
 *   BentoGrid section. As the user scrolls, the bento content moves off
 *   screen, progressively revealing the footer beneath. The footer has
 *   `padding-top: 440px` to push visible content below the overlap zone.
 *
 *   z-index layering:
 *     BentoGrid wrapper: z-index 10, position relative  ← sits on top
 *     Footer:            z-index 0                      ← revealed beneath
 *
 * The mountain silhouette is an SVG built inline — no external image needed.
 * A subtle Unsplash background image at low opacity adds photographic depth.
 */

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Mountain SVG silhouette ─────────────────────────────────────── */
function Mountains() {
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
      aria-hidden
    >
      {/* Back range — lighter, farther */}
      <path
        d="M0 300 L0 200 L120 120 L200 160 L280 90 L380 150 L440 80 L530 140
           L620 60 L700 110 L780 55 L860 105 L950 70 L1040 120 L1120 65
           L1210 115 L1290 75 L1380 130 L1440 90 L1440 300 Z"
        fill="#0B2027"
        opacity="0.6"
      />
      {/* Mid range */}
      <path
        d="M0 300 L0 240 L100 175 L220 210 L320 155 L410 195 L500 130
           L600 175 L700 125 L800 160 L890 115 L990 155 L1080 110
           L1170 150 L1260 120 L1360 165 L1440 140 L1440 300 Z"
        fill="#0a1e28"
        opacity="0.8"
      />
      {/* Front range — darkest */}
      <path
        d="M0 300 L0 265 L80 220 L180 250 L280 200 L380 240 L450 195
           L560 235 L650 190 L750 230 L840 195 L940 225 L1020 190
           L1110 220 L1200 195 L1310 230 L1440 205 L1440 300 Z"
        fill="#001621"
      />
    </svg>
  );
}

/* ── Footer links ─────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  {
    heading: "Get Started",
    links: [
      { label: "Get the app",   href: "#" },
      { label: "Log in",        href: "/login" },
      { label: "Sign up free",  href: "/signup" },
    ],
  },
  {
    heading: "Features",
    links: [
      { label: "Travel Planner",  href: "#" },
      { label: "Travel Tracker",  href: "#" },
      { label: "Offline mode",    href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",    href: "#" },
      { label: "Blog",     href: "#" },
      { label: "Careers",  href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Centre",  href: "#" },
      { label: "Privacy",      href: "#" },
      { label: "Terms",        href: "#" },
    ],
  },
];

/* ── Main Component ──────────────────────────────────────────────── */
export function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(ctaRef, { once: true, margin: "-10% 0px" });

  return (
    <footer
      className="relative"
      style={{
        marginTop: "-400px",   /* slides under BentoGrid */
        zIndex:    0,
      }}
    >
      {/* Background: deep dark with mountain image overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #071418 0%, #001621 40%, #000d14 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&q=50')",
          backgroundSize:     "cover",
          backgroundPosition: "center 40%",
          mixBlendMode:       "luminosity",
        }}
      />

      {/* Mountain silhouette */}
      <Mountains />

      {/* All content sits above the mountains via z-index */}
      <div
        className="relative z-10"
        style={{ paddingTop: "440px" }}  /* clears the negative-margin overlap */
      >

        {/* ── CTA Section ── */}
        <div
          ref={ctaRef}
          className="flex flex-col items-center text-center px-6 pb-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#FF6B35] text-xs font-bold tracking-[0.2em] uppercase mb-5"
          >
            Start for free — no credit card
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-4xl sm:text-5xl md:text-6xl font-black text-white
                       leading-[1.0] tracking-tight mb-6 max-w-[18ch]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your next trip is{" "}
            <em className="not-italic text-[#FF6B35]">
              someone's last one.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55, ease: "easeOut" }}
            className="text-white/45 text-base max-w-xs leading-relaxed mb-10"
          >
            Browse 47,000 real itineraries. Save one. Copy it. Go.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.34, duration: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href="/signup"
              className="px-8 py-4 rounded-full bg-[#FF6B35] text-white font-bold text-sm
                         shadow-[0_14px_40px_-8px_rgba(255,107,53,0.55)]
                         hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-8px_rgba(255,107,53,0.65)]
                         active:translate-y-0 transition-all duration-200"
            >
              Start exploring free
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full text-white/60 hover:text-white font-medium text-sm
                         border border-white/12 hover:border-white/25
                         hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Download the app
            </a>
          </motion.div>
        </div>

        {/* ── Links Grid ── */}
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/8
                       pt-14 pb-12"
          >
            {FOOTER_LINKS.map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="text-[10px] font-bold tracking-[0.18em] text-white/35
                               uppercase mb-5">
                  {heading}
                </h4>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm font-medium text-white/55
                                   hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4
                       border-t border-white/8 py-8"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full rounded-br-none bg-[#FF6B35] rotate-45" />
              <span
                className="text-white/70 text-sm font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                NomadFlow
              </span>
            </Link>

            <p className="text-white/30 text-xs">
              © 2026 NomadFlow. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                /* Twitter / X */
                { label: "X / Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                /* Instagram */
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12
                             flex items-center justify-center transition-colors duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24"
                    fill="rgba(255,255,255,0.55)">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
