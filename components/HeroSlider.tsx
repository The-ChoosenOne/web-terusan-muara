"use client"; 

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function HeroSlider({ photos }: { photos: string[] }) {
  // PENGAMAN: Kalau photos bukan array atau kosong, kasih gambar default
  const validPhotos = Array.isArray(photos) && photos.length > 0 
    ? photos 
    : ["/placeholder-desa.jpg"]; 

  return (
    <section className="relative h-[550px] md:h-[750px] overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade" // Pakai efek fade biar transisinya mewah
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full mySwiper"
      >
        {validPhotos.map((url: string, index: number) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            
            {/* PAKAI NEXT/IMAGE: Lebih stabil daripada backgroundImage */}
            <div className="absolute inset-0 z-0">
              <Image
                src={url}
                alt={`Slider Desa ${index}`}
                fill
                priority={index === 0}
                className="object-cover animate-pulse-slow" // Gue tambahin animasi halus
              />
              {/* Overlay Gradient Slate tetap ada */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-slate-600/40 to-transparent z-10" />
            </div>

            {/* KONTEN TEKS */}
            <div className="relative z-20 h-full flex items-center px-10 md:px-24">
              <div className="max-w-4xl text-left">
                <div className="mb-6 inline-block px-4 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/40 backdrop-blur-md">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">
                    Official Village Portal
                  </span>
                </div>
                
                <h1 className="text-6xl md:text-[120px] font-[1000] text-white uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl">
                  Selamat <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                    Datang
                  </span>
                </h1>

                <p className="text-xl md:text-4xl font-black italic text-white/90 mb-8 border-l-4 border-amber-400 pl-6 uppercase tracking-tight">
                  Di Desa Terusan Muara
                </p>

                <p className="text-sm md:text-xl text-slate-300 font-medium max-w-lg leading-relaxed">
                  "Kebersamaan Dalam Membangun Demi Desa Terusan Muara Yang Lebih Maju"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto translate-y-6">
          <path d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z" fill="#f8fafc"/>
        </svg>
      </div>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { color: #67e8f9 !important; transform: scale(0.6); opacity: 0.6; transition: 0.3s; }
        .swiper-button-next:hover, .swiper-button-prev:hover { opacity: 1; transform: scale(0.7); }
        .swiper-pagination-bullet { background: white !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { background: #67e8f9 !important; opacity: 1; width: 40px; border-radius: 10px; transition: 0.3s; }
      `}</style>
    </section>
  );
}