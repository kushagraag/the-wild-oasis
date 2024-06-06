import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  // 1. create cabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/public/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Unable to insert cabin");
  }

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(`public/${imageName}`, newCabin.image);

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
