"use client";

import { useState, useEffect } from "react";
// --- TAMBAHIN updateBeritaAction DI IMPORT ---
import { tambahBeritaAction, deleteBerita, updateBeritaAction } from "@/lib/actions"; 
import { supabase } from "@/lib/supabase";

export default function CRUDBerita() {
  const [news, setNews] = useState<any[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);       
  const [loading, setLoading] = useState(true);
  
  // --- STATE BARU BUAT EDIT ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<any>(null);

  const fetchBerita = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("berita").select("*").order("tanggal", { ascending: false });
      if (error) throw error;
      setNews(data || []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBerita(); }, []);

  // --- FUNGSI BUKA MODAL EDIT ---
  const openEditModal = (berita: any) => {
    setSelectedBerita(berita);
    setIsEditMode(true);
    setFormOpen(true);
  };

  // --- HANDLE SUBMIT (Bisa Tambah / Edit) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    let result;
    if (isEditMode && selectedBerita) {
      result = await updateBeritaAction(selectedBerita.id, formData);
    } else {
      result = await tambahBeritaAction(formData);
    }

    if (result.success) {
      alert(isEditMode ? "✅ Berita Berhasil Diperbarui!" : "✅ Berita Berhasil Diterbitkan!");
      setFormOpen(false);
      setIsEditMode(false);
      setSelectedBerita(null);
      await fetchBerita(); 
    } else {
      alert("❌ Gagal: " + result.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      setLoading(true);
      const result = await deleteBerita(id);
      if (result.success) { alert("🗑️ Berhasil dihapus!"); await fetchBerita(); }
      else { alert("❌ Gagal hapus"); setLoading(false); }
    }
  };

  return (
    <div className="p-2 animate-fade-in text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-3xl font-[1000] text-slate-900 uppercase italic">
          Kelola <span className="text-cyan-600">Berita Desa</span>
        </h1>
        <button 
          onClick={() => { setIsEditMode(false); setFormOpen(true); }} 
          className="bg-cyan-300 hover:bg-slate-900 hover:text-cyan-300 text-slate-900 px-8 py-3 rounded-2xl font-black shadow-xl shadow-cyan-300/20 transition-all uppercase text-xs tracking-widest active:scale-95"
        >
          + Tambah Berita
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-10 rounded-[50px] w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <h2 className="text-2xl font-[1000] uppercase italic">
                {isEditMode ? "Edit Berita" : "Tulis Berita Baru"}
              </h2>
              <button onClick={() => setFormOpen(false)} className="text-slate-400">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Berita</label>
                <input name="judul" defaultValue={selectedBerita?.judul} type="text" className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Kegiatan</label>
                <input name="tanggal" defaultValue={selectedBerita?.tanggal} type="date" className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Gambar {isEditMode && "(Kosongkan jika tak ingin ganti)"}</label>
                <input name="gambar_utama" type="file" className="w-full text-xs" required={!isEditMode} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Isi Berita</label>
                <textarea name="konten_lengkap" defaultValue={selectedBerita?.konten} rows={4} className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50" required></textarea>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Ringkas</label>
                <textarea name="deskripsi" defaultValue={selectedBerita?.deskripsi} rows={2} className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50" required></textarea>
              </div>
              <div className="flex justify-end gap-6 pt-4">
                <button type="submit" className="bg-slate-900 text-cyan-300 px-10 py-5 rounded-[25px] font-black uppercase text-[10px] tracking-widest shadow-2xl">
                  {loading ? "Memproses..." : isEditMode ? "Simpan Perubahan 🪄" : "Terbitkan 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABEL DATA */}
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-cyan-300 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-6 text-center">No</th>
              <th className="p-6">Judul Berita</th>
              <th className="p-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {news.map((item: any, index: number) => (
              <tr key={item.id} className="hover:bg-cyan-50/50 transition-all group">
                <td className="p-6 text-slate-300 font-bold text-center">{index + 1}</td>
                <td className="p-6 font-black text-slate-800 uppercase text-xs">{item.judul}</td>
                <td className="p-6 flex justify-center gap-3">
                  {/* TOMBOL EDIT */}
                  <button onClick={() => openEditModal(item)} className="bg-amber-50 text-amber-500 p-4 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}