"use client";

import { useState, useEffect } from "react";
import { upsertLayananAction, deleteLayananAction } from "@/lib/actions";
import { supabase } from "@/lib/supabase";

export default function CRUDLayanan() {
  const [layanan, setLayanan] = useState<any[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLayanan = async () => {
    setLoading(true);
    const { data } = await supabase.from("layanan_surat").select("*").order("id", { ascending: true });
    setLayanan(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLayanan(); }, []);

  const openModal = (data?: any) => {
    if (data) {
      setSelectedLayanan(data);
      setIsEditMode(true);
    } else {
      setSelectedLayanan(null);
      setIsEditMode(false);
    }
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await upsertLayananAction(formData, selectedLayanan?.id);

    if (res.success) {
      alert("✅ Data layanan berhasil disimpan!");
      setFormOpen(false);
      fetchLayanan();
    } else {
      alert("❌ Error: " + res.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus layanan ini?")) {
      const res = await deleteLayananAction(id);
      if (res.success) fetchLayanan();
    }
  };

  return (
    <div className="p-2 animate-fade-in text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-[1000] uppercase italic tracking-tighter">
          Kelola <span className="text-amber-600">Layanan Surat</span>
        </h1>
        <button onClick={() => openModal()} className="bg-amber-300 hover:bg-slate-900 hover:text-amber-300 text-slate-900 px-8 py-3 rounded-2xl font-black shadow-xl transition-all uppercase text-xs tracking-widest">+ Tambah Layanan</button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-10 rounded-[50px] w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-[1000] uppercase italic mb-8 border-b pb-4">
              {isEditMode ? "Edit Layanan Surat" : "Tambah Layanan Surat"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Judul Surat</label>
                <input name="judul" defaultValue={selectedLayanan?.judul} type="text" className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50 outline-none focus:border-amber-400" placeholder="Contoh: Surat Domisili" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Persyaratan (Gunakan ENTER untuk tiap poin)</label>
                <textarea name="persyaratan" defaultValue={selectedLayanan?.persyaratan} rows={5} className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50 outline-none focus:border-amber-400" placeholder="Fotokopi KTP&#10;Fotokopi KK" required></textarea>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Catatan Tambahan</label>
                <textarea name="catatan" defaultValue={selectedLayanan?.catatan} rows={2} className="w-full border-2 p-5 rounded-2xl font-bold bg-slate-50 outline-none focus:border-amber-400" placeholder="Catatan kecil untuk warga..."></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setFormOpen(false)} className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Batal</button>
                <button type="submit" className="bg-slate-900 text-amber-300 px-10 py-5 rounded-[25px] font-black uppercase text-[10px] tracking-widest">
                  {loading ? "Sabar Jak..." : "Simpan Data 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABEL DATA */}
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-50">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-amber-300 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-6">No</th>
              <th className="p-6">Jenis Layanan</th>
              <th className="p-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {layanan.map((item, index) => (
              <tr key={item.id} className="hover:bg-amber-50/50 transition-all group">
                <td className="p-6 text-slate-300 font-bold">{index + 1}</td>
                <td className="p-6 font-black text-slate-800 uppercase text-xs">{item.judul}</td>
                <td className="p-6 flex justify-center gap-3">
                  <button onClick={() => openModal(item)} className="bg-amber-50 text-amber-500 p-4 rounded-xl hover:bg-amber-600 hover:text-white transition-all">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}