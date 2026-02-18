import Link from 'next/link';

export default function PotensiUMKM() {
  // Data dummy sementara, nanti bisa kamu hubungkan ke Contentful
  const umkm = [
    {
      id: 1,
      nama: "Kerajinan Anyaman Parit",
      kategori: "Kerajinan",
      harga: "Mulai Rp 25.000",
      icon: "🧺",
      wa: "6281234567890"
    },
    {
      id: 2,
      nama: "Madu Hutan Alami",
      kategori: "Hasil Tani",
      harga: "Rp 85.000 / Botol",
      icon: "🍯",
      wa: "6281234567890"
    },
    {
      id: 3,
      nama: "Warung Sembako Barokah",
      kategori: "Warung Warga",
      harga: "Lengkap & Murah",
      icon: "🏪",
      wa: "6281234567890"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-10 mt-10 bg-white rounded-3xl shadow-xl border-b-8 border-[#c1eb91]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-tight">🗺️ Direktori Potensi & UMKM</h2>
        <p className="text-gray-500 mt-2">Dukung ekonomi lokal dengan belanja produk asli Desa Parit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {umkm.map((item) => (
          <div key={item.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#c1eb91] transition group">
            <div className="text-4xl mb-4 group-hover:scale-125 transition duration-300 inline-block">
              {item.icon}
            </div>
            <span className="block text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">
              {item.kategori}
            </span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.nama}</h3>
            <p className="text-gray-500 text-sm font-bold mb-6">{item.harga}</p>
            
            <a 
              href={`https://wa.me/${item.wa}?text=Halo, saya tertarik dengan produk ${item.nama}`}
              target="_blank"
              className="block text-center py-3 bg-[#c1eb91] text-green-900 font-bold rounded-xl hover:bg-green-600 hover:text-white transition shadow-sm"
            >
              💬 Hubungi Penjual
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/potensi" className="text-green-600 font-bold hover:underline">
          Lihat Semua Produk UMKM &rarr;
        </Link>
      </div>
    </section>
  );
}