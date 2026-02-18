import { getPotensi } from "@/lib/contentful"; 
import Image from "next/image";
import Link from "next/link";

// Memastikan data selalu segar setiap kali halaman dibuka
export const revalidate = 0; 

export default async function Potensi() {
  // 1. Ambil data dari Contentful secara server-side
  const potensiList = await getPotensi(); 

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- HEADER HERO --- */}
      <div className="bg-green-900 pt-32 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
            Potensi Desa Parit
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto font-medium">
            Kekayaan alam Desa Parit yang melimpah, mulai dari hamparan Sawit, Karet, hingga kreativitas UMKM warganya.
          </p>
        </div>
      </div>

      {/* --- KONTEN GRID --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        
        {potensiList.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] shadow-xl text-center border border-green-100">
            <p className="text-gray-500 text-lg mb-4 font-bold">📭 Belum ada data potensi yang tersedia.</p>
            <Link href="/dashboard/potensi" className="inline-block text-white font-bold bg-green-700 px-6 py-3 rounded-2xl hover:bg-green-800 transition">
              Input Data Sekarang &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {potensiList.map((item: any) => {
              // SINKRONISASI FIELD: Menghubungkan ke ID Contentful kamu
              const nama = item.fields.namaPotensi || "Potensi Desa";
              const kategori = item.fields.kategori || "Umum";
              const deskripsiTeks = item.fields.deskripsi || "Klik untuk melihat detail potensi...";
              const urlGambar = item.fields.fotoPotensi?.fields?.file?.url;

              return (
                <div 
                  key={item.sys.id} 
                  className="bg-white rounded-[40px] shadow-xl overflow-hidden group hover:-translate-y-2 transition duration-500 border border-gray-100 flex flex-col h-full"
                >
                  
                  {/* BAGIAN GAMBAR */}
                  <div className="h-64 overflow-hidden relative bg-gray-200">
                    <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur text-green-800 text-[10px] font-black px-4 py-1.5 rounded-full shadow-sm uppercase tracking-widest border border-green-100">
                      🌱 {kategori}
                    </div>
                    
                    <Image 
                      src={urlGambar ? `https:${urlGambar}` : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"} 
                      alt={nama} 
                      fill 
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                          <span className="text-green-800 font-bold text-xl">→</span>
                       </div>
                    </div>
                  </div>

                  {/* BAGIAN TEKS */}
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-green-700 transition leading-tight">
                      {nama}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 italic">
                      {deskripsiTeks}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* --- BANNER PROMOSI BUMDES --- */}
      <div className="max-w-5xl mx-auto mt-24 px-4">
        <div className="bg-[#c1eb91] rounded-[50px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-green-900/10 border-4 border-white">
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
           
           <h2 className="text-3xl md:text-4xl font-black text-green-900 mb-6 relative z-10 leading-tight">
             Tertarik Dengan Hasil Bumi<br/>Desa Parit?
           </h2>
           <p className="text-green-800 mb-10 max-w-2xl mx-auto relative z-10 font-bold opacity-80 leading-relaxed text-lg">
             Kami siap menyuplai kelapa sawit, karet, atau produk UMKM dalam jumlah besar. Hubungi BUMDes kami sekarang.
           </p>
           <Link 
             href="/kontak" 
             className="inline-block bg-green-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-green-950 transition shadow-xl hover:shadow-green-900/30 relative z-10 uppercase text-sm tracking-widest active:scale-95"
           >
             Hubungi BUMDes &rarr;
           </Link>
        </div>
      </div>

    </main>
  );
}