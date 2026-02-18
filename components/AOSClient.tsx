"use client"; // Wajib pakai ini

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import gaya animasinya

export default function AOSClient() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi (1 detik)
      once: true,     // Animasi cuma muncul sekali (biar gak pusing)
      easing: "ease-out-cubic", // Gaya geraknya halus
    });
  }, []);

  return null; // Komponen ini cuma buat nyalain animasi, gak nampilin apa-apa
}