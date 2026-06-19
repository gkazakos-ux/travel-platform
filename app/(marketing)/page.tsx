"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold text-[#FF6B35] tracking-tighter">
            NomadFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Explore</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Planner</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-[#FF6B35] transition-colors">Community</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-gray-900 px-4 py-2">Log In</button>
          <button className="bg-[#FF6B35] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-lg transition-all active:scale-95">
            Start Planning
          </button>
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold mb-6">
            ✨ NomadFlow 2.0 is live
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Plan your next <br />
            <span className="text-[#FF6B35]">adventure together.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mb-10 leading-relaxed">
            Turn travel chaos into perfectly organized itineraries. Collaborate with friends, track budgets, and explore the world with absolute effortless control.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all active:scale-95">
              Start Your Journey
            </button>
            <button className="bg-gray-50 text-gray-900 font-bold px-8 py-4 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
              See How It Works
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-square lg:aspect-auto h-[500px] bg-[#F8F9FA] rounded-[3rem] border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner"
        >
          {/* Placeholder for Three.js Globe */}
          <div className="text-center p-8">
            <div className="w-64 h-64 bg-white rounded-full shadow-2xl flex items-center justify-center animate-pulse mb-6 mx-auto">
              <div className="text-orange-500 font-bold">3D Globe Loading...</div>
            </div>
            <p className="text-sm text-gray-400 font-medium italic">Interactive travel experiences await.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BentoFeatures = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">Features</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 tracking-tight">Everything you need, in one place.</h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Large Feature: Interactive Maps */}
        <motion.div variants={itemVariants} className="md:col-span-2 group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-[400px]">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">🗺️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Maps</h3>
            <p className="text-gray-500 max-w-sm">Visualize your entire journey. Pin spots, calculate routes, and optimize your daily exploring with ease.</p>
          </div>
          <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gray-50 rounded-tl-3xl border-t border-l border-gray-100 group-hover:translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
             <div className="w-full h-full opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF6B35]/20 to-transparent"></div>
          </div>
        </motion.div>

        {/* Small Feature: AI Magic */}
        <motion.div variants={itemVariants} className="group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-[400px]">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">✨</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Magic</h3>
          <p className="text-gray-500">Get smart suggestions for hidden gems based on your group's vibe and previous trips.</p>
        </motion.div>

        {/* Small Feature: Shared Budgets */}
        <motion.div variants={itemVariants} className="group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-[400px]">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">💰</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Shared Budgets</h3>
          <p className="text-gray-500">Split costs seamlessly and track expenses in real-time. No more spreadsheet headaches.</p>
          <div className="mt-10 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-[#FF6B35] w-3/4 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
             <span>Spent: $1,240</span>
             <span>Total: $2,500</span>
          </div>
        </motion.div>

        {/* Large Feature: Offline Mode */}
        <motion.div variants={itemVariants} className="md:col-span-2 group bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-[400px] flex items-center">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">📵</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Offline Mode</h3>
                <p className="text-gray-500">Access your full itinerary even when you're off the grid in the mountains. No signal, no problem.</p>
              </div>
              <div className="hidden md:block relative">
                 <div className="w-full h-48 bg-[#F8F9FA] rounded-2xl border border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-gray-300 font-bold uppercase tracking-widest text-[10px]">Itinerary Syncing...</span>
                 </div>
              </div>
           </div>
        </motion.div>
      </motion.div>
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
    <section className="py-20 bg-white overflow-hidden border-y border-gray-50">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-8 px-4"
        >
          {[...users, ...users, ...users].map((user, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">{user.avatar}</div>
              <div>
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">is planning {user.trip}</p>
              </div>
            </div>
          ))}
        </motion.div>
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
            Revolutionizing the way travelers plan, collaborate, and experience the world together.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Templates</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Integrations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Support</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Terms</Link></li>
            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-400 font-medium font-body">© 2024 NomadFlow. All rights reserved. Your journey, perfectly organized.</p>
        <div className="flex gap-6">
          {/* Social Icons Placeholder */}
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all cursor-pointer">𝕏</div>
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all cursor-pointer"></div>
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-all cursor-pointer"></div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Main ---

export default function NomadFlowLanding() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SocialMarquee />
      <BentoFeatures />
      
      {/* Bottom CTA Section */}
      <section className="py-32 px-6 bg-[#F8F9FA]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 text-center border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF6B35]"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Ready for your next trip?</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto">
            Join thousands of travelers who have already transformed the way they plan. Create your first itinerary for free today.
          </p>
          <button className="bg-[#FF6B35] text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all active:scale-95 text-lg">
            Start Planning Now
          </button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
