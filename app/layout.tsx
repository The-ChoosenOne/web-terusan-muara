"use client";

import "./globals.css";
import HeaderAtas from "@/components/HeaderAtas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSClient from "@/components/AOSClient"; 
import RunningText from "@/components/RunningText"; 
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Deteksi apakah kita sedang di halaman login atau dashboard
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/dashboard");

  return (
    <html lang="id">
      <head>
        {/* --- BAGIAN GANTI JUDUL & LOGO --- */}
        <title>Desa Terusan Muara | Website Resmi</title>
        <meta name="description" content="Portal Informasi Resmi Pemerintah Desa Terusan Muara, Kecamatan Sumber Marga Telang, Banyuasin." />
        <link rel="icon" href="/banyuasin.png" /> 
        {/* Pastiin lo taruh file icon.png di folder /public ya Jak! */}
      </head>
      <body className={poppins.className}>
        <AOSClient />

        {/* Header Desa hanya muncul di beranda/halaman publik */}
        {!isAuthPage && (
          <div className="fixed w-full z-50 top-0 flex flex-col shadow-lg">
             <HeaderAtas />
             <Navbar />
             <RunningText />
          </div>
        )}

        {/* Layout Main */}
        <main className={!isAuthPage ? "pt-[160px] md:pt-[190px] min-h-screen" : "min-h-screen"}>
           {children}
        </main>

        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}