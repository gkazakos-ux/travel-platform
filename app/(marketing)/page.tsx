import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-950 font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 lg:px-16 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <span className="text-xl font-black tracking-tight text-gray-900">
            Nomad<span className="text-[#FF6B35]">Flow</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <Link href="#" className="text-[#FF6B35] border-b-2 border-[#FF6B35] pb-1">Explore</Link>
          <Link href="#" className="hover:text-gray-950 transition">Planner</Link>
          <Link href="#" className="hover:text-gray-950 transition">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-950 transition">
            Log In
          </Link>
          <Link href="/signup" className="bg-[#FF6B35] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-200 shadow-md shadow-orange-100">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ΚΥΡΙΩΣ ΠΕΡΙΕΧΟΜΕΝΟ */}
      <main className="pt-32 flex-1">
        
        {/* 2. HERO SECTION */}
        <section className="max-w-7xl mx-auto px-8 lg:px-16 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Αριστερή Στήλη: Ομαλή Εμφάνιση με Tailwind (animate-fade-in-up) */}
          <div className="space-y-6 text-center md:text-left transition-all duration-700 space-y-6">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF6B35] text-xs font-bold px-4 py-1.5 rounded-full animate-pulse">
              ✨ NomadFlow 2.0 is live
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-gray-900">
              Plan your next adventure <span className="text-[#FF6B35]">together</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-medium max-w-xl mx-auto md:mx-0">
              Transform the chaotic group chat into a perfectly organized itinerary. Collaborate in real-time, track budgets, and share interactive maps.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/dashboard" className="bg-[#FF6B35] text-white font-bold px-8 py-4 rounded-full hover:bg-[#e85d2c] hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-200 flex items-center justify-center gap-2">
                Start Planning Now ➔
              </Link>
            </div>
          </div>

          {/* Δεξιά Στήλη: 3D Floating Εφέ χρησιμοποιώντας μόνο Tailwind Keyframes (animate-bounce) */}
          <div className="relative h-[350px] md:h-[500px] w-full bg-gradient-to-br from-orange-100 to-indigo-50 rounded-3xl flex items-center justify-center shadow-xl border border-white overflow-hidden">
            
            {/* Αυτή η κάρτα αιωρείται συνεχώς πάνω-κάτω (animate-pulse/bounce mix) */}
            <div className="bg-white p-5 rounded-2xl shadow-2xl border border-gray-50 flex items-center gap-4 max-w-xs transition-transform duration-500 hover:scale-110 cursor-pointer animate-translateY [animation-duration:3s]">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl shadow-sm">🗺️</div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Map</p>
                <p className="text-sm font-black text-gray-900">Updating in real-time</p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. BENTO GRID FEATURES SECTION */}
        <section className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-4">Everything you need, perfectly boxed.</h2>
            <p className="text-gray-500 font-medium">Ditch the sprawling spreadsheets. Experience a modular approach to trip planning.</p>
          </div>

          {/* Bento Grid με Hover Animations (bento-hover εφέ) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Κάρτα 1: Interactive Maps (Μεγάλη κάρτα) */}
            <div className="md:col-span-2 bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px] group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors">Interactive Maps</h3>
                  <p className="text-sm text-gray-500 max-w-md">Pin hotels, restaurants, and sights. Drag and drop to rearrange your day, and watch optimal routes calculate instantly.</p>
                </div>
                <span className="text-2xl p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">📍</span>
              </div>
              <div className="h-24 bg-white border border-dashed border-gray-200 rounded-xl mt-4 flex items-center justify-center text-xs text-gray-400 font-bold group-hover:border-orange-200 transition-colors">Interactive Route Track Visual</div>
            </div>

            {/* Κάρτα 2: Budget Tracking */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px] group">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">Budget Tracking</h3>
                <span className="text-2xl p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">💸</span>
              </div>
              <p className="text-sm text-gray-500">Split costs effortlessly. See exactly who owes what, categorized beautifully.</p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
                <div className="bg-[#FF6B35] h-full rounded-full w-[80%] group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>

            {/* Κάρτα 3: Collaborative Itineraries */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px] group">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">Collaborative</h3>
                <span className="text-2xl p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">🤝</span>
              </div>
              <p className="text-sm text-gray-500">Everyone gets a say. Vote on activities, assign days, and sync instantly.</p>
            </div>

            {/* Κάρτα 4: Smart AI Recommendations */}
            <div className="md:col-span-2 bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px] group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors">Smart AI Recommendations</h3>
                  <p className="text-sm text-gray-500">AI-powered suggestions for flights, hotels, and local hidden gems based on preferences.</p>
                </div>
                <span className="text-2xl p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">✨</span>
              </div>
              <div className="flex gap-2 flex-wrap mt-4">
                <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-600 group-hover:border-orange-100 transition-colors">🏨 Boutique Hotels</span>
                <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-600 group-hover:border-orange-100 transition-colors">🍝 Local Food</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-gray-100 bg-white py-8 px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
        <div>
          <span className="font-bold text-gray-900">NomadFlow</span> &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
        </div>
      </footer>

    </div>
  );
}
