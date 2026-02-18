"use client"; 

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider({ photos }: { photos: any }) {
  return (
    <section className="relative h-[550px] md:h-[750px] overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1200} // Kecepatan geser yang smooth
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full mySwiper"
      >
        {photos?.map((photo: any, index: number) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            {/* Foto dengan Efek Zoom Lambat */}
            <div 
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ 
                backgroundImage: `url('https:${photo.fields?.file?.url}')`,
              }}
            >
              {/* Overlay Gradient agar teks "pop-up" */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Konten Teks yang Ikut Bergeser */}
            <div className="relative z-10 h-full flex items-center px-10 md:px-24">
              <div className="max-w-3xl text-left">
                <div className="mb-4 inline-block px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-green-400">
                    Official Village Portal
                  </span>
                </div>
                
                <h1 className="text-6xl md:text-9xl font-[1000] text-white uppercase tracking-tighter leading-[0.8] mb-6 drop-shadow-2xl">
                  Selamat <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                    Datang
                  </span>
                </h1>

                <p className="text-xl md:text-3xl font-black italic text-white/90 mb-8 border-l-4 border-green-500 pl-4">
                  DI DESA PARIT
                </p>

                <p className="text-sm md:text-lg text-white/70 font-medium max-w-md leading-relaxed">
                  "Membangun Desa yang Mandiri, Sejahtera, dan Berbasis Digital"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Wave Decoration di bawah (Ciri Khas Web Desa Parit) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto translate-y-4">
          <path d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z" fill="white"/>
        </svg>
      </div>

      {/* Custom CSS untuk Navigation Swiper agar lebih estetik */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.5); opacity: 0.5; transition: 0.3s; }
        .swiper-button-next:hover, .swiper-button-prev:hover { opacity: 1; transform: scale(0.6); }
        .swiper-pagination-bullet { background: white !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { background: #22c55e !important; opacity: 1; width: 30px; border-radius: 10px; transition: 0.3s; }
      `}</style>
    </section>
  );
}