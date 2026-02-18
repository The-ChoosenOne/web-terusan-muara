import Image from "next/image";
import JamDigital from "./JamDigital";

export default function HeaderAtas() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-white border-b border-green-100 w-full">
      {/* Menggunakan w-full dan px-6 agar mentok ke pinggir layar */}
      <div className="w-full px-4 md:px-8 h-auto md:h-24 flex flex-col md:flex-row justify-between items-center py-4 md:py-0">
        
        {/* === KIRI: Logo & Teks (MENTOK KIRI) === */}
        <div className="flex items-center gap-4 md:gap-6"> 
          {/* Logo Desa */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
            <Image 
              src="/logo-parit.png" 
              alt="Logo Desa" 
              fill 
              className="object-contain"
            />
          </div>
          
          {/* Teks Alamat Desa */}
          <div className="flex flex-col border-l-2 border-green-200 pl-4 md:pl-6">
            <h1 className="text-2xl md:text-3xl font-bold text-green-900 leading-tight">
              Selamat Datang
            </h1>
            <p className="text-sm md:text-base text-green-700 font-bold tracking-wide">
              Website Resmi Desa Parit
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 mt-1 italic uppercase tracking-tighter md:tracking-normal">
              Kec. Indralaya Utara, Kab. Ogan Ilir, Sumatera Selatan
            </p>
          </div>
        </div>

        {/* === KANAN: Jam Digital (MENTOK KANAN) === */}
        <div className="hidden md:block">
          <div className="bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-green-100 shadow-sm">
            <JamDigital />
          </div>
        </div>

      </div>
    </div>
  );
}