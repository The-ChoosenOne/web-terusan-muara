import Link from 'next/link';

export default function Navbar() {
  return (
    // GANTI: bg-blue-800 -> bg-green-900 | border-blue-600 -> border-green-700
    <nav className="bg-green-900 text-white shadow-lg sticky top-0 z-50 border-t border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* === MENU KIRI (Pakai Ikon SVG Biar Keren) === */}
          <div className="flex space-x-1 md:space-x-4 overflow-x-auto no-scrollbar">
            
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-800 transition group">
              {/* Ikon Rumah */}
              {/* GANTI: text-blue-300 -> text-green-300 | hover:text-yellow-400 -> hover:text-[#c1eb91] */}
              <svg className="w-5 h-5 text-green-300 group-hover:text-[#c1eb91]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              <span className="font-medium text-sm group-hover:text-[#c1eb91] transition">Beranda</span>
            </Link>

            <Link href="/profil" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-800 transition group">
              {/* Ikon Orang */}
              <svg className="w-5 h-5 text-green-300 group-hover:text-[#c1eb91]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              <span className="font-medium text-sm group-hover:text-[#c1eb91] transition">Profil Desa</span>
            </Link>

            <Link href="/berita" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-800 transition group">
              {/* Ikon Koran */}
              <svg className="w-5 h-5 text-green-300 group-hover:text-[#c1eb91]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" /><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" /></svg>
              <span className="font-medium text-sm group-hover:text-[#c1eb91] transition">Berita</span>
            </Link>

            <Link href="/potensi" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-800 transition group">
               {/* Ikon Grafik */}
               <svg className="w-5 h-5 text-green-300 group-hover:text-[#c1eb91]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
               <span className="font-medium text-sm group-hover:text-[#c1eb91] transition">Potensi</span>
            </Link>

            <Link href="/kontak" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-green-800 transition group">
               {/* Ikon Telepon */}
               <svg className="w-5 h-5 text-green-300 group-hover:text-[#c1eb91]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
               <span className="font-medium text-sm group-hover:text-[#c1eb91] transition">Kontak</span>
            </Link>

          </div>

          {/* === KANAN: Search Bar === */}
          {/* GANTI: bg-blue-900 -> bg-green-800 | border-blue-700 -> border-green-600 */}
          <div className="hidden md:flex items-center bg-green-800 rounded-md overflow-hidden border border-green-600">
            <input 
              type="text" 
              placeholder="Cari informasi..." 
              // GANTI: placeholder-blue-300 -> placeholder-green-300
              className="bg-transparent text-sm px-4 py-1.5 text-white placeholder-green-300 focus:outline-none w-48"
            />
            {/* GANTI: bg-yellow-500 -> bg-[#c1eb91] | hover:yellow-400 -> hover:bg-green-200 | text-blue-900 -> text-green-900 */}
            <button className="bg-[#c1eb91] hover:bg-green-200 text-green-900 p-2 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}