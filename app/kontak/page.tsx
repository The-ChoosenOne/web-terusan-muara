export default function Kontak() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HEADER (Hijau Tua) */}
      <div className="bg-green-900 h-80 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Dekorasi Latar Belakang */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        
        <div className="text-center relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
            Hubungi Kami
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90">
            Layanan Aspirasi, Informasi, & Lokasi Strategis Desa Parit
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* 2. KOTAK KIRI: INFO KONTAK (Span 2) */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-2xl shadow-green-900/10 h-full border border-gray-100" data-aos="fade-right">
            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-green-600">📍</span> Informasi Kantor
            </h2>
            
            <div className="space-y-8">
              
              {/* Alamat Baru Fadly */}
              <div className="flex items-start gap-5">
                <div className="bg-green-50 p-4 rounded-2xl text-green-700 text-2xl shadow-sm">
                  🏢
                </div>
                <div>
                  <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1 text-green-700">Alamat Lengkap</h3>
                  <p className="text-gray-600 font-bold leading-relaxed">
                    RH9V+JHM, Parit, <br/>
                    Kecamatan Indralaya Utara, Kabupaten Ogan Ilir, <br/>
                    Sumatera Selatan 30862, Indonesia.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-700 text-2xl shadow-sm">
                  📧
                </div>
                <div>
                  <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1 text-blue-700">Email Resmi</h3>
                  <p className="text-gray-600 font-bold">
                    desaparit2019@gmail.com
                  </p>
                </div>
              </div>

              {/* Jam Kerja */}
              <div className="flex items-start gap-5">
                <div className="bg-orange-50 p-4 rounded-2xl text-orange-700 text-2xl shadow-sm">
                  🕒
                </div>
                <div>
                  <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1 text-orange-700">Jam Pelayanan</h3>
                  <p className="text-gray-600 font-bold">
                    Senin - Jumat: 08.00 - 16.00 WIB<br/>
                    <span className="text-red-500 font-medium">Sabtu - Minggu: Libur</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Tombol WhatsApp */}
            <div className="mt-12">
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank"
                className="group flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-[25px] transition-all duration-300 shadow-xl shadow-green-600/20 active:scale-95 uppercase text-sm tracking-widest"
              >
                <span className="text-2xl group-hover:animate-bounce">📱</span> Hubungi via WhatsApp
              </a>
            </div>
          </div>

          {/* 3. KOTAK KANAN: PETA (Span 3) */}
          <div className="lg:col-span-3 bg-white p-3 rounded-[40px] shadow-2xl shadow-green-900/10 h-[500px] lg:h-full overflow-hidden border border-gray-100" data-aos="fade-left">
          <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934.346387034986!2d104.5843467615671!3d-3.1812836894050226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3bbcdec5367e81%3A0xdc399151c4ea42f7!2sKantor%20Kades%20Parit!5e0!3m2!1sid!2sid!4v1707038100000!5m2!1sid!2sid"
  width="100%" 
  height="100%" 
  style={{ border: 0, minHeight: '500px' }} 
  allowFullScreen={true} 
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-[35px]"
></iframe>
          </div>

        </div>

      </div>

      {/* FOOTER TEKS TAMBAHAN */}
      <div className="text-center mt-20">
         <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
            Website Resmi Pemerintah Desa Parit &copy; 2026
         </p>
      </div>
    </main>
  );
}