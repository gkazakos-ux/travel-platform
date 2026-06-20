"use client";

/**
 * PhoneMockup — CSS-only phone shell. No images needed.
 *
 * Renders a rounded phone frame with:
 *  • Dynamic Island notch
 *  • Side volume / power buttons (decorative)
 *  • Configurable size and color theme
 */

type PhoneMockupProps = {
  children: React.ReactNode;
  /** "sm" = 200×420 | "md" = 220×460 (default) | "lg" = 240×500 */
  size?:  "sm" | "md" | "lg";
  /** "dark" (default) | "light" */
  theme?: "dark" | "light";
};

const SIZES = {
  sm: { w: 200, h: 420, radius: 36 },
  md: { w: 220, h: 460, radius: 40 },
  lg: { w: 240, h: 500, radius: 44 },
} as const;

export function PhoneMockup({
  children,
  size  = "md",
  theme = "dark",
}: PhoneMockupProps) {
  const { w, h, radius } = SIZES[size];
  const isDark = theme === "dark";

  const bodyBg     = isDark ? "#0a1e28"  : "#f0f0f2";
  const borderClr  = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.12)";
  const buttonClr  = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const notchBg    = isDark ? "#0a1e28"  : "#e8e8ea";
  const innerRing  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width:        w,
        height:       h,
        borderRadius: radius,
        background:   bodyBg,
        border:       `1.5px solid ${borderClr}`,
        /* Layered shadow for physical depth */
        boxShadow: isDark
          ? `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${innerRing}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : `0 24px 60px rgba(0,0,0,0.20), 0 0 0 1px ${innerRing}`,
      }}
    >
      {/* ── Dynamic Island notch ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-30
                   flex items-center justify-center gap-1.5 px-3"
        style={{
          background:   notchBg,
          width:        "38%",
          height:       28,
          borderRadius: "0 0 18px 18px",
        }}
      >
        {/* Mic dot */}
        <div
          className="rounded-full"
          style={{
            width:      7,
            height:     7,
            background: isDark ? "#1a3544" : "#c0c0c4",
          }}
        />
        {/* Camera pill */}
        <div
          className="rounded-full"
          style={{
            width:      18,
            height:     7,
            background: isDark ? "#1a3544" : "#c0c0c4",
          }}
        />
      </div>

      {/* ── Volume buttons (left) ── */}
      {[{ top: 80, h: 28 }, { top: 118, h: 44 }].map(({ top, h: bh }, i) => (
        <div
          key={i}
          className="absolute left-0 rounded-r-sm"
          style={{
            top,
            width:      3,
            height:     bh,
            background: buttonClr,
          }}
        />
      ))}

      {/* ── Power button (right) ── */}
      <div
        className="absolute right-0 rounded-l-sm"
        style={{
          top:        100,
          width:      3,
          height:     52,
          background: buttonClr,
        }}
      />

      {/* ── Screen content — sits below notch ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          paddingTop:   28,   /* clear the notch */
          borderRadius: radius,
        }}
      >
        {children}
      </div>
    </div>
  );
}
