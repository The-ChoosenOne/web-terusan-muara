"use client"; // Tambahin ini di paling atas kalau belum ada

import Link from 'next/link';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek status login buat nentuin tombol Login atau Dashboard
  useEffect(() => {
    const checkLogin = () => {
      const session = document.cookie.includes("isLoggedIn=true");
      setIsLoggedIn(session);
    };
    checkLogin();
  }, []);
  return (
    // Background Slate-800 dengan border bawah Cyan-300 yang tipis agar elegan
    <nav className="bg-slate-800 text-white shadow-lg sticky top-0 z-50 border-b border-cyan-300/20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-30">
        <div className="flex justify-between items-center h-16">
          
          {/* === MENU KIRI: Navigasi Utama === */}
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto no-scrollbar">
            
            {/* Beranda */}
            <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 group">
              <svg className="w-5 h-5 text-cyan-300 group-hover:text-cyan-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span className="font-semibold text-sm group-hover:text-cyan-300">Beranda</span>
            </Link>

            {/* Profil Desa */}
            <Link href="/profil" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 group">
              <svg className="w-5 h-5 text-cyan-300 group-hover:text-cyan-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-cyan-300">Profil Desa</span>
            </Link>

            {/* Berita */}
            <Link href="/berita" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 group">
              <svg className="w-5 h-5 text-cyan-300 group-hover:text-cyan-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-cyan-300">Berita</span>
            </Link>

            {/* Potensi */}
            <Link href="/potensi" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 group">
              <svg className="w-5 h-5 text-cyan-300 group-hover:text-cyan-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-cyan-300">Potensi</span>
            </Link>

            {/* Kontak */}
            <Link href="/kontak" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 group">
              <svg className="w-5 h-5 text-cyan-300 group-hover:text-cyan-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-semibold text-sm group-hover:text-cyan-300">Kontak</span>
            </Link>

          </div>

          {/* === KANAN: Search Bar === */}
          {/* Border Cyan muncul saat input diklik (focus-within) */}
          <div className="hidden md:flex items-center bg-slate-900/50 rounded-full overflow-hidden border border-slate-600 focus-within:border-cyan-300 transition-all">
            <input 
              type="text" 
              placeholder="Cari sesuatu..." 
              className="bg-transparent text-xs px-5 py-2 text-white placeholder-slate-500 focus:outline-none w-40 lg:w-56"
            />
            <button className="bg-cyan-300 hover:bg-cyan-200 text-slate-900 p-2.5 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          {/* TOMBOL LOGIN / DASHBOARD */}
            <Link 
              href={isLoggedIn ? "/dashboard" : "/login"} 
              className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-cyan-400/50 text-cyan-400 font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 active:scale-95 shadow-lg shadow-cyan-400/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {isLoggedIn ? "Dashboard" : "Login"}
            </Link>

        </div>
      </div>
    </nav>
  );
}