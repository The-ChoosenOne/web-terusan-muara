import Marquee from "react-fast-marquee";

export default function RunningText() {
  return (
    // KITA PAKAI WARNA KHAS DESA PARIT (#c1eb91) DI SINI
    <div className="bg-[#c1eb91] text-green-900 border-b border-green-300 relative z-40">
      <div className="flex">
        
        {/* Label INFO jadi Hijau Tua biar kontras */}
        <div className="bg-green-800 text-white px-4 py-2 font-bold text-sm uppercase tracking-wider z-10 flex items-center shadow-md">
          📢 Info Terkini
        </div>

        {/* Teks Berjalan */}
        <Marquee gradient={false} speed={40} className="py-2 font-semibold text-sm">
          <span className="mx-8">
            • Selamat Datang di Website Resmi Desa Parit, Ogan Ilir.
          </span>
          <span className="mx-8">
            • Hijaukan Desa, Majukan Bangsa! Mari jaga kebersihan lingkungan bersama.
          </span>
          <span className="mx-8">
            • Jadwal Posyandu Balita dan Ibu Hamil diadakan setiap tanggal 10 di Gedung Raga.
          </span>
          <span className="mx-8">
            • Pelayanan Kantor Desa buka Senin - Jumat pukul 08.00 - 16.00 WIB.
          </span>
        </Marquee>
      </div>
    </div>
  );
}