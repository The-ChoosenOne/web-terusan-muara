import { supabase } from "@/lib/supabase"; 
import Image from "next/image";
import Link from "next/link";

// Memastikan data selalu segar setiap kali halaman dibuka
export const revalidate = 0; 

export default async function Potensi() {
  // 1. Ambil data dari Supabase (Tabel potensi_desa)
  const { data: potensiList, error } = await supabase
    .from("potensi_desa")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HEADER HERO: TETAP SAMA --- */}
      <div className="bg-slate-900 pt-32 pb-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-[1000] mb-6 uppercase tracking-tighter leading-none">
            Potensi <span className="text-amber-400">Desa Terusan Muara</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Menelusuri kekayaan alam melimpah, mulai dari sektor perkebunan Sawit dan Karet, hingga kreativitas inovatif UMKM warga Desa Terusan Muara.
          </p>
        </div>
      </div>

      {/* --- KONTEN GRID --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        
        {!potensiList || potensiList.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] shadow-2xl text-center border border-slate-100">
            <p className="text-slate-400 text-xl mb-6 font-bold italic tracking-wide">📭 Belum ada data potensi yang tersedia saat ini.</p>
            <Link href="/dashboard/potensi" className="inline-block text-slate-900 font-black bg-amber-300 px-8 py-4 rounded-2xl hover:bg-amber-400 transition-all shadow-lg uppercase text-xs tracking-widest">
              Input Data Sekarang &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {potensiList.map((item: any) => {
              // Map variabel dari kolom Supabase
              const nama = item.nama_potensi || "Potensi Desa";
              const kategori = item.kategori || "Umum";
              const deskripsiTeks = item.deskripsi || "Klik untuk melihat detail potensi...";
              const urlGambar = item.foto_url;

              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-[40px] shadow-2xl shadow-slate-900/5 overflow-hidden group hover:-translate-y-3 transition-all duration-500 border border-slate-50 flex flex-col h-full"
                >
                  
                  {/* BAGIAN GAMBAR */}
                  <div className="h-72 overflow-hidden relative bg-slate-100">
                    <div className="absolute top-5 left-5 z-10 bg-slate-900/80 backdrop-blur text-amber-300 text-[10px] font-black px-5 py-2 rounded-full shadow-lg uppercase tracking-[0.2em] border border-amber-500/30">
                      💎 {kategori}
                    </div>
                    
                    <Image 
                      src={urlGambar || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"} 
                      alt={nama} 
                      fill 
                      className="object-cover group-hover:scale-110 transition duration-1000"
                    />

                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center backdrop-blur-[2px]">
                       <div className="w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                          <span className="text-slate-900 font-black text-2xl">→</span>
                       </div>
                    </div>
                  </div>

                  {/* BAGIAN TEKS */}
                  <div className="p-10 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-amber-600 transition duration-300 leading-tight">
                      {nama}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 italic font-medium">
                      "{deskripsiTeks}"
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* --- BANNER PROMOSI BUMDES: TETAP SAMA --- */}
      <div className="max-w-6xl mx-auto mt-28 px-4">
        <div className="bg-amber-300 rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border-[10px] border-white">
           <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/30 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/30 rounded-full blur-3xl"></div>
           
           <h2 className="text-4xl md:text-5xl font-[1000] text-slate-900 mb-8 relative z-10 leading-[1.1] tracking-tighter">
             Tertarik Dengan Hasil Bumi<br/>Desa Terusan Muara?
           </h2>
           <p className="text-slate-800 mb-12 max-w-3xl mx-auto relative z-10 font-bold opacity-90 leading-relaxed text-lg md:text-xl italic">
             "Kami melayani suplai Kelapa Sawit, Karet, dan Produk UMKM berkualitas dalam skala besar. Mari bangun kemitraan bersama BUMDes kami."
           </p>
           <Link 
             href="/kontak" 
             className="inline-block bg-slate-900 text-amber-300 px-12 py-5 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-2xl hover:shadow-slate-900/40 relative z-10 uppercase text-xs tracking-[0.3em] active:scale-95"
           >
             Hubungi BUMDes &rarr;
           </Link>
        </div>
      </div>

    </main>
  );
}