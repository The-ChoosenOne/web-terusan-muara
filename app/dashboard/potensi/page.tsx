"use client";

import { useState, useEffect } from "react";
// Pake fungsi sakti yang sudah disesuaikan ke Supabase
import { createPotensiAction, deletePotensi, updatePotensi } from "@/lib/actions";
import { supabase } from "@/lib/supabase"; 

export default function AdminPotensi() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [potensiList, setPotensiList] = useState<any[]>([]); 
  const [editingPotensi, setEditingPotensi] = useState<any>(null);

  // --- 1. FUNGSI REFRESH DATA (Supabase Version) ---
  async function refreshData() {
    try {
      const { data, error } = await supabase
        .from("potensi_desa")
        .select("*")
        .order("id", { ascending: false });
        
      if (error) throw error;
      setPotensiList(data || []);
    } catch (error) {
      console.error("Gagal sinkron data potensi:", error);
    }
  }
  
  useEffect(() => {
    refreshData();
  }, []);

  // --- 2. LOGIKA SIMPAN (TAMBAH & EDIT) ---
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Kirim ID langsung tanpa .sys.id
    const res = editingPotensi 
      ? await updatePotensi(editingPotensi.id, formData)
      : await createPotensiAction(formData); 

    if (res.success) {
      alert("✅ " + res.message);
      setShowModal(false);
      setEditingPotensi(null);
      e.target.reset();
      
      // Langsung refresh tanpa nunggu 2 detik
      await refreshData();
      setLoading(false);
    } else {
      alert("❌ " + res.message);
      setLoading(false);
    }
  }

  // --- 3. LOGIKA HAPUS ---
  async function handleDelete(id: string) {
    if (confirm("Yakin ingin menghapus potensi ini?")) {
      setLoading(true);
      const res = await deletePotensi(id);
      
      if (res.success) {
        alert("✅ " + res.message);
        await refreshData(); 
      } else {
        alert("❌ " + res.message);
      }
      setLoading(false);
    }
  }

  function handleEdit(item: any) {
    setEditingPotensi(item);
    setShowModal(true);
  }

  return (
    <div className="p-2 animate-fade-in text-slate-900">
      {/* HEADER - TETAP SAMA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic">
          Kelola <span className="text-cyan-600">Potensi Desa</span>
        </h1>
        <button 
          onClick={() => { setEditingPotensi(null); setShowModal(true); }}
          className="bg-cyan-300 hover:bg-slate-900 hover:text-cyan-300 text-slate-900 px-8 py-3 rounded-2xl font-black shadow-xl shadow-cyan-300/20 transition-all uppercase text-xs tracking-widest active:scale-95"
        >
          + Tambah Potensi
        </button>
      </div>

      {/* TABEL DATA - SESUAIKAN VARIABEL */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-900/5 overflow-hidden border border-slate-50">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="p-6 font-black text-cyan-300 uppercase text-[10px] tracking-[0.3em]">Nama Potensi</th>
              <th className="p-6 font-black text-cyan-300 uppercase text-[10px] tracking-[0.3em]">Kategori</th>
              <th className="p-6 font-black text-center text-cyan-300 uppercase text-[10px] tracking-[0.3em]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {potensiList.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-24 text-center text-slate-400 font-black uppercase tracking-widest text-xs italic">
                  {loading ? "⌛ Menyinkronkan..." : "📭 Belum ada data potensi."}
                </td>
              </tr>
            ) : (
              potensiList.map((item: any) => (
                <tr key={item.id} className="hover:bg-cyan-50/50 transition duration-300">
                  <td className="p-6 font-black text-slate-800 uppercase text-xs tracking-tight">
                    {item.nama_potensi || "Tanpa Nama"}
                  </td>
                  <td className="p-6">
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                      {item.kategori || "Umum"}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleEdit(item)} className="bg-slate-50 hover:bg-slate-900 hover:text-cyan-300 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">✏️ Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm disabled:opacity-50" disabled={loading}>🗑️ Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM - SESUAIKAN DEFAULT VALUE */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[50px] shadow-2xl w-full max-w-xl overflow-hidden border border-white">
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center border-b border-cyan-500/20">
              <h3 className="font-[1000] uppercase tracking-tighter text-xl italic">{editingPotensi ? "✏️ Edit Potensi" : "🌾 Tambah Potensi"}</h3>
              <button onClick={() => { setShowModal(false); setEditingPotensi(null); }} className="hover:rotate-90 hover:text-cyan-300 transition duration-300 font-bold text-2xl">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Nama Potensi</label>
                <input name="namaPotensi" defaultValue={editingPotensi?.nama_potensi || ""} type="text" className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold outline-none focus:border-cyan-400 focus:bg-white transition-all" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Kategori</label>
                <select name="kategori" defaultValue={editingPotensi?.kategori || "Perkebunan"} className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold outline-none focus:border-cyan-400 appearance-none cursor-pointer">
                  <option value="Perkebunan">Perkebunan</option>
                  <option value="UMKM">UMKM</option>
                  <option value="Wisata">Wisata</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Deskripsi Lengkap</label>
                <textarea name="deskripsi" defaultValue={editingPotensi?.deskripsi || ""} rows={4} className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl text-slate-900 font-bold outline-none focus:border-cyan-400 focus:bg-white transition-all shadow-inner" required></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Upload Foto {editingPotensi && "(Biarkan kosong jika tak ganti)"}</label>
                <input name="fotoPotensi" type="file" accept="image/*" className="w-full text-xs text-slate-500 file:mr-6 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-slate-900 file:text-cyan-300 file:font-black hover:file:bg-black transition-all cursor-pointer" required={!editingPotensi} />
              </div>

              <div className="flex gap-6 pt-6">
                <button type="button" onClick={() => { setShowModal(false); setEditingPotensi(null); }} className="flex-1 py-5 bg-slate-50 rounded-[25px] font-black text-slate-400 hover:bg-slate-100 transition-all uppercase text-xs tracking-widest" disabled={loading}>BATAL</button>
                <button disabled={loading} type="submit" className="flex-1 py-5 bg-slate-900 text-cyan-300 rounded-[25px] font-[1000] hover:bg-black shadow-2xl transition-all disabled:opacity-50 uppercase text-xs tracking-[0.3em]">
                  {loading ? "PROSES..." : "SIMPAN 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}