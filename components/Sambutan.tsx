// components/Sambutan.tsx

export default function Sambutan({ data }: { data: any }) {
  // SEKARANG: Cek data langsung, gak perlu .fields lagi Jak!
  if (!data) return null;

  // Sesuaikan variabel dengan nama kolom di tabel Supabase lo
  const fotoKades = data.foto_kades_url;

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-10 my-16 bg-white rounded-[2rem] shadow-sm border border-slate-300">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Bagian Foto */}
        <div className="w-full md:w-1/3" data-aos="fade-right">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
            <img 
              src={fotoKades || '/kades-placeholder.jpg'} 
              alt="Kepala Desa" 
              className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md p-5 text-white text-center border-t border-amber-500/30">
              <p className="font-extrabold text-lg tracking-tight text-white">
                {data.nama_kades || "Kepala Desa"}
              </p>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-70 mt-1">
                Kepala Desa Terusan Muara
              </p>
            </div>
          </div>
        </div>

        {/* Bagian Teks Sambutan */}
        <div className="w-full md:w-2/3" data-aos="fade-left">
          <span className="bg-yellow-200 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-yellow-400">
            💬 Sambutan Kepala Desa
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mt-6 mb-8 leading-[1.1] tracking-tighter">
            {data.judul_sambutan || "Mewujudkan Desa Terusan Muara yang Mandiri & Sejahtera"}
          </h2>
          <div className="text-slate-600 text-lg leading-relaxed italic mb-8 relative">
            <span className="text-6xl text-amber-400 absolute -top-8 -left-6 -z-10 font-serif">"</span>
             {data.isi_sambutan || "Selamat datang di website resmi Desa Terusan Muara..."}
            <span className="text-6xl text-amber-400 absolute -bottom-14 right-0 -z-10 font-serif">"</span>
          </div>
          
          {/* Box Visi Desa */}
          <div className="bg-slate-50 p-8 rounded-2xl border-l-8 border-amber-300 shadow-inner">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-amber-400"></span> 🚀 Visi Desa
            </p>
            <p className="text-xl font-bold text-slate-800 italic leading-snug">
              "{data.visi || "Terwujudnya Desa Terusan Muara yang Maju dan Agamis."}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}