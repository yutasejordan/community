import { supabase } from "../../supabaseClient";

export async function uploadImage(file, folder = "gallery") {
  if (!file) {
    return null;
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("community-images")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("community-images")
    .getPublicUrl(fileName);

  return {
    imageUrl: data.publicUrl,
    imagePath: fileName,
  };
}
