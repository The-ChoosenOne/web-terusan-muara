"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "./supabaseAdmin";
import { supabase } from "@/lib/supabase"; // Sesuaikan path-nya ke file config supabase lo

// --- FUNGSI HELPER: UPLOAD FOTO ---
async function uploadFoto(file: File, folder: string) {
  if (!file || file.size === 0 || typeof file === "string") return null;
  
  // WAJIB PAKE BACKTICK (``) BUKAN KUTIP SATU ('')
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabaseAdmin.storage
    .from("desa-assets")
    .upload(filePath, file);

  if (error) {
    console.error("Gagal Upload ke Storage:", error.message);
    return null;
  }

  const res = supabaseAdmin.storage.from("desa-assets").getPublicUrl(filePath);
  return res.data.publicUrl;
}

// --- 1. FITUR PERANGKAT DESA ---
export async function tambahPerangkatAction(formData: FormData) {
  try {
    const fotoUrl = await uploadFoto(formData.get("fotoPerangkat") as File, "perangkat");
    const { error } = await supabaseAdmin.from("perangkat_desa").insert([{
      nama: formData.get("namaPerangkat"),
      jabatan: formData.get("jabatan"),
      foto_url: fotoUrl
    }]);
    if (error) throw error;
    revalidatePath("/dashboard/perangkat");
    revalidatePath("/profil");
    return { success: true, message: "Berhasil tambah perangkat!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function updatePerangkat(id: string, formData: FormData) {
  try {
    const fotoBaru = formData.get("fotoPerangkat") as File;
    let updateData: any = { 
        nama: formData.get("namaPerangkat"), 
        jabatan: formData.get("jabatan") 
    };
    if (fotoBaru && fotoBaru.size > 0) {
      const url = await uploadFoto(fotoBaru, "perangkat");
      if (url) updateData.foto_url = url;
    }
    const { error } = await supabaseAdmin.from("perangkat_desa").update(updateData).eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard/perangkat");
    revalidatePath("/profil");
    return { success: true, message: "Berhasil update!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deletePerangkat(id: string) {
  try {
    const { error } = await supabaseAdmin.from("perangkat_desa").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard/perangkat");
    return { success: true, message: "Berhasil dihapus!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

// --- 2. FITUR BERITA ---
export async function tambahBeritaAction(formData: FormData) {
  try {
    const judul = formData.get("judul") as string;
    // Samain nama field gambarUtama sesuai form dashboard berita lo
    const fotoUrl = await uploadFoto(formData.get("gambar_utama") as File, "berita");
    
    const { error } = await supabaseAdmin.from("berita").insert([{
      judul,
      slug: judul.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
      tanggal: formData.get("tanggal") || new Date().toISOString(),
      foto_url: fotoUrl,
      // Samain nama field konten_lengkap sesuai textarea dashboard berita lo
      konten: formData.get("konten_lengkap"),
      deskripsi: formData.get("deskripsi")
    }]);
    
    if (error) throw error;
    revalidatePath("/dashboard/berita");
    revalidatePath("/berita");
    return { success: true, message: "Berita berhasil terbit! 🚀" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deleteBerita(id: string) {
  try {
    const { error } = await supabaseAdmin.from("berita").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard/berita");
    revalidatePath("/berita");
    return { success: true, message: "Berita dihapus!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

// --- 3. FITUR POTENSI ---
export async function createPotensiAction(formData: FormData) {
  try {
    const fotoUrl = await uploadFoto(formData.get("fotoPotensi") as File, "potensi");
    const { error } = await supabaseAdmin.from("potensi_desa").insert([{
      nama_potensi: formData.get("namaPotensi"),
      kategori: formData.get("kategori"),
      deskripsi: formData.get("deskripsi"),
      foto_url: fotoUrl
    }]);
    if (error) throw error;
    revalidatePath("/dashboard/potensi");
    revalidatePath("/potensi");
    return { success: true, message: "Potensi berhasil disimpan!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function updatePotensi(id: string, formData: FormData) {
  try {
    const fotoBaru = formData.get("fotoPotensi") as File;
    let updateData: any = { 
        nama_potensi: formData.get("namaPotensi"), 
        kategori: formData.get("kategori"), 
        deskripsi: formData.get("deskripsi") 
    };
    if (fotoBaru && fotoBaru.size > 0) {
      const url = await uploadFoto(fotoBaru, "potensi");
      if (url) updateData.foto_url = url;
    }
    const { error } = await supabaseAdmin.from("potensi_desa").update(updateData).eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard/potensi");
    revalidatePath("/potensi");
    return { success: true, message: "Potensi diupdate!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deletePotensi(id: string) {
  try {
    const { error } = await supabaseAdmin.from("potensi_desa").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard/potensi");
    return { success: true, message: "Potensi dihapus!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

// --- 4. FITUR PROFIL DESA ---
export async function updateProfilDesaAction(formData: FormData) {
  try {
    const fotoKadesBaru = formData.get("foto_kades") as File;
    let updateData: any = {
      judul_profil: formData.get("judul_profil"),
      tagline: formData.get("tagline"),
      jumlah_penduduk: Number(formData.get("jumlah_penduduk")),
      kepala_keluarga: Number(formData.get("kepala_keluarga")),
      luas_wilayah: formData.get("luas_wilayah"),
      sejarah: formData.get("sejarah"),
      visi: formData.get("visi"),
      misi: formData.get("misi"),
      nama_kades: formData.get("nama_kades"),
      judul_sambutan: formData.get("judul_sambutan"),
      isi_sambutan: formData.get("isi_sambutan"),
    };
    
    if (fotoKadesBaru && fotoKadesBaru.size > 0) {
      const url = await uploadFoto(fotoKadesBaru, "profil");
      if (url) updateData.foto_kades_url = url;
    }
    
    const { error } = await supabaseAdmin.from("profil_desa").update(updateData).eq("id", 1);
    if (error) throw error;
    
    revalidatePath("/dashboard/profil");
    revalidatePath("/profil");
    return { success: true, message: "Profil Desa diperbarui!" };
  } catch (error: any) { 
      console.error("Eror Profil:", error.message);
      return { success: false, message: error.message }; 
  }
}

// --- 5. FITUR SLIDER BERANDA ---
export async function uploadHeroPhotoAction(formData: FormData) {
  try {
    const fotoUrl = await uploadFoto(formData.get("fotoHero") as File, "slider");
    if (!fotoUrl) return { success: false, message: "Gagal upload foto slider!" };
    
    const { error } = await supabaseAdmin.from("slider_beranda").insert([{ foto_url: fotoUrl }]);
    if (error) throw error;
    
    revalidatePath("/");
    revalidatePath("/dashboard/slider");
    return { success: true, message: "Slider baru berhasil ditambahkan!" };
  } catch (error: any) { return { success: false, message: error.message }; }
}

export async function deleteSlider(id: number) {
  const { error } = await supabaseAdmin
    .from("slider_beranda")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/slider");
  revalidatePath("/");
}