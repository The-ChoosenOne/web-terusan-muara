"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats } from "@/lib/contentful"; // Mengambil dari jembatan utama

export default function DashboardSummary() {
  const [data, setData] = useState({ berita: 0, staf: 0, potensi: 0 });
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      // Menggunakan fungsi terpusat agar tidak perlu nulis TOKEN berulang kali
      const stats = await getDashboardStats(); 
      setData(stats);
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-black">
      
      {/* 1. WELCOME BANNER */}
      <div className="relative overflow-hidden bg-gray-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/10">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
              {loading ? "Syncing Database..." : "Admin Active"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-[1000] text-white tracking-tighter leading-none mb-4 uppercase">
            Dashboard <br />
            <span className="text-green-500">Desa Parit ✨</span>
          </h1>
          <p className="text-gray-300 font-medium max-w-md text-sm md:text-base leading-relaxed">
            Pusat kendali konten Desa Parit. Mudahkan pengelolaan informasi secara mandiri dan transparan.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      </div>

      {/* 2. STATS GRID (DATA DINAMIS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Artikel Berita', val: data.berita, icon: '📢', color: 'bg-blue-50' },
          { label: 'Profil Perangkat', val: data.staf, icon: '👔', color: 'bg-emerald-50' },
          { label: 'Data Potensi', val: data.potensi, icon: '🌾', color: 'bg-yellow-50' },
          { label: 'Status Sistem', val: 'Online', icon: '🌐', color: 'bg-green-50' },
        ].map((item, i) => (
          <div key={i} className={`${item.color} border border-gray-200 p-8 rounded-[35px] transition-all hover:scale-105 shadow-sm`}>
            <div className="text-3xl mb-4">{item.icon}</div>
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-600 mb-1">{item.label}</p>
            <h3 className={`text-4xl font-[1000] tracking-tighter ${item.label === 'Status Sistem' ? 'text-green-600' : 'text-gray-900'}`}>
              {loading ? "..." : item.val}
              {typeof item.val === 'number' && <span className="text-lg ml-1 text-gray-400 italic font-bold">Data</span>}
            </h3>
          </div>
        ))}
      </div>

      {/* 3. LAPORAN DIGITAL KKN */}
      <div className="bg-white p-8 md:p-10 rounded-[45px] border border-gray-200 shadow-xl overflow-hidden relative text-black">
        <div className="absolute top-0 right-0 p-10 opacity-10 text-8xl grayscale">📊</div>
        <div className="relative z-10">
          <h2 className="text-3xl font-[1000] text-gray-900 tracking-tighter mb-2 italic uppercase">Laporan Digital KKN</h2>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-8">Ringkasan kontribusi digital untuk Desa Parit</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Digitalisasi Berita</p>
              <p className="text-xl font-black text-gray-800">{loading ? "..." : data.berita} Kegiatan Terbit</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Promosi Potensi</p>
              <p className="text-xl font-black text-gray-800">{loading ? "..." : data.potensi} Data Terdata</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6 py-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Struktur</p>
              <p className="text-xl font-black text-gray-800">{loading ? "..." : data.staf} Profil Perangkat</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BUTTONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <Link 
          href="/" 
          target="_blank" 
          className="bg-green-700 p-8 rounded-[40px] flex flex-col justify-between group cursor-pointer transition-all hover:shadow-2xl active:scale-95"
        >
          <div>
            <h3 className="text-2xl font-black text-white italic mb-2 flex items-center gap-2">
              Lihat Website Utama ↗
            </h3>
            <p className="text-green-100 text-sm font-medium">Cek hasil publikasi konten Desa Parit secara live.</p>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-green-700 transition-all text-white text-xl">
              🚀
            </div>
          </div>
        </Link>

        <div className="bg-white p-8 rounded-[40px] border border-gray-200 shadow-xl flex flex-col justify-between">
          <div>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 inline-block">Bantuan</span>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Butuh Panduan?</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Klik tombol di bawah jika Anda memerlukan bantuan cara mengoperasikan dashboard ini.
            </p>
          </div>
          <button 
            onClick={() => setShowGuide(true)}
            className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl"
          >
            Buka Panduan Cepat 📖
          </button>
        </div>
      </div>

      {/* 5. MODAL PANDUAN */}
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-black">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGuide(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Panduan Admin</h2>
              <button onClick={() => setShowGuide(false)} className="text-gray-400 hover:text-black text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                <h4 className="font-black text-green-800 text-sm uppercase mb-2">1. Kelola Berita</h4>
                <p className="text-xs text-green-700 font-semibold">Gunakan menu Berita Desa untuk mempublikasikan pengumuman atau kegiatan desa.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <h4 className="font-black text-blue-800 text-sm uppercase mb-2">2. Manajemen Slider</h4>
                <p className="text-xs text-blue-700 font-semibold">Ganti foto utama di halaman depan melalui menu Manajemen Slider.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                <h4 className="font-black text-orange-800 text-sm uppercase mb-2">3. Publikasi Data</h4>
                <p className="text-xs text-orange-700 font-semibold">Data akan muncul otomatis di website utama setelah Anda menekan tombol Simpan di dashboard.</p>
              </div>
            </div>
            <button onClick={() => setShowGuide(false)} className="mt-8 w-full py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Tutup Panduan ✅</button>
          </div>
        </div>
      )}
    </div>
  );
}