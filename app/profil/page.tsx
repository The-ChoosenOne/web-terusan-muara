import { getProfil, getPerangkat } from "@/lib/contentful";
import Image from "next/image";

// Memastikan data selalu terbaru dari Contentful
export const revalidate = 0;

export default async function ProfilDesa() {
  // 1. Ambil data secara paralel dari Contentful
  const [dataProfil, allPerangkat] = await Promise.all([
    getProfil(),
    getPerangkat()
  ]);

  // PENGAMAN: Jika dataProfil null, buat objek kosong agar tidak error undefined
  const fields: any = dataProfil?.fields || {};

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-32">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- SECTION 1: SEJARAH DESA --- */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-green-900 border-l-8 border-yellow-500 pl-6 mb-10 uppercase tracking-tighter">
            Profil Desa Parit
          </h1>
          
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl shadow-green-900/5 border border-green-50">
            <h2 className="text-xl font-bold text-green-700 mb-4 uppercase tracking-widest">📜 Sejarah Desa</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed italic border-l-4 border-gray-100 pl-6 whitespace-pre-wrap">
              {/* FIX: Paksa menjadi String agar tidak error build di Vercel */}
              {fields.sejarah ? String(fields.sejarah) : "Narasi sejarah desa sedang dalam proses penyusunan."}
            </div>
          </div>
        </section>

        {/* --- SECTION 2: VISI & MISI --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          
          {/* KARTU VISI */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-green-600 hover:-translate-y-2 transition duration-500 group">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🎯</div>
            <h3 className="text-2xl font-black text-gray-800 mb-4 uppercase">Visi Desa</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">
              {/* FIX: Paksa menjadi String */}
              {fields.visi ? `"${String(fields.visi)}"` : "Belum diisi di dashboard."}
            </p>
          </div>

          {/* KARTU MISI */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-yellow-500 hover:-translate-y-2 transition duration-500 group">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🚀</div>
            <h3 className="text-2xl font-black text-gray-800 mb-4 uppercase">Misi Desa</h3>
            <div className="text-gray-600 space-y-3 font-medium">
              {fields.misi ? (
                /* FIX: Paksa menjadi String */
                <div className="whitespace-pre-wrap">{String(fields.misi)}</div>
              ) : (
                <p>Belum diisi di dashboard.</p>
              )}
            </div>
          </div>
        </div>

        {/* --- SECTION 3: STRUKTUR PERANGKAT DESA --- */}
        <section className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Struktur Organisasi</h2>
            <div className="h-2 w-24 bg-green-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4 font-medium italic">Kenali tim yang siap melayani Anda sepenuh hati.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allPerangkat && allPerangkat.length > 0 ? (
              allPerangkat.map((staf: any) => (
                <div key={staf.sys.id} className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-100 flex flex-col items-center group hover:shadow-2xl transition-all duration-500">
                  <div className="relative w-36 h-36 rounded-3xl overflow-hidden mb-6 border-4 border-gray-50 shadow-md bg-gray-100">
                    {staf.fields.fotoPerangkat?.fields?.file?.url ? (
                      <Image 
                        src={`https:${staf.fields.fotoPerangkat.fields.file.url}`} 
                        alt={staf.fields.namaPerangkat || "Staf Desa"}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold italic text-xs">No Photo</div>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-gray-800 text-center uppercase tracking-tighter leading-tight px-2 line-clamp-2">
                    {staf.fields.namaPerangkat || "Perangkat Desa"}
                  </h3>
                  <span className="text-green-700 font-black uppercase tracking-widest text-[10px] mt-4 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
                    {staf.fields.jabatan || "Staf"}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-200 text-gray-400 font-bold italic col-span-full">
                📭 Data perangkat desa sedang dalam tahap pemutakhiran. 
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}