import { createClient } from "contentful";

export const client = createClient({
  space: "5f4zyycfroy7",
  accessToken: "YpagbEL4ZHN88CMz1etYShCs4dolaK8WKMIRcQwY180", 
  host: "preview.contentful.com" 
});

// DEFINISI CACHE BREAKER SEBAGAI OBJEK TETAP
const CACHE_BREAKER = {
  "sys.updatedAt[ne]": "1970-01-01T00:00:00Z",
};

export async function getProfil() {
  try {
    const res = await client.getEntries({ 
      content_type: "profilDesa", 
      limit: 1,
      ...CACHE_BREAKER 
    } as any); // Gunakan 'as any' untuk membungkam error TypeScript
    return res.items[0] || null;
  } catch (e) { return null; }
}

export async function getBerita() {
  try {
    const res = await client.getEntries({ 
      content_type: "beritabaru", 
      order: ["-fields.tanggalpost"] as any,
      ...CACHE_BREAKER 
    } as any);
    return res.items || [];
  } catch (e) { return []; }
}

export async function getPotensi() {
  try {
    const res = await client.getEntries({ 
      content_type: "potensiDesa",
      ...CACHE_BREAKER 
    } as any);
    return res.items || [];
  } catch (e) { return []; }
}

export async function getPerangkat() {
  try {
    const res = await client.getEntries({ 
      content_type: "perangkatDesa",
      order: ["-sys.createdAt"] as any,
      include: 2,
      ...CACHE_BREAKER 
    } as any);
    return res.items || [];
  } catch (e) { return []; }
}

export async function getDashboardStats() {
  try {
    // Penggunaan 'as any' di sini juga untuk menghilangkan garis merah di baris 60
    const res = await client.getEntries({ ...CACHE_BREAKER } as any);
    const items = res.items || [];
    return {
      berita: items.filter((item: any) => item.sys.contentType.sys.id === "beritabaru").length,
      staf: items.filter((item: any) => item.sys.contentType.sys.id === "perangkatDesa").length,
      potensi: items.filter((item: any) => item.sys.contentType.sys.id === "potensiDesa").length,
    };
  } catch (e) {
    return { berita: 0, staf: 0, potensi: 0 };
  }
}
export async function getBeritaBySlug(slug: string) {
  try {
    const res = await client.getEntries({
      content_type: "beritabaru",
      "fields.slug": slug, // Mencari berita berdasarkan slug yang kamu isi di Contentful
      limit: 1,
      ...CACHE_BREAKER
    } as any);

    if (!res.items || res.items.length === 0) {
      console.log("Berita tidak ditemukan untuk slug:", slug);
      return null;
    }

    return res.items[0];
  } catch (e) {
    console.error("Error saat mengambil detail berita:", e);
    return null;
  }
}