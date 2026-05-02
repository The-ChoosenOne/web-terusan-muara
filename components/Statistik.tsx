// components/Statistik.tsx

interface StatistikProps {
  data: {
    jumlah_penduduk?: number;
    kepala_keluarga?: number;
    luas_wilayah?: number; // Di tabel lo tadi int8 atau float
  };
}

export default function Statistik({ data }: StatistikProps) {
  return (
    <div className="bg-white py-12 -mt-16 relative z-20 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-8 border-amber-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        
        {/* Kotak 1: Penduduk */}
        <div className="p-4 group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👨‍👩‍👧‍👦</div>
          <h3 className="text-5xl font-black text-slate-800 mb-2 tracking-tighter">
            {/* Panggil jumlah_penduduk sesuai kolom Supabase */}
            {data?.jumlah_penduduk?.toLocaleString("id-ID") || "0"}
          </h3>
          <p className="text-yellow-900/90 font-black text-xs uppercase tracking-[0.2em]">
            Jumlah Penduduk
          </p>
        </div>

        {/* Kotak 2: Kepala Keluarga */}
        <div className="p-4 group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏠</div>
          <h3 className="text-5xl font-black text-slate-800 mb-2 tracking-tighter">
            {/* Panggil kepala_keluarga sesuai kolom Supabase */}
            {data?.kepala_keluarga?.toLocaleString("id-ID") || "0"}
          </h3>
          <p className="text-yellow-900/90 font-black text-xs uppercase tracking-[0.2em]">
            Kepala Keluarga
          </p>
        </div>

        {/* Kotak 3: Luas Wilayah */}
        <div className="p-4 group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🗺️</div>
          <h3 className="text-5xl font-black text-slate-800 mb-2 tracking-tighter">
            {/* Panggil luas_wilayah sesuai kolom Supabase */}
            {data?.luas_wilayah || "0"} <span className="text-xl">ha</span>
          </h3>
          <p className="text-yellow-900/90 font-black text-xs uppercase tracking-[0.2em]">
            Luas Wilayah
          </p>
        </div>

      </div>
    </div>
  );
}