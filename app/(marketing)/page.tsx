/**
 * NomadFlow — Premium Landing Page
 *
 * Section order:
 *   1. Navbar         — floating glassmorphism pill
 *   2. Hero           — cinematic zoom-out (200 vh scroll space)
 *   3. HowItWorks     — 3-step sticky scroll story (300 vh)
 *   4. StatsCard      — dark stats + animated flight map
 *   5. BentoGrid      — 4-feature asymmetric grid  ← z-index: 10
 *   6. Footer         — mountain parallax curtain   ← z-index:  0, -mt-[400px]
 */

import { Navbar }      from "@/components/landing/Navbar";
import { Hero }        from "@/components/landing/Hero";
import { HowItWorks }          from "@/components/landing/HowItWorks";
import { DestinationShowcase } from "@/components/landing/DestinationShowcase";
import { StatsCard }           from "@/components/landing/StatsCard";
import { BentoGrid }   from "@/components/landing/BentoGrid";
import { Footer }      from "@/components/landing/Footer";

export default function NomadFlowLanding() {
  return (
    <>
      {/* Global floating navbar — sits above everything */}
      <Navbar />

      <main>
        {/* 1 — Hero (200 vh): cinematic zoom-out + phone reveal */}
        <Hero />

        {/* 2 — How it works (300 vh): sticky 3-step story */}
        <HowItWorks />

        {/* 3 — Destination Showcase (400 vh): scroll-driven fullscreen destination reveal */}
        <DestinationShowcase />

        {/* 4 — Stats (viewport height ~): dark card, world map, counters */}
        <StatsCard />

        {/*
          4 — Bento grid — MUST be position:relative + z-index:10 so the
          Footer (with negative margin-top) tucks underneath it correctly.
        */}
        <div className="relative z-10">
          <BentoGrid />
        </div>

        {/* 5 — Footer curtain: negative top margin slides it under BentoGrid */}
        <Footer />
      </main>
    </>
  );
}
