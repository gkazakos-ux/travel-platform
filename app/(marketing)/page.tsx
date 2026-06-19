"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- 1. PHONE MOCKUP COMPONENT ---
const PhoneMockup = ({ activeStep }: { activeStep: number }) => {
  const screens = [
    "https://img.magnific.com/free-photo/man-standing-rock-near-lake_410324-106.jpg?t=st=1781893523~exp=1781897123~hmac=c5ea977ab736d2ad0d24a69651903adb2485c15233c4f2e605c850bf667b7e96&w=1480",
    "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <div className="relative w-[300px] md:w-[340px] h-[600px] md:h-[700px] bg-white rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden flex flex-col">
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
        <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
      </div>
      <div className="relative w-full h-full bg-gray-100">
        {screens.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Screen ${index}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeStep === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl overflow-hidden border border-orange-200">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Emma Miller</p>
              <p className="text-[10px] text-[#FF6B35] font-bold uppercase tracking-wider">Backpacking Asia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. NAVBAR COMPONENT ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 text-gray-900 shadow-sm" 
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tighter">
          NomadFlow
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold drop-shadow-sm">
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Explore</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">How it works</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold hover:text-[#FF6B35] transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform">
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- 3. REVIEWS & SLIDER SECTION (WITH TRUE POLARSTEPS OVERLAP) ---
const ReviewsSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.4 : scrollLeft + clientWidth * 0.4;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 bg-[#F8F9FA] z-20 overflow-visible">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00293D] tracking-tight">
          Loved by <br /> explorers everywhere
        </h2>
      </div>

      <div className="relative w-full overflow-visible">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll("left")}
          className="absolute left-4 md:left-12 top-[35%] -translate-y-1/2 z-40 bg-[#00293D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl active:scale-95"
        >
          ❮
        </button>
        <button 
          onClick={() => scroll("right")}
          className="absolute right-4 md:right-12 top-[35%] -translate-y-1/2 z-40 bg-[#00293D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl active:scale-95"
        >
          ❯
        </button>

        {/* Carousel Track */}
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory px-[10%] md:px-[25%] py-4 overflow-visible relative z-30"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
          }}
        >
          {/* Card 1 */}
          <div className="bg-white rounded-[2rem] p-8 min-w-[280px] md:min-w-[320px] h-[340px] shadow-lg border border-gray-100 flex flex-col justify-between snap-center">
            <div>
              <h4 className="text-lg font-bold text-[#00293D] mb-1">Perfect for tracking</h4>
              <p className="text-xs font-semibold text-gray-400 mb-3">CONOR, MARCH 9 2026</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                I love this app! It's perfect for tracking trips and I've ordered a few of the travel books which are very good quality.
              </p>
            </div>
            <div className="text-orange-400 text-xs">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Card 2: Video (Alex Hubin) */}
          <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[340px] shadow-lg overflow-hidden snap-center group">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" alt="Alex" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">AH</div>
              <div>
                <p className="text-xs font-bold text-white">Alex Hubin</p>
                <p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Adventurer</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-lg border border-white/30 cursor-pointer">▶</span>
            </div>
            <span className="absolute bottom-4 left-6 text-[9px] font-black tracking-widest text-white/50 uppercase">Pioneers</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[2rem] p-8 min-w-[280px] md:min-w-[320px] h-[340px] shadow-lg border border-gray-100 flex flex-col justify-between snap-center">
            <div>
              <h4 className="text-lg font-bold text-[#00293D] mb-1">Easy to use</h4>
              <p className="text-xs font-semibold text-gray-400 mb-3">RACHEL, MARCH 15 2026</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                I've been using this app for several trips now. Easy peasy to use. Shared it with family and friends who are using it as well.
              </p>
            </div>
            <div className="text-orange-400 text-xs">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[2rem] p-8 min-w-[280px] md:min-w-[320px] h-[340px] shadow-lg border border-gray-100 flex flex-col justify-between snap-center">
            <div>
              <h4 className="text-lg font-bold text-[#00293D] mb-1">Stops me wasting time</h4>
              <p className="text-xs font-semibold text-gray-400 mb-3">DEBORAH, MARCH 19 2026</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Just completed a 4 month trip using NomadFlow. Totally love it, stops me wasting time private messaging people about what we are doing!
              </p>
            </div>
            <div className="text-orange-400 text-xs">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Card 5: Video (Leoni Kolberg) */}
          <div className="relative rounded-[2rem] min-w-[280px] md:min-w-[320px] h-[340px] shadow-lg overflow-hidden snap-center group">
            <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" alt="Leoni" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">LK</div>
              <div>
                <p className="text-xs font-bold text-white">Leoni Kolberg</p>
                <p className="text-[9px] text-white/60 uppercase font-black tracking-wider">Solo Cyclist</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center text-lg border border-white/30 cursor-pointer">▶</span>
            </div>
            <span className="absolute bottom-4 left-6 text-[9px] font-black tracking-widest text-white/50 uppercase">Pioneers Shorts</span>
          </div>
        </div>
      </div>

      {/* --- ΑΥΤΟ ΕΙΝΑΙ ΤΟ ΜΥΣΤΙΚΟ: ΤΟ ΔΙΑΓΩΝΙΟ SVG ΑΠΟ ΤΟΝ ΚΩΔΙΚΑ ΣΟΥ --- */}
      <div className="w-full overflow-hidden line-height-0 relative z-10 mt-12 bg-transparent">
        <svg viewBox="0 0 100 5" preserveAspectRatio="none" width="100%" height="60" style={{ display: "block", transform: "scale(-1, 1)" }}>
          <polygon points="-1,0 0,5 101,5" fill="#000A0F"></polygon>
        </svg>
      </div>
    </section>
  );
};

// --- 4. THE TRUE TRAVEL FOOTER COMPONENT ---
const Footer = () => {
  return (
    /* mt-[-5px] για να "κλειδώσει" πάνω στο διαγώνιο SVG χωρίς κενά */
    <footer className="relative bg-[#000A0F] text-white pt-20 pb-16 overflow-hidden mt-[-5px] z-10">
      
      {/* Η εικόνα των βουνών όπως ακριβώς ορίστηκε στον κώδικα της Framer */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <img 
          src="https://framerusercontent.com/images/bM3zU8ikfSHFLRniHcb1d8qGW8.jpg" 
          alt="Mountain range" 
          className="w-full h-full object-cover object-center"
        />
        {/* Σκούρο gradient για να σβήνει ομαλά και να διαβάζονται τα λευκά γράμματα */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000A0F]/80 via-[#000A0F]/40 to-[#001621]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Το κείμενο και το κουμπί ακριβώς όπως το screenshot */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight max-w-2xl leading-tight mb-8 drop-shadow-md">
          Join 20M+ explorers by downloading Polarsteps today!
        </h2>
        
        {/* Το centered κουμπί "Get the app" με το icon */}
        <button className="bg-white text-[#00111A] font-bold px-7 py-3.5 rounded-xl shadow-xl transition-all flex items-center gap-3 mb-32 hover:scale-105 group text-sm">
          <span className="w-5 h-5 rounded-md bg-gradient-to-b from-[#FC1547] to-[#FE4367] flex items-center justify-center text-[10px] text-white font-bold">
            🧭
          </span>
          Get the app
        </button>

        {/* Links Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 pb-16 mb-12 text-left">
           <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">Get Started</h4>
              <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Get the app</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Log in</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">About</h4>
              <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">About us</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">News & press</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Stories</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">Features</h4>
              <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Travel Planner</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">AI Trip Planner</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Travel Tracker</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Travel Books</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#527585] mb-5 uppercase">Help & Support</h4>
              <ul className="space-y-3.5 text-sm font-medium text-gray-300">
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Contact us</Link></li>
              </ul>
           </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium text-[#527585]">
          <p>© 2026 NomadFlow. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
