import { getBerita } from "@/lib/contentful";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // Agar berita baru langsung muncul

export default async function BeritaPage() {
  const allBerita = await getBerita();

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-black text-green-900 mb-10 uppercase tracking-tighter border-l-8 border-yellow-500 pl-6">
          Berita Desa Parit
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allBerita.map((item: any) => (
            <div key={item.sys.id} className="bg-white rounded-[40px] shadow-xl overflow-hidden group border border-gray-100">
              <div className="relative h-60 w-full bg-gray-200">
                {item.fields?.gambarUtama?.fields?.file?.url ? (
                  <Image 
                    src={`https:${item.fields.gambarUtama.fields.file.url}`}
                    alt={item.fields?.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">No Image</div>
                )}
              </div>
              <div className="p-8">
                <p className="text-green-600 font-bold text-xs uppercase mb-2">
                  {new Date(item.fields?.tanggalpost).toLocaleDateString('id-ID')}
                </p>
                <h3 className="text-xl font-black text-gray-800 mb-4 line-clamp-2">
                  {item.fields?.judul}
                </h3>
                <Link href={`/berita/${item.fields.slug}`} className="text-green-700 font-bold hover:underline">
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}