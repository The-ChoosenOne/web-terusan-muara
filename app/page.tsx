// app/page.tsx
import { supabase } from "@/lib/supabase"; 
import Link from "next/link";
import Statistik from "@/components/Statistik"; 
import Sambutan from "@/components/Sambutan"; 
import PerangkatDesa from "@/components/PerangkatDesa"; 
import HeroSlider from "@/components/HeroSlider"; 

// Biar data selalu segar dari Supabase
export const revalidate = 0; 

export default async function Home() {
  // 1. Ambil semua data secara paralel
  const [
    beritaRes,
    perangkatRes,
    profilRes,
    potensiRes,
    sliderRes
  ] = await Promise.all([
    supabase.from("berita").select("*").order("tanggal", { ascending: false }),
    supabase.from("perangkat_desa").select("*").order("id", { ascending: true }),
    supabase.from("profil_desa").select("*").eq("id", 1).single(),
    supabase.from("potensi_desa").select("*").order("id", { ascending: false }),
    supabase.from("slider_beranda").select("*").order("created_at", { ascending: false })
  ]);

  // Ekstrak data hasil respon
  const allBerita = beritaRes.data || [];
  const allPerangkat = perangkatRes.data || [];
  const dataProfil = profilRes.data || {}; // Ini objek tunggal, bukan array
  const allPotensi = potensiRes.data || [];
  const allSlider = sliderRes.data || [];

  // 2. Ambil foto slider - Pastikan isinya array string URL yang valid
  const heroPhotos = allSlider.length > 0 
    ? allSlider.map((s: any) => s.foto_url).filter(url => url !== null)
    : ["/placeholder-hero.jpg"]; // Kasih fallback biar gak putih polos

  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      {/* Jika HeroSlider masih gak muncul, cek apakah dia nerima props 'photos' atau 'items' */}
      <HeroSlider photos={heroPhotos} />

      {/* 2. SAMBUTAN */}
      <Sambutan data={dataProfil} />

      {/* 3. STATISTIK */}
      <div className="relative z-30 mb-10 pt-20 pb-10"> 
         <div data-aos="fade-up">
            <Statistik data={dataProfil} />
         </div>
      </div>

      {/* 4. POTENSI & UMKM */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter border-b-8 border-cyan-400 inline-block pb-2">
              🗺️ Direktori Potensi & UMKM
            </h2>
            <p className="text-slate-500 font-bold mt-4 text-lg">
              Dukung ekonomi lokal dengan belanja produk asli Desa Terusan Muara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {allPotensi.slice(0, 3).map((item: any) => (
                <div key={item.id} className="bg-white rounded-[50px] shadow-2xl shadow-slate-900/10 overflow-hidden border border-slate-100 flex flex-col h-full group hover:-translate-y-3 transition duration-500">
                  <div className="h-64 bg-slate-200 relative overflow-hidden">
                    <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur text-cyan-800 text-[10px] font-black px-4 py-2 rounded-full shadow-sm uppercase tracking-widest border border-cyan-100">
                      🌱 {item.kategori || "POTENSI"}
                    </div>
                    <img 
                      src={item.foto_url || "/placeholder-desa.jpg"} 
                      alt={item.nama_potensi} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                  <div className="p-10 flex flex-col items-center text-center flex-grow text-black">
                    <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-cyan-700 transition leading-tight">{item.nama_potensi}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 italic font-medium">"{item.deskripsi}"</p>
                    <Link href="/potensi" className="mt-auto w-full bg-cyan-300 hover:bg-cyan-600 hover:text-white text-slate-900 font-black py-4 rounded-2xl text-xs transition uppercase tracking-widest shadow-lg active:scale-95 text-center">Lihat Detail</Link>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PERANGKAT DESA */}
      <PerangkatDesa items={allPerangkat.slice(0, 4)} />

      {/* 6. BERITA TERKINI */}
      <section className="max-w-6xl mx-auto p-6 md:p-10 mt-10 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 border-l-8 border-cyan-400 pl-4 uppercase tracking-tighter">Berita Terkini</h2>
          <Link href="/berita" className="text-cyan-600 hover:underline font-black text-sm uppercase tracking-widest">Lihat Semua Berita &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allBerita.slice(0, 3).map((item: any) => (
            <div key={item.id} className="bg-white rounded-[40px] shadow-lg overflow-hidden flex flex-col h-full border border-slate-100 group hover:shadow-2xl transition duration-500">
              <div className="h-56 bg-slate-200 overflow-hidden relative">
                <img 
                  src={item.foto_url || "/placeholder-news.jpg"} 
                  alt={item.judul} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                />
                <div className="absolute top-4 left-4 bg-slate-900 text-cyan-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Info Desa</div>
              </div>
              <div className="p-8 flex-1 flex flex-col text-black">
                <h3 className="text-xl font-black mb-3 line-clamp-2 group-hover:text-cyan-700 transition leading-tight">{item.judul}</h3>
                <p className="text-slate-400 text-xs mb-6 font-bold uppercase tracking-widest">
                  📅 {item.tanggal ? new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "Baru saja"}
                </p>
                <Link href={`/berita/${item.slug}`} className="mt-auto block text-center py-4 bg-slate-50 text-cyan-700 font-black rounded-2xl hover:bg-slate-900 hover:text-cyan-300 transition uppercase text-xs tracking-widest shadow-inner">Baca Selengkapnya</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}