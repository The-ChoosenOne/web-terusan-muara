import { supabase } from "@/lib/supabase"; // Ganti ke Supabase
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // Agar berita baru langsung muncul

export default async function BeritaPage() {
  // Ambil data langsung dari tabel berita Supabase
  const { data: allBerita } = await supabase
    .from("berita")
    .select("*")
    .order("tanggal", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header dengan aksen Slate & Cyan - TETAP SAMA */}
        <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 mb-12 uppercase tracking-tighter border-l-8 border-cyan-400 pl-8">
          Berita <span className="text-cyan-600">Terusan Muara</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allBerita && allBerita.map((item: any) => (
            // key pake item.id (Supabase)
            <div key={item.id} className="bg-white rounded-[45px] shadow-2xl shadow-slate-900/5 overflow-hidden group border border-slate-100 flex flex-col hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-64 w-full bg-slate-200">
                {/* SRC pake item.foto_url langsung */}
                {item.foto_url ? (
                  <Image 
                    src={item.foto_url}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-1000"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 font-bold italic uppercase text-xs tracking-widest">No Image Asset</div>
                )}
                {/* Badge Info Desa */}
                <div className="absolute top-5 left-5 bg-slate-900/80 backdrop-blur text-cyan-300 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-cyan-500/30">
                  Update Desa
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <p className="text-cyan-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  {/* Tanggal pake item.tanggal */}
                  {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-2xl font-black text-slate-800 mb-6 line-clamp-2 group-hover:text-cyan-600 transition-colors leading-tight">
                  {item.judul}
                </h3>
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