"use client";

import { useState, useEffect } from "react";
import { uploadHeroPhotoAction, deleteSlider } from "@/lib/actions"; // Pastiin path import ini bener ya Jak
import { supabase } from "@/lib/supabase";
import { Trash2, Image as ImageIcon } from "lucide-react"; // Pake icon lucide biar sangar

export default function HalamanSlider() {
  const [listFoto, setListFoto] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // --- 1. FUNGSI AMBIL DATA LIVE ---
  async function fetchPhotos() {
    try {
      const { data, error } = await supabase
        .from("slider_beranda")
        .select("*")
        .order("id", { ascending: false });
      
      if (error) throw error;
      setListFoto(data || []);
    } catch (error) {
      console.error("Gagal sinkron slider:", error);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  // --- 2. HANDLE UPLOAD ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const target = e.currentTarget;
    const formData = new FormData(target);
    const res = await uploadHeroPhotoAction(formData);
    
    if (res?.success) {
      alert("✅ Foto Berhasil Terbit ke Beranda!");
      target.reset();
      await fetchPhotos(); 
    } else {
      alert("❌ Gagal: " + (res?.message || "Terjadi kesalahan"));
    }
    setLoading(false);
  };

  // --- 3. HANDLE DELETE ---
  const handleDelete = async (id: number) => {
    if (confirm("Yakin mau hapus foto dokumentasi ini?")) {
      try {
        await deleteSlider(id);
        alert("🗑️ Foto berhasil dihapus!");
        await fetchPhotos(); // Refresh list biar langsung ilang dari dashboard
      } catch (err: any) {
        alert("Gagal hapus: " + err.message);
      }
    }
  };

  return (
    <div className="p-8 bg-white rounded-[40px] shadow-sm border border-slate-100 text-slate-900">
      <div className="mb-10">
        <h1 className="text-3xl font-[1000] uppercase tracking-tighter text-slate-900 italic">
          🖼️ Manajemen <span className="text-amber-600">Slider Beranda</span>
        </h1>
        <p className="text-slate-500 font-bold mt-2">
          Kelola foto dokumentasi Desa Terusan Muara yang tampil di slider utama.
        </p>
      </div>
      
      {/* FORM UPLOAD */}
      <form onSubmit={handleSubmit} className="mb-12 p-10 bg-slate-50 rounded-[45px] border-4 border-dashed border-slate-200 group hover:border-amber-200 transition-colors">
        <input 
          type="file" 
          name="fotoHero" 
          required 
          className="mb-8 block w-full text-sm text-slate-500 file:mr-6 file:py-3 file:px-8 file:rounded-2xl file:border-0 file:bg-slate-900 file:text-amber-400 file:font-black hover:file:bg-black transition-all cursor-pointer" 
        />
        <button 
          disabled={loading} 
          type="submit" 
          className="bg-amber-300 hover:bg-slate-900 hover:text-amber-300 text-slate-900 font-black py-4 px-12 rounded-2xl transition-all uppercase text-xs tracking-[0.3em] shadow-xl shadow-amber-300/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? "⌛ SEDANG MEMPROSES..." : "🚀 TERBITKAN KE BERANDA"}
        </button>
      </form>

      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">
          Live Preview Slider
        </h2>
        <div className="h-px w-full bg-slate-100"></div>
      </div>
      
      {/* LIST FOTO SLIDER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {listFoto.length > 0 ? (
          listFoto.map((foto) => (
            <div key={foto.id} className="group relative h-60 bg-slate-100 rounded-[35px] overflow-hidden border border-slate-200 shadow-lg hover:shadow-amber-500/10 transition-all duration-500">
              {foto.foto_url ? (
                <>
                  <img 
                    src={foto.foto_url} 
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-[2000ms] grayscale-[20%] group-hover:grayscale-0" 
                    alt="Slider Desa" 
                  />
                  
                  {/* TOMBOL DELETE - MUNCUL PAS HOVER */}
                  <button
                    onClick={() => handleDelete(foto.id)}
                    className="absolute top-4 right-4 z-20 p-3 bg-red-500 hover:bg-slate-900 text-white rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* OVERLAY INFO */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                      Aktif di Beranda
                    </span>
                  </div>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <ImageIcon size={32} className="opacity-20" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Broken Image</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-100">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              📭 Belum ada foto yang tayang...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}