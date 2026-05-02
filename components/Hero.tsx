import Link from "next/link";

export default function Hero() {
  return (
    // Menggunakan Slate-800 sebagai dasar agar transisi dari Navbar Slate-800 terasa mulus
    <div className="relative bg-slate-800 h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      
      {/* Gambar Background dengan Overlay Gradasi agar teks tetap terbaca jelas */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-800/20"></div>

      {/* Teks di tengah dengan animasi fade-in sederhana */}
      <div className="relative z-10 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl tracking-tight">
          Selamat Datang di <span className="text-amber-300">Desa Terusan Muara</span>
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-slate-200 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
          Membangun Desa yang Mandiri, Sejahtera, dan Berbudaya Menuju Banyuasin yang Lebih Maju.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/profil" 
            className="w-full md:w-auto px-8 py-4 bg-amber-300 hover:bg-amber-200 text-slate-900 font-extrabold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(103,232,249,0.3)] hover:scale-105"
          >
            Tentang Kami
          </Link>
          <Link 
            href="#berita" 
            className="w-full md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-extrabold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
          >
            Baca Berita
          </Link>
        </div>
      </div>
    </div>
  );
}