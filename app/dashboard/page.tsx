"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Ganti ke Supabase sakti

export default function DashboardSummary() {
  const [data, setData] = useState({ berita: 0, staf: 0, potensi: 0 });
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        // Ambil jumlah data dari 3 tabel secara paralel
        const [berita, staf, potensi] = await Promise.all([
          supabase.from("berita").select("*", { count: 'exact', head: true }),
          supabase.from("perangkat_desa").select("*", { count: 'exact', head: true }),
          supabase.from("potensi_desa").select("*", { count: 'exact', head: true }),
        ]);

        setData({
          berita: berita.count || 0,
          staf: staf.count || 0,
          potensi: potensi.count || 0,
        });
      } catch (error) {
        console.error("Gagal load statistik:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-slate-900">
      
      {/* 1. WELCOME BANNER - TETAP SAMA */}
      <div className="relative overflow-hidden bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/5">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
              {loading ? "Syncing Database..." : "System Active"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-[1000] text-white tracking-tighter leading-none mb-4 uppercase">
            Dashboard <br />
            <span className="text-cyan-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Desa Terusan Muara</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-md text-sm md:text-base leading-relaxed">
            Pusat kendali konten Desa Terusan Muara. Kelola informasi desa secara mandiri, cepat, dan transparan.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      </div>

      {/* 2. STATS GRID (DATA DARI SUPABASE) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Artikel Berita', val: data.berita, icon: '📢', color: 'bg-white' },
          { label: 'Profil Perangkat', val: data.staf, icon: '👔', color: 'bg-white' },
          { label: 'Data Potensi', val: data.potensi, icon: '🌾', color: 'bg-white' },
          { label: 'Status Sistem', val: 'Online', icon: '🌐', color: 'bg-slate-900' },
        ].map((item, i) => (
          <div key={i} className={`${item.color} ${item.label === 'Status Sistem' ? 'text-white' : 'text-slate-900'} border border-slate-200 p-8 rounded-[35px] transition-all hover:scale-105 shadow-sm`}>
            <div className="text-3xl mb-4">{item.icon}</div>
            <p className={`text-[11px] font-black uppercase tracking-widest ${item.label === 'Status Sistem' ? 'text-slate-400' : 'text-slate-500'} mb-1`}>{item.label}</p>
            <h3 className={`text-4xl font-[1000] tracking-tighter ${item.label === 'Status Sistem' ? 'text-cyan-400' : 'text-slate-900'}`}>
              {loading ? "..." : item.val}
              {typeof item.val === 'number' && <span className="text-lg ml-1 text-slate-300 italic font-bold">Data</span>}
            </h3>
          </div>
        ))}
      </div>

      {/* 3. LAPORAN DIGITAL KKN - TETAP SAMA */}
      <div className="bg-white p-8 md:p-10 rounded-[45px] border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl grayscale">📊</div>
        <div className="relative z-10">
          <h2 className="text-3xl font-[1000] text-slate-900 tracking-tighter mb-2 italic uppercase">Laporan Digital KKN</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">Ringkasan kontribusi digital untuk Desa Terusan Muara</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-cyan-500 pl-6 py-2 bg-slate-50 rounded-r-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digitalisasi Berita</p>
              <p className="text-xl font-black text-slate-800">{loading ? "..." : data.berita} Kegiatan Terbit</p>
            </div>
            <div className="border-l-4 border-slate-900 pl-6 py-2 bg-slate-50 rounded-r-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Promosi Potensi</p>
              <p className="text-xl font-black text-slate-800">{loading ? "..." : data.potensi} Data Terdata</p>
            </div>
            <div className="border-l-4 border-cyan-400 pl-6 py-2 bg-slate-50 rounded-r-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Struktur</p>
              <p className="text-xl font-black text-slate-800">{loading ? "..." : data.staf} Profil Perangkat</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BUTTONS SECTION & 5. MODAL PANDUAN - TETAP SAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <Link 
          href="/" 
          target="_blank" 
          className="bg-slate-900 p-8 rounded-[40px] flex flex-col justify-between group cursor-pointer transition-all hover:shadow-2xl active:scale-95 border border-white/5"
        >
          <div>
            <h3 className="text-2xl font-black text-white italic mb-2 flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
              Lihat Website Utama ↗
            </h3>
            <p className="text-slate-400 text-sm font-medium">Cek hasil publikasi konten Desa Terusan Muara secara live.</p>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all text-white text-xl">
              🚀
            </div>
          </div>
        </Link>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl flex flex-col justify-between">
          <div>
            <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 inline-block">Bantuan</span>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Butuh Panduan?</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Klik tombol di bawah jika Anda memerlukan bantuan cara mengoperasikan dashboard ini.
            </p>
          </div>
          <button 
            onClick={() => setShowGuide(true)}
            className="mt-8 w-full py-4 bg-cyan-300 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-lg"
          >
            Buka Panduan Cepat 📖
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowGuide(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] p-8 md:p-12 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Panduan <span className="text-cyan-600">Admin</span></h2>
              <button onClick={() => setShowGuide(false)} className="text-slate-400 hover:text-slate-900 text-2xl font-bold transition-colors">✕</button>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="font-black text-slate-900 text-sm uppercase mb-2 flex items-center gap-2">
                   <span className="w-2 h-2 bg-cyan-500 rounded-full"></span> 1. Kelola Berita
                </h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Gunakan menu Berita Desa untuk mempublikasikan pengumuman atau kegiatan desa.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="font-black text-slate-900 text-sm uppercase mb-2 flex items-center gap-2">
                   <span className="w-2 h-2 bg-cyan-500 rounded-full"></span> 2. Manajemen Slider
                </h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Ganti foto utama di halaman depan melalui menu Manajemen Slider.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="font-black text-slate-900 text-sm uppercase mb-2 flex items-center gap-2">
                   <span className="w-2 h-2 bg-cyan-500 rounded-full"></span> 3. Publikasi Data
                </h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Data akan muncul otomatis di website utama setelah Anda menekan tombol Simpan di dashboard.</p>
              </div>
            </div>
            <button onClick={() => setShowGuide(false)} className="mt-8 w-full py-5 bg-slate-900 text-cyan-300 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all">Tutup Panduan ✅</button>
          </div>
        </div>
      )}
    </div>
  );
}