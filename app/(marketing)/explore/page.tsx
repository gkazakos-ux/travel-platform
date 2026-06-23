"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// --- 1. NAVBAR COMPONENT ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const navLinks = [
    { id: "explore", label: "Explore", href: "/explore" },
    { id: "how-it-works", label: "How it works", href: "#" },
    { id: "login", label: "Log in", href: "/login" },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${isScrolled ? "top-4 px-4" : "top-0 px-[clamp(20px,5vw,52px)]"}`}>
      <div 
        ref={navRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setHoveredItem(null); }}
        className={`relative flex items-center justify-between w-full transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? "max-w-4xl bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] text-[#0B2027] rounded-full px-6 py-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/20 mt-4" 
            : "max-w-7xl bg-transparent text-[#0B2027] py-[18px]"
        }`}
      >
        {isScrolled && (
          <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ background: `radial-gradient(120px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.6), transparent 100%)` }} />
        )}

        <div className="relative z-10 flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block"></span>
          wayfare
        </div>

        <div className="relative z-10 hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <Link key={item.id} href={item.href} onMouseEnter={() => setHoveredItem(item.id)} className={`relative px-4 py-2 transition-colors rounded-full ${isScrolled ? "text-[#0B2027]" : "text-[#0B2027] hover:text-[#FF6B35]"}`}>
                {hoveredItem === item.id && (
                  <motion.div layoutId="nav-pill" className={`absolute inset-0 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${isScrolled ? "bg-white/60 border border-white/50" : "bg-white/40 backdrop-blur-md border border-white/30"}`} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <Link href="/signup" className={`ml-2 px-5 py-2.5 rounded-full transition-transform hover:scale-105 relative z-10 ${isScrolled ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20" : "bg-[#FF6B35] text-white shadow-[0_8px_20px_rgba(255,107,53,0.25)]"}`}>
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};


// --- 2. ΣΤΑΤΙΚΑ ΔΕΔΟΜΕΝΑ (Φίλτρα & Χώρες) ---
const CATEGORY_FILTERS = [
  { label: "Beaches", dot: "#4FB0A5", id: "beaches", isDark: true },
  { label: "Mountains", dot: "#7BAE7F", id: "mountains", isDark: false },
  { label: "Cities", dot: "#FF6B35", id: "cities", isDark: false },
  { label: "Hidden gems", dot: "#0B2027", id: "gems", isDark: false },
];

const COUNTRIES = [
  { id: "all", label: "All countries", slug: "", region: "", dot: "#0B2027", lat: null, lon: null, pin: null },
  { id: "gr", label: "Greece", slug: "greece", region: "Cyclades", dot: "#4FB0A5", lat: 36.4, lon: 25.4, pin: "santorini" },
  { id: "it", label: "Italy", slug: "italy", region: "Lazio", dot: "#FF6B35", lat: 41.9, lon: 12.5, pin: "rome" },
  { id: "pt", label: "Portugal", slug: "portugal", region: "Lisbon", dot: "#7BAE7F", lat: 38.7, lon: -9.1, pin: "lisbon" },
  { id: "ma", label: "Morocco", slug: "morocco", region: "Marrakech", dot: "#FF6B35", lat: 31.6, lon: -8.0, pin: "marrakech" },
  { id: "ca", label: "Canada", slug: "canada", region: "Alberta", dot: "#4FB0A5", lat: 51.2, lon: -115.6, pin: "banff" },
  { id: "jp", label: "Japan", slug: "japan", region: "Kansai", dot: "#7BAE7F", lat: 35.0, lon: 135.8, pin: "kyoto" },
];


// --- 3. MAIN EXPLORE PAGE & CANVAS GLOBE ---
export default function ExploreGlobePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("beaches");
  
  // Search State
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);

  // Canvas Refs & State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<any>(null);
  const animationRef = useRef<number>();

  // --- CANVAS 3D ENGINE ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 600 * dpr;
    ctx.scale(dpr, dpr);

    const gl = { 
      rotY: -0.5, rotX: 0.32, 
      targetY: -0.5, targetX: 0.32, 
      dragging: false, autoRotate: true, 
      lastX: 0, lastY: 0, hoverId: null 
    };
    glRef.current = gl;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const ll2v = (lat: number, lon: number) => {
      const f = (lat * Math.PI) / 180, l = (lon * Math.PI) / 180;
      return [Math.cos(f) * Math.sin(l), Math.sin(f), Math.cos(f) * Math.cos(l)];
    };
    const projV = (x: number, y: number, z: number) => {
      const R = 242;
      const cy = Math.cos(gl.rotY), sy = Math.sin(gl.rotY);
      const cx = Math.cos(gl.rotX), sx = Math.sin(gl.rotX);
      let x1 = x * cy + z * sy;
      let z1 = -x * sy + z * cy;
      let y2 = y * cx - z1 * sx;
      let z2 = y * sx + z1 * cx;
      return { sx: 300 + x1 * R, sy: 300 - y2 * R, z: z2, front: z2 > 0 };
    };
    const slerp = (a: number[], b: number[], t: number) => {
      let d = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1);
      const om = Math.acos(d), so = Math.sin(om);
      if (so < 1e-6) return [...a];
      const k0 = Math.sin((1 - t) * om) / so, k1 = Math.sin(t * om) / so;
      return [a[0]*k0 + b[0]*k1, a[1]*k0 + b[1]*k1, a[2]*k0 + b[2]*k1];
    };

    // Continents Grid
    const ROWS = 36, COLS = 72;
    const grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
    const cell = (lat: number, lon: number) => {
      const r = Math.floor((90 - lat) / 5), c = Math.floor((lon + 180) / 5);
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) grid[r][c] = true;
    };
    const fillGrid = (la1: number, la2: number, lo1: number, lo2: number) => {
      for (let la = la1; la <= la2; la += 2.5)
        for (let lo = lo1; lo <= lo2; lo += 2.5) cell(la, lo);
    };
    fillGrid(60, 71, -168, -141); fillGrid(50, 70, -141, -60); fillGrid(33, 50, -125, -70);
    fillGrid(25, 33, -115, -80); fillGrid(15, 25, -105, -86); fillGrid(8, 16, -92, -79); fillGrid(60, 82, -55, -18);
    fillGrid(0, 12, -80, -50); fillGrid(-12, 1, -80, -35); fillGrid(-23, -12, -70, -38);
    fillGrid(-35, -23, -72, -53); fillGrid(-45, -35, -74, -62); fillGrid(-55, -45, -74, -65);
    fillGrid(36, 44, -10, 28); fillGrid(44, 55, -5, 40); fillGrid(55, 70, 5, 30); fillGrid(50, 58, -8, 2);
    fillGrid(15, 33, -17, 35); fillGrid(5, 20, -17, 15); fillGrid(-5, 15, 10, 45);
    fillGrid(-20, -5, 12, 40); fillGrid(-35, -20, 15, 33); fillGrid(-25, -12, 43, 50);
    fillGrid(50, 72, 30, 180); fillGrid(38, 55, 28, 140); fillGrid(30, 42, 35, 62); fillGrid(15, 32, 35, 60);
    fillGrid(20, 30, 68, 92); fillGrid(8, 20, 72, 88); fillGrid(22, 50, 90, 122);
    fillGrid(8, 25, 95, 110); fillGrid(-10, 10, 95, 141); fillGrid(31, 45, 130, 146);
    fillGrid(-38, -11, 113, 153); fillGrid(-44, -39, 144, 148); fillGrid(-47, -34, 166, 179);
    fillGrid(-90, -66, -180, 179);

    const N = 2400, dots: any[] = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const yy = 1 - (i / (N - 1)) * 2;
      const rr = Math.sqrt(1 - yy * yy), th = ga * i;
      const x = Math.cos(th) * rr, z = Math.sin(th) * rr, y = yy;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);
      const r = Math.floor((90 - lat) / 5), c = Math.floor((lon + 180) / 5);
      const land = (r >= 0 && r < ROWS && c >= 0 && c < COLS) ? grid[r][c] : false;
      dots.push({ v: [x, y, z], land });
    }

    const parallels: any[] = [], meridians: any[] = [];
    [-60, -30, 0, 30, 60].forEach(lat => {
      const arr = [];
      for (let lon = 0; lon <= 360; lon += 6) arr.push(ll2v(lat, lon));
      parallels.push(arr);
    });
    for (let lon = -180; lon < 180; lon += 30) {
      const arr = [];
      for (let lat = -80; lat <= 80; lat += 5) arr.push(ll2v(lat, lon));
      meridians.push(arr);
    }

    const pins = [
      { id: "santorini", name: "Santorini", lat: 36.4, lon: 25.4, v: ll2v(36.4, 25.4) },
      { id: "rome", name: "Rome", lat: 41.9, lon: 12.5, v: ll2v(41.9, 12.5) },
      { id: "lisbon", name: "Lisbon", lat: 38.7, lon: -9.1, v: ll2v(38.7, -9.1) },
      { id: "marrakech", name: "Marrakech", lat: 31.6, lon: -8.0, v: ll2v(31.6, -8.0) },
      { id: "banff", name: "Banff", lat: 51.2, lon: -115.6, v: ll2v(51.2, -115.6) },
      { id: "kyoto", name: "Kyoto", lat: 35.0, lon: 135.8, v: ll2v(35.0, 135.8) },
    ];
    const byId: any = {}; pins.forEach(p => byId[p.id] = p);
    const routes = [
      ["santorini", "rome"], ["rome", "lisbon"], ["lisbon", "marrakech"],
      ["santorini", "kyoto"], ["banff", "lisbon"],
    ].map(([a, b], i) => ({ a: byId[a].v, b: byId[b].v, off: i * 0.37 }));

    const onPointerDown = (e: PointerEvent) => {
      gl.dragging = true; gl.autoRotate = false;
      gl.lastX = e.clientX; gl.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId); canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (gl.dragging) {
        const dx = e.clientX - gl.lastX, dy = e.clientY - gl.lastY;
        gl.lastX = e.clientX; gl.lastY = e.clientY;
        gl.rotY = gl.targetY = gl.rotY + dx * 0.0065;
        gl.rotX = gl.targetX = clamp(gl.rotX + dy * 0.0065, -1.15, 1.15);
      } else {
        const rect = canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (600 / rect.width);
        const my = (e.clientY - rect.top) * (600 / rect.height);
        let found = null;
        for (const p of pins) {
          const s = projV(p.v[0], p.v[1], p.v[2]);
          if (s.front && Math.hypot(s.sx - mx, s.sy - my) < 20) { found = p.id; break; }
        }
        gl.hoverId = found;
        canvas.style.cursor = found ? "pointer" : "grab";
      }
    };
    const endDrag = () => { gl.dragging = false; canvas.style.cursor = "grab"; };

    // --- ENTRY POINT 1: ΚΛΙΚ ΠΑΝΩ ΣΤΙΣ ΠΙΝΕΖΕΣ ΤΗΣ ΥΔΡΟΓΕΙΟΥ ---
    const onCanvasClick = () => {
      if (gl.hoverId) {
        const pinToCountrySlug: Record<string, string> = {
          santorini: "greece",
          rome: "italy",
          lisbon: "portugal",
          marrakech: "morocco",
          banff: "canada",
          kyoto: "japan"
        };
        const targetSlug = pinToCountrySlug[gl.hoverId];
        if (targetSlug) router.push(`/explore/${targetSlug}`);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("click", onCanvasClick);

    const draw = (t: number) => {
      if (!gl.dragging && gl.autoRotate) gl.targetY -= 0.0012;
      gl.rotY += (gl.targetY - gl.rotY) * 0.09;
      gl.rotX += (gl.targetX - gl.rotX) * 0.09;
      
      ctx.clearRect(0, 0, 600, 600);

      const ocean = ctx.createRadialGradient(232, 220, 30, 300, 300, 260);
      ocean.addColorStop(0, "#CFEDE6"); ocean.addColorStop(0.5, "#7FC3B8"); ocean.addColorStop(1, "#3D9286");
      ctx.beginPath(); ctx.arc(300, 300, 250, 0, 7); ctx.fillStyle = ocean; ctx.fill();

      const drawPoly = (arr: any[]) => {
        for (let i = 1; i < arr.length; i++) {
          const a = projV(arr[i-1][0], arr[i-1][1], arr[i-1][2]);
          const b = projV(arr[i][0], arr[i][1], arr[i][2]);
          if (a.front && b.front) {
            ctx.globalAlpha = 0.04 + 0.09 * ((a.z + b.z) / 2);
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
          }
        }
      };
      ctx.strokeStyle = "#0B2027"; ctx.lineWidth = 1;
      parallels.forEach(drawPoly); meridians.forEach(drawPoly);
      ctx.globalAlpha = 1;

      for (const d of dots) {
        const p = projV(d.v[0], d.v[1], d.v[2]);
        if (!p.front) continue;
        ctx.fillStyle = "#0B2027";
        if (d.land) {
          ctx.globalAlpha = 0.32 + 0.55 * p.z;
          ctx.beginPath(); ctx.arc(p.sx, p.sy, 1.0 + 1.5 * p.z, 0, 7); ctx.fill();
        } else {
          ctx.globalAlpha = 0.05 + 0.09 * p.z;
          ctx.beginPath(); ctx.arc(p.sx, p.sy, 0.7 + 0.5 * p.z, 0, 7); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      const steps = 44;
      for (const route of routes) {
        ctx.strokeStyle = "#FF6B35"; ctx.lineWidth = 2;
        for (let i = 1; i <= steps; i++) {
          const va = slerp(route.a, route.b, (i-1)/steps);
          const vb = slerp(route.a, route.b, i/steps);
          const a = projV(va[0], va[1], va[2]);
          const b = projV(vb[0], vb[1], vb[2]);
          if (a.front && b.front) {
            ctx.globalAlpha = 0.22;
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
          }
        }
        const tt = ((t * 0.16 + route.off) % 1);
        const cv = slerp(route.a, route.b, tt);
        const cp = projV(cv[0], cv[1], cv[2]);
        if (cp.front) {
          const gg = ctx.createRadialGradient(cp.sx, cp.sy, 0, cp.sx, cp.sy, 10);
          gg.addColorStop(0, "#FF6B35"); gg.addColorStop(1, "rgba(255,107,53,0)");
          ctx.globalAlpha = 0.9; ctx.fillStyle = gg;
          ctx.beginPath(); ctx.arc(cp.sx, cp.sy, 10, 0, 7); ctx.fill();
          ctx.globalAlpha = 1; ctx.fillStyle = "#fff";
          ctx.beginPath(); ctx.arc(cp.sx, cp.sy, 2, 0, 7); ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      for (const p of pins) {
        const s = projV(p.v[0], p.v[1], p.v[2]);
        if (!s.front) continue;
        const pulse = 1 + Math.sin(t * 2.6 + p.lon) * 0.18;
        
        const gg = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, 18 * pulse);
        gg.addColorStop(0, "rgba(255,107,53,.55)"); gg.addColorStop(1, "rgba(255,107,53,0)");
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(s.sx, s.sy, 18 * pulse, 0, 7); ctx.fill();
        
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(s.sx, s.sy, 7.5, 0, 7); ctx.fill();
        ctx.fillStyle = "#FF6B35"; ctx.beginPath(); ctx.arc(s.sx, s.sy, 5, 0, 7); ctx.fill();
        
        if (gl.hoverId === p.id) {
          ctx.font = "700 13px Manrope, sans-serif";
          const w = ctx.measureText(p.name).width + 22;
          const lx = s.sx - w / 2, ly = s.sy - 38;
          ctx.fillStyle = "rgba(11,32,39,.92)";
          if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(lx, ly, w, 26, 13); ctx.fill(); }
          else { ctx.fillRect(lx, ly, w, 26); }
          ctx.fillStyle = "#F3EFE6"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(p.name, s.sx, ly + 14);
          ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        }
      }

      animationRef.current = requestAnimationFrame(() => draw(performance.now() / 1000));
    };

    draw(performance.now() / 1000);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("click", onCanvasClick);
    };
  }, []);

  useEffect(() => {
    if (selectedCountry.lat !== null && glRef.current) {
      glRef.current.autoRotate = false;
      glRef.current.targetY = -(selectedCountry.lon! * Math.PI) / 180;
      glRef.current.targetX = Math.max(-1.0, Math.min(1.0, (selectedCountry.lat! * Math.PI) / 180));
    } else if (glRef.current) {
      glRef.current.autoRotate = true;
    }
  }, [selectedCountry]);

  // --- ENTRY POINT 2: ΛΕΙΤΟΥΡΓΙΑ ΚΟΥΜΠΙΟΥ SEARCH & ENTER KEY ---
  const handleSearchAction = () => {
    if (selectedCountry.id !== "all") {
      router.push(`/explore/${selectedCountry.slug}`);
    } else if (query) {
      router.push(`/explore/${query.toLowerCase().trim()}`);
    }
  };

  const dragX = useMotionValue(0);
  const rotation = useTransform(dragX, [-1000, 1000], [-360, 360]);

  return (
    <main className="w-full bg-[#000A0F] text-[#0B2027] font-sans flex flex-col min-h-screen">
      
      <Navbar />

      {/* --- UPPER EXPLORE SECTION --- */}
      <div className="relative w-full overflow-hidden bg-[radial-gradient(120%_120%_at_78%_18%,#F8F4EC_0%,#F3EFE6_46%,#ECE6D8_100%)]">
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `}} />

        {/* Ambient Soft Blobs */}
        <div className="absolute w-[520px] h-[520px] -right-[120px] -top-[160px] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.10),transparent_68%)] blur-md pointer-events-none z-0" />
        <div className="absolute w-[460px] h-[460px] -left-[160px] -bottom-[180px] rounded-full bg-[radial-gradient(circle,rgba(79,176,165,0.12),transparent_68%)] blur-md pointer-events-none z-0" />

        {/* --- MAIN GRID --- */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-6 px-8 md:px-14 pb-20 pt-36 w-full max-w-[1500px] mx-auto min-h-[90vh]">

          {/* LEFT COLUMN: Typography & Search */}
          <div className="flex flex-col justify-center relative z-30">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4FB0A5]/10 text-[#2E7D74] text-[13px] font-bold tracking-wide w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FB0A5] inline-block" />
              128 destinations live
            </div>

            <h1 className="font-serif font-normal text-6xl md:text-[72px] leading-none tracking-tight mt-6">
              Explore the<br/>world, <span className="italic text-[#FF6B35]">beautifully.</span>
            </h1>

            <p className="text-[16px] leading-relaxed text-[#0B2027]/60 mt-6 max-w-[360px]">
              Trace the routes of seasoned travellers and discover hand-picked places glowing across the map.
            </p>

            {/* --- SEARCH BAR --- */}
            <div className="relative mt-8 w-full max-w-[480px]">
              <div className="relative z-20 flex items-center p-1.5 pl-5 rounded-[1.2rem] bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_14px_36px_rgba(11,32,39,0.10)] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
                
                <svg className="w-4 h-4 text-[#0B2027]/40 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
                  placeholder="Where to next?" 
                  className="bg-transparent border-none outline-none font-sans text-[15px] font-bold text-[#0B2027] flex-1 min-w-0 ml-3 placeholder:text-[#0B2027]/40" 
                />
                
                {/* Vertical Divider */}
                <div className="w-[1px] h-6 bg-[#0B2027]/10 mx-2 flex-none" />

                {/* Country Selector Button */}
                <button 
                  onClick={() => setShowCountriesDropdown(!showCountriesDropdown)}
                  className="flex items-center gap-2 px-2 py-2 font-sans text-[14px] font-extrabold text-[#0B2027] whitespace-nowrap hover:opacity-70 transition-opacity"
                >
                  <span className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: selectedCountry.dot }} />
                  <span className="max-w-[80px] truncate">{selectedCountry.label}</span>
                  <svg className={`w-3.5 h-3.5 text-[#0B2027]/50 transition-transform flex-none ${showCountriesDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Search Button */}
                <button onClick={handleSearchAction} className="px-6 py-3 ml-2 rounded-xl bg-[#FF6B35] text-white font-sans text-sm font-bold shadow-[0_8px_20px_rgba(255,107,53,0.34)] hover:scale-105 active:scale-95 transition-transform flex-none">
                  Search
                </button>
              </div>

              {/* Smart Glassmorphic Dropdown */}
              <AnimatePresence>
                {showCountriesDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+12px)] right-0 w-[260px] p-2 bg-white/80 backdrop-blur-[30px] border border-white rounded-[1.2rem] shadow-[0_24px_50px_rgba(11,32,39,0.15)] z-40"
                  >
                    <div className="text-[10px] font-black text-[#0B2027]/40 tracking-[0.08em] uppercase px-3 pt-2 pb-1">Filter by country</div>
                    <div className="flex flex-col gap-1 mt-1 max-h-[300px] overflow-y-auto">
                      {COUNTRIES.map((c) => (
                        <button 
                          key={c.id} 
                          onClick={() => { setSelectedCountry(c); setShowCountriesDropdown(false); }}
                          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-[12px] transition-colors text-left ${selectedCountry.id === c.id ? 'bg-[#4FB0A5]/10' : 'hover:bg-black/5'}`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ backgroundColor: c.dot }} />
                          <span className="text-[14px] font-extrabold text-[#0B2027] flex-1">{c.label}</span>
                          <span className="text-[12px] font-bold text-[#0B2027]/45">{c.region}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Chips */}
            <div className="mt-5 flex flex-wrap gap-2.5 relative z-0">
              {CATEGORY_FILTERS.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button 
                    key={f.id} onClick={() => setActiveFilter(f.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-[12px] font-extrabold transition-all hover:scale-105 active:scale-95 shadow-sm border ${
                      isActive || f.isDark ? 'bg-[#0B2027] text-white border-[#0B2027]' : 'bg-white text-[#0B2027] border-gray-100'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.dot }} />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Globe Canvas */}
          <div className="relative min-h-[660px] flex items-center justify-center lg:mt-0 mt-20">
            <div className="relative w-[600px] h-[600px]">
              
              {/* Canvas Base */}
              <canvas ref={canvasRef} className="absolute inset-0 w-[600px] h-[600px] z-10 touch-none outline-none" />

              {/* --- ENTRY POINT 3: FLOATING GLASS CARD (SANTORINI -> GREECE) --- */}
              <motion.div 
                onClick={() => router.push("/explore/greece")}
                style={{ animation: 'floaty 7s ease-in-out infinite' }} 
                className="absolute top-8 right-2 w-[252px] z-30 cursor-pointer"
              >
                <div className="rounded-[26px] bg-white/40 backdrop-blur-xl border border-white/70 shadow-[0_22px_50px_rgba(11,32,39,0.18)] p-3.5 overflow-hidden">
                  <div className="relative h-[132px] rounded-2xl overflow-hidden bg-[#e7e0d2]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(11,32,39,.05) 0 8px, transparent 8px 16px)' }}>
                    <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80" alt="Santorini" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#4FB0A5]/90 text-white text-[11px] font-bold backdrop-blur-sm">Island</div>
                  </div>
                  <div className="px-1.5 pt-3 pb-1">
                    <div className="flex items-center justify-between"><div className="text-[16px] font-extrabold tracking-tight">Santorini</div><div className="text-[13px] font-bold text-[#FF6B35]">★ 4.9</div></div>
                    <div className="text-[13px] text-[#0B2027]/55 font-semibold mt-0.5">Cyclades, Greece</div>
                    <div className="flex items-center justify-between mt-3.5"><div className="text-[13px] text-[#0B2027]/50 font-semibold">from <span className="text-[#0B2027] font-extrabold text-[16px]">$420</span></div><div className="w-8 h-8 rounded-full bg-[#0B2027] text-white flex items-center justify-center text-sm cursor-pointer hover:bg-[#FF6B35] transition-colors">→</div></div>
                  </div>
                </div>
              </motion.div>

              {/* --- ENTRY POINT 4: FLOATING GLASS CARD (KYOTO -> JAPAN) --- */}
              <motion.div 
                onClick={() => router.push("/explore/japan")}
                style={{ animation: 'floaty 8.5s ease-in-out infinite', animationDelay: '1.2s' }} 
                className="absolute bottom-16 left-16 w-[230px] z-30 cursor-pointer"
              >
                <div className="flex items-center gap-3 rounded-[22px] bg-white/50 backdrop-blur-xl border border-white/70 shadow-[0_20px_44px_rgba(11,32,39,0.16)] p-3">
                  <div className="w-14 h-14 rounded-2xl flex-none overflow-hidden relative"><img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80" alt="Kyoto" className="absolute inset-0 w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-extrabold tracking-tight">Kyoto</div>
                    <div className="text-[12px] text-[#0B2027]/55 font-semibold">Japan · Temples</div>
                    <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full bg-[#7BAE7F]/20 text-[#4F7A53] text-[11px] font-bold"><span className="w-1.5 h-1.5 rounded-full bg-[#7BAE7F]" />Trending</div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING mini insight pill */}
              <motion.div style={{ animation: 'floaty 6s ease-in-out infinite', animationDelay: '0.6s' }} className="absolute bottom-[130px] right-9 z-30 pointer-events-none">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0B2027]/90 backdrop-blur-md shadow-[0_14px_30px_rgba(11,32,39,0.3)]">
                  <div className="flex">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF9466] border-2 border-[#0B2027]" />
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4FB0A5] to-[#7BCFC4] border-2 border-[#0B2027] -ml-2" />
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7BAE7F] to-[#A6CCA8] border-2 border-[#0B2027] -ml-2" />
                  </div>
                  <span className="text-[#F3EFE6] text-[12.5px] font-bold">312 exploring now</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* --- OUTRO / MOUNTAIN FOOTER --- */}
      <div className="relative bg-[#000A0F] w-full mt-auto z-10 pt-24 pb-4 overflow-hidden">
        
        {/* Soft Blending Gradient at the top of the footer */}
        <div className="absolute top-0 inset-x-0 h-[150px] bg-gradient-to-b from-[#F3EFE6] to-transparent z-10 pointer-events-none" />

        {/* Mountain Image Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
            alt="Mountain range" 
            className="w-full h-full object-cover object-center opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000A0F] via-[#000A0F]/60 to-transparent" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center pt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight max-w-[18ch] leading-tight mb-8">
            Your next trip is <em className="text-[#FF6B35] not-italic">someone&apos;s last one.</em>
          </h2>
          
          <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full shadow-[0_14px_26px_-10px_rgba(255,107,53,0.6)] transition-all flex items-center gap-3 mb-32 hover:-translate-y-1 text-sm">
            Start Planning
          </button>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-16 mb-12 text-left">
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Get Started</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Get the app</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Log in</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">About</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">About us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Features</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Travel Planner</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Travel Tracker</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-[11px] font-bold tracking-widest text-[#7E94A0] mb-5 uppercase">Help & Support</h4>
                <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                </ul>
             </div>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium text-[#7E94A0] pb-12">
            <p>© 2026 NomadFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}