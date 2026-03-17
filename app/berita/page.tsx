// app/berita/page.tsx
import { supabase } from "@/lib/supabase"; 
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; 

export default async function BeritaPage() {
  const { data: allBerita } = await supabase
    .from("berita")
    .select("*")
    .order("tanggal", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 pb-24 pt-30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Desa Terusan Muara */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-cyan-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Portal Informasi</span>
          <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 mb-12 uppercase tracking-tighter border-l-8 border-cyan-400 pl-8">
          Berita <span className="text-cyan-600">Terusan Muara</span>
        </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {allBerita && allBerita.map((item: any) => (
            <div key={item.id} className="group flex flex-col h-full bg-white rounded-[60px] overflow-hidden shadow-2xl shadow-slate-900/5 border border-slate-50 hover:-translate-y-3 transition-all duration-700 cursor-pointer">
              
              {/* Gambar Berita */}
              <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
                {item.foto_url ? (
                  <Image 
                    src={item.foto_url}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-1000 grayscale-[30%] group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300 font-black uppercase text-[10px]">No Asset</div>
                )}
                <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur text-cyan-300 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-cyan-500/20 shadow-lg">
                  Update Terbaru
                </div>
              </div>

              {/* Konten Berita */}
              <div className="p-10 flex flex-col flex-grow text-black">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "Baru Saja"}
                  </p>
                </div>

                <h3 className="text-2xl font-[1000] text-slate-900 mb-6 line-clamp-2 group-hover:text-cyan-600 transition-colors leading-tight tracking-tighter uppercase italic">
                  {item.judul}
                </h3>

                {/* --- BAGIAN DESKRIPSI RINGKAS (YANG LO TANYAIN) --- */}
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 line-clamp-3 italic">
                  {item.deskripsi || "Klik selengkapnya untuk membaca informasi lengkap mengenai kegiatan atau berita di Desa Terusan Muara..."}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link href={`/berita/${item.slug}`} className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest hover:text-cyan-600 transition-colors">
                    Baca Selengkapnya <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}