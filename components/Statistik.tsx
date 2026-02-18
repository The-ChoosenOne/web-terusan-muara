// Statistik.tsx

interface StatistikProps {
  data: {
    jumlahPenduduk?: number;
    kepalaKeluarga?: number;
    luasWilayah?: string;
  };
}

export default function Statistik({ data }: StatistikProps) {
  return (
    <div className="bg-white py-12 -mt-10 relative z-20 mx-4 md:mx-auto max-w-6xl rounded-xl shadow-2xl border-t-4 border-yellow-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
        {/* Kotak 1: Penduduk */}
        <div className="p-4">
          <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
          <h3 className="text-4xl font-bold text-blue-900 mb-1">
            {data?.jumlahPenduduk?.toLocaleString("id-ID") || "0"}
          </h3>
          <p className="text-gray-500 font-medium uppercase tracking-wider">Jumlah Penduduk</p>
        </div>

        {/* Kotak 2: Kepala Keluarga */}
        <div className="p-4">
          <div className="text-4xl mb-2">🏠</div>
          <h3 className="text-4xl font-bold text-blue-900 mb-1">
            {data?.kepalaKeluarga || "0"}
          </h3>
          <p className="text-gray-500 font-medium uppercase tracking-wider">Kepala Keluarga</p>
        </div>

        {/* Kotak 3: Luas Wilayah */}
        <div className="p-4">
          <div className="text-4xl mb-2">🗺️</div>
          <h3 className="text-4xl font-bold text-blue-900 mb-1">
            {data?.luasWilayah || "0"}
          </h3>
          <p className="text-gray-500 font-medium uppercase tracking-wider">Luas Wilayah</p>
        </div>

      </div>
    </div>
  );
}