"use client";

import { useState, useEffect } from "react";
// Import action yang sudah kita siapkan untuk Supabase
import { updateProfilDesaAction } from "@/lib/actions";
import { supabase } from "@/lib/supabase";

export default function DashboardProfil() {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  // --- 1. AMBIL DATA PROFIL DARI SUPABASE ---
  async function fetchProfil() {
    try {
      // Kita ambil baris pertama (ID: 1) dari tabel profil_desa
      const { data, error } = await supabase
        .from("profil_desa")
        .select("*")
        .eq("id", 1)
        .single();
      
      if (data) {
        setInitialData(data);
      } else {
        console.log("Data Profil Belum Ada di Supabase");
      }
      if (error) throw error;
    } catch (error) {
      console.error("Gagal mengambil profil:", error);
    }
  }

  useEffect(() => {
    fetchProfil();
  }, []);

  // --- 2. HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Panggil action Supabase
    const result = await updateProfilDesaAction(formData);
    
    if (result.success) {
      alert("✅ " + result.message);
      // Langsung refresh tanpa nunggu lama-lama
      await fetchProfil(); 
    } else {
      alert("❌ Gagal: " + result.message);
    }
    setLoading(false);
  };

  // Tampilan loading awal
  if (!initialData && !loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
        <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-xs italic">Menghubungkan ke database Desa...</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-slate-900 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic">
          🏢 Kelola <span className="text-amber-600">Profil Lengkap</span> Desa
        </h1>
        <div className="bg-slate-900 text-amber-300 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30">
          {loading ? "⌛ Sedang Sinkron..." : "✅ Mode Edit Aktif"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 pb-40">
        {/* SECTION 1: PROFIL UMUM - SESUAIKAN NAME & DEFAULT VALUE */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
          <h2 className="text-xs font-black pb-4 text-slate-400 flex items-center gap-3 uppercase tracking-[0.3em] border-b border-slate-50">
            <span className="text-amber-500 text-lg">📍</span> Informasi Umum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Judul Halaman Profil</label>
              <input name="judul_profil" defaultValue={initialData?.judul_profil} type="text" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold focus:border-amber-400 focus:bg-white outline-none transition-all bg-slate-50/50" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Slogan Desa</label>
              <input name="tagline" defaultValue={initialData?.tagline} type="text" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold focus:border-amber-400 focus:bg-white outline-none transition-all bg-slate-50/50" required />
            </div>
          </div>
        </div>

        {/* SECTION 2: STATISTIK DESA */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <h2 className="text-xs font-black pb-4 mb-8 text-slate-400 flex items-center gap-3 uppercase tracking-[0.3em] border-b border-slate-50">
            <span className="text-amber-500 text-lg">📊</span> Statistik Wilayah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Jumlah Penduduk (Jiwa)</label>
              <input name="jumlah_penduduk" defaultValue={initialData?.jumlah_penduduk} type="number" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold bg-slate-50/50 focus:border-amber-400 outline-none" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Jumlah KK</label>
              <input name="kepala_keluarga" defaultValue={initialData?.kepala_keluarga} type="number" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold bg-slate-50/50 focus:border-amber-400 outline-none" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Luas Wilayah (Km²)</label>
              <input name="luas_wilayah" defaultValue={initialData?.luas_wilayah} type="text" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold bg-slate-50/50 focus:border-amber-400 outline-none" required />
            </div>
          </div>
        </div>

        {/* SECTION 3: SEJARAH & VISI MISI */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
          <h2 className="text-xs font-black pb-4 text-slate-400 flex items-center gap-3 uppercase tracking-[0.3em] border-b border-slate-50">
            <span className="text-amber-500 text-lg">📖</span> Narasi Desa
          </h2>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Sejarah Lengkap Desa</label>
            <textarea name="sejarah" defaultValue={initialData?.sejarah} rows={6} className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold focus:border-amber-400 focus:bg-white outline-none transition-all bg-slate-50/50" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2 ml-2">🎯 Visi Desa</label>
              <textarea name="visi" defaultValue={initialData?.visi} rows={5} className="w-full border-2 border-amber-100 p-6 rounded-[30px] text-slate-900 font-bold focus:border-amber-400 transition shadow-inner bg-amber-50/30 outline-none" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 ml-2">🚀 Misi Desa</label>
              <textarea name="misi" defaultValue={initialData?.misi} rows={5} className="w-full border-2 border-slate-200 p-6 rounded-[30px] text-slate-900 font-bold focus:border-slate-400 transition shadow-inner bg-slate-50 outline-none" required />
            </div>
          </div>
        </div>

        {/* SECTION 4: SAMBUTAN KEPALA DESA */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
          <h2 className="text-xs font-black pb-4 text-slate-400 flex items-center gap-3 uppercase tracking-[0.3em] border-b border-slate-50">
            <span className="text-amber-500 text-lg">👤</span> Sambutan Kepala Desa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Nama Lengkap Kades</label>
                <input name="nama_kades" defaultValue={initialData?.nama_kades} type="text" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold bg-slate-50/50 focus:border-amber-400 outline-none" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Judul Sambutan</label>
                <input name="judul_sambutan" defaultValue={initialData?.judul_sambutan} type="text" className="w-full border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold bg-slate-50/50 focus:border-amber-400 outline-none" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Ganti Foto Kades (Opsional)</label>
                <input name="foto_kades" type="file" accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-slate-900 file:text-amber-300 file:font-black hover:file:bg-black transition cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Pesan Sambutan</label>
              <textarea name="isi_sambutan" defaultValue={initialData?.isi_sambutan} rows={10} className="w-full border-2 border-slate-100 p-6 rounded-[30px] text-slate-900 font-bold bg-slate-50/50 focus:border-amber-400 focus:bg-white transition-all outline-none" required />
            </div>
          </div>
        </div>

        {/* TOMBOL SIMPAN MELAYANG */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-50">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-amber-300 hover:bg-slate-900 hover:text-amber-300 text-slate-900 font-[1000] py-6 rounded-[30px] shadow-2xl disabled:opacity-50 text-xl transition-all active:scale-95 flex items-center justify-center gap-4 border-4 border-white uppercase tracking-[0.2em]"
          >
            {loading ? "⌛ SEDANG MENYINKRONKAN..." : "💾 SIMPAN PERUBAHAN"}
          </button>
        </div>
      </form>
    </div>
  );
}