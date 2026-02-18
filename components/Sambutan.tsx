// components/Sambutan.tsx

export default function Sambutan({ data }: { data: any }) {
  // Jika data belum ada (masih loading atau kosong), jangan tampilkan apa-apa
  if (!data || !data.fields) return null;

  const fields = data.fields;
  const fotoKades = fields.fotoKepalaDesa?.fields?.file?.url;

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-10 my-10">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Bagian Foto */}
        <div className="w-full md:w-1/3" data-aos="fade-right">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-green-100">
            <img 
              src={fotoKades ? `https:${fotoKades}` : '/kades-placeholder.jpg'} 
              alt="Kepala Desa" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-green-600 p-4 text-white text-center">
              <p className="font-bold">{fields.namaKepalaDesa || "Kepala Desa"}</p>
              <p className="text-xs opacity-80 italic">Kepala Desa Parit</p>
            </div>
          </div>
        </div>

        {/* Bagian Teks Sambutan */}
        <div className="w-full md:w-2/3" data-aos="fade-left">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Sambutan Kepala Desa
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-6 leading-tight">
            {fields.judulSambutan || "Mewujudkan Desa Parit yang Mandiri & Sejahtera"}
          </h2>
          <div className="text-gray-600 leading-relaxed italic mb-6">
             "{fields.isiSambutan || "Selamat datang di website resmi Desa Parit..."}"
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-500">
            <p className="text-sm font-bold text-gray-800 mb-2">🚀 Visi Desa:</p>
            <p className="text-gray-600 italic">"{fields.visiDesa || "Terwujudnya Desa Parit yang Maju dan Agamis."}"</p>
          </div>
        </div>
      </div>
    </section>
  );
}