"use client";

import { useState } from "react";
import { createClient } from "@/services/supabase/client";

type Mode = "login" | "register";

export default function PassportAuth() {
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Βάλε email και password."); return; }
    setError(null); setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    window.location.href = "/dashboard";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !regEmail || !regPassword) { setError("Συμπλήρωσε όλα τα πεδία."); return; }
    if (regPassword !== regConfirm) { setError("Τα passwords δεν ταιριάζουν."); return; }
    setError(null); setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
    if (err) { setError(err.message); setLoading(false); return; }
    window.location.href = "/onboarding";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 select-none relative z-50">
      
      {/* ─── ΤΟ ΑΚΛΟΝΗΤΟ ΚΟΛΠΟ: ΕΠΙΒΟΛΗ ΣΕ ΟΛΟ ΤΟ SITE ─── */}
      <style>{`
        /* Βάφουμε το απόλυτο background του browser μπεζ */
        html, body { 
          background-color: #F3EFE6 !important; 
        }
        /* Εξαφανίζουμε το κεντρικό μενού/navbar ("nerary") μόνο σε αυτή τη σελίδα */
        nav, header, footer, [class*="Navbar"], [class*="navbar"] { 
          display: none !important; 
        }
        /* Ξεκλειδώνουμε τυχόν περιορισμούς πλάτους του layout */
        main {
          max-width: none !important;
          background: transparent !important;
          padding: 0 !important;
        }
      `}</style>
      
      {/* Κεντρικό Σταθερό Μπλοκ Διαβατηρίου */}
      <div className="w-full max-w-[760px] min-h-[490px] bg-white rounded-2xl shadow-2xl border border-[#0B2027]/5 flex overflow-hidden transition-all duration-500 relative z-50">
        
        {/* ─── ΟΨΗ 1: LOGIN MODE ─── */}
        {mode === "login" && (
          <div className="w-full flex animate-in fade-in duration-300">
            {/* Αριστερό Εξώφυλλο (PC μόνο) */}
            <div className="hidden md:flex w-2/5 bg-[#e8490f] relative overflow-hidden">
              <div className="w-10 bg-[#c0440a] flex-shrink-0 flex items-center justify-center border-r border-black/10">
                <span className="text-[9px] font-black tracking-[0.25em] text-white/40 uppercase block whitespace-nowrap" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  TRAVEL DOCUMENT
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3 text-center relative z-10">
                <div className="absolute inset-0 bg-[#f07030] opacity-25 pointer-events-none" style={{ clipPath: "ellipse(80% 60% at 100% 50%)" }} />
                <div className="w-14 h-14 border-2 border-white/30 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <p className="text-white text-xs font-black tracking-[0.2em] uppercase">Pathlore</p>
                  <p className="text-white/50 text-[9px] font-bold tracking-wider uppercase mt-1">Passport to Adventure</p>
                </div>
              </div>
            </div>

            {/* Δεξιά Φόρμα */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-white">
              <h1 className="text-2xl font-black text-[#0B2027] tracking-tight">Welcome back</h1>
              <p className="text-xs font-bold text-[#0B2027]/40 uppercase tracking-wider mt-1 mb-6">Present credentials to enter</p>
              
              {error && (
                <div className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
                <div>
                  <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input className="w-full h-11 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="email" placeholder="traveler@world.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1.5">Password</label>
                  <input className="w-full h-11 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                
                <div className="flex items-center justify-between my-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#0B2027]/40 cursor-pointer"><input type="checkbox" className="accent-[#e8490f] rounded" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /> Remember me</label>
                  <button type="button" className="text-xs font-bold text-[#e8490f] hover:underline">Forgot password?</button>
                </div>

                <button className="w-full h-11 bg-[#e8490f] hover:bg-[#c0440a] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#e8490f]/10" type="submit" disabled={loading}>
                  {loading ? "Verifying…" : "Log In"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-[1px] bg-[#0B2027]/5" />
                <span className="text-[9px] font-black text-[#0B2027]/30 uppercase tracking-widest">or connect with</span>
                <div className="flex-1 h-[1px] bg-[#0B2027]/5" />
              </div>

              <div className="flex justify-center gap-2.5">
                {["Facebook", "Google", "GitHub", "LinkedIn"].map((n) => (
                  <button key={n} type="button" className="w-9 h-9 border border-[#0B2027]/10 rounded-xl flex items-center justify-center text-[#0B2027]/40 hover:border-[#e8490f] hover:text-[#e8490f] transition-all bg-white">
                    <SocialIcon name={n} />
                  </button>
                ))}
              </div>

              <p className="text-center text-xs font-medium text-[#0B2027]/40 mt-5">
                New traveler?{" "}
                <button type="button" onClick={() => setMode("register")} className="font-bold text-[#e8490f] hover:underline">Register Passport →</button>
              </p>
            </div>
          </div>
        )}

        {/* ─── ΟΨΗ 2: REGISTER MODE ─── */}
        {mode === "register" && (
          <div className="w-full flex animate-in fade-in duration-300">
            {/* Αριστερή Φόρμα */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-white border-r border-[#0B2027]/5">
              <h1 className="text-2xl font-black text-[#0B2027] tracking-tight">New Passport</h1>
              <p className="text-xs font-bold text-[#0B2027]/40 uppercase tracking-wider mt-1 mb-5">Create your global identity</p>
              
              {error && (
                <div className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="flex flex-col gap-3" noValidate>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1">First Name</label>
                    <input className="w-full h-10 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="text" placeholder="Maria" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1">Last Name</label>
                    <input className="w-full h-10 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="text" placeholder="Santos" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1">Email Address</label>
                  <input className="w-full h-10 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="email" placeholder="traveler@world.com" value={regEmail} onChange={(e)=>setRegEmail(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1">Password</label>
                  <input className="w-full h-10 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="password" placeholder="••••••••" value={regPassword} onChange={(e)=>setRegPassword(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0B2027]/50 uppercase tracking-widest mb-1">Confirm Password</label>
                  <input className="w-full h-10 px-4 border border-[#0B2027]/10 rounded-xl text-sm text-[#0B2027] bg-[#F3EFE6]/30 outline-none focus:border-[#e8490f] focus:bg-white transition-all font-medium" type="password" placeholder="••••••••" value={regConfirm} onChange={(e)=>setRegConfirm(e.target.value)} />
                </div>
                <button className="w-full h-11 bg-[#f07030] hover:bg-[#d05a20] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#f07030]/10 mt-2" type="submit" disabled={loading}>
                  {loading ? "Issuing passport…" : "Issue Passport"}
                </button>
              </form>
              <p className="text-center text-xs font-medium text-[#0B2027]/40 mt-4">
                Already a traveler?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-bold text-[#e8490f] hover:underline">← Sign In</button>
              </p>
            </div>

            {/* Δεξιά Εσωτερική Σελίδα (PC μόνο) */}
            <div className="hidden md:flex w-2/5 bg-[#F3EFE6]/40 p-6 flex-col items-center justify-center gap-6 relative">
              <div className="absolute top-0 left-0 bottom-0 w-2 flex flex-col justify-center gap-3 pl-1">
                {Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-[#F3EFE6]" />)}
              </div>
              
              <div className="w-full border border-[#0B2027]/5 rounded-2xl p-4 bg-white text-center shadow-sm">
                <div className="w-9 h-9 bg-[#e8490f]/10 rounded-xl flex items-center justify-center mx-auto mb-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8490f" strokeWidth="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-1 0-1.5.5-3.5 1.5L7 7.2C5 8 4 9 6 11l2 1-2 3.5c-.5 1.5 0 2 1.5 2L11 15l1 2z"/></svg>
                </div>
                <p className="text-[10px] font-bold text-[#0B2027] uppercase tracking-wide">Visa Approved</p>
                <p className="text-[9px] text-[#0B2027]/50 mt-1 leading-relaxed">Your account grants entry to custom itineraries</p>
              </div>

              <div className="w-16 h-16 border-2 border-dashed border-[#e8490f]/20 rounded-full flex flex-col items-center justify-center transform -rotate-12 opacity-50">
                <span className="text-[7px] font-bold text-[#e8490f] uppercase tracking-wider">PASSPORT</span>
                <span className="text-[10px] font-black text-[#e8490f]">{new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    Facebook: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    Google:   <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
    GitHub:   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
    LinkedIn: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  };
  return icons[name] ?? null;
}