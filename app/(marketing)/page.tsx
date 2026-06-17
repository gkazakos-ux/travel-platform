import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-gray-900 font-sans">
      
      {/* 1. ΑΡΙΣΤΕΡΗ ΜΠΑΡΑ (SIDEBAR) */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4">
        <div>
          {/* Profile Section - Διορθωμένο με το Image του Next.js */}
          <div className="flex items-center gap-3 mb-8 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
              <Image 
                src="https://i.pravatar.cc/150?img=47" 
                alt="Profile" 
                fill
                unoptimized // Το βάζουμε για να μη ζητήσει ρυθμίσεις domain το Next.js για εξωτερικά links
                className="object-cover" 
              />
            </div>
            <div>
              <h3 className="text-sm font-bold">Cecillia Puni</h3>
              <p className="text-[11px] text-gray-500">Part-time Traveller</p>
            </div>
          </div>

          {/* New Trip Button */}
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

        {/* Logout */}
        <div>
          <button className="flex items-center gap-2 text-sm text-red-500 font-bold hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl w-full transition">
            <span>↪️</span> Logout
          </button>
        </div>
      </aside>

      {/* 2. ΚΕΝΤΡΙΚΟ ΠΕΡΙΕΧΟΜΕΝΟ */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Good Morning, Cecil 👋</h1>
            <p className="text-gray-500 mt-1 text-sm font-medium">Plan your itinerary with us</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md transition text-gray-500">
              🔍
            </button>
            
            {/* Notification Icon */}
            <button className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md transition text-gray-500 relative">
              🔔
              {/* Το κόκκινο κυκλάκι ειδοποίησης */}
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            {/* Get Apps */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 ml-2">
              <span className="text-xs font-bold text-gray-400">Get Apps:</span>
              <span className="text-lg cursor-pointer hover:opacity-70">🍏</span>
              <span className="text-lg cursor-pointer hover:opacity-70">🪟</span>
            </div>
          </div>
        </header>

        {/* Ο ΧΩΡΟΣ ΓΙΑ ΤΙΣ ΚΑΡΤΕΣ (Placeholder) */}
        <div className="grid grid-cols-3 gap-8">
          {/* Αριστερή Στήλη (Πιάνει τα 2/3) */}
          <div className="col-span-2 border-2 border-dashed border-gray-200 rounded-3xl h-64 flex items-center justify-center bg-white/50">
             <p className="text-gray-400 font-bold">Εδώ θα μπουν τα "Upcoming Trip" και "For your Trip"</p>
          </div>
          
          {/* Δεξιά Στήλη (Πιάνει το 1/3) */}
          <div className="col-span-1 border-2 border-dashed border-gray-200 rounded-3xl h-64 flex items-center justify-center bg-white/50">
             <p className="text-gray-400 font-bold">Εδώ θα μπει το "Friends Location"</p>
          </div>
        </div>

      </main>
    </div>
  );
}
