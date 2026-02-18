"use client";

import { useState, useEffect } from "react";
// Pastikan import ini mengarah ke file sakti kita di @/lib/actions
import { tambahBeritaAction, deleteBerita } from "@/lib/actions";
import { getBerita } from "@/lib/contentful"; 

export default function CRUDBerita() {
  const [news, setNews] = useState<any[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);       
  const [loading, setLoading] = useState(true);

  // --- 1. FUNGSI AMBIL DATA ---
  const fetchBerita = async () => {
    setLoading(true);
    try {
      // getBerita dari contentful.ts mengambil data terbaru
      const data = await getBerita();
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
    
    // Memanggil fungsi dari lib/actions.ts
    const result = await tambahBeritaAction(formData);

    if (result.success) {
      alert("✅ Berita Berhasil Diterbitkan!");
      setFormOpen(false); 
      form.reset(); 
      
      // JEDA SINKRONISASI: Menunggu Contentful memproses data baru
      setTimeout(async () => {
        await fetchBerita(); 
      }, 2000);
    } else {
      alert("❌ Gagal: " + result.message);
      setLoading(false);
    }
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
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tighter">Kelola Berita Desa</h1>
        <button 
          onClick={() => setFormOpen(true)} 
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all active:scale-95"
        >
          + Tambah Berita
        </button>
      </div>

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-8 rounded-[35px] w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <h2 className="text-2xl font-black mb-6 text-gray-900 border-b pb-4 uppercase italic">Tulis Berita Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Judul Berita</label>
                <input name="judul" type="text" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-gray-900 font-bold focus:border-green-500 outline-none transition-all bg-gray-50 text-black" placeholder="Masukkan judul..." required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Tanggal Kegiatan</label>
                <input name="tanggal" type="date" className="w-full border-2 border-gray-100 p-4 rounded-2xl text-gray-900 font-bold focus:border-green-500 outline-none transition-all bg-gray-50 text-black" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Upload Gambar Utama</label>
                <input name="gambar_utama" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-green-600 file:text-white file:font-bold hover:file:bg-green-700 transition-all" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Isi Berita Lengkap</label>
                <textarea name="konten_lengkap" rows={4} className="w-full border-2 border-gray-100 p-4 rounded-2xl text-gray-900 font-bold focus:border-green-500 outline-none transition-all bg-gray-50 text-black" placeholder="Tulis detail berita..." required></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Deskripsi Berita (Ringkasan)</label>
                <textarea name="deskripsi" rows={2} className="w-full border-2 border-gray-100 p-4 rounded-2xl text-gray-900 font-bold focus:border-green-500 outline-none transition-all bg-gray-50 text-black" placeholder="Ringkasan singkat..." required></textarea>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setFormOpen(false)} className="text-gray-400 font-black uppercase text-xs tracking-widest">Batal</button>
                <button type="submit" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-green-200 hover:bg-green-700 disabled:opacity-50 transition-all" disabled={loading}>
                  {loading ? "Memproses..." : "Simpan & Terbitkan 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABEL DATA */}
      <div className="bg-white rounded-[35px] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              <th className="p-6">No</th>
              <th className="p-6">Judul Berita</th>
              <th className="p-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {news.length > 0 ? (
              news.map((item: any, index: number) => (
                <tr key={item.sys.id} className="hover:bg-green-50/50 transition-all group">
                  <td className="p-6 text-gray-400 font-bold">{index + 1}</td>
                  <td className="p-6 font-black text-gray-800 uppercase text-xs tracking-tight group-hover:text-green-700 transition-colors">
                    {item.fields?.judul || "Judul Kosong"}
                  </td>
                  <td className="p-6 flex justify-center gap-3">
                    <button onClick={() => handleDelete(item.sys.id)} className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-20 text-center text-gray-400 font-bold italic">
                  {loading ? "Sedang menyinkronkan data..." : "📭 Belum ada berita. Klik tombol tambah di atas!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}