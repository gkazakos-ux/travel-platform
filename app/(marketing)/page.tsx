"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

// --- ΔΕΔΟΜΕΝΑ ΓΙΑ ΤΟ ΝΕΟ SECTION 3 (CAROUSEL) ---
const destinations = [
  {
    id: 1,
    country: "THAILAND",
    title: "Phi Phi Islands",
    location: "Thailand",
    description: "Thailand is a Southeast Asian country. It's known for tropical beaches, opulent royal palaces, ancient ruins and ornate temples displaying figures of Buddha.",
    bgImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    country: "INDONESIA",
    title: "Broken Beach, Bali",
    location: "Indonesia",
    description: "Explore the breathtaking cliffs and natural arches of Nusa Penida. Indonesia offers thousands of volcanic islands with unique landscapes and vibrant cultures.",
    bgImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    country: "INDIA",
    title: "Kerala Backwaters",
    location: "India",
    description: "India is a vast South Asian country with diverse terrain. Cruise through the peaceful, palm-lined backwaters of Kerala on a traditional houseboat.",
    bgImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    country: "JAPAN",
    title: "Mount Fuji",
    location: "Japan",
    description: "Experience the harmonious blend of ancient traditions and futuristic innovation. From tranquil zen gardens to the bustling neon streets of Tokyo.",
    bgImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80"
  }
];

// --- 1. NAVBAR COMPONENT (Liquid / Glassmorphism) ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setGlarePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const navLinks = [
    { id: "explore", label: "Explore", href: "/explore" },
    { id: "how-it-works", label: "How it works", href: "#" },
    { id: "login", label: "Log in", href: "/login" },
  ];

  return (
    <nav 
      className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${
        isScrolled ? "top-4 px-4" : "top-0 px-[clamp(20px,5vw,52px)]"
      }`}
    >
      <div 
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredItem(null);
        }}
        className={`relative flex items-center justify-between w-full transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? "max-w-4xl bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] text-[#0B2027] rounded-full px-6 py-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] border border-white/20" 
            : "max-w-7xl bg-transparent text-white mix-blend-difference py-[18px]"
        }`}
      >
        {isScrolled && (
          <div
            className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: `radial-gradient(120px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.4), transparent 100%)`,
            }}
          />
        )}

        <div className="relative z-10 flex items-center gap-[10px] font-bold text-[18px] tracking-tight cursor-pointer">
          <span className="w-[14px] h-[14px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block"></span>
          wayfare
        </div>

        <div className="relative z-10 hidden md:flex items-center gap-2 text-[14px] font-bold">
          <div className="flex items-center gap-1">
            {navLinks.map((item) => (
              <Link 
                key={item.id}
                href={item.href} 
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-4 py-2 transition-colors rounded-full ${
                  isScrolled ? "text-[#0B2027]" : "text-white hover:text-[#FF6B35]"
                }`}
              >
                {hoveredItem === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${
                      isScrolled 
                        ? "bg-white/40 border border-white/30" 
                        : "bg-white/10 backdrop-blur-sm border border-white/10"
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <Link 
            href="/signup" 
            className={`ml-2 px-5 py-2.5 rounded-full transition-transform hover:scale-105 relative z-10 ${
              isScrolled 
                ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20" 
                : "bg-[#FF6B35] text-white"
            }`}
          >
            Start Planning
          </Link>

          <button className="relative z-10 flex flex-col justify-center items-center gap-[5px] w-8 h-8 ml-2 hover:opacity-70 transition-opacity">
            <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${isScrolled ? "bg-[#0B2027]" : "bg-white"}`}></span>
            <span className={`w-[14px] h-[2px] rounded-full transition-colors duration-500 ${isScrolled ? "bg-[#0B2027]" : "bg-white"}`}></span>
            <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${isScrolled ? "bg-[#0B2027]" : "bg-white"}`}></span>
          </button>
        </div>

        <button className="relative z-10 md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 hover:opacity-70 transition-opacity">
          <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${isScrolled ? "bg-[#0B2027]" : "bg-white"}`}></span>
          <span className={`w-[14px] h-[2px] rounded-full transition-colors duration-500 ${isScrolled ? "bg-[#0B2027]" : "bg-white"}`}></span>
          <span className={`w-5 h-[2px] rounded-full transition-colors duration-500 ${isScrolled ? "bg-[#0B2027]" : "bg-white"}`}></span>
        </button>
      </div>
    </nav>
  );
};

// --- 2. MAIN LANDING PAGE COMPONENT ---
export default function NomadFlowLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDest, setActiveDest] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const destCarouselRef = useRef<HTMLDivElement>(null);

  // --- COMBINED FLIGHT & DESTINATION REFS ---
  const flightSecRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const planeTrailRef = useRef<SVGPathElement>(null);
  const planeLayerRef = useRef<HTMLDivElement>(null);

  // --- FRAMER MOTION: HERO SCROLL ---
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const photoScale = useTransform(heroProgress, [0, 1], [1, 0.78]);
  const photoRadius = useTransform(heroProgress, [0, 1], ["0px", "46px"]);
  const copyOpacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const copyY = useTransform(heroProgress, [0, 0.5], ["0px", "-100px"]);
  
  const phoneOpacity = useTransform(heroProgress, [0.2, 0.6], [0, 1]);
  const phoneY = useTransform(heroProgress, [0.2, 1], ["80px", "0px"]);
  const phoneScale = useTransform(heroProgress, [0.2, 1], [0.85, 1]);

  // --- FRAMER MOTION: COMBINED FLIGHT + DESTINATIONS SCROLL ---
  const { scrollYProgress: flightProgress } = useScroll({
    target: flightSecRef,
    offset: ["start start", "end end"],
  });

  // h-[500vh] → scrollable = 400vh. Preserve original vh distances (based on 300vh section):
  // heading fade: 4vh→40vh = 0.01→0.10 of 400vh
  // sky overlay fade: 120vh→176vh = 0.30→0.44
  // dest reveal: 130vh→190vh = 0.325→0.475
  // dest cycling: 220vh→400vh (p=0.55→1.0), 4 dests × 45vh each
  const headingOpacity = useTransform(flightProgress, [0.01, 0.10], [1, 0]);
  const headingY       = useTransform(flightProgress, [0.01, 0.10], ["0px", "-50px"]);
  const overlayOpacity = useTransform(flightProgress, [0.30, 0.44], [1, 0]);
  const destBlur       = useTransform(flightProgress, [0.325, 0.475], ["blur(30px)", "blur(0px)"]);
  const destScale      = useTransform(flightProgress, [0.325, 0.475], [1.1, 1]);

  // Auto-advance destinations via scroll (p 0.55→1.0 = 220vh→400vh, 45vh per dest)
  useMotionValueEvent(flightProgress, "change", (p) => {
    if (p >= 0.55) {
      const newDest = Math.min(destinations.length - 1, Math.floor(((p - 0.55) / 0.45) * destinations.length));
      setActiveDest(newDest);
    }
  });

  // Sync carousel card whenever activeDest changes (from scroll or click)
  useEffect(() => {
    const container = destCarouselRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    const card = cards[activeDest];
    if (!card) return;
    container.scrollTo({
      left: card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [activeDest]);

  useEffect(() => {
    let trailLen = 0;
    const handleFlightScroll = () => {
      const stage = flightSecRef.current;
      const plane = planeRef.current;
      const trail = planeTrailRef.current;
      const planeLayer = planeLayerRef.current;
      if (!stage || !plane || !trail || !planeLayer) return;

      const total = stage.offsetHeight - window.innerHeight;
      const top = stage.getBoundingClientRect().top;
      const p = total > 0 ? Math.max(0, Math.min(1, -top / total)) : 0;

      if (!trailLen) trailLen = trail.getTotalLength();
      const svg = trail.ownerSVGElement;
      if (!svg) return;

      const W = svg.clientWidth;
      const H = svg.clientHeight;

      // Plane completes at 124vh of scroll (same as original 300vh section)
      // 124vh / 400vh total = 0.31
      const planeProg = Math.min(1, p / 0.31);

      const pt  = trail.getPointAtLength(planeProg * trailLen);
      const pt2 = trail.getPointAtLength(Math.min(trailLen, planeProg * trailLen + 1.5));

      const px = (pt.x / 1200) * W;
      const py = (pt.y / 700) * H;
      const dx = ((pt2.x - pt.x) / 1200) * W;
      const dy = ((pt2.y - pt.y) / 700) * H;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;

      plane.style.left = px + "px";
      plane.style.top = py + "px";
      plane.style.transform = `translate(-50%,-50%) rotate(${ang}deg)`;

      trail.style.strokeDasharray = trailLen.toString();
      trail.style.strokeDashoffset = (trailLen * (1 - planeProg)).toString();

      // Fade plane at 104vh→130vh of scroll = 0.26→0.325 of 400vh
      const layerOpacity = p < 0.26 ? 1 : Math.max(0, 1 - (p - 0.26) / 0.065);
      planeLayer.style.opacity = layerOpacity.toString();
    };
    window.addEventListener("scroll", handleFlightScroll, { passive: true });
    window.addEventListener("resize", handleFlightScroll);
    handleFlightScroll();
    return () => {
      window.removeEventListener("scroll", handleFlightScroll);
      window.removeEventListener("resize", handleFlightScroll);
    };
  }, []);

  // --- FRAMER MOTION: STICKY STORY SCROLL ---
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(storyProgress, "change", (v) => {
    if (v < 0.33) {
      setActiveStep(0);
    } else if (v < 0.66) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  const carouselScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // --- ΕΞΥΠΝΟ SCROLL CAROUSEL (Κεντράρει πάντα την κάρτα) ---
  const scrollToDest = (index: number) => {
    setActiveDest(index);
    if (destCarouselRef.current) {
      const container = destCarouselRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards[index]) {
        const card = cards[index];
        const containerWidth = container.offsetWidth;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        
        container.scrollTo({
          left: cardLeft - containerWidth / 2 + cardWidth / 2,
          behavior: "smooth"
        });
      }
    }
  };

  const handleDestScroll = () => {
    if (!destCarouselRef.current) return;
    const container = destCarouselRef.current;
    const scrollLeft = container.scrollLeft;
    const containerCenter = scrollLeft + container.offsetWidth / 2;
    
    let closestIndex = activeDest;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeDest) {
      setActiveDest(closestIndex);
    }
  };

  return (
    <main className="bg-[#F3EFE6] text-gray-900 font-sans w-full">
      <Navbar />

      {/* --- SECTION 1: HERO ZOOM OUT & PHONE REVEAL --- */}
      <section ref={heroRef} className="relative h-[230vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          
          <motion.div 
            style={{ scale: photoScale, borderRadius: photoRadius }}
            className="absolute inset-0 w-full h-full origin-center overflow-hidden bg-[#0c3543] shadow-[0_30px_70px_-22px_rgba(7,20,25,0.6)] z-0"
          >
            <div className="absolute inset-0 bg-[#071419]/45 z-10" />
            <img 
              src="https://img.magnific.com/free-photo/person-traveling-enjoying-their-vacation_23-2151383050.jpg?t=st=1781893352~exp=1781896952~hmac=f3489fdfc724d5430d28b3267f6305f763687ca784c2a5f33c2eca937ec306eb&w=1480" 
              alt="Hero Background" 
              className="w-full h-full object-cover" 
            />

            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-40 text-white text-[11px] tracking-[0.18em] uppercase font-semibold flex flex-col items-center gap-[8px] opacity-85">
              Scroll <span className="w-[1px] h-[40px] bg-gradient-to-b from-white to-transparent animate-[pulse_2s_infinite]" />
            </div>
          </motion.div>

          <motion.div 
            style={{ opacity: copyOpacity, y: copyY }}
            className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center"
          >
            <div className="flex gap-3 mb-6">
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">✨ 20,000+ Secret Spots</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              One travel app for <br /> all your adventures
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 drop-shadow-md">
              Join the travelers who plan, track, and relive their trips with NomadFlow. Bypass tourist traps forever.
            </p>
            <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(255,107,53,0.3)]">
              Start Planning
            </button>
          </motion.div>

          <motion.div 
            style={{ opacity: phoneOpacity, y: phoneY, scale: phoneScale }}
            className="absolute z-30 w-[280px] h-[580px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 md:mt-0"
          >
             <div className="w-full h-full bg-[#0c2630] border-[9px] border-[#06161c] rounded-[42px] shadow-2xl p-[13px] relative">
               <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-[#06161c] rounded-b-[16px] z-50"></div>
               
               <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#133A4A] relative">
                  <svg className="absolute inset-0 w-full h-full text-[#FF6B35]" viewBox="0 0 280 570" fill="none">
                    <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,8" d="M 120 480 C 180 400, 70 320, 150 280 S 230 200, 180 120" />
                    <circle cx="120" cy="480" r="5" fill="#fff"/>
                    <circle cx="150" cy="280" r="5" fill="#fff"/>
                    <circle cx="180" cy="120" r="5" fill="#fff"/>
                  </svg>
                  
                  <div className="absolute bottom-[40px] left-4 right-4 bg-[#F8F9FA] rounded-[16px] p-4 shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-lg shadow-sm">M</div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-[14px] leading-tight mb-1">8 days in Portugal</h3>
                      <p className="text-[11px] text-gray-500 font-semibold">Maria · Lisbon → Porto</p>
                    </div>
                  </div>
               </div>
             </div>
          </motion.div>

        </div>
      </section>

      {/* --- SECTION 2: INTERACTIVE STICKY PHONE SCROLL STORY --- */}
      <section ref={storyRef} className="relative h-[300vh] bg-[#F3EFE6]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center w-full">
          
          {/* ΓΙΓΑΝΤΙΑΙΕΣ ΛΕΞΕΙΣ ΦΟΝΤΟΥ */}
          <div className="absolute inset-0 flex items-center justify-start pl-[2vw] pointer-events-none z-0 overflow-hidden">
            <div className={`absolute text-[20vw] font-black tracking-tighter text-[#0B2027]/[0.03] select-none uppercase font-mono transition-all duration-1000 whitespace-nowrap ${activeStep === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              DISCOVER
            </div>
            <div className={`absolute text-[24vw] font-black tracking-tighter text-[#0B2027]/[0.03] select-none uppercase font-mono transition-all duration-1000 whitespace-nowrap ${activeStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              SAVE
            </div>
            <div className={`absolute text-[24vw] font-black tracking-tighter text-[#0B2027]/[0.03] select-none uppercase font-mono transition-all duration-1000 whitespace-nowrap ${activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              COPY
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Αριστερά Κείμενα */}
              <div className="relative h-[350px]">
                {/* STEP 1: DISCOVER */}
                <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${activeStep === 0 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-6 pointer-events-none z-0"}`}>
                  <div className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">DISCOVER</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight mb-6 leading-tight">Find a real trip</h2>
                  <p className="text-lg text-gray-500 max-w-xl">Browse day-by-day itineraries from travellers who actually went.</p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-10 h-2 rounded-full bg-[#FF6B35]" />
                    <div className="w-6 h-2 rounded-full bg-gray-300" />
                    <div className="w-6 h-2 rounded-full bg-gray-300" />
                  </div>
                </div>

                {/* STEP 2: SAVE */}
                <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${activeStep === 1 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-6 pointer-events-none z-0"}`}>
                  <div className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">SAVE</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight mb-6 leading-tight">Keep the ones you love</h2>
                  <p className="text-lg text-gray-500 max-w-xl">Bookmark itineraries and build your own shortlist for the trip you&apos;re planning.</p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-6 h-2 rounded-full bg-gray-300" />
                    <div className="w-10 h-2 rounded-full bg-[#FF6B35]" />
                    <div className="w-6 h-2 rounded-full bg-gray-300" />
                  </div>
                </div>

                {/* STEP 3: COPY */}
                <div className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center ${activeStep === 2 ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-6 pointer-events-none z-0"}`}>
                  <div className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">COPY</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B2027] tracking-tight mb-6 leading-tight">Make it your own</h2>
                  <p className="text-lg text-gray-500 max-w-xl">Copy any itinerary into your own draft in one tap, then tweak every day.</p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-6 h-2 rounded-full bg-gray-300" />
                    <div className="w-6 h-2 rounded-full bg-gray-300" />
                    <div className="w-10 h-2 rounded-full bg-[#FF6B35]" />
                  </div>
                </div>
              </div>

              {/* Δεξιά Κινητό + Bento Blur Glass Background */}
              <div className="flex justify-center relative items-center w-full h-[640px]">
                <div className="absolute inset-0 bg-[#0B2027]/5 backdrop-blur-xl rounded-[3.5rem] transform scale-110 -z-10 border border-[#0B2027]/10 shadow-inner" />

                <div className="relative w-[300px] h-[600px]">
                  <div className="absolute inset-0 bg-[#0B2027] rounded-[3rem] border-[8px] border-[#0B2027] shadow-2xl p-2.5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0B2027] rounded-b-2xl z-50" />
                    
                    <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-[#F3EFE6]">

                      {/* SCREEN 1: DISCOVER FEED */}
                      <div className={`absolute inset-0 bg-[#F3EFE6] p-4 pt-14 transition-all duration-700 flex flex-col gap-4 ${activeStep === 0 ? "opacity-100 scale-100 z-30" : "opacity-0 scale-95 pointer-events-none z-0"}`}>
                        
                        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#5294A6]"></div>
                          <div>
                            <div className="font-bold text-sm text-[#0B2027] mb-1.5">8 days in Portugal</div>
                            <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#E4531F]"></div>
                          <div>
                            <div className="font-bold text-sm text-[#0B2027] mb-1.5">Tokyo in a week</div>
                            <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#4A7766]"></div>
                          <div>
                            <div className="font-bold text-sm text-[#0B2027] mb-1.5">Patagonia road trip</div>
                            <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                          </div>
                        </div>

                      </div>

                      {/* SCREEN 2 & 3: DETAILED TRIP CARD */}
                      <div className={`absolute inset-0 bg-[#F3EFE6] p-4 pt-12 transition-all duration-700 ${activeStep >= 1 ? "opacity-100 scale-100 z-30" : "opacity-0 scale-95 pointer-events-none z-0"}`}>
                        <div className="w-full h-full bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col relative">
                          
                          {/* Map Header */}
                          <div className="h-[140px] relative bg-gradient-to-br from-[#1d6076] to-[#0c3543] w-full overflow-hidden shrink-0">
                            <svg className="absolute inset-0 w-full h-full text-[#FF6B35]" viewBox="0 0 280 150" fill="none">
                              <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5,6" d="M 30 120 Q 90 90, 150 100 T 250 40" />
                              <circle cx="30" cy="120" r="4" fill="#fff"/>
                              <circle cx="150" cy="100" r="4" fill="#fff"/>
                              <circle cx="250" cy="40" r="4" fill="#fff"/>
                            </svg>
                            <div className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                Saved
                            </div>
                            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                8 days
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-4 flex flex-col flex-1 pb-6">
                            
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-[#E4531F] text-white flex items-center justify-center font-bold text-sm shrink-0">M</div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[13px] font-extrabold text-[#0B2027]">Maria</span>
                                    <span className="text-[10px] text-gray-400 font-medium">Lisbon → Porto</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-extrabold text-[#0B2027] text-left mb-3">8 days in Portugal</h3>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {['Day 1', 'Day 2', 'Day 3', '+5'].map(tag => (
                                    <span key={tag} className="bg-[#EAF0F2] text-[#4A5B63] text-[10px] font-bold px-3 py-1.5 rounded-full">{tag}</span>
                                ))}
                            </div>

                            {/* Buttons Area */}
                            <div className="mt-auto flex flex-col gap-3">
                                <div className="flex gap-2 w-full">
                                    {/* SAVE BUTTON */}
                                    <button className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all duration-500 ${activeStep === 1 ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg shadow-orange-500/30' : 'bg-white border-gray-200 text-[#0B2027]'}`}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                                        Save
                                    </button>
                                    
                                    {/* COPY BUTTON */}
                                    <button className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all duration-500 ${activeStep === 2 ? 'bg-[#0B2027] border-[#0B2027] text-white shadow-lg shadow-slate-800/30' : 'bg-white border-gray-200 text-[#0B2027]'}`}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                                        Copy
                                    </button>
                                </div>

                                {/* SUCCESS MESSAGE */}
                                <div className={`overflow-hidden transition-all duration-500 ${activeStep === 2 ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
                                    <div className="w-full bg-[#FFF4F0] border border-dashed border-[#FF6B35]/40 rounded-xl p-3 text-center">
                                        <span className="text-[10px] font-bold text-[#E4531F] leading-tight block">Saved to your trips · Draft<br/>ready to edit</span>
                                    </div>
                                </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: COMBINED FLIGHT + DESTINATIONS --- */}
      <section ref={flightSecRef} className="relative h-[500vh] z-20 bg-[#0B2027]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

          {/* LAYER 1: Destinations (revealed after plane exits) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ filter: destBlur, scale: destScale }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeDest}
                src={destinations[activeDest].bgImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 pointer-events-none" />

            <div className="relative z-20 max-w-7xl mx-auto w-full h-full px-6 flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2 flex flex-col relative mt-20 md:mt-0">
                <div className="absolute -left-8 md:-left-12 top-0 bottom-0 flex-col items-center justify-between py-2 hidden md:flex">
                  <div className="w-[1px] h-[30%] bg-white/30"></div>
                  <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white text-xs font-bold backdrop-blur-md shadow-lg">
                    {activeDest + 1}
                  </div>
                  <div className="w-[1px] h-[30%] bg-white/30"></div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col"
                  >
                    <h2 className="text-6xl md:text-[7rem] font-black text-white leading-none tracking-tighter mb-6 drop-shadow-2xl uppercase">
                      {destinations[activeDest].country}
                    </h2>
                    <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed mb-10 drop-shadow-md">
                      {destinations[activeDest].description}
                    </p>
                    <button className="bg-[#FF6B35] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_10px_20px_rgba(255,107,53,0.3)] w-max">
                      Explore
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
                <div
                  ref={destCarouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-4 px-[5vw] md:px-[10vw]"
                  onScroll={handleDestScroll}
                >
                  {destinations.map((dest, i) => (
                    <div
                      key={dest.id}
                      onClick={() => scrollToDest(i)}
                      className={`min-w-[260px] h-[360px] rounded-[2rem] overflow-hidden relative snap-center shrink-0 cursor-pointer transition-all duration-500 border border-white/20 select-none ${
                        activeDest === i
                          ? 'scale-100 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20'
                          : 'scale-90 opacity-60 hover:opacity-100 z-10'
                      }`}
                    >
                      <img src={dest.thumb} alt={dest.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-sm">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                        <div className="flex gap-1.5 mb-3">
                          {destinations.map((_, dotIdx) => (
                            <div key={dotIdx} className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === activeDest && activeDest === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}></div>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold leading-tight mb-1">{dest.title}</h3>
                        <p className="text-[10px] uppercase tracking-widest font-semibold text-white/70">{dest.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-2 md:-bottom-6 right-4 flex gap-4 z-30">
                  <button onClick={() => {
                    const newIdx = activeDest === 0 ? destinations.length - 1 : activeDest - 1;
                    setActiveDest(newIdx);
                    destCarouselRef.current?.scrollTo({ left: newIdx * 284, behavior: 'smooth' });
                  }} className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 active:scale-95 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] border border-white/20 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:border-white/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button onClick={() => {
                    const newIdx = (activeDest + 1) % destinations.length;
                    setActiveDest(newIdx);
                    destCarouselRef.current?.scrollTo({ left: newIdx * 284, behavior: 'smooth' });
                  }} className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 active:scale-95 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[150%] border border-white/20 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:border-white/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LAYER 2: Sky overlay (fades out after plane exits, z-20) */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex flex-col items-center z-20"
            style={{
              opacity: overlayOpacity,
              background: "linear-gradient(to bottom, #F3EFE6 0%, #F4F5F6 40%, #F4F5F6 100%)"
            }}
          >
            {/* Clouds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[
                { top: "15%", left: "8%", w: "180px", op: 0.6 },
                { top: "25%", left: "30%", w: "120px", op: 0.4 },
                { top: "10%", left: "65%", w: "200px", op: 0.5 },
                { top: "40%", left: "80%", w: "140px", op: 0.35 },
                { top: "55%", left: "15%", w: "100px", op: 0.3 },
              ].map((c, i) => (
                <svg key={i} className="absolute" style={{ top: c.top, left: c.left, width: c.w, opacity: c.op }} viewBox="0 0 200 80" fill="none">
                  <ellipse cx="100" cy="55" rx="90" ry="25" fill="white" />
                  <ellipse cx="70" cy="45" rx="50" ry="30" fill="white" />
                  <ellipse cx="130" cy="48" rx="45" ry="28" fill="white" />
                  <ellipse cx="100" cy="40" rx="55" ry="32" fill="white" />
                </svg>
              ))}
            </div>

            {/* Section Heading */}
            <motion.div
              className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center z-10"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              <p className="text-xs font-bold text-[#FF6B35] tracking-[0.25em] uppercase mb-3">EXPLORE THE WORLD</p>
              <h2 className="text-4xl md:text-6xl font-black text-[#0B2027] tracking-tight leading-tight">
                Where will you<br />go next?
              </h2>
            </motion.div>
          </motion.div>

          {/* LAYER 3: Plane layer (z-30, fades imperatively) */}
          <div ref={planeLayerRef} className="absolute inset-0 pointer-events-none z-30">
            <svg
              viewBox="0 0 1200 700"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Invisible guide path */}
              <path
                id="flight-guide"
                d="M -80 560 C 100 520, 200 400, 350 320 S 520 200, 650 180 S 850 200, 1000 160 S 1150 120, 1350 80"
                fill="none"
                stroke="transparent"
              />
              {/* Orange trail */}
              <path
                ref={planeTrailRef}
                d="M -80 560 C 100 520, 200 400, 350 320 S 520 200, 650 180 S 850 200, 1000 160 S 1150 120, 1350 80"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8,10"
                style={{ strokeDashoffset: 9999 }}
              />
            </svg>

            {/* Plane graphic */}
            <div
              ref={planeRef}
              className="absolute"
              style={{ left: "-80px", top: "560px", transform: "translate(-50%,-50%) rotate(0deg)" }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <filter id="plane-shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0B2027" floodOpacity="0.25" />
                </filter>
                <g filter="url(#plane-shadow)">
                  <path
                    d="M54 28L38 22L34 8C33.5 6.5 31.5 6.5 31 8L27 22L10 28C8.5 28.5 8.5 30.5 10 31L27 37L28 52C28 53.5 30 54.5 31.5 53.5L34 48L36.5 53.5C38 54.5 40 53.5 40 52L41 37L58 31C59.5 30.5 59.5 28.5 58 28H54Z"
                    fill="#FF6B35"
                  />
                  <path d="M32 10L32 54" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: MASONRY BENTO GRID --- */}
      <section className="py-32 bg-[#F8F9FA] px-6 border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] mb-12 text-center tracking-tight">
            And the best part...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 bg-[#001621] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-md">
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Full privacy control</h3>
                <p className="text-gray-400 text-lg">You decide who can see your trip</p>
              </div>
              <div className="relative z-10 flex bg-[#00293D] rounded-full p-1 shadow-inner border border-white/5">
                <span className="bg-[#001621] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-2">
                  <span className="text-[#00DB9A]">🌍</span> The entire world
                </span>
                <span className="text-white/50 px-5 py-2 rounded-full text-xs font-medium hover:text-white transition-colors cursor-pointer">
                  Only you
                </span>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-8 flex items-center justify-center text-center shadow-md border border-gray-100">
              <h3 className="text-4xl md:text-5xl font-black text-[#00293D] tracking-tighter -rotate-3 font-mono">
                IT&apos;S FREE!
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-10 h-[280px] flex flex-col items-center justify-center shadow-md border border-gray-100">
                <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-8">Featured in:</p>
                <div className="flex flex-col gap-6 items-center w-full opacity-95">
                  <span className="text-3xl font-serif font-bold text-[#00293D]">Forbes</span>
                  <span className="text-xl font-serif font-black tracking-tight text-[#00293D]">🎒 Traveler</span>
                  <span className="text-2xl font-sans font-black tracking-widest text-[#00293D]">W I R E D</span>
                </div>
              </div>
              <div className="bg-[#001621] rounded-[2rem] p-8 flex-1 min-h-[140px] flex items-center justify-center relative overflow-hidden shadow-md">
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center"></div>
                <h3 className="text-2xl font-bold text-white leading-tight relative z-10 text-center">By travelers,<br/> for travelers</h3>
              </div>
            </div>
            <div className="bg-gray-200 rounded-[2rem] min-h-[380px] md:min-h-[450px] relative overflow-hidden shadow-sm group">
              <img src="https://images.unsplash.com/photo-1522199710521-72d69614c71c?auto=format&fit=crop&w=800&q=80" alt="Works offline climber" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001621]/95 via-[#001621]/30 to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center px-6">
                <h3 className="text-3xl font-bold text-white mb-2">Works offline</h3>
                <p className="text-gray-300 text-sm">Keeps tracking — even when you&apos;re offgrid</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-[#2E4C43] rounded-[2rem] p-8 h-[300px] flex flex-col items-center justify-start text-center shadow-md relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-2 z-10">Battery-efficient</h3>
                <p className="text-white/60 text-xs mb-8 z-10 px-2 leading-relaxed">Typically less than 4% battery per day while tracking</p>
                <div className="absolute bottom-[-20px] w-32 h-44 border-[4px] border-white/10 rounded-2xl flex flex-col justify-end p-1.5 bg-black/10 backdrop-blur-sm relative">
                    <div className="bg-gradient-to-t from-[#00DB9A] to-[#26f5b9] w-full h-[96%] rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(0,219,154,0.25)]">
                      <span className="text-[#00293D] font-black tracking-tight text-xl">96%</span>
                    </div>
                </div>
              </div>
              <div className="bg-[#F11F4C] rounded-[2rem] p-8 flex-1 min-h-[140px] flex items-center justify-between shadow-md hover:scale-[1.01] transition-transform cursor-pointer">
                <h3 className="text-2xl font-bold text-white leading-tight">Proudly ad-free</h3>
                <span className="text-4xl text-white border-2 border-white/20 rounded-full w-14 h-14 flex items-center justify-center bg-white/10">👋</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: REVIEWS SECTION --- */}
      <section className="bg-gradient-to-b from-white via-white to-transparent pt-32 pb-10 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] tracking-tight">
          Loved by <br /> explorers everywhere
        </h2>

        <div className="relative w-full max-w-7xl mx-auto px-6 mt-16">
          <button onClick={() => carouselScroll("left")} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 bg-[#001621] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❮</button>
          <button onClick={() => carouselScroll("right")} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 bg-[#001621] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl font-bold active:scale-95 transition-transform">❯</button>

          <div 
            ref={sliderRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none px-[5%] md:px-[15%] py-4 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Perfect for tracking trips</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">CONOR, MARCH 9 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
                    I love this app! It&apos;s perfect for tracking trips and I&apos;ve ordered a few of the travel books which are very good quality and really nice.
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">See where you&apos;ve been</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">MARCUS, FEB 22 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
                    It tracks where you&apos;ve been during the day and you can add your photos and comments later. Great to look back on over the years.
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-lg overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" alt="Alex" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001621]/90 via-[#001621]/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold text-white">AH</div>
                <div><p className="text-xs font-bold text-white">Alex Hubin</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Adventurer</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
            </div>

            <div className="flex flex-col gap-6 min-w-[280px] md:min-w-[320px] h-[460px] justify-between snap-center text-left">
              <div className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Easy to use</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">RACHEL, MARCH 15 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
                    I&apos;ve been using this app for several trips now. Easy peasy to use. Shared it with family and friends who are using this app as well now.
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-[2rem] p-6 h-[218px] shadow-sm flex flex-col justify-between border border-gray-100">
                <div>
                  <h4 className="text-sm font-bold text-[#00293D] mb-1">Stops me wasting time</h4>
                  <p className="text-[9px] font-bold text-gray-400 mb-2">DEBORAH, MARCH 19 2026</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
                    Just completed a 4 month trip using NomadFlow. Totally love it, stops me wasting time private messaging people about what we are doing!
                  </p>
                </div>
                <div className="text-[#FF6B35] text-[10px]">⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[460px] shadow-lg overflow-hidden snap-center group text-left">
              <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" alt="Leoni" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001621]/90 via-[#001621]/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00DB9A] text-[#001621] flex items-center justify-center text-xs font-bold">LK</div>
                <div><p className="text-xs font-bold text-white">Leoni Kolberg</p><p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Solo Cyclist</p></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-xl border border-white/30 cursor-pointer transition-transform group-hover:scale-110">▶</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: OUTRO / MOUNTAIN FOOTER --- */}
      <div className="relative bg-[#000A0F] overflow-hidden -mt-[400px] pt-[400px] z-10">
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
            alt="Mountain range" 
            className="w-full h-full object-cover object-top opacity-80 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000A0F]/90 to-[#001621]" />
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