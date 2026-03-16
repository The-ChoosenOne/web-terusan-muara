import Image from "next/image";
import JamDigital from "./JamDigital";

export default function HeaderAtas() {
  return (
    // Menggunakan latar abu-abu sangat muda (slate-50) agar tetap cerah
    <div className="bg-slate-50 border-b border-slate-200 w-full">
      <div className="w-full px-4 md:px-8 h-auto md:h-28 flex flex-col md:flex-row justify-between items-center py-4 md:py-0">
        
        {/* === KIRI: Logo & Teks === */}
        <div className="flex items-center gap-4 md:gap-6"> 
          {/* Logo Desa */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-md bg-white rounded-full p-2 border border-slate-100">
            <Image 
              src="/banyuasin.png" 
              alt="Logo Desa" 
              fill 
              className="object-contain p-1"
            />
          </div>
          
          {/* Teks Alamat Desa - Aksen Border pakai Slate */}
          <div className="flex flex-col border-l-2 border-slate-300 pl-4 md:pl-6">
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight tracking-tight">
              Selamat <span className="text-cyan-600">Datang</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-600 font-bold tracking-wide">
              Website Resmi Desa Terusan Muara
            </p>
            <p className="text-[10px] md:text-xs text-slate-500 mt-1 italic uppercase font-medium tracking-widest">
              Kec. Sumber Marga Telang, Kab. Banyuasin, Sumatera Selatan
            </p>
          </div>
        </div>

        {/* === KANAN: Jam Digital === */}
        <div className="hidden md:block">
          {/* Box Jam Digital pakai Putih bersih agar kontras dengan bg slate-50 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <JamDigital />
          </div>
        </div>

      </div>
    </div>
  );
}