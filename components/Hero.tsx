import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-blue-900 h-[500px] flex items-center justify-center text-center text-white">
      
      {/* Gambar Background (Ceritanya ini foto Desa Parit) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop')" }}
      ></div>

      {/* Teks di tengah */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Selamat Datang di Desa Parit
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow-md">
          Membangun Desa yang Mandiri, Sejahtera, dan Berbudaya Menuju Ogan Ilir Bangkit.
        </p>
        
        <div className="space-x-4">
          <Link 
            href="/profil" 
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-full transition shadow-lg"
          >
            Tentang Kami
          </Link>
          <Link 
            href="#berita" 
            className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-full transition shadow-lg"
          >
            Baca Berita
          </Link>
        </div>
      </div>
    </div>
  );
}