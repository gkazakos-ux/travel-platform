import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-950 font-sans flex flex-col justify-between">
      
      {/* 1. NAVIGATION BAR (Full Width) */}
      <nav className="w-full px-8 lg:px-16 py-5 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <span className="text-xl font-black tracking-tight text-gray-900">Travel<span className="text-[#FF6B35]">Platform</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">
            Sign In
          </Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#e85d2c] transition shadow-md shadow-orange-100">
            Get Started
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (Full Width) */}
      <main className="w-full px-8 lg:px-16 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center flex-1">
        
        {/* Αριστερό Μέρος: Κείμενο και Call to Action */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF6B35] text-xs font-bold px-3 py-1.5 rounded-full">
            ✨ Your Ultimate Travel Companion
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-gray-900">
            Plan your next adventure <span className="text-[#FF6B35]">together</span>.
          </h1>
          <p className="text-base md:text-lg text-gray-500 font-medium max-w-xl mx-auto md:mx-0">
            Create beautiful itineraries, track budgets, and see where your friends are traveling in real-time. Everything you need for the perfect trip, all in one place.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/dashboard" className="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2">
              Go to Dashboard <span>➔</span>
            </Link>
            <Link href="/signup" className="bg-white text-gray-700 border border-gray-200 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition flex items-center justify-center">
              Create Free Account
            </Link>
          </div>
        </div>

        {/* Δεξιά πλευρά: Μια όμορφη travel εικόνα */}
        <div className="relative h-[350px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-white">
          <Image 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800" 
            alt="Travel Planning" 
            fill
            unoptimized
            className="object-cover"
          />
        </div>

      </main>

      {/* 3. FOOTER */}
      <footer className="w-full border-t border-gray-100 bg-white py-6 text-center text-xs text-gray-400 font-medium">
        &copy; {new Date().getFullYear()} TravelPlatform. All rights reserved.
      </footer>

    </div>
  );
}
