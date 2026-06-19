"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Ρυθμίσεις για τα Scroll Animations (Framer Motion) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/85 backdrop-blur-xl border-b border-gray-100">
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
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold mb-6">
            ✨ NomadFlow 2.0 is live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Plan your next <br />
            <span className="text-[#FF6B35]">adventure together.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0">
            Skip generic tourist traps. Discover hidden spots recommended by real travelers who have actually been there. Follow creators, save itineraries, and explore like a local.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="/signup" className="bg-[#FF6B35] text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-orange-200 hover:-translate-y-1 hover:scale-105 transition-all active:scale-95 text-lg">
              Start Your Journey Now ➔
            </Link>
          </div>
        </motion.div>
        
        <div className="relative h-[450px] md:h-[550px] w-full bg-[#F8F9FA] rounded-[3rem] border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent blur-xl"></div>
          <div className="w-64 h-64 relative flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
            <div className="absolute w-80 h-80 border-2 border-dashed border-[#FF6B35]/30 rounded-full [transform:rotateX(65deg)_rotateY(15deg)] animate-[spin_30s_linear_infinite]"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="w-44 h-44 bg-gradient-to-tr from-[#FF6B35] to-amber-400 rounded-full shadow-[0_0_60px_rgba(255,107,53,0.35)] flex items-center justify-center text-6xl select-none [backface-visibility:hidden]"
            >
               🌍
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialMarquee = () => {
  const users = [
    { name: "Alex", trip: "Tokyo 🗼", avatar: "👨‍💻" },
    { name: "Sarah", trip: "Bali 🌴", avatar: "👩‍🎨" },
    { name: "Mike", trip: "Rome ✈️", avatar: "👨‍🍳" },
    { name: "Jen", trip: "Patagonia 🏔️", avatar: "👩‍🚀" },
    { name: "Tom", trip: "Paris 🥖", avatar: "👨‍🎨" },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden border-y border-gray-50">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 px-4"
        >
          {[...users, ...users, ...users].map((user, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">{user.avatar}</div>
              <div>
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">is curating {user.trip}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- ΝΕΟ SECTION: HOW IT WORKS ---
const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Find Trusted Creators", desc: "Follow travelers whose style and vibe match yours. See exactly where they have been." },
    { num: "02", title: "Explore Curated Spots", desc: "Unlock maps filled with real recommendations for restaurants, hidden views, and bars." },
    { num: "03", title: "Save & Build Itineraries", desc: "Bookmark your favorite places with one tap and build your ultimate personal travel guide." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Process</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">How NomadFlow Works</h2>
      </div>
      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {steps.map((step, idx) => (
          <motion.div key={idx} variants={fadeInUp} className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 relative overflow-hidden">
            <span className="text-6xl font-black text-orange-100 absolute top-4 right-6 select-none">{step.num}</span>
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
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Features</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Everything you need, in one place.</h2>
      </div>

      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }} className="md:col-span-2 group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-[380px] cursor-pointer">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-2xl">📍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Interactive Maps</h3>
            <p className="text-gray-500 max-w-sm">Visualize profiles on a real map. Pin spots, check exact locations, and filter recommendations dynamically.</p>
          </div>
          <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-[#F8F9FA] rounded-tl-3xl border-t border-l border-gray-100">
             <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF6B35]/20 to-transparent"></div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ scale: 1.03, rotateY: 3 }} className="group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-[380px] cursor-pointer">
          <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-2xl">✨</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">AI Smart Search</h3>
          <p className="text-gray-500">Search for "best sunset spot in Santorini" and get instant filtered results posted only by creators you follow.</p>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ scale: 1.03, rotateY: -3 }} className="group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-[380px] cursor-pointer">
          <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-2xl">👥</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Creator Profiles</h3>
          <p className="text-gray-500">Build your own network. Follow experts, check their badges, travel history, and leave trusted reviews.</p>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ scale: 1.02, rotateX: -2 }} className="md:col-span-2 group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-[380px] flex items-center cursor-pointer">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-12 h-12 bg-orange-50 text-[#FF6B35] rounded-xl flex items-center justify-center mb-6 text-2xl">💾</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF6B35] transition-colors">Collections</h3>
                <p className="text-gray-500">Organize saved locations into folders. Group them by city, type (food, stay, photo-ops) or upcoming trips.</p>
              </div>
              <div className="hidden md:block relative w-full h-full">
                 <div className="w-full h-44 bg-[#F8F9FA] rounded-2xl border border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-gray-300 group-hover:text-[#FF6B35] font-bold uppercase tracking-widest text-[10px]">Folder Syncing...</span>
                 </div>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- ΝΕΟ SECTION: CREATOR SHOWCASE (FEED DEMO) ---
const CreatorShowcase = () => {
  const cards = [
    { name: "Elena R.", spot: "Secret Sunset in Milos 🌅", category: "Viewpoint", bio: "Follow for hidden Cycladic spots" },
    { name: "David K.", spot: "The Best Espresso in Rome ☕", category: "Cafe / Food", bio: "Specialty coffee lover & guide" },
    { name: "Marc J.", spot: "Hidden Surf Beach Bali 🏄‍♂️", category: "Adventure", bio: "Exploring Southeast Asia off-grid" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Community</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Explore Shared Recommendations</h2>
      </div>
      <motion.div 
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {cards.map((card, idx) => (
          <motion.div key={idx} variants={fadeInUp} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl shadow-gray-100/50 flex flex-col justify-between h-[300px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[#FF6B35]">👤</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{card.name}</h4>
                    <p className="text-[11px] text-gray-400">{card.bio}</p>
                  </div>
                </div>
                <button className="text-xs font-bold px-3 py-1.5 bg-[#F8F9FA] hover:bg-orange-50 hover:text-[#FF6B35] rounded-full transition">Follow</button>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-orange-50 px-2 py-0.5 rounded">{card.category}</span>
              <p className="text-base font-bold text-gray-800 mt-3">{card.spot}</p>
            </div>
            <button className="w-full py-3 bg-[#F8F9FA] hover:bg-[#FF6B35] hover:text-white rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center justify-center gap-2">
              📂 Save to My Itinerary
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// --- ΝΕΟ SECTION: PRICING ---
const Pricing = () => {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Pricing</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Simple Plans for Every Traveler</h2>
      </div>
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan 1 */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Explorer</h3>
            <p className="text-gray-400 text-sm mb-6">Perfect for discovering places.</p>
            <div className="text-4xl font-black text-gray-900 mb-6">$0 <span className="text-sm font-normal text-gray-400">/ forever</span></div>
            <ul className="space-y-4 text-sm text-gray-600 mb-8">
              <li>✓ Follow up to 15 travel creators</li>
              <li>✓ Interactive web map view</li>
              <li>✓ Save up to 20 recommendations</li>
            </ul>
          </div>
          <Link href="/signup" className="w-full py-3 border border-gray-200 text-center rounded-xl font-bold text-sm text-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35] transition">Start Free</Link>
        </div>
        {/* Plan 2 */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#FF6B35] shadow-xl relative flex flex-col justify-between">
          <span className="absolute -top-3 right-6 text-[10px] font-black tracking-widest uppercase text-white bg-[#FF6B35] px-3 py-1 rounded-full">Popular</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Nomad</h3>
            <p className="text-gray-400 text-sm mb-6">For absolute freedom worldwide.</p>
            <div className="text-4xl font-black text-gray-900 mb-6">$8 <span className="text-sm font-normal text-gray-400">/ month</span></div>
            <ul className="space-y-4 text-sm text-gray-600 mb-8">
              <li>✓ Follow unlimited travel creators</li>
              <li>✓ Download maps for Offline Mode</li>
              <li>✓ Unlimited Saved Folders & Guides</li>
              <li>✓ Exclusive verified expert badges</li>
            </ul>
          </div>
          <Link href="/signup" className="w-full py-3 bg-[#FF6B35] text-white text-center rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-100">Go Pro</Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
        <div className="col-span-2">
          <span className="font-display text-2xl font-extrabold text-[#FF6B35] tracking-tighter">NomadFlow</span>
          <p className="text-gray-500 mt-4 max-w-xs leading-relaxed">
            Revolutionizing the way travelers plan, collaborate, and experience the world together through real community recommendations.
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
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-400 font-medium font-body">© 2026 NomadFlow. All rights reserved. Real guidance from real experiences.</p>
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
      
      {/* Bottom CTA Section */}
      <section className="py-32 px-6 bg-[#F8F9FA]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 text-center border border-gray-100 shadow-2xl shadow-orange-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF6B35]"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Ready for your next trip?</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of smart travelers who discover places through people, not algorithms. Create your profile today.
          </p>
          <Link href="/signup" className="inline-block bg-[#FF6B35] text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-orange-200 hover:-translate-y-1 hover:scale-105 transition-all active:scale-95 text-lg">
            Start Exploring Now ➔
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
