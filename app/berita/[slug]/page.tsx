// app/berita/[slug]/page.tsx

import { getBeritaBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function DetailBerita({ params }: { params: { slug: string } }) {
  // 1. Ambil data berita berdasarkan slug dari URL
  const berita = await getBeritaBySlug(params.slug);

  // 2. Jika berita tidak ditemukan, tampilkan halaman 404 bawaan Next.js
  if (!berita) {
    notFound();
  }

  // 3. Destructuring data dengan aman
  const { judul, tanggalpost, konten, gambarUtama } = berita.fields as any;
  const imgUrl = gambarUtama?.fields?.file?.url;

  return (
    <main className="min-h-screen bg-white pb-20 pt-32 animate-in fade-in duration-700">
      <article className="max-w-4xl mx-auto px-6">
        
        <Link href="/berita" className="text-green-600 font-extrabold mb-8 inline-flex items-center gap-2 hover:gap-3 transition-all group uppercase text-sm tracking-widest">
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Kembali ke Portal Berita
        </Link>

        <h1 className="text-4xl md:text-6xl font-[1000] text-gray-900 mb-8 leading-[0.9] tracking-tighter uppercase italic">
          {judul}
        </h1>

        <div className="flex items-center text-gray-400 mb-12 border-b border-gray-100 pb-8">
          <span className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-green-100">
            📅 {tanggalpost ? new Date(tanggalpost).toLocaleDateString("id-ID", {
              day: 'numeric', month: 'long', year: 'numeric'
            }) : 'Tanggal tidak tersedia'}
          </span>
        </div>

        {/* IMAGE SECTION - High Contrast Shadow */}
        {imgUrl && (
          <div className="relative w-full h-[350px] md:h-[550px] mb-12 rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-50">
            <Image 
              src={`https:${imgUrl}`} 
              alt={judul}
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              priority
            />
          </div>
        )}

        {/* CONTENT SECTION - Typography Clean */}
        <div className="prose prose-lg md:prose-xl prose-green max-w-none text-gray-800 leading-relaxed font-medium selection:bg-green-100">
          {konten && documentToReactComponents(konten)}
        </div>

        {/* FOOTER - Laporan KKN Marker */}
        <div className="mt-20 pt-10 border-t border-gray-50 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
            Website Resmi Desa Parit • Digitalisasi KKN 2026
          </p>
        </div>

      </article>
    </main>
  );
}