"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import koneksi supabase lo

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Bersihkan session lama saat masuk halaman login
  useEffect(() => {
    supabase.auth.signOut();
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (data.user && !error) {
      // 1. Tanam cookie manual biar Middleware gak bingung (sesuai cara lama lo)
      document.cookie = "isLoggedIn=true; path=/; max-age=86400; SameSite=Lax"; 

      // 2. Redirect pake window.location.href biar bener-bener refresh session
      window.location.href = "/dashboard";
    } else {
      setIsLoading(false);
      alert("Gagal Login: " + (error?.message || "Cek email/password lo!"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[55px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-slate-50 relative overflow-hidden">
        
        {/* Aksen Slate & Cyan */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-slate-900 via-cyan-500 to-slate-900"></div>

        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-slate-900 rounded-[35px] flex items-center justify-center mb-8 shadow-2xl border border-cyan-500/30">
            <span className={`text-5xl ${isLoading ? 'animate-bounce' : 'animate-pulse'}`}>
              {isLoading ? '🚀' : '🔐'}
            </span>
          </div>
          <h2 className="text-4xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none mb-4 italic">
            Admin <span className="text-cyan-600">Login</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-100"></span>
            <p className="text-slate-400 font-black text-[9px] tracking-[0.4em] uppercase">
              Terusan Muara Digital
            </p>
            <span className="h-px w-8 bg-slate-100"></span>
          </div>
        </div>

        <form className="mt-12 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-5 mb-2 block group-focus-within:text-cyan-600 transition-colors">
                Email Admin
              </label>
              <input
                type="email"
                required
                disabled={isLoading}
                className="w-full px-8 py-5 rounded-[25px] bg-slate-50 border-2 border-transparent focus:border-cyan-400 focus:bg-white text-slate-900 font-bold placeholder:text-slate-300 transition-all outline-none shadow-inner disabled:opacity-50"
                placeholder="admin@desaterusanmuara.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-5 mb-2 block group-focus-within:text-cyan-600 transition-colors">
                Password
              </label>
              <input
                type="password"
                required
                disabled={isLoading}
                className="w-full px-8 py-5 rounded-[25px] bg-slate-50 border-2 border-transparent focus:border-cyan-400 focus:bg-white text-slate-900 font-bold placeholder:text-slate-300 transition-all outline-none shadow-inner disabled:opacity-50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-6 rounded-[28px] font-[1000] uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl mt-10 text-[10px] flex items-center justify-center gap-4
              ${isLoading ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-slate-900 text-cyan-300 hover:bg-black shadow-cyan-500/10'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
                Otentikasi...
              </>
            ) : (
              'Buka Akses Dashboard 🚀'
            )}
          </button>
        </form>

        <div className="text-center mt-14 pt-10 border-t border-slate-50">
           <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.6em]">
             KKN UIN RADEN FATAH PALEMBANG 2026
           </p>
        </div>
      </div>
    </div>
  );
}