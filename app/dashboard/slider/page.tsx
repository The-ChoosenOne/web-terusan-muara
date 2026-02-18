"use client";

import { getProfil } from "@/lib/contentful";
import { uploadHeroPhotoAction } from "@/lib/actions";
import { useState, useEffect } from "react";

export default function HalamanSlider() {
  const [listFoto, setListFoto] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // --- 1. FUNGSI AMBIL DATA SECARA LIVE ---
  async function fetchPhotos() {
    try {
      const data = await getProfil();
      // Mengambil array fotoHero dari fields Profil Desa
      setListFoto((data?.fields?.fotoHero || []) as any[]);
    } catch (error) {
      console.error("Gagal sinkron slider:", error);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  // --- 2. HANDLE UPLOAD (DENGAN JEDA SINKRONISASI) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    // Memanggil action pusat di lib/actions.ts
    const res = await uploadHeroPhotoAction(formData);
    
    if (res?.success) {
      alert("✅ Foto Berhasil Terbit ke Beranda!");
      e.currentTarget.reset();
      
      // JEDA SINKRONISASI: Menunggu Contentful memproses Asset baru
      setTimeout(async () => {
        await fetchPhotos(); 
        setLoading(false);
      }, 2000);
    } else {
      alert("❌ Gagal: " + (res?.message || "Terjadi kesalahan"));
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 text-black">
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900 italic">
          🖼️ Manajemen Slider Beranda
        </h1>
        <p className="text-gray-600 font-bold">
          Tambah atau lihat foto kegiatan KKN yang tampil di depan.
        </p>
      </div>
      
      {/* Form Upload dengan border putus-putus */}
      <form onSubmit={handleSubmit} className="mb-12 p-8 bg-green-50 rounded-[35px] border-2 border-dashed border-green-200">
        <input 
          type="file" 
          name="fotoHero" 
          required 
          className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-green-600 file:text-white file:font-black hover:file:bg-green-700 transition cursor-pointer" 
        />
        <button 
          disabled={loading} 
          type="submit" 
          className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-10 rounded-2xl transition uppercase text-xs tracking-[0.2em] shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? "⌛ SEDANG MEMPROSES..." : "🚀 TERBITKAN KE BERANDA"}
        </button>
      </form>

      <h2 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.3em]">
        Foto yang sedang tayang:
      </h2>
      
      {/* Grid Preview Foto Slider */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {listFoto.length > 0 ? (
          listFoto.map((foto: any, i: number) => (
            <div key={i} className="group relative h-44 bg-gray-100 rounded-[30px] overflow-hidden border border-gray-100 shadow-sm">
              {foto.fields?.file?.url ? (
                <img 
                  src={`https:${foto.fields.file.url}`} 
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-[1500ms]" 
                  alt="Slider Desa" 
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-[10px] font-black italic uppercase">
                  Gambar Tidak Ditemukan
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 font-bold col-span-full italic py-10 text-center bg-gray-50 rounded-3xl">
            📭 Belum ada foto yang tayang di slider...
          </p>
        )}
      </div>
    </div>
  );
}