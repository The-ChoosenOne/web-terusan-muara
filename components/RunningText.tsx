import Marquee from "react-fast-marquee";

export default function RunningText() {
  return (
    // Menggunakan Cyan-50 agar tetap cerah tapi tidak menusuk mata
    <div className="bg-cyan-300 text-slate-800 border-b border-cyan-100 relative z-40">
      <div className="flex">
        
        {/* Label INFO menggunakan Slate-900 agar senada dengan Navbar */}
        <div className="bg-slate-900 text-white px-4 py-2 font-bold text-sm uppercase tracking-wider z-10 flex items-center shadow-lg">
          <span className="animate-pulse mr-2">📢</span> Info Terkini
        </div>

        {/* Teks Berjalan dengan warna Slate dan aksen Cyan */}
        <Marquee gradient={false} speed={50} className="py-2 font-bold text-sm">
          <span className="mx-8 flex items-center gap-2">
            <span className="text-cyan-600">●</span> 
            Selamat Datang di Website Resmi Desa Terusan Muara, Banyuasin.
          </span>
          <span className="mx-8 flex items-center gap-2">
            <span className="text-cyan-600">●</span> 
            Transformasi Digital Desa: Mewujudkan Tata Kelola yang Transparan dan Mandiri.
          </span>
          <span className="mx-8 flex items-center gap-2">
            <span className="text-cyan-600">●</span> 
            Jadwal Posyandu Balita dan Ibu Hamil diadakan setiap tanggal 10.
          </span>
          <span className="mx-8 flex items-center gap-2">
            <span className="text-cyan-600">●</span> 
            Pelayanan Kantor Desa buka Senin - Jumat pukul 08.00 - 16.00 WIB.
          </span>
        </Marquee>
      </div>
    </div>
  );
}