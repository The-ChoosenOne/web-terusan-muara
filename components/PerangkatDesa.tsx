"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function PerangkatDesa({ items }: { items: any[] }) {
  return (
    <section className="max-w-7xl mx-auto p-6 md:p-10 my-10 text-center">
      <div className="mb-10" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
          Perangkat <span className="text-cyan-600">Desa</span>
        </h2>
        <p className="text-slate-500 font-medium">Kenali tim yang siap melayani Anda sepenuh hati.</p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
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
          1024: { slidesPerView: 4 },
        }}
        className="pb-14 mySwiper"
      >
        {items && items.map((item: any) => (
          // key sekarang pake item.id (Supabase)
          <SwiperSlide key={item.id}>
            <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-500 group">
              <div className="h-80 rounded-2xl overflow-hidden mb-5 relative shadow-inner bg-slate-100">
                {/* SRC sekarang langsung ke item.foto_url */}
                <img 
                  src={item.foto_url || '/staf-placeholder.jpg'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" 
                  alt={item.nama}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white text-xs font-black uppercase tracking-[0.2em] bg-cyan-500/80 px-4 py-2 rounded-full backdrop-blur-sm">
                    Amanah
                  </span>
                </div>
              </div>
              {/* Nama dan Jabatan langsung panggil kolomnya */}
              <h3 className="font-bold text-slate-800 text-xl tracking-tight">{item.nama}</h3>
              <p className="text-xs text-cyan-600 font-black uppercase tracking-[0.15em] mt-2">
                {item.jabatan}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #0891b2 !important; /* cyan-600 */
          width: 24px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </section>
  );
}