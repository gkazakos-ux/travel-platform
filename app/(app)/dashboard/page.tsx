import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/services/supabase/server";

export default async function DashboardPage() {
  // 1. Σύνδεση με τη Βάση Δεδομένων (Supabase)
  const supabase = await createClient();

  // 2. Παίρνουμε τον συνδεδεμένο χρήστη
  const { data: { user } } = await supabase.auth.getUser();

  // 3. Παίρνουμε το username από τον πίνακα profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user?.id)
    .maybeSingle();

  // Ορίζουμε το όνομα για να το χρησιμοποιήσουμε παντού (αν δεν έχει, βάζουμε "Traveller")
  const displayName = profile?.username || "Traveller";

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-gray-900 font-sans w-full">
      
      {/* ΑΡΙΣΤΕΡΗ ΜΠΑΡΑ (SIDEBAR) */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 shrink-0">
        <div>
          {/* ΔΥΝΑΜΙΚΟ Profile Section */}
          <div className="flex items-center gap-3 mb-8 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
              <Image 
                src="https://i.pravatar.cc/150?img=11" // Προσωρινό avatar, αργότερα βάζουμε του χρήστη
                alt="Profile" 
                fill
                unoptimized
                className="object-cover" 
              />
            </div>
            <div>
              {/* ΕΔΩ ΜΠΑΙΝΕΙ ΤΟ ΠΡΑΓΜΑΤΙΚΟ ΣΟΥ ΟΝΟΜΑ */}
              <h3 className="text-sm font-bold truncate max-w-[120px]">{displayName}</h3>
              <p className="text-[11px] text-gray-500 truncate max-w-[120px]">{user?.email}</p>
            </div>
          </div>

          <button className="w-full bg-[#FF6B35] text-white rounded-xl py-3 text-sm font-bold mb-8 hover:bg-[#e85d2c] transition shadow-md shadow-orange-200">
            + New Trip
          </button>

          {/* TRIPS Menu */}
          <div className="mb-8">
            <h4 className="text-[10px] font-bold text-gray-400 mb-3 tracking-widest uppercase ml-2">Trips</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl cursor-pointer border border-gray-100 shadow-sm">
                <span className="text-2xl drop-shadow-sm">🇲🇾</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">Kuala Lumpur</p>
                  <p className="text-[11px] text-gray-500">5 Days, 24 Dec 2024</p>
                </div>
              </li>
              <li className="flex items-center gap-3 hover:bg-gray-50 p-2.5 rounded-xl cursor-pointer transition">
                <span className="text-2xl drop-shadow-sm">🇯🇵</span>
                <div>
                  <p className="text-sm font-bold text-gray-600">Tokyo</p>
                  <p className="text-[11px] text-gray-400">14 Days, 1 Jan 2025</p>
                </div>
              </li>
            </ul>
          </div>

          {/* GENERAL Menu */}
          <div className="mb-8">
            <h4 className="text-[10px] font-bold text-gray-400 mb-3 tracking-widest uppercase ml-2">General</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-3 bg-gray-900 text-white p-2.5 rounded-xl cursor-pointer shadow-md">
                <span className="text-lg">🏠</span>
                <span className="text-sm font-semibold">Dashboard</span>
              </li>
              <li className="flex items-center gap-3 hover:bg-gray-50 p-2.5 rounded-xl cursor-pointer text-gray-500 transition">
                <span className="text-lg">📅</span>
                <span className="text-sm font-medium">Itinerary</span>
                <span className="ml-auto bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">NEW!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Logout (Αργότερα θα το κάνουμε να δουλεύει πραγματικά) */}
        <div>
          <button className="flex items-center gap-2 text-sm text-red-500 font-bold hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl w-full transition">
            <span>↪️</span> Logout
          </button>
        </div>
      </aside>

      {/* ΚΕΝΤΡΙΚΟ ΠΕΡΙΕΧΟΜΕΝΟ */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1.5 hover:opacity-80 transition border-r border-gray-200 pr-6">
              <span className="text-xl">✈️</span>
              <span className="text-base font-black tracking-tight text-gray-900">
                Travel<span className="text-[#FF6B35]">Platform</span>
              </span>
            </Link>

            {/* ΔΥΝΑΜΙΚΟ Καλωσόρισμα */}
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Good Morning, {displayName} 👋</h1>
              <p className="text-xs text-gray-400 font-medium">Plan your itinerary with us</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5 border-r border-gray-200 pr-6 text-sm font-bold text-gray-500">
              <Link href="/explore" className="hover:text-gray-900 transition">Explore</Link>
              <Link href="/search" className="hover:text-gray-900 transition">Search</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="w-9 h-9 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-gray-100 transition text-sm">🔍</button>
              <button className="w-9 h-9 bg-[#F8F9FA] rounded-full flex items-center justify-center hover:bg-gray-100 transition text-sm relative">
                🔔
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-2 bg-[#F8F9FA] rounded-full px-3 py-1.5 ml-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Get Apps:</span>
                <span className="text-xs cursor-pointer hover:opacity-70">🍏</span>
                <span className="text-xs cursor-pointer hover:opacity-70">🪟</span>
              </div>
            </div>
          </div>
        </header>

        {/* ΚΥΡΙΩΣ ΠΛΕΓΜΑ (GRID) */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* ΑΡΙΣΤΕΡΗ ΣΤΗΛΗ */}
          <div className="col-span-2 space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Upcoming Trip</h2>
                <button className="text-xs font-bold text-[#FF6B35] bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 transition">Details</button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 relative overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1596422846543-75c6fc18a523?w=150" alt="Malaysia" fill unoptimized className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Kuala Lumpur - Ipoh</h4>
                      <p className="text-xs text-gray-400">Malaysia</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400">Budget: <strong className="text-gray-700">$1,200</strong></span>
                    <span className="text-xs bg-orange-50 text-[#FF6B35] font-bold px-2 py-1 rounded-lg">12 Dec</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 relative overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1504457047768-4a5853b0b535?w=150" alt="Vietnam" fill unoptimized className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Sapa - Ninh Binh</h4>
                      <p className="text-xs text-gray-400">Vietnam</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400">Budget: <strong className="text-gray-700">$890</strong></span>
                    <span className="text-xs bg-gray-50 text-gray-600 font-bold px-2 py-1 rounded-lg">24 Nov</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ΔΕΞΙΑ ΣΤΗΛΗ */}
          <div className="col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-bold text-gray-800">Friends Location</h2>
                  <button className="text-xs text-[#FF6B35] font-bold hover:underline">Expand</button>
                </div>
                <p className="text-xs text-gray-400 mb-4">Check on your friend live location</p>
                
                <div className="h-44 bg-blue-50/50 rounded-xl relative overflow-hidden border border-blue-50 flex items-center justify-center">
                  <span className="text-xs text-blue-300 font-medium tracking-wide uppercase">Interactive Map Placeholder</span>
                  <div className="absolute top-10 left-12 bg-white px-2 py-1 rounded-lg shadow-sm text-[10px] font-bold flex items-center gap-1 border border-gray-100">
                    👩‍💼 <span className="text-gray-700">Shelly (Japan)</span>
                  </div>
                  <div className="absolute bottom-8 right-8 bg-white px-2 py-1 rounded-lg shadow-sm text-[10px] font-bold flex items-center gap-1 border border-gray-100">
                    👨‍ <span className="text-gray-700">Edgar (Arg)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
