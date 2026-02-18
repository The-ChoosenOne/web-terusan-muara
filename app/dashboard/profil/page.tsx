"use client";

import { useState, useEffect } from "react";
// Import fungsi sakti dari lib/actions
import { updateProfilDesaAction } from "@/lib/actions";
import { client } from "@/lib/contentful";

export default function DashboardProfil() {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  // --- 1. AMBIL DATA PROFIL AWAL (DENGAN PENGAMAN) ---
  async function fetchProfil() {
    try {
      // Pastikan Content Type ID adalah 'profilDesa'
      const resProfil = await client.getEntries({ content_type: "profilDesa", limit: 1 });
      
      // PENGAMAN: Cek apakah item ada sebelum di-set
      if (resProfil && resProfil.items && resProfil.items.length > 0) {
        setInitialData(resProfil.items[0].fields);
      } else {
        console.log("Data Profil Belum Ada di Contentful");
      }
    } catch (error) {
      console.error("Gagal mengambil profil:", error);
    }
  }

  useEffect(() => {
    fetchProfil();
  }, []);

  // --- 2. HANDLE SUBMIT (SINKRONISASI OTOMATIS) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Panggil action dari lib/actions.ts
    const result = await updateProfilDesaAction(formData);
    
    if (result.success) {
      alert("✅ " + result.message);
      
      // JEDA SINKRONISASI: Tunggu Contentful memproses data
      setTimeout(async () => {
        await fetchProfil(); 
        setLoading(false);
      }, 2000);
    } else {
      alert("❌ Gagal: " + result.message);
      setLoading(false);
    }
  };

  // Tampilan loading awal jika data belum ditarik
  if (!initialData && !loading) {
    return <div className="p-20 text-center font-bold text-gray-400 animate-pulse italic">Menghubungkan ke database Desa...</div>;
  }

  return (
    <div className="p-8 text-black bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-green-800 uppercase tracking-tighter italic">🏢 Kelola Profil Lengkap Desa</h1>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
          {loading ? "⌛ Sedang Sinkron..." : "✅ Mode Edit Aktif"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-32">
        {/* SECTION 1: PROFIL UMUM */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold border-b pb-2 text-gray-700 flex items-center gap-2 uppercase tracking-widest text-xs">
            📍 Informasi Umum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Judul Halaman Profil</label>
              <input name="judul" defaultValue={initialData?.judulProfil} type="text" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold focus:border-green-500 outline-none transition-all bg-gray-50" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Slogan Desa</label>
              <input name="tagline" defaultValue={initialData?.tagline} type="text" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold focus:border-green-500 outline-none transition-all bg-gray-50" required />
            </div>
          </div>
        </div>

        {/* SECTION 2: STATISTIK DESA */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold border-b pb-2 mb-6 text-gray-700 flex items-center gap-2 uppercase tracking-widest text-xs">
            📊 Statistik Wilayah (Tampil di Beranda)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Jumlah Penduduk (Jiwa)</label>
              <input name="penduduk" defaultValue={initialData?.jumlahPenduduk} type="number" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold bg-gray-50" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Jumlah KK</label>
              <input name="kk" defaultValue={initialData?.kepalaKeluarga} type="number" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold bg-gray-50" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Luas Wilayah (Km²)</label>
              <input name="luas" defaultValue={initialData?.luasWilayah} type="text" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold bg-gray-50" required />
            </div>
          </div>
        </div>

        {/* SECTION 3: SEJARAH & VISI MISI */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold border-b pb-2 text-gray-700 flex items-center gap-2 uppercase tracking-widest text-xs">
            📖 Narasi Desa
          </h2>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Sejarah Lengkap Desa</label>
            <textarea name="sejarah" defaultValue={initialData?.sejarah} rows={6} className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold focus:border-green-500 outline-none transition-all bg-gray-50" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-green-700 uppercase tracking-widest mb-1 ml-2">🎯 Visi Desa</label>
              <textarea name="visi" defaultValue={initialData?.visi} rows={4} className="w-full border-2 border-green-50 p-4 rounded-2xl text-black font-bold focus:border-green-500 transition shadow-inner bg-green-50/30" required />
            </div>
            <div>
              <label className="block text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-1 ml-2">🚀 Misi Desa</label>
              <textarea name="misi" defaultValue={initialData?.misi} rows={4} className="w-full border-2 border-yellow-50 p-4 rounded-2xl text-black font-bold focus:border-yellow-500 transition shadow-inner bg-yellow-50/30" required />
            </div>
          </div>
        </div>

        {/* SECTION 4: SAMBUTAN KEPALA DESA */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold border-b pb-2 text-gray-700 flex items-center gap-2 uppercase tracking-widest text-xs">
            👤 Sambutan Kepala Desa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Nama Lengkap Kades</label>
                <input name="namaKades" defaultValue={initialData?.namaKepalaDesa} type="text" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold bg-gray-50" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Judul Sambutan</label>
                <input name="judulSambutan" defaultValue={initialData?.judulSambutan} type="text" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold bg-gray-50" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Ganti Foto Kades (Opsional)</label>
                <input name="fotoKades" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-green-600 file:text-white file:font-black hover:file:bg-green-700 transition" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Pesan Sambutan</label>
              <textarea name="isiSambutan" defaultValue={initialData?.isiSambutan} rows={8} className="w-full border-2 border-gray-100 p-4 rounded-2xl text-black font-bold bg-gray-50" required />
            </div>
          </div>
        </div>

        {/* TOMBOL SIMPAN MELAYANG */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-3xl shadow-2xl disabled:opacity-50 text-xl transition-all active:scale-95 flex items-center justify-center gap-4 border-4 border-white uppercase tracking-widest"
          >
            {loading ? "⌛ SEDANG MENYINKRONKAN..." : "💾 SIMPAN SEMUA PERUBAHAN"}
          </button>
        </div>
      </form>
    </div>
  );
}