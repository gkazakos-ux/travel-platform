"use client";

import React from "react";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#0B2027] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md flex flex-col items-center gap-6">
        {/* Logo Icon */}
        <div className="flex items-center gap-[10px] font-bold text-[24px] tracking-tight">
          <span className="w-[18px] h-[18px] rounded-full rounded-br-[2px] bg-[#FF6B35] rotate-45 inline-block" />
          Pathlore
        </div>
        
        <div className="w-12 h-[1px] bg-[#0B2027]/20 my-2" />
        
        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
          Something beautiful <br />is under construction.
        </h1>
        
        <p className="text-sm font-medium text-[#0B2027]/60 max-w-sm leading-relaxed">
          We are currently tailoring the ultimate travel experience. Follow our journey and prepare for launch.
        </p>
        
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6B35] bg-[#FF6B35]/10 px-4 py-1.5 rounded-full mt-4 animate-pulse">
          ⏳ Launching Soon · 2026
        </div>
      </div>
    </main>
  );
}