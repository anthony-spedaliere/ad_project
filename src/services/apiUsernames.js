import supabase from "./supabase";

export async function isUsernameUnique(username) {
  const { data, error } = await supabase
    .from("usernames")
    .select("username")
    .eq("username", username);

  if (error) {
    console.error("Error checking username: ", error.message);
    throw new Error(error.message);
  }

  return data.length === 0;
}
