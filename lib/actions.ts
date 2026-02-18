"use server";

import { revalidatePath } from "next/cache";

// KONFIGURASI UTAMA - PAKAI TOKEN 'Token_Admin_Final'
const SPACE_ID = "5f4zyycfroy7"; 
const MGMT_TOKEN = "CFPAT-TzHZtkLjDW5yJumhfhPJDZUKc889BipB97dqvZIwos0"; 

// --- 1. FUNGSI UPLOAD ASSET (UNTUK SEMUA FITUR) ---
async function uploadAsset(file: File) {
  if (!file || file.size === 0 || typeof file === "string") return null;
  try {
    const uploadRes = await fetch(`https://upload.contentful.com/spaces/${SPACE_ID}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "Content-Type": "application/octet-stream",
      },
      body: await file.arrayBuffer(),
    });
    const uploadData = await uploadRes.json();

    const assetRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/assets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify({
        fields: {
          title: { "en-US": file.name },
          file: {
            "en-US": {
              contentType: file.type,
              fileName: file.name,
              uploadFrom: { sys: { type: "Link", linkType: "Upload", id: uploadData.sys.id } },
            },
          },
        },
      }),
    });
    const assetData = await assetRes.json();
    const assetId = assetData.sys.id;

    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${assetId}/process`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}` },
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${assetId}/published`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": "1" },
    });

    return assetId;
  } catch (error) {
    console.error("Upload Gagal:", error);
    return null;
  }
}

// --- 2. FITUR PERANGKAT DESA ---
export async function tambahPerangkatAction(formData: FormData) {
  try {
    const assetId = await uploadAsset(formData.get("fotoPerangkat") as File);
    const response = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "X-Contentful-Content-Type": "perangkatDesa",
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify({
        fields: {
          namaPerangkat: { "en-US": formData.get("namaPerangkat") },
          jabatan: { "en-US": formData.get("jabatan") },
          fotoPerangkat: assetId ? { "en-US": { sys: { type: "Link", linkType: "Asset", id: assetId } } } : undefined,
        },
      }),
    });
    const data = await response.json();
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${data.sys.id}/published`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": "1" },
    });
    revalidatePath("/dashboard/perangkat");
    return { success: true, message: "Perangkat Berhasil Ditambahkan!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function updatePerangkat(id: string, formData: FormData) {
  try {
    const getRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, {
      headers: { Authorization: `Bearer ${MGMT_TOKEN}` },
    });
    const entryLama = await getRes.json();
    const assetId = await uploadAsset(formData.get("fotoPerangkat") as File);

    const updateRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "X-Contentful-Version": entryLama.sys.version.toString(),
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify({
        fields: {
          namaPerangkat: { "en-US": formData.get("namaPerangkat") },
          jabatan: { "en-US": formData.get("jabatan") },
          fotoPerangkat: assetId ? { "en-US": { sys: { type: "Link", linkType: "Asset", id: assetId } } } : entryLama.fields.fotoPerangkat,
        },
      }),
    });
    const dataBaru = await updateRes.json();
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}/published`, { method: "PUT", headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": dataBaru.sys.version.toString() } });
    revalidatePath("/dashboard/perangkat");
    return { success: true, message: "Data Diperbarui!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deletePerangkat(id: string) {
  try {
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}/published`, { method: "DELETE", headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    revalidatePath("/dashboard/perangkat");
    return { success: true, message: "Berhasil Dihapus!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

// --- 3. FITUR BERITA ---
export async function tambahBeritaAction(formData: FormData) {
  try {
    const judul = formData.get("judul") as string;
    const assetId = await uploadAsset(formData.get("gambarUtama") as File);
    const response = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "X-Contentful-Content-Type": "beritabaru",
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify({
        fields: {
          judul: { "en-US": judul },
          slug: { "en-US": judul.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now() },
          tanggalpost: { "en-US": formData.get("tanggal") || new Date().toISOString() },
          gambarUtama: assetId ? { "en-US": { sys: { type: "Link", linkType: "Asset", id: assetId } } } : undefined,
          konten: { "en-US": { nodeType: "document", data: {}, content: [] } },
        },
      }),
    });
    const data = await response.json();
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${data.sys.id}/published`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": "1" },
    });
    revalidatePath("/dashboard/berita");
    return { success: true, message: "Berita Berhasil Terbit!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deleteBerita(id: string) {
  try {
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}/published`, { method: "DELETE", headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    revalidatePath("/dashboard/berita");
    return { success: true, message: "Berita Dihapus!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

// --- 4. FITUR POTENSI ---
export async function createPotensiAction(formData: FormData) {
  try {
    const assetId = await uploadAsset(formData.get("fotoPotensi") as File);
    const response = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "X-Contentful-Content-Type": "potensiDesa",
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify({
        fields: {
          namaPotensi: { "en-US": formData.get("namaPotensi") },
          kategori: { "en-US": formData.get("kategori") },
          deskripsi: { "en-US": formData.get("deskripsi") },
          fotoPotensi: assetId ? { "en-US": { sys: { type: "Link", linkType: "Asset", id: assetId } } } : undefined,
        },
      }),
    });
    const data = await response.json();
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${data.sys.id}/published`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": "1" },
    });
    revalidatePath("/dashboard/potensi");
    return { success: true, message: "Potensi Berhasil Disimpan!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function updatePotensi(id: string, formData: FormData) {
  try {
    const getRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, { headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    const entryLama = await getRes.json();
    const assetId = await uploadAsset(formData.get("fotoPotensi") as File);

    const updateRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": entryLama.sys.version.toString(), "Content-Type": "application/vnd.contentful.management.v1+json" },
      body: JSON.stringify({
        fields: {
          namaPotensi: { "en-US": formData.get("namaPotensi") },
          kategori: { "en-US": formData.get("kategori") },
          deskripsi: { "en-US": formData.get("deskripsi") },
          fotoPotensi: assetId ? { "en-US": { sys: { type: "Link", linkType: "Asset", id: assetId } } } : entryLama.fields.fotoPotensi,
        },
      }),
    });
    const dataBaru = await updateRes.json();
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}/published`, { method: "PUT", headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": dataBaru.sys.version.toString() } });
    revalidatePath("/dashboard/potensi");
    return { success: true, message: "Potensi Diperbarui!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deletePotensi(id: string) {
  try {
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}/published`, { method: "DELETE", headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    revalidatePath("/dashboard/potensi");
    return { success: true, message: "Potensi Dihapus!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

// --- 5. FITUR PROFIL ---
export async function updateProfilDesaAction(formData: FormData) {
  try {
    const getEntries = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=profilDesa&limit=1`, { headers: { Authorization: `Bearer ${MGMT_TOKEN}` } });
    const entries = await getEntries.json();
    const entry = entries.items[0];
    const assetId = await uploadAsset(formData.get("fotoKades") as File);

    const updateRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": entry.sys.version.toString(), "Content-Type": "application/vnd.contentful.management.v1+json" },
      body: JSON.stringify({
        fields: {
          judulProfil: { "en-US": formData.get("judul") },
          tagline: { "en-US": formData.get("tagline") },
          jumlahPenduduk: { "en-US": Number(formData.get("penduduk")) },
          kepalaKeluarga: { "en-US": Number(formData.get("kk")) },
          luasWilayah: { "en-US": formData.get("luas") },
          sejarah: { "en-US": formData.get("sejarah") },
          visi: { "en-US": formData.get("visi") },
          misi: { "en-US": formData.get("misi") },
          namaKepalaDesa: { "en-US": formData.get("namaKades") },
          judulSambutan: { "en-US": formData.get("judulSambutan") },
          isiSambutan: { "en-US": formData.get("isiSambutan") },
          fotoKepalaDesa: assetId ? { "en-US": { sys: { type: "Link", linkType: "Asset", id: assetId } } } : entry.fields.fotoKepalaDesa,
        },
      }),
    });
    const dataBaru = await updateRes.json();
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}/published`, { method: "PUT", headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": dataBaru.sys.version.toString() } });
    revalidatePath("/dashboard/profil");
    revalidatePath("/profil");
    return { success: true, message: "Profil Berhasil Diperbarui!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}
// --- 6. FITUR SLIDER BERANDA ---
export async function uploadHeroPhotoAction(formData: FormData) {
  const imageFile = formData.get("fotoHero") as File;
  if (!imageFile || imageFile.size === 0) return { success: false, message: "Pilih foto dulu!" };

  try {
    // A. Gunakan fungsi uploadAsset yang sudah ada di lib/actions.ts
    const assetId = await uploadAsset(imageFile);

    if (!assetId) throw new Error("Gagal upload gambar slider");

    // B. Ambil data Profil Desa untuk mendapatkan daftar foto yang sudah ada
    const getEntries = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=profilDesa&limit=1`, {
      headers: { Authorization: `Bearer ${MGMT_TOKEN}` }
    });
    const entries = await getEntries.json();
    const entry = entries.items[0];

    // C. Ambil daftar foto lama, lalu tambahkan yang baru
    const currentPhotos = entry.fields.fotoHero?.["en-US"] || [];
    const newPhotos = [
      ...currentPhotos,
      { sys: { type: "Link", linkType: "Asset", id: assetId } }
    ];

    // D. Update Entry Profil Desa
    const updateRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${MGMT_TOKEN}`,
        "X-Contentful-Version": entry.sys.version.toString(),
        "Content-Type": "application/vnd.contentful.management.v1+json",
      },
      body: JSON.stringify({
        fields: {
          ...entry.fields, // Jaga data lain (visi, misi, kades) agar tidak hilang
          fotoHero: { "en-US": newPhotos },
        },
      }),
    });

    const dataBaru = await updateRes.json();

    // E. Publish hasil update
    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}/published`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${MGMT_TOKEN}`, "X-Contentful-Version": dataBaru.sys.version.toString() },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/slider");
    return { success: true, message: "Foto Berhasil Ditambahkan ke Slider! 🚀" };
  } catch (error: any) {
    console.error("Gagal Slider:", error);
    return { success: false, message: error.message };
  }
}