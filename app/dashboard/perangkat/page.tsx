"use client";

import { useState, useEffect } from "react";
// Import semua fungsi dari file sakti lib/actions
import { tambahPerangkatAction, deletePerangkat, updatePerangkat } from "@/lib/actions"; 
import { client } from "@/lib/contentful";

export default function AdminPerangkat() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perangkat, setPerangkat] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingStaf, setEditingStaf] = useState<any>(null);

  // --- 1. FUNGSI AMBIL DATA (SINKRON KE CONTENTFUL) ---
  async function getPerangkatData() {
    setFetchLoading(true);
    try {
      // Mengambil data terbaru dengan order createdAt terbaru di atas
      const res = await client.getEntries({ 
        content_type: "perangkatDesa",
        order: ["-sys.createdAt"] as any 
      });
      setPerangkat(res.items);
    } catch (err) {
      console.error("Gagal ambil data perangkat", err);
    } finally {
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    getPerangkatData();
  }, []);

  // --- 2. HANDLE SIMPAN DATA (TAMBAH & EDIT) ---
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Memanggil Server Action dari lib/actions.ts
    const res = editingStaf 
      ? await updatePerangkat(editingStaf.sys.id, formData) 
      : await tambahPerangkatAction(formData); 
    
    if (res.success) {
      alert("✅ " + res.message);
      setFormOpen(false);
      setEditingStaf(null);

      // JEDA SINKRONISASI: Menunggu Contentful indeksing data baru
      setTimeout(async () => {
        await getPerangkatData(); 
        setLoading(false);
      }, 2000);
    } else {
      alert("❌ " + res.message);
      setLoading(false);
    }
  }

  // --- 3. HANDLE HAPUS DATA ---
  async function handleHapus(id: string, nama: string) {
    if (confirm(`Yakin ingin menghapus ${nama} dari daftar perangkat desa?`)) {
      setLoading(true);
      const res = await deletePerangkat(id); 

      if (res.success) {
        alert("✅ " + res.message);
        await getPerangkatData(); // Update list otomatis
      } else {
        alert("❌ Gagal: " + res.message);
      }
      setLoading(false);
    }
  }

  return (
    <div className="p-8 text-black bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 uppercase tracking-tighter">Kelola Perangkat Desa</h1>
          <p className="text-gray-500 text-sm font-medium italic">Data otomatis muncul di slider Beranda & Profil.</p>
        </div>
        <button 
          onClick={() => { setEditingStaf(null); setFormOpen(true); }} 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transition active:scale-95 flex items-center gap-2"
        >
          ➕ Tambah Staf Baru
        </button>
      </div>

      {/* DAFTAR KARTU PERANGKAT */}
      {fetchLoading ? (
        <div className="text-center py-20 font-bold text-gray-400 animate-pulse italic">Memuat daftar tim desa...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perangkat.length > 0 ? (
            perangkat.map((item: any) => (
              <div key={item.sys.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-4 border-gray-50 shadow-inner bg-gray-50">
                  {item.fields.fotoPerangkat?.fields?.file?.url ? (
                    <img 
                      src={`https:${item.fields.fotoPerangkat.fields.file.url}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                      alt={item.fields.namaPerangkat}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] text-center p-2 font-bold italic uppercase">No Photo</div>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 text-center line-clamp-1 uppercase text-sm tracking-tight">{item.fields.namaPerangkat}</h3>
                <p className="text-green-600 font-black uppercase tracking-widest text-[10px] mt-1 bg-green-50 px-3 py-1 rounded-full">{item.fields.jabatan}</p>
                
                <div className="flex gap-2 mt-4 w-full">
                  <button 
                    onClick={() => { setEditingStaf(item); setFormOpen(true); }}
                    className="flex-1 bg-gray-50 text-gray-800 text-xs py-2 rounded-lg font-bold hover:bg-gray-200 transition"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleHapus(item.sys.id, item.fields.namaPerangkat)}
                    className="flex-1 bg-red-50 text-red-500 text-xs py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition"
                    disabled={loading}
                  >
                    {loading ? "..." : "Hapus"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 font-bold italic bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              📭 Belum ada data perangkat desa. Klik tombol tambah di atas!
            </div>
          )}
        </div>
      )}

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300 border border-white">
            <h3 className="font-black text-2xl mb-6 text-green-900 uppercase italic">
              {editingStaf ? "✏️ Edit Staf Desa" : "➕ Tambah Staf Baru"}
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Nama Lengkap</label>
                <input 
                  name="namaPerangkat" 
                  defaultValue={editingStaf?.fields?.namaPerangkat || ""}
                  type="text" 
                  className="border-2 p-4 rounded-2xl w-full outline-none focus:border-green-500 transition text-black font-bold bg-gray-50" 
                  placeholder="Contoh: Budi Santoso"
                  required 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">Jabatan</label>
                <input 
                  name="jabatan" 
                  defaultValue={editingStaf?.fields?.jabatan || ""}
                  type="text" 
                  className="border-2 p-4 rounded-2xl w-full outline-none focus:border-green-500 transition text-black font-bold bg-gray-50" 
                  placeholder="Contoh: Sekretaris Desa"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-2">
                  Foto {editingStaf && "(Biarkan kosong jika tidak ganti)"}
                </label>
                <input 
                  name="fotoPerangkat" 
                  type="file" 
                  accept="image/*" 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-green-600 file:text-white file:font-black hover:file:bg-green-700 transition cursor-pointer" 
                  required={!editingStaf} 
                />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => { setFormOpen(false); setEditingStaf(null); }} 
                  className="text-gray-400 font-black uppercase text-xs tracking-widest"
                  disabled={loading}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-green-200 hover:bg-green-700 disabled:opacity-50 transition-all"
                >
                  {loading ? "Memproses..." : "Simpan Data 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}