// app/layanan/page.tsx
import { supabase } from "@/lib/supabase";
import React from "react";

// Biar data selalu update kalau admin nambah surat di dashboard
export const revalidate = 0;

export default async function LayananSurat() {
  // Ambil data dari tabel 'layanan_surat'
  const { data: daftarSurat, error } = await supabase
    .from("layanan_surat")
    .select("*")
    .order("id", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 pb-24 pt-30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - Tetap sama */}
        <div className="text-center md:text-left mb-16">
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Pelayanan Publik</span>
          <h1 className="text-5xl md:text-7xl font-[1000] text-slate-900 uppercase tracking-tighter italic leading-[0.8]">
            Layanan <span className="text-amber-600">Surat</span>
          </h1>
          <p className="text-slate-500 font-bold mt-8 text-lg max-w-2xl">
            Berikut adalah daftar persyaratan administrasi untuk pengurusan surat-menyurat di Kantor Desa Terusan Muara.
          </p>
        </div>

        {/* Grid Card Surat - Sekarang Dinamis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarSurat && daftarSurat.map((surat) => (
            <div key={surat.id} className="bg-white p-10 rounded-[50px] shadow-2xl shadow-slate-900/5 border border-slate-50 flex flex-col hover:-translate-y-2 transition-all duration-500 group">
              
              <h3 className="text-2xl font-[1000] text-slate-800 mb-6 leading-tight uppercase italic tracking-tighter group-hover:text-amber-600 transition-colors">
                {surat.judul}
              </h3>

              <div className="h-1 w-12 bg-amber-400 mb-8 rounded-full"></div>

              <div className="flex-grow">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Persyaratan:</p>
                <ul className="space-y-3">
                  {/* Trik Magic: Pecah teks persyaratan jadi list berdasarkan baris baru */}
                  {surat.persyaratan.split('\n').map((syarat: string, i: number) => (
                    syarat.trim() && ( // pastiin bukan baris kosong
                      <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                        <span className="text-amber-500 mt-1">✓</span>
                        {syarat}
                      </li>
                    )
                  ))}
                </ul>
              </div>

              <div className="mt-10 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-[11px] text-slate-400 italic font-medium leading-relaxed">
                  * {surat.catatan}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Jika data kosong */}
        {(!daftarSurat || daftarSurat.length === 0) && (
           <div className="text-center py-20 bg-white rounded-[50px] border-2 border-dashed border-slate-100">
              <p className="text-slate-400 font-black italic uppercase text-xs tracking-[0.3em]">Belum ada informasi layanan tersedia.</p>
           </div>
        )}

        {/* Info Tambahan Footer - Tetap sama */}
        <div className="mt-20 p-10 bg-slate-900 rounded-[50px] text-center shadow-2xl">
          <p className="text-amber-300 font-black uppercase tracking-[0.2em] text-xs">Jam Operasional Pelayanan</p>
          <h2 className="text-white text-2xl font-bold mt-4">Senin - Jumat | 08:00 - 15:00 WIB</h2>
          <p className="text-slate-400 text-sm mt-4 italic font-medium">Pastikan membawa dokumen asli untuk verifikasi jika diperlukan.</p>
        </div>
      </div>
    </main>
  );
}