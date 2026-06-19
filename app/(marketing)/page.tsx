"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Advanced Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold text-[#FF6B35] tracking-tighter">
            NomadFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Explore</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">How it works</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Community</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-gray-900 px-4 py-2 hover:text-[#FF6B35] transition">Log In</Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95">
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden bg-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold mb-6">
            📍 Over 20,000 secret spots shared
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Explore the world <br />
            <span className="text-[#FF6B35]">like a local.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0">
            Skip generic tourist traps. Discover hidden restaurants, viewpoints, and photo spots curated by real travelers. Follow experts, save custom maps, and never get lost.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="/signup" className="bg-[#FF6B35] text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-orange-200 hover:-translate-y-1 hover:scale-105 transition-all active:scale-95 text-lg">
              Find Your Next Destination ➔
            </Link>
          </div>
        </motion.div>
        
        {/* PREMIUM VISUAL: INTERACTIVE APP MOCKUP LIKE POLARSTEPS */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Main App Canvas Backdrop */}
          <div className="relative w-full max-w-[450px] h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 group">
            <img 
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80" 
              alt="Travel background" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Animated Floating App Card Inside */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 inset-x-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white flex items-center gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" 
                alt="Spot Avatar" 
                className="w-16 h-16 rounded-xl object-cover shadow"
              />
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-[#FF6B35] bg-orange-50 px-2 py-0.5 rounded">Secret Beach</span>
                <h4 className="text-sm font-bold text-gray-900 mt-1">Kelingking Hideout, Bali</h4>
                <p className="text-xs text-gray-400 mt-0.5">Pinned by @travel_pro</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialMarquee = () => {
  const destinations = [
    { name: "Kyoto, Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80" },
    { name: "Rome, Italy", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80" },
    { name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=300&q=80" },
    { name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" },
    { name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <section className="py-12 bg-[#F8F9FA] overflow-hidden border-y border-gray-100">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-8 px-4"
        >
          {[...destinations, ...destinations].map((dest, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm pr-6 min-w-[240px]">
              <img src={dest.img} alt={dest.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Trending Guide</p>
                <p className="text-sm font-extrabold text-gray-900">{dest.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Find Trusted Travelers", desc: "Follow creators whose travel tastes match yours. See their real pinned paths." },
    { num: "02", title: "Unlock Unmapped Spots", desc: "Access high-res photo coords, local restaurant reviews, and hidden entry ways." },
    { num: "03", title: "Build Your Safe Guide", desc: "Bookmark cards to your dashboard. Access maps offline when trekking off the grid." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Step-by-step</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Turn screens into steps</h2>
      </div>
      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {steps.map((step, idx) => (
          <motion.div key={idx} variants={fadeInUp} className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <span className="text-6xl font-black text-orange-100/70 absolute top-4 right-6 group-hover:scale-110 transition-transform">{step.num}</span>
            <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const BentoFeatures = () => {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Explore App</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Built for cinematic discovery.</h2>
      </div>

      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* CARD 1: BACKGROUND PHOTO INTEGRATION */}
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01 }} className="md:col-span-2 group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-[400px] cursor-pointer">
          <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1000&q=80" alt="Map View" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
          <div className="relative z-10 p-10 max-w-md">
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-xl font-bold">📍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Visual Smart Maps</h3>
            <p className="text-gray-500">See pins directly overlaid on stunning terrain layouts. Filter by cafes, dramatic lookouts, or historical architecture in one tap.</p>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-[400px] cursor-pointer relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80" alt="AI search" className="absolute bottom-0 right-0 w-full h-1/2 object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-xl font-bold">✨</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">AI Filtered Search</h3>
          <p className="text-gray-500">Query exact terms like "hidden sunset balconies in Amalfi" and see verified user logs instantly.</p>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-[400px] cursor-pointer">
          <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-xl font-bold">👥</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Verified Profiles</h3>
          <p className="text-gray-500">Check passports of verified travelers. Review their past tracks, follow their logs, and build your circle.</p>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01 }} className="md:col-span-2 group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-[400px] relative overflow-hidden cursor-pointer">
           <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80" alt="Collections" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" />
           <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 h-full">
              <div>
                <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-xl font-bold">💾</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Curated Collections</h3>
                <p className="text-gray-500">Sort entries into custom visual folders. Keep breakfast options, hikes, or hotel nodes fully synchronized.</p>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CreatorShowcase = () => {
  const creators = [
    { name: "Elena Rostova", location: "Milos, Greece", tags: "Beaches", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
    { name: "Marcus Vance", location: "Kyoto, Japan", tags: "Food & Cafes", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1e?auto=format&fit=crop&w=400&q=80" },
    { name: "Siddharth M.", location: "Manali, India", tags: "Trekking", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">The Community</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Meet your next local guides</h2>
      </div>
      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {creators.map((creator, idx) => (
          <motion.div key={idx} variants={fadeInUp} className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-xl shadow-gray-100/40 flex flex-col justify-between h-[420px] group">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
              <img src={creator.img} alt={creator.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute bottom-3 left-3 text-[10px] font-black tracking-widest uppercase text-white bg-[#FF6B35] px-3 py-1 rounded-full">{creator.tags}</span>
            </div>
            <div className="px-2">
              <h4 className="text-xl font-extrabold text-gray-900">{creator.name}</h4>
              <p className="text-sm text-gray-400 mt-1">Expert guide in <span className="text-gray-700 font-medium">{creator.location}</span></p>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-3 bg-[#F8F9FA] hover:bg-orange-50 hover:text-[#FF6B35] rounded-xl text-xs font-bold text-gray-700 transition-all">View Map</button>
              <button className="py-3 px-5 bg-[#FF6B35] text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all">Follow</button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Pricing Plans</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Transparent pricing for real nomads</h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Explorer</h3>
            <p className="text-gray-400 text-sm mb-6">Uncover lists and explore tracks.</p>
            <div className="text-4xl font-black text-gray-900 mb-6">$0 <span className="text-sm font-normal text-gray-400">/ forever</span></div>
            <ul className="space-y-4 text-sm text-gray-600 mb-8">
              <li>✓ Follow up to 15 travel guides</li>
              <li>✓ Interactive dashboard mapping</li>
              <li>✓ Save 20 active recommendations</li>
            </ul>
          </div>
          <Link href="/signup" className="w-full py-3.5 border border-gray-200 text-center rounded-xl font-bold text-sm text-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35] transition">Start Free</Link>
        </div>
        <div className="bg-white rounded-[2rem] p-8 border-2 border-[#FF6B35] shadow-xl relative flex flex-col justify-between">
          <span className="absolute -top-3 right-6 text-[10px] font-black tracking-widest uppercase text-white bg-[#FF6B35] px-3 py-1 rounded-full">Most Loved Plan</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Nomad</h3>
            <p className="text-gray-400 text-sm mb-6">Complete unchained access globally.</p>
            <div className="text-4xl font-black text-gray-900 mb-6">$8 <span className="text-sm font-normal text-gray-400">/ month</span></div>
            <ul className="space-y-4 text-sm text-gray-600 mb-8">
              <li>✓ Follow unlimited verified guides</li>
              <li>✓ High-fidelity Offline Mode maps</li>
              <li>✓ Unlimited shared collection folders</li>
              <li>✓ Direct chat access to travel experts</li>
            </ul>
          </div>
          <Link href="/signup" className="w-full py-3.5 bg-[#FF6B35] text-white text-center rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-100">Go Pro Account</Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
        <div className="col-span-2">
          <span className="font-display text-2xl font-extrabold text-[#FF6B35] tracking-tighter">NomadFlow</span>
          <p className="text-gray-500 mt-4 max-w-xs leading-relaxed">
            Revolutionizing travel discovery. Curate maps, follow seasoned experts, and bypass the commercial noise.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6 underline underline-offset-4 decoration-[#FF6B35]">Product</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6 underline underline-offset-4 decoration-[#FF6B35]">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6 underline underline-offset-4 decoration-[#FF6B35]">Resources</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6 underline underline-offset-4 decoration-[#FF6B35]">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-50 text-center md:text-left">
        <p className="text-xs text-gray-400 font-medium font-body">© 2026 NomadFlow. All rights reserved. Real people, authentic itineraries.</p>
      </div>
    </footer>
  );
};

export default function NomadFlowLanding() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SocialMarquee />
      <HowItWorks />
      <BentoFeatures />
      <CreatorShowcase />
      <Pricing />
      
      {/* Heavy Graphic CTA Section like Polarsteps */}
      <section className="py-24 px-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[3rem] h-[450px] relative overflow-hidden flex flex-col justify-center items-center text-center px-6"
        >
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" alt="CTA background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Ready to see the world differently?</h2>
            <p className="text-gray-200 mb-10 text-base leading-relaxed">
              Join a collective community of explorers logging true paths, hidden alleys, and local experiences. Start your log for free.
            </p>
            <Link href="/signup" className="inline-block bg-[#FF6B35] text-white font-bold px-12 py-5 rounded-2xl shadow-xl hover:bg-orange-600 transition-all text-lg">
              Create Your Free Account ➔
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
