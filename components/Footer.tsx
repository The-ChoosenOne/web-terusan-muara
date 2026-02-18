import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-[#c1eb91]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KOLOM 1: TENTANG DESA */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
              Desa Parit
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Website resmi Desa Parit, Kecamatan Indralaya Utara, Kabupaten Ogan Ilir. 
              Media komunikasi dan transparansi informasi bagi seluruh masyarakat.
            </p>
            <div className="flex space-x-4">
              {/* === LINK SOSIAL MEDIA AKTIF === */}
              <a 
                href="https://www.facebook.com/share/18F9MewqwH/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-500 transition flex items-center gap-1"
              >
                📘 FB
              </a>
              <a 
                href="https://www.instagram.com/desaparit_indralaya_utara?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-500 transition flex items-center gap-1"
              >
                📷 IG
              </a>
              <a 
                href="https://youtube.com/LINK_AKUN_YT_DISINI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-red-500 transition flex items-center gap-1"
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
                <Link href="/" className="hover:text-[#c1eb91] transition">&rarr; Beranda</Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-[#c1eb91] transition">&rarr; Profil Desa</Link>
              </li>
              <li>
                <Link href="/potensi" className="hover:text-[#c1eb91] transition">&rarr; Potensi & UMKM</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#c1eb91] transition">&rarr; Kontak Kami</Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: KONTAK */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-base">🏢</span>
                <span>Jl. Poros Desa Parit, Kec. Indralaya Utara, Kab. Ogan Ilir, Sumsel.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base">📧</span>
                <span>desaparit2019@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base">📱</span>
                <span>+62 812-7831-8862</span>
              </li>
            </ul>
          </div>

        </div>

        {/* GARIS BAWAH & COPYRIGHT */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Pemerintah Desa Parit. Hak Cipta Dilindungi. 
            <br/>
            Dikembangkan oleh <span className="text-[#c1eb91] font-bold uppercase tracking-tight">
              Mahasiswa KKN REKOGNISI KELOMPOK 2 UIN RADEN FATAH PALEMBANG 2026
            </span>.
          </p>
        </div>
      </div>
    </footer>
  );
}