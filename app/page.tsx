// app/page.tsx
import { getBerita, getPerangkat, getProfil, getPotensi } from "@/lib/contentful"; 
import Link from "next/link";
import Statistik from "@/components/Statistik"; 
import Sambutan from "@/components/Sambutan"; 
import PerangkatDesa from "@/components/PerangkatDesa"; 

// IMPORT SWIPER UNTUK SLIDER
import HeroSlider from "@/components/HeroSlider"; 

// Biar data statistik, berita, & potensi selalu update detik itu juga
export const revalidate = 0; 

export default async function Home() {
  // 1. Menarik semua data secara paralel dari Contentful agar loading kencang
  const [allBerita, allPerangkat, dataProfil, allPotensi] = await Promise.all([
    getBerita(),
    getPerangkat(),
    getProfil(),
    getPotensi() 
  ]);

  // Ekstrak data fields dengan aman agar tidak error jika data kosong
  const statistikData = dataProfil?.fields || {};
  
  // Ambil array foto dari field 'fotoHero' di Contentful
  const heroPhotos = dataProfil?.fields?.fotoHero || [];

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION DENGAN SLIDER DINAMIS */}
      {/* Menambahkan 'as any' agar TypeScript tidak merah di bawah kata 'photos' */}
      <HeroSlider photos={heroPhotos as any} />

      {/* 2. SAMBUTAN (Menarik data dari entri Profil Desa) */}
      <Sambutan data={dataProfil as any} />

      {/* 3. STATISTIK (Dinamis dari field angka di Contentful) */}
      <div className="relative z-30 mb-10"> 
         <div data-aos="fade-up">
            <Statistik data={statistikData as any} />
         </div>
      </div>

      {/* 4. DIREKTORI POTENSI & UMKM (Menampilkan Produk Lokal Desa Parit) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter border-b-8 border-green-600 inline-block pb-2">
              🗺️ Direktori Potensi & UMKM
            </h2>
            <p className="text-gray-500 font-bold mt-4 text-lg">
              Dukung ekonomi lokal dengan belanja produk asli Desa Parit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {allPotensi.slice(0, 3).map((item: any) => {
              const urlGambar = item.fields.fotoPotensi?.fields?.file?.url;
              return (
                <div key={item.sys.id} className="bg-white rounded-[50px] shadow-2xl shadow-green-900/10 overflow-hidden border border-gray-100 flex flex-col h-full group hover:-translate-y-3 transition duration-500">
                  <div className="h-64 bg-gray-200 relative overflow-hidden">
                    <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur text-green-800 text-[10px] font-black px-4 py-2 rounded-full shadow-sm uppercase tracking-widest border border-green-100">
                      🌱 {item.fields.kategori || "POTENSI"}
                    </div>
                    <img 
                      src={urlGambar ? `https:${urlGambar}` : "/placeholder-desa.jpg"} 
                      alt={item.fields.namaPotensi} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                  <div className="p-10 flex flex-col items-center text-center flex-grow text-black">
                    <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-green-700 transition leading-tight">{item.fields.namaPotensi}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 italic font-medium">"{item.fields.deskripsi}"</p>
                    <Link href="/potensi" className="mt-auto w-full bg-[#c1eb91] hover:bg-green-600 hover:text-white text-green-900 font-black py-4 rounded-2xl text-xs transition uppercase tracking-widest shadow-lg shadow-green-900/5 active:scale-95 text-center">Hubungi Penjual</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PERANGKAT DESA (Dinamis dari data Perangkat Desa) */}
      <PerangkatDesa items={allPerangkat.slice(0, 4) as any} />

      {/* 6. BERITA TERKINI (Menampilkan update terbaru) */}
      <section className="max-w-6xl mx-auto p-6 md:p-10 mt-10 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 border-l-8 border-green-600 pl-4 uppercase tracking-tighter">Berita Terkini</h2>
          <Link href="/berita" className="text-green-600 hover:underline font-black text-sm uppercase tracking-widest">Lihat Semua Berita &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allBerita.slice(0, 3).map((item: any) => (
            <div key={item.sys.id} className="bg-white rounded-[40px] shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 group hover:shadow-2xl transition duration-500">
              <div className="h-56 bg-gray-200 overflow-hidden relative">
                {item.fields.gambarUtama?.fields?.file?.url ? (
                  <img src={`https:${item.fields.gambarUtama.fields.file.url}`} alt="Berita" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Info Desa</div>
              </div>
              <div className="p-8 flex-1 flex flex-col text-black">
                <h3 className="text-xl font-black mb-3 line-clamp-2 group-hover:text-green-700 transition leading-tight">{item.fields.judul}</h3>
                <p className="text-gray-400 text-xs mb-6 font-bold uppercase tracking-widest">
                  📅 {new Date(item.fields.tanggalpost).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <Link href={`/berita/${item.fields.slug}`} className="mt-auto block text-center py-4 bg-gray-50 text-green-700 font-black rounded-2xl hover:bg-green-600 hover:text-white transition uppercase text-xs tracking-widest shadow-inner">Baca Selengkapnya</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}