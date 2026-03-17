// app/search/page.tsx
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// 1. Definisikan searchParams sebagai Promise
export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q: string }> 
}) {
  
  // 2. WAJIB di-await biar query-nya gak kosong
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // 3. Ambil data dari Supabase (News & Services)
  const [beritaRes, layananRes] = await Promise.all([
    supabase
      .from("berita")
      .select("*")
      .or(`judul.ilike.%${query}%,konten.ilike.%${query}%`),
    supabase
      .from("layanan_surat")
      .select("*")
      .ilike("judul", `%${query}%`)
  ]);

  const berita = beritaRes.data || [];
  const layanan = layananRes.data || [];

  return (
    <main className="min-h-screen bg-slate-50 pt-44 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* JUDUL HASIL PENCARIAN */}
        <div className="mb-16">
          <span className="text-cyan-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Search Results</span>
          <h1 className="text-4xl md:text-7xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-none">
            Hasil Cari: <span className="text-cyan-600">"{query}"</span>
          </h1>
          <div className="h-2 w-20 bg-cyan-400 mt-8 rounded-full"></div>
        </div>

        {/* --- SECTION BERITA --- */}
        <section className="mb-20">
          <h2 className="text-[10px] font-[1000] text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
            <span className="bg-slate-200 h-px flex-1"></span>
            📰 Berita Terkait
            <span className="bg-slate-200 h-px flex-1"></span>
          </h2>
          
          <div className="grid gap-6">
            {berita.length > 0 ? berita.map((item) => (
              <Link 
                href={`/berita/${item.slug}`} 
                key={item.id} 
                className="group bg-white p-6 rounded-[35px] border border-slate-100 hover:border-cyan-300 transition-all shadow-sm flex flex-col md:flex-row gap-6 items-center"
              >
                {item.foto_url && (
                  <div className="w-full md:w-32 h-24 rounded-[20px] overflow-hidden flex-shrink-0">
                    <img src={item.foto_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-[1000] text-xl text-slate-800 uppercase italic tracking-tight group-hover:text-cyan-600 transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mt-2 line-clamp-1 italic italic">
                    {item.deskripsi || "Baca detail berita selengkapnya..."}
                  </p>
                </div>
                <span className="text-cyan-400 font-bold hidden md:block">→</span>
              </Link>
            )) : (
              <p className="text-center py-10 text-slate-400 italic font-medium">Tidak ada berita yang cocok dengan kata kunci tersebut.</p>
            )}
          </div>
        </section>

        {/* --- SECTION LAYANAN --- */}
        <section>
          <h2 className="text-[10px] font-[1000] text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
            <span className="bg-slate-200 h-px flex-1"></span>
            📄 Layanan Surat
            <span className="bg-slate-200 h-px flex-1"></span>
          </h2>

          <div className="grid gap-4">
            {layanan.length > 0 ? layanan.map((item) => (
              <Link 
                href="/layanan" 
                key={item.id} 
                className="group bg-slate-900 p-8 rounded-[35px] hover:bg-cyan-400 transition-all flex justify-between items-center"
              >
                <div>
                  <h3 className="font-[1000] text-white group-hover:text-slate-900 uppercase italic tracking-tighter text-lg">
                    {item.judul}
                  </h3>
                  <p className="text-cyan-400 group-hover:text-slate-700 text-[10px] font-black uppercase tracking-widest mt-1">
                    Cek Persyaratan Layanan
                  </p>
                </div>
                <div className="w-10 h-10 bg-white/10 group-hover:bg-slate-900/10 rounded-full flex items-center justify-center text-white group-hover:text-slate-900">
                  ↑
                </div>
              </Link>
            )) : (
              <p className="text-center py-10 text-slate-400 italic font-medium">Persyaratan surat tidak ditemukan.</p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}