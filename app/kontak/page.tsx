export default function Kontak() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HEADER: Menggunakan Slate-900 agar senada dengan Navbar */}
      <div className="bg-slate-900 h-96 flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-900 opacity-60"></div>
        
        {/* Dekorasi Latar Belakang amber */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px]"></div>
        
        <div className="text-center relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-[1000] text-white mb-6 uppercase tracking-tighter leading-none">
            Hubungi <span className="text-amber-400">Kami</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90 leading-relaxed italic">
            "Layanan Aspirasi, Informasi, & Lokasi Strategis Pemerintah Desa Terusan Muara"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pt-7">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* 2. KOTAK KIRI: INFO KONTAK (Slate & amber) */}
          <div className="lg:col-span-2 bg-white p-10 md:p-12 rounded-[50px] shadow-2xl shadow-slate-900/10 h-full border border-slate-50" data-aos="fade-right">
            <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
              <span className="text-amber-500 text-4xl">📍</span> Kantor Desa
            </h2>
            
            <div className="space-y-10">
              
              {/* Alamat Terusan Muara */}
              <div className="flex items-start gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl text-amber-300 text-2xl shadow-lg border border-amber-500/30">
                  🏢
                </div>
                <div>
                  <h3 className="font-black text-amber-600 uppercase text-[10px] tracking-[0.2em] mb-2">Alamat Lengkap</h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-sm md:text-base">
                    Jl. Poros Desa Terusan Muara, <br/>
                    Kecamatan Sumber Marga Telang, Kabupaten Banyuasin, <br/>
                    Sumatera Selatan 30862, Indonesia.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6">
                <div className="bg-slate-100 p-5 rounded-2xl text-slate-700 text-2xl shadow-inner">
                  📧
                </div>
                <div>
                  <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em] mb-2 text-slate-500">Email Resmi</h3>
                  <p className="text-slate-800 font-black tracking-tight text-sm md:text-base">
                    desaTerusanMuara2019@gmail.com
                  </p>
                </div>
              </div>

              {/* Jam Kerja */}
              <div className="flex items-start gap-6">
                <div className="bg-amber-50 p-5 rounded-2xl text-amber-600 text-2xl shadow-sm border border-amber-100">
                  🕒
                </div>
                <div>
                  <h3 className="font-black text-amber-700 uppercase text-[10px] tracking-[0.2em] mb-2">Jam Pelayanan</h3>
                  <p className="text-slate-700 font-bold text-sm md:text-base">
                    Senin - Jumat: 08.00 - 16.00 WIB<br/>
                    <span className="text-red-500 font-black uppercase text-[10px] mt-1 block tracking-widest">Sabtu - Minggu: Libur</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Tombol WhatsApp */}
            <div className="mt-12">
              <a 
                href="https://wa.me/6281278318862" 
                target="_blank"
                className="group flex items-center justify-center gap-4 w-full bg-amber-300 hover:bg-slate-900 hover:text-amber-300 text-slate-900 font-black py-5 rounded-[25px] transition-all duration-500 shadow-xl shadow-amber-300/20 active:scale-95 uppercase text-xs tracking-[0.2em]"
              >
                <span className="text-2xl group-hover:animate-bounce">💬</span> Chat WhatsApp
              </a>
            </div>
          </div>

          {/* 3. KOTAK KANAN: PETA (Gue benerin link Google Maps-nya biar nongol) */}
          <div className="lg:col-span-3 bg-white p-4 rounded-[50px] shadow-2xl shadow-slate-900/10 h-[500px] lg:h-full overflow-hidden border border-slate-50" data-aos="fade-left">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15939.999117622616!2d104.8143282!3d-2.5076632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b1f9b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sDesa%20Terusan%20Muara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '500px' }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[40px] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

        </div>

      </div>

      {/* FOOTER TEKS */}
      <div className="text-center mt-24">
         <p className="text-slate-400 font-black uppercase text-[9px] tracking-[0.4em] flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-slate-200"></span>
            Pemerintah Desa Terusan Muara © 2026
            <span className="h-px w-10 bg-slate-200"></span>
         </p>
      </div>
    </main>
  );
}