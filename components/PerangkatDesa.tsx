"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function PerangkatDesa({ items }: { items: any[] }) {
  return (
    <section className="max-w-7xl mx-auto p-6 md:p-10 my-10 text-center">
      <div className="mb-10" data-aos="fade-down">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Perangkat Desa</h2>
        <p className="text-gray-500">Kenali tim yang siap melayani Anda sepenuh hati.</p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000, // Bergeser otomatis setiap 3 detik
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }, // Menampilkan 4 kartu sekaligus di layar besar
        }}
        className="pb-14" // Memberi ruang untuk titik-titik pagination di bawah
      >
        {items && items.map((item: any) => (
          <SwiperSlide key={item.sys.id}>
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-50 hover:shadow-2xl transition-all duration-300 group">
              <div className="h-72 rounded-xl overflow-hidden mb-4 relative">
                <img 
                  src={item.fields.fotoPerangkat?.fields?.file?.url ? `https:${item.fields.fotoPerangkat.fields.file.url}` : '/staf-placeholder.jpg'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  alt={item.fields.namaPerangkat}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-semibold uppercase tracking-widest">Detail Profil</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{item.fields.namaPerangkat}</h3>
              <p className="text-xs text-green-600 font-bold uppercase tracking-widest mt-1">
                {item.fields.jabatan}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}