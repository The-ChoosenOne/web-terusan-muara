import Link from 'next/link';

export default function Footer() {
  return (
    // Menggunakan Slate-900 agar lebih gelap dari navbar dan border atas amber-300 yang menyala
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-amber-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KOLOM 1: TENTANG DESA */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
              Desa Terusan Muara
            </h3>
            <p className="text-sm leading-relaxed mb-4 text-slate-400">
              Website resmi Desa Terusan Muara, Kecamatan Sumber Marga Telang, Kabupaten Banyuasin. 
              Media komunikasi dan transparansi informasi bagi seluruh masyarakat.
            </p>
            <div className="flex space-x-4">
              {/* === LINK SOSIAL MEDIA === */}
              <a 
                href="https://www.facebook.com/share/18F9MewqwH/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-amber-300 transition-all flex items-center gap-1"
              >
                📘 FB
              </a>
              <a 
                href="https://www.instagram.com/zakiramadhan_17" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-amber-300 transition-all flex items-center gap-1"
              >
                📷 IG
              </a>
              <a 
                href="#" 
                className="text-slate-500 hover:text-amber-300 transition-all flex items-center gap-1"
              >
                ▶️ YT
              </a>
            </div>
          </div>

          {/* KOLOM 2: LINK CEPAT */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
              Jelajahi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">→</span> Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">→</span> Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/potensi" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">→</span> Potensi & UMKM
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-500">→</span> Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: KONTAK */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-amber-300">🏢</span>
                <span>Jl. Poros Desa Terusan Muara, Kec. Sumber Marga Telang, Kab. Banyuasin, Sumsel.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-300">📧</span>
                <span>desaTerusanMuara2019@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-300">📱</span>
                <span>+62 812-7831-8862</span>
              </li>
            </ul>
          </div>

        </div>

        {/* GARIS BAWAH & COPYRIGHT */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-amber-300 font-bold uppercase tracking-tight">Pemerintah Desa Terusan Muara.</span> Hak Cipta Dilindungi. 
            <br/>
          </p>
        </div>
      </div>
    </footer>
  );
}