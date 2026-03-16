"use client";

import { useState, useEffect } from "react";
import { tambahBeritaAction, deleteBerita } from "@/lib/actions";
import { supabase } from "@/lib/supabase"; // Ganti ke Supabase sakti

export default function CRUDBerita() {
  const [news, setNews] = useState<any[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);       
  const [loading, setLoading] = useState(true);

  // --- 1. FUNGSI AMBIL DATA (Supabase Version) ---
  const fetchBerita = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("tanggal", { ascending: false }); // Urutkan dari yang terbaru
      
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Gagal ambil berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // --- 2. HANDLE TAMBAH DATA ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const result = await tambahBeritaAction(formData);

    if (result.success) {
      alert("✅ Berita Berhasil Diterbitkan!");
      setFormOpen(false); 
      form.reset(); 
      // Gak perlu nunggu 2 detik lagi Jak, langsung hajar fetch!
      await fetchBerita(); 
    } else {
      alert("❌ Gagal: " + result.message);
    }
    setLoading(false);
  };

  // --- 3. HANDLE HAPUS DATA ---
  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      setLoading(true);
      const result = await deleteBerita(id);
      if (result.success) {
        alert("🗑️ Berhasil dihapus!");
        await fetchBerita();
      } else {
        alert("❌ Gagal hapus: " + result.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-2 animate-fade-in text-slate-900">
      {/* HEADER - TETAP SAMA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic">
          Kelola <span className="text-cyan-600">Berita Desa</span>
        </h1>
        <button 
          onClick={() => setFormOpen(true)} 
          className="bg-cyan-300 hover:bg-slate-900 hover:text-cyan-300 text-slate-900 px-8 py-3 rounded-2xl font-black shadow-xl shadow-cyan-300/20 transition-all uppercase text-xs tracking-widest active:scale-95"
        >
          + Tambah Berita
        </button>
      </div>

      {/* MODAL FORM - TETAP SAMA */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-10 rounded-[50px] w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-white">
            <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
              <h2 className="text-2xl font-[1000] text-slate-900 uppercase italic tracking-tighter">Tulis Berita Baru</h2>
              <button onClick={() => setFormOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors text-2xl">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-2">Judul Berita</label>
                <input name="judul" type="text" className="w-full border-2 border-slate-50 p-5 rounded-2xl text-slate-900 font-bold focus:border-cyan-400 outline-none transition-all bg-slate-50/50 focus:bg-white" placeholder="Masukkan judul..." required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-2">Tanggal Kegiatan</label>
                <input name="tanggal" type="date" className="w-full border-2 border-slate-50 p-5 rounded-2xl text-slate-900 font-bold focus:border-cyan-400 outline-none transition-all bg-slate-50/50 focus:bg-white" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-2">Upload Gambar Utama</label>
                <input name="gambar_utama" type="file" accept="image/*" className="w-full text-xs text-slate-500 file:mr-6 file:py-3 file:px-8 file:rounded-2xl file:border-0 file:bg-slate-900 file:text-cyan-300 file:font-black hover:file:bg-black transition-all cursor-pointer shadow-sm" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-2">Isi Berita Lengkap</label>
                <textarea name="konten_lengkap" rows={4} className="w-full border-2 border-slate-50 p-5 rounded-2xl text-slate-900 font-bold focus:border-cyan-400 outline-none transition-all bg-slate-50/50 focus:bg-white shadow-inner" placeholder="Tulis detail berita..." required></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-2">Deskripsi Berita (Ringkasan)</label>
                <textarea name="deskripsi" rows={2} className="w-full border-2 border-slate-50 p-5 rounded-2xl text-slate-900 font-bold focus:border-cyan-400 outline-none transition-all bg-slate-50/50 focus:bg-white shadow-inner" placeholder="Ringkasan singkat..." required></textarea>
              </div>
              <div className="flex justify-end items-center gap-6 mt-10 pt-4">
                <button type="button" onClick={() => setFormOpen(false)} className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-slate-900 transition-colors">Batal</button>
                <button type="submit" className="bg-slate-900 text-cyan-300 px-10 py-5 rounded-[25px] font-[1000] uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-black disabled:opacity-50 transition-all active:scale-95" disabled={loading}>
                  {loading ? "Memproses..." : "Simpan & Terbitkan 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABEL DATA - SESUAIKAN VARIABLE */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-900/5 overflow-hidden border border-slate-50">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-cyan-300 text-[10px] font-black uppercase tracking-[0.3em]">
            <tr>
              <th className="p-6">No</th>
              <th className="p-6">Judul Berita</th>
              <th className="p-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {news.length > 0 ? (
              news.map((item: any, index: number) => (
                <tr key={item.id} className="hover:bg-cyan-50/50 transition-all group">
                  <td className="p-6 text-slate-300 font-bold">{index + 1}</td>
                  <td className="p-6 font-black text-slate-800 uppercase text-xs tracking-tight group-hover:text-cyan-600 transition-colors">
                    {item.judul || "Judul Kosong"}
                  </td>
                  <td className="p-6 flex justify-center gap-3">
                    <button onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-24 text-center text-slate-400 font-black uppercase tracking-[0.3em] text-xs italic">
                  {loading ? "⌛ Menyinkronkan data..." : "📭 Belum ada berita. Klik tombol tambah!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}