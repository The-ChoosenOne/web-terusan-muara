"use client";

import { useState, useEffect } from "react";
// Import fungsi sakti dari lib/actions
import { createPotensiAction, deletePotensi, updatePotensi } from "@/lib/actions";
import { getPotensi } from "@/lib/contentful"; 

export default function AdminPotensi() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [potensiList, setPotensiList] = useState<any[]>([]); 
  const [editingPotensi, setEditingPotensi] = useState<any>(null);

  // --- 1. FUNGSI REFRESH DATA ---
  async function refreshData() {
    try {
      const res = await getPotensi();
      setPotensiList(res || []);
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
    
    // Pastikan memanggil createPotensiAction sesuai lib/actions.ts
    const res = editingPotensi 
      ? await updatePotensi(editingPotensi.sys.id, formData)
      : await createPotensiAction(formData); 

    if (res.success) {
      alert("✅ " + res.message);
      setShowModal(false);
      setEditingPotensi(null);
      e.target.reset();

      // JEDA SINKRONISASI: Menunggu Contentful memproses data
      setTimeout(async () => {
        await refreshData();
        setLoading(false);
      }, 2000);
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
    <div className="p-2 animate-fade-in text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Kelola Potensi Desa</h1>
        <button 
          onClick={() => { setEditingPotensi(null); setShowModal(true); }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-bold shadow-lg transition active:scale-95"
        >
          + Tambah Potensi
        </button>
      </div>

      <div className="bg-white rounded-[30px] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-green-50/50 border-b border-green-100">
            <tr>
              <th className="p-5 font-black text-green-900 uppercase text-xs tracking-widest">Nama Potensi</th>
              <th className="p-5 font-black text-green-900 uppercase text-xs tracking-widest">Kategori</th>
              <th className="p-5 font-black text-center text-green-900 uppercase text-xs tracking-widest">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {potensiList.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-20 text-center text-gray-400 font-medium italic">
                  {loading ? "Menyinkronkan..." : "📭 Belum ada data potensi."}
                </td>
              </tr>
            ) : (
              potensiList.map((item: any) => (
                <tr key={item.sys.id} className="hover:bg-green-50/30 transition duration-300">
                  <td className="p-5 font-bold text-gray-800 uppercase text-xs">
                    {item.fields.namaPotensi || "Tanpa Nama"}
                  </td>
                  <td className="p-5">
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      {item.fields.kategori || "Umum"}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEdit(item)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition">✏️ Edit</button>
                      <button onClick={() => handleDelete(item.sys.id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50" disabled={loading}>🗑️ Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-green-900/20 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden border border-white">
            <div className="bg-green-900 p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase tracking-tight">{editingPotensi ? "✏️ Edit Potensi" : "🌾 Tambah Potensi"}</h3>
              <button onClick={() => { setShowModal(false); setEditingPotensi(null); }} className="hover:rotate-90 transition duration-300 font-bold text-2xl">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Nama Potensi</label>
                <input name="namaPotensi" defaultValue={editingPotensi?.fields?.namaPotensi || ""} type="text" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl text-black font-bold outline-none focus:border-green-500 transition" required />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Kategori</label>
                <select name="kategori" defaultValue={editingPotensi?.fields?.kategori || "Perkebunan"} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl text-black font-bold outline-none focus:border-green-500">
                  <option value="Perkebunan">Perkebunan</option>
                  <option value="UMKM">UMKM</option>
                  <option value="Wisata">Wisata</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Deskripsi</label>
                <textarea name="deskripsi" defaultValue={editingPotensi?.fields?.deskripsi || ""} rows={4} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl text-black font-bold outline-none focus:border-green-500 transition" required></textarea>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Foto {editingPotensi && "(Kosongkan jika tak ganti)"}</label>
                <input name="fotoPotensi" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 font-bold" required={!editingPotensi} />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingPotensi(null); }} className="flex-1 py-4 bg-gray-100 rounded-2xl font-black text-gray-500 hover:bg-gray-200 transition" disabled={loading}>BATAL</button>
                <button disabled={loading} type="submit" className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 shadow-lg shadow-green-900/20 transition disabled:opacity-50">
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