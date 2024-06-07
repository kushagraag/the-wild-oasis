import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/public/${imageName}`;

  // 1. CREATE CABIN
  let query = supabase.from("cabins");

  // A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Unable to insert cabin");
  }

  // 2. upload image
  const { error: storageError } = !hasImagePath
    ? await supabase.storage
        .from("cabin-images")
        .upload(`public/${imageName}`, newCabin.image)
    : "";

  // 3.  delete the cabin if there is an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.log(storageError);
    throw new Error(
      "Unable to insert cabin image and the cabin is not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(`Cabin ${id} could not be deleted`);
  }
}
