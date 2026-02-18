"use client";

import { useState, useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TAMBAHAN: Bersihkan sisa login lama saat masuk ke halaman ini
  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // KREDENSIAL ADMIN DESA PARIT
    const emailAdmin = "admin@desaparit.com"; 
    const passwordAdmin = "parit2026"; 

    const savedPassword = typeof window !== 'undefined' ? localStorage.getItem("adminPassword") || passwordAdmin : passwordAdmin;
    
    if (email === emailAdmin && password === savedPassword) {
      // 1. Set LocalStorage untuk tampilan UI
      localStorage.setItem("isLoggedIn", "true");
      
      // 2. Set Cookie agar dibaca oleh middleware.ts (KEAMANAN)
      document.cookie = "isLoggedIn=true; path=/; max-age=86400; SameSite=Lax"; 

      // 3. Redirect paksa ke Dashboard
      setTimeout(() => {
        window.location.assign("/dashboard");
      }, 500);
    } else {
      setIsLoading(false);
      alert("Waduh Fadly, Email atau Passwordnya salah! Coba cek lagi ya.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 relative overflow-hidden">
        
        {/* Aksen Hijau Khas Desa Parit */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>

        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-green-50 rounded-[35px] flex items-center justify-center mb-6 shadow-inner border border-green-100">
            <span className={`text-5xl ${isLoading ? 'animate-bounce' : 'animate-pulse'}`}>
              {isLoading ? '🚀' : '🔐'}
            </span>
          </div>
          <h2 className="text-4xl font-[1000] text-gray-900 uppercase tracking-tighter leading-none mb-3">
            Admin Login
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gray-200"></span>
            <p className="text-gray-400 font-black text-[10px] tracking-[0.3em] uppercase">
              Desa Parit Digital
            </p>
            <span className="h-px w-8 bg-gray-200"></span>
          </div>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-1 block group-focus-within:text-green-500 transition-colors">
                Email Admin
              </label>
              <input
                type="email"
                required
                disabled={isLoading}
                className="w-full px-8 py-5 rounded-[25px] bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-300 transition-all outline-none shadow-sm disabled:opacity-50"
                placeholder="admin@desaparit.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-1 block group-focus-within:text-green-500 transition-colors">
                Password
              </label>
              <input
                type="password"
                required
                disabled={isLoading}
                className="w-full px-8 py-5 rounded-[25px] bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-300 transition-all outline-none shadow-sm disabled:opacity-50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-6 rounded-[25px] font-[1000] uppercase tracking-[0.25em] transition-all active:scale-95 shadow-xl mt-8 text-xs flex items-center justify-center gap-3
              ${isLoading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Otentikasi...
              </>
            ) : (
              'Buka Akses Dashboard 🚀'
            )}
          </button>
        </form>

        <div className="text-center mt-12 pt-8 border-t border-gray-50">
           <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.4em]">
             KKN UIN RADEN FATAH 2026
           </p>
        </div>
      </div>
    </div>
  );
}