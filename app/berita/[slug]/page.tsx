import { supabase } from "@/lib/supabase"; // Ganti import-nya ke Supabase
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function DetailBerita({ params }: { params: { slug: string } }) {
  // 1. Ambil data berita berdasarkan slug dari Supabase
  const { data: berita } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", params.slug)
    .single();

  // 2. Jika berita tidak ditemukan, tampilkan halaman 404
  if (!berita) {
    notFound();
  }

  // 3. Destructuring data Supabase (Gak perlu .fields lagi Jak!)
  const { judul, tanggal, konten, foto_url } = berita;

  return (
    <main className="min-h-screen bg-white pb-24 pt-40 animate-in fade-in duration-700">
      <article className="max-w-4xl mx-auto px-6">
        
        {/* Navigasi Kembali */}
        <Link href="/berita" className="text-cyan-600 font-[1000] mb-10 inline-flex items-center gap-3 hover:gap-5 transition-all group uppercase text-xs tracking-[0.2em]">
          <span className="group-hover:-translate-x-2 transition-transform">←</span> Kembali ke Portal Berita
        </Link>

        {/* Judul Berita */}
        <h1 className="text-4xl md:text-7xl font-[1000] text-slate-900 mb-10 leading-[0.85] tracking-tighter uppercase italic">
          {judul}
        </h1>

        <div className="flex items-center text-slate-400 mb-16 border-b border-slate-50 pb-10">
          <span className="bg-slate-900 text-cyan-300 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg border border-cyan-500/30 flex items-center gap-2">
            <span className="animate-pulse">📅</span> {tanggal ? new Date(tanggal).toLocaleDateString("id-ID", {
              day: 'numeric', month: 'long', year: 'numeric'
            }) : 'Tanggal tidak tersedia'}
          </span>
        </div>

        {/* IMAGE SECTION */}
        {foto_url && (
          <div className="relative w-full h-[350px] md:h-[600px] mb-16 rounded-[50px] overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-50">
            <Image 
              src={foto_url} // Langsung pake foto_url dari Supabase
              alt={judul}
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              priority
            />
          </div>
        )}

        {/* CONTENT SECTION */}
        <div className="prose prose-lg md:prose-2xl prose-slate max-w-none text-slate-700 leading-relaxed font-medium selection:bg-cyan-100">
          {/* Karena kita input berita dari dashboard pake TextArea atau Editor, 
              kita render pake dangerouslySetInnerHTML biar tag <p> atau <br> kebaca */}
          <div 
            className="drop-shadow-sm whitespace-pre-line" // whitespace-pre-line buat jaga enter/spasi
            dangerouslySetInnerHTML={{ __html: konten }} 
          />
        </div>

        {/* FOOTER */}
        <div className="mt-24 pt-12 border-t border-slate-50 text-center">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.6em] flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-slate-100"></span>
            Pemerintah Desa Terusan Muara • KKN 2026
            <span className="h-px w-12 bg-slate-100"></span>
          </p>
        </div>

      </article>
    </main>
  );
}