import Link from 'next/link';

export default function PotensiUMKM() {
  // Data dummy sementara
  const umkm = [
    {
      id: 1,
      nama: "Kerajinan Anyaman Terusan Muara",
      kategori: "Kerajinan",
      harga: "Mulai Rp 25.000",
      icon: "🧺",
      wa: "6281278318862" // Menggunakan nomor kontak KKN kamu
    },
    {
      id: 2,
      nama: "Madu Hutan Alami",
      kategori: "Hasil Tani",
      harga: "Rp 85.000 / Botol",
      icon: "🍯",
      wa: "6281278318862"
    },
    {
      id: 3,
      nama: "Warung Sembako Barokah",
      kategori: "Warung Warga",
      harga: "Lengkap & Murah",
      icon: "🏪",
      wa: "6281278318862"
    }
  ];

  return (
    // Border bawah diganti ke Cyan-400 agar senada
    <section className="max-w-6xl mx-auto p-6 md:p-10 mt-10 bg-white rounded-3xl shadow-xl border-b-8 border-cyan-400">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 uppercase tracking-tight">
          🗺️ Direktori <span className="text-cyan-600">Potensi & UMKM</span>
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Dukung ekonomi lokal dengan belanja produk asli Desa Terusan Muara.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {umkm.map((item) => (
          // Hover border diubah ke Cyan
          <div key={item.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-cyan-300 hover:bg-white transition-all duration-300 group shadow-sm">
            <div className="text-4xl mb-4 group-hover:scale-125 transition duration-300 inline-block drop-shadow-sm">
              {item.icon}
            </div>
            <span className="block text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1">
              {item.kategori}
            </span>
            <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">{item.nama}</h3>
            <p className="text-slate-500 text-sm font-bold mb-6">{item.harga}</p>
            
            <a 
              href={`https://wa.me/${item.wa}?text=Halo, saya tertarik dengan produk ${item.nama}`}
              target="_blank"
              // Tombol menggunakan warna Cyan-300 agar konsisten dengan Hero
              className="block text-center py-3 bg-cyan-300 text-slate-900 font-extrabold rounded-xl hover:bg-cyan-400 transition-all shadow-sm hover:shadow-md"
            >
              💬 Hubungi Penjual
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/potensi" className="text-cyan-600 font-bold hover:text-cyan-800 transition-colors inline-flex items-center gap-2">
          Lihat Semua Produk UMKM <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
}