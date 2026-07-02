"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[120] bg-[#FF6B35] hover:bg-[#E4531F] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl cursor-pointer border border-white/10 transition-colors duration-200"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform -rotate-90">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}