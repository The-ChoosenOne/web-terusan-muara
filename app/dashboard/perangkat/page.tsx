"use client";

import { useState, useEffect } from "react";
// Import semua fungsi dari file sakti lib/actions
import { tambahPerangkatAction, deletePerangkat, updatePerangkat } from "@/lib/actions"; 
import { supabase } from "@/lib/supabase"; // Ganti Contentful ke Supabase

export default function AdminPerangkat() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perangkat, setPerangkat] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editingStaf, setEditingStaf] = useState<any>(null);

  // --- 1. FUNGSI AMBIL DATA (SINKRON KE SUPABASE) ---
  async function getPerangkatData() {
    setFetchLoading(true);
    try {
      // Mengambil data dari tabel perangkat_desa
      const { data, error } = await supabase
        .from("perangkat_desa")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setPerangkat(data || []);
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
      ? await updatePerangkat(editingStaf.id, formData) 
      : await tambahPerangkatAction(formData); 
    
    if (res.success) {
      alert("✅ " + res.message);
      setFormOpen(false);
      setEditingStaf(null);

      // SUPABASE INSTAN: Langsung fetch data tanpa nunggu lama
      await getPerangkatData(); 
      setLoading(false);
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
    <div className="p-8 text-slate-900 bg-slate-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter italic">
            Kelola <span className="text-cyan-600">Perangkat Desa</span>
          </h1>
          <p className="text-slate-400 text-sm font-bold mt-1">Data otomatis sinkron ke slider Beranda & Profil.</p>
        </div>
        <button 
          onClick={() => { setEditingStaf(null); setFormOpen(true); }} 
          className="bg-cyan-300 hover:bg-slate-900 hover:text-cyan-300 text-slate-900 px-8 py-4 rounded-2xl font-[1000] shadow-xl shadow-cyan-300/20 transition-all active:scale-95 flex items-center gap-3 uppercase text-xs tracking-widest"
        >
          ➕ Tambah Staf Baru
        </button>
      </div>

      {/* DAFTAR KARTU PERANGKAT */}
      {fetchLoading ? (
        <div className="text-center py-20 font-black text-slate-400 animate-pulse italic uppercase tracking-[0.3em] text-xs">
          Menyinkronkan daftar tim desa...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perangkat.length > 0 ? (
            perangkat.map((item: any) => (
              <div key={item.id} className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-2xl transition-all duration-500 hover:border-cyan-100">
                <div className="w-28 h-28 rounded-3xl overflow-hidden mb-6 border-4 border-slate-50 shadow-lg bg-slate-50">
                  {item.foto_url ? (
                    <img 
                      src={item.foto_url} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                      alt={item.nama}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] text-center p-4 font-black italic uppercase tracking-widest">No Photo</div>
                  )}
                </div>
                <h3 className="font-black text-slate-800 text-center line-clamp-1 uppercase text-sm tracking-tight mb-2">{item.nama}</h3>
                <span className="text-cyan-700 font-black uppercase tracking-[0.2em] text-[9px] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-100 shadow-sm">
                  {item.jabatan}
                </span>
                
                <div className="flex gap-3 mt-8 w-full">
                  <button 
                    onClick={() => { setEditingStaf(item); setFormOpen(true); }}
                    className="flex-1 bg-slate-50 text-slate-600 text-[10px] py-3 rounded-xl font-black uppercase tracking-widest hover:bg-slate-900 hover:text-cyan-300 transition-all shadow-sm"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleHapus(item.id, item.nama)}
                    className="flex-1 bg-red-50 text-red-500 text-[10px] py-3 rounded-xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "..." : "Hapus"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center text-slate-300 font-black uppercase tracking-[0.3em] bg-white rounded-[50px] border-4 border-dashed border-slate-50 shadow-inner text-xs">
              📭 Belum ada data perangkat desa.
            </div>
          )}
        </div>
      )}

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-10 rounded-[50px] w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-300 border border-white">
            <h3 className="font-[1000] text-3xl mb-8 text-slate-900 uppercase italic tracking-tighter">
              {editingStaf ? "✏️ Edit Staf Desa" : "➕ Tambah Staf Baru"}
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Nama Lengkap</label>
                <input 
                  name="namaPerangkat" 
                  defaultValue={editingStaf?.nama || ""}
                  type="text" 
                  className="border-2 border-slate-50 p-5 rounded-2xl w-full outline-none focus:border-cyan-400 transition-all text-slate-900 font-bold bg-slate-50/50" 
                  placeholder="Contoh: Budi Santoso"
                  required 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Jabatan Resmi</label>
                <input 
                  name="jabatan" 
                  defaultValue={editingStaf?.jabatan || ""}
                  type="text" 
                  className="border-2 border-slate-50 p-5 rounded-2xl w-full outline-none focus:border-cyan-400 transition-all text-slate-900 font-bold bg-slate-50/50" 
                  placeholder="Contoh: Sekretaris Desa"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">
                  Foto {editingStaf && "(Kosongkan jika tidak ganti)"}
                </label>
                <input 
                  name="fotoPerangkat" 
                  type="file" 
                  accept="image/*" 
                  className="w-full text-xs text-slate-500 file:mr-6 file:py-3 file:px-8 file:rounded-2xl file:border-0 file:bg-slate-900 file:text-cyan-300 file:font-black hover:file:bg-black transition-all cursor-pointer shadow-sm" 
                  required={!editingStaf} 
                />
              </div>

              <div className="flex justify-end items-center gap-6 mt-12">
                <button 
                  type="button" 
                  onClick={() => { setFormOpen(false); setEditingStaf(null); }} 
                  className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-slate-900 transition-colors"
                  disabled={loading}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-slate-900 text-cyan-300 px-10 py-5 rounded-[25px] font-[1000] uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-black disabled:opacity-50 transition-all active:scale-95"
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