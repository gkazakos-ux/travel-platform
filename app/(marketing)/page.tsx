export default function HomePage() {
  return (
    // Ο κεντρικός καμβάς: πιάνει όλη την οθόνη (min-h-screen), έχει απαλό γκρι φόντο
    <div className="min-h-screen bg-[#F8F9FA] flex text-gray-900 font-sans">
      
      {/* 1. ΑΡΙΣΤΕΡΗ ΜΠΑΡΑ (SIDEBAR) */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4">
        
        {/* Πάνω τμήμα της μπάρας */}
        <div>
          {/* Profile Section */}
          <div className="flex items-center gap-3 mb-8 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {/* Χρησιμοποιούμε μια τυχαία εικόνα για placeholder */}
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Cecillia Puni</h3>
              <p className="text-xs text-gray-500">Part-time Traveller</p>
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

        {/* Κάτω τμήμα της μπάρας (Logout) */}
        <div>
          <button className="flex items-center gap-2 text-sm text-red-500 font-bold hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl w-full transition">
            <span>↪️</span> Logout
          </button>
        </div>
        
      </aside>

      {/* 2. ΚΕΝΤΡΙΚΟ ΠΕΡΙΕΧΟΜΕΝΟ (Προσωρινά Placeholder) */}
      <main className="flex-1 p-10">
        <div className="h-full border-4 border-dashed border-gray-200 rounded-3xl flex items-center justify-center">
          <p className="text-gray-400 font-medium">Εδώ θα χτίσουμε το υπόλοιπο Dashboard (Header & Κάρτες)</p>
        </div>
      </main>

    </div>
  );
}
