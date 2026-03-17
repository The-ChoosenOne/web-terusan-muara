import { supabase } from "@/lib/supabase"; 
import Image from "next/image";

// Memastikan data selalu terbaru (Anti-Cache)
export const revalidate = 0;

export default async function ProfilDesa() {
  // 1. Ambil data secara paralel dari Supabase
  const [profilRes, perangkatRes] = await Promise.all([
    supabase.from("profil_desa").select("*").eq("id", 1).single(),
    supabase.from("perangkat_desa").select("*").order("id", { ascending: true })
  ]);

  const profil = profilRes.data || {};
  const allPerangkat = perangkatRes.data || [];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- SECTION BARU: HERO PROFIL (JUDUL & SLOGAN) --- */}
      <section className="relative pt-30 pb-20 bg-slate-900 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-cyan-500/20 text-cyan-300 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-cyan-500/30 backdrop-blur-md">
            Informasi Desa
          </span>
          {/* Manggil judul_profil dari Dashboard */}
          <h1 className="text-5xl md:text-7xl font-[1000] text-white mt-8 mb-6 uppercase tracking-tighter leading-[0.85]">
            {profil.judul_profil || "Profil Desa Terusan Muara"}
          </h1>
          {/* Manggil tagline dari Dashboard */}
          <p className="text-cyan-400 text-xl md:text-3xl font-black italic opacity-90 tracking-tight">
            "{profil.tagline || "Membangun Bersama Masyarakat Menuju Desa Mandiri"}"
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-20">
        
        {/* --- SECTION 1: SEJARAH DESA --- */}
        <section className="mb-20">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-900/5 border border-slate-100 relative overflow-hidden">
            {/* Aksen hiasan */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-0"></div>
            
            <h2 className="text-xl font-black text-cyan-700 mb-8 uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <span className="h-px w-8 bg-cyan-300"></span> 📜 Sejarah Desa
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed italic border-l-4 border-cyan-100 pl-8 whitespace-pre-wrap relative z-10 font-medium">
              {profil.sejarah ? String(profil.sejarah) : "Narasi sejarah desa sedang dalam proses penyusunan."}
            </div>
          </div>
        </section>

        {/* --- SECTION 2: VISI & MISI --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {/* KARTU VISI */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-cyan-500 hover:-translate-y-3 transition-all duration-500 group">
            <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-100 transition shadow-inner">🎯</div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tight">Visi Desa</h3>
            <p className="text-slate-600 leading-relaxed font-bold italic text-xl">
              {profil.visi ? `"${String(profil.visi)}"` : "Belum diisi di dashboard."}
            </p>
          </div>

          {/* KARTU MISI */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-slate-800 hover:-translate-y-3 transition-all duration-500 group">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-slate-200 transition shadow-inner">🚀</div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tight">Misi Desa</h3>
            <div className="text-slate-600 space-y-3 font-bold text-lg leading-relaxed whitespace-pre-wrap italic">
              {profil.misi ? String(profil.misi) : "Belum diisi di dashboard."}
            </div>
          </div>
        </div>

        {/* --- SECTION 3: STRUKTUR PERANGKAT DESA --- */}
        <section className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              Struktur <span className="text-cyan-600">Organisasi</span>
            </h2>
            <div className="h-2 w-24 bg-cyan-400 mx-auto mt-6 rounded-full shadow-sm"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allPerangkat.length > 0 ? (
              allPerangkat.map((staf: any) => (
                <div key={staf.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 flex flex-col items-center group hover:shadow-2xl hover:border-cyan-100 transition-all duration-500">
                  <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden mb-8 border-4 border-slate-50 shadow-lg bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={staf.foto_url || "/kades-placeholder.jpg"} 
                      alt={staf.nama || "Staf Desa"}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-1000"
                    />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 text-center uppercase tracking-tight leading-tight px-2 min-h-[3rem]">
                    {staf.nama || "Perangkat Desa"}
                  </h3>
                  <span className="text-cyan-700 font-black uppercase tracking-[0.2em] text-[9px] mt-6 bg-cyan-50 px-6 py-2 rounded-full border border-cyan-100 shadow-sm">
                    {staf.jabatan || "Staf"}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[50px] text-slate-300 font-black uppercase tracking-[0.3em] col-span-full border-4 border-dashed border-slate-100">
                📭 Sedang Pemutakhiran Data
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}