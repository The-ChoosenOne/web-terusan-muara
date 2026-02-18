"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- 1. PROTEKSI HALAMAN (SINKRONISASI KUNCI) ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  // --- 2. HANDLE LOGOUT (BERSIHKAN SEMUA SESSION) ---
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      localStorage.removeItem("isLoggedIn");
      // Hapus cookie agar middleware Next.js juga tahu user sudah keluar
      document.cookie = "isLoggedIn=; Max-Age=0; path=/"; 
      router.push("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* SIDEBAR DENGAN TEMA HIJAU DESA PARIT */}
      <aside className={`bg-green-900 text-white w-64 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} fixed md:relative z-30 h-full overflow-y-auto`}>
        <div className="p-6 border-b border-green-800 flex items-center gap-3">
           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-900 font-bold shadow-lg">
             P
           </div>
           <div>
             <h2 className="font-bold text-sm">Admin Panel</h2>
             <p className="text-[10px] text-green-300 uppercase font-black tracking-widest">Desa Parit</p>
           </div>
        </div>

        <nav className="p-4 space-y-1">
          <p className="px-4 text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-2 mt-4 opacity-50">Main Menu</p>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-green-800 rounded-xl text-white hover:bg-[#c1eb91] hover:text-green-900 transition-all shadow-sm">
            <span>🏠</span> <span>Dashboard</span>
          </Link>
          
          <p className="px-4 text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-2 mt-6 opacity-50">Konten Website</p>
          
          <Link href="/dashboard/berita" className="flex items-center gap-3 px-4 py-3 hover:bg-[#c1eb91] hover:text-green-900 rounded-xl transition-all text-green-100 group">
            <span className="group-hover:scale-125 transition-transform">📰</span> <span>Berita Desa</span>
          </Link>
          <Link href="/dashboard/perangkat" className="flex items-center gap-3 px-4 py-3 hover:bg-[#c1eb91] hover:text-green-900 rounded-xl transition-all text-green-100 group">
            <span className="group-hover:scale-125 transition-transform">👔</span> <span>Perangkat Desa</span>
          </Link>
          <Link href="/dashboard/potensi" className="flex items-center gap-3 px-4 py-3 hover:bg-[#c1eb91] hover:text-green-900 rounded-xl transition-all text-green-100 group">
            <span className="group-hover:scale-125 transition-transform">🌾</span> <span>Potensi Desa</span>
          </Link>
          <Link href="/dashboard/slider" className="flex items-center gap-3 px-4 py-3 hover:bg-[#c1eb91] hover:text-green-900 rounded-xl transition-all text-green-100 group">
            <span className="group-hover:scale-125 transition-transform">🖼️</span> <span>Manajemen Slider</span>
          </Link>
          <Link href="/dashboard/profil" className="flex items-center gap-3 px-4 py-3 hover:bg-[#c1eb91] hover:text-green-900 rounded-xl transition-all text-green-100 group">
            <span className="group-hover:scale-125 transition-transform">🏛️</span> <span>Profil & Sejarah</span>
          </Link>

          <div className="pt-10">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-600 rounded-xl transition-all text-red-400 hover:text-white font-bold">
              <span>🚪</span> <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between border-b border-gray-100">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 font-bold">
            {isSidebarOpen ? '❮' : '☰'}
          </button>
          <div className="flex items-center gap-4">
            {/* PERBAIKAN: Header tidak kosong lagi */}
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-gray-900 uppercase">Administrator</p>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">KKN Desa Parit Aktif</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}