"use client"; 

import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import ini Jak buat navigasi search
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State buat nampung ketikan search
  const router = useRouter();

  // Cek status login
  useEffect(() => {
    const checkLogin = () => {
      const session = document.cookie.includes("isLoggedIn=true");
      setIsLoggedIn(session);
    };
    checkLogin();
  }, []);

  // --- LOGIKA SEARCH ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Pindah ke halaman search sambil bawa keyword
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-yellow-200 text-black shadow-lg sticky top-0 z-50 border-b border-amber-300/20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-30">
        <div className="flex justify-between items-center h-16">
          
          {/* === MENU KIRI: Navigasi Utama === */}
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto no-scrollbar">
            
            <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 group">
              <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span className="font-semibold text-sm group-hover:text-black">Beranda</span>
            </Link>

            <Link href="/profil" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 group">
              <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-black">Profil Desa</span>
            </Link>

            <Link href="/berita" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 group">
              <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-black">Berita</span>
            </Link>

            <Link href="/layanan" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 group">
              <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-black">Layanan</span>
            </Link>

            <Link href="/potensi" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 group">
              <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-black">Potensi</span>
            </Link>

            <Link href="/kontak" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 group">
              <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-black">Kontak</span>
              
            </Link>
          </div>

          {/* === KANAN: Search Bar === */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white rounded-full overflow-hidden border border-black focus-within:border-black transition-all"
          >
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari sesuatu..." 
              className="bg-transparent text-xs px-5 py-2 text-black placeholder-slate-500 focus:outline-none w-40 lg:w-56"
            />
            <button type="submit" className="bg-amber-400 hover:bg-amber-200 text-slate-900 p-2.5 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* TOMBOL LOGIN / DASHBOARD */}
          <div className="ml-4">
            <Link 
              href={isLoggedIn ? "/dashboard" : "/login"} 
              className="flex items-center gap-2 px-5 py-2 rounded-full border-2 bg-amber-300 border-amber-300 text-black font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 active:scale-95 shadow-lg shadow-amber-400/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {isLoggedIn ? "Dashboard" : "Login"}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}