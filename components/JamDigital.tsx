"use client";

import { useState, useEffect } from "react";

export default function JamDigital() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date()); // Set waktu awal
    const timer = setInterval(() => setDate(new Date()), 1000); // Update tiap detik
    return () => clearInterval(timer);
  }, []);

  if (!date) return null; // Jangan tampilkan apa-apa kalau data belum siap

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100 flex items-center gap-2 text-sm text-blue-900 font-medium">
      <span className="text-lg">📅</span>
      {date.toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      <span className="w-[1px] h-4 bg-gray-300 mx-1"></span>
      <span className="font-bold text-blue-600">
        {date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
      </span>
    </div>
  );
}