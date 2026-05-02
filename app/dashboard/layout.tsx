"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- 1. PROTEKSI HALAMAN ---
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        document.cookie = "isLoggedIn=; Max-Age=0; path=/"; 
        router.push("/login");
      }
    };
    checkSession();
  }, [router]);

  // --- 2. HANDLE LOGOUT ---
  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      await supabase.auth.signOut();
      localStorage.removeItem("isLoggedIn");
      document.cookie = "isLoggedIn=; Max-Age=0; path=/"; 
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className={`bg-slate-900 text-white w-72 flex-shrink-0 transition-all duration-500 ${isSidebarOpen ? "translate-x-0" : "-translate-x-72"} fixed md:relative z-30 h-full overflow-y-auto border-r border-white/5 shadow-2xl`}>
        <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-slate-950/50">
           <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 font-[1000] shadow-lg shadow-amber-400/20 transform -rotate-6">
             TM
           </div>
           <div>
             <h2 className="font-black text-sm uppercase tracking-tighter">Admin <span className="text-amber-400">Panel</span></h2>
             <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Desa Terusan Muara</p>
           </div>
        </div>

        <nav className="p-6 space-y-2">
          <p className="px-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 mt-4">Utama</p>
          <Link href="/dashboard" className="flex items-center gap-4 px-5 py-4 bg-slate-800/50 rounded-2xl text-white hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 shadow-sm font-bold group">
            <span className="text-xl group-hover:scale-110 transition-transform">🏠</span> <span>Dashboard</span>
          </Link>
          
          <p className="px-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 mt-10">Konten Digital</p>
          
          {[
            { href: "/dashboard/berita", icon: "📰", label: "Berita Desa" },
            { href: "/dashboard/perangkat", icon: "👔", label: "Perangkat Desa" },
            { href: "/dashboard/potensi", icon: "💎", label: "Potensi Desa" },
            // --- MENU BARU LO DISINI JAK ---
            { href: "/dashboard/layanan", icon: "📄", label: "Layanan Surat" }, 
            { href: "/dashboard/slider", icon: "🖼️", label: "Manajemen Slider" },
            { href: "/dashboard/profil", icon: "🏛️", label: "Profil & Sejarah" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-4 px-5 py-4 hover:bg-amber-400 hover:text-slate-900 rounded-2xl transition-all duration-300 text-slate-400 font-bold group">
              <span className="text-xl group-hover:scale-125 transition-transform duration-500">{item.icon}</span> 
              <span className="tracking-tight">{item.label}</span>
            </Link>
          ))}

          <div className="pt-16">
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 bg-red-500/10 hover:bg-red-500 rounded-2xl transition-all duration-300 text-red-400 hover:text-white font-black uppercase text-[14px] tracking-widest shadow-inner">
              <span>🚪</span> <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md h-20 flex items-center px-8 justify-between border-b border-slate-100 relative z-20">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-900 hover:text-amber-300 rounded-xl transition-all text-slate-400 font-bold shadow-sm">
            {isSidebarOpen ? '❮' : '☰'}
          </button>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Admin</p>
              <p className="text-[9px] text-amber-600 font-black uppercase tracking-[0.2em] mt-0.5">Administrator Aktif</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center text-amber-400 font-bold uppercase">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}