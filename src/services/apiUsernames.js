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

export async function getUsername(userId) {
  const { data, error } = await supabase
    .from("usernames")
    .select("username")
    .eq("user", userId);

  if (error) {
    console.error("Error checking username: ", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function updateUsername(userId, newUsername) {
  try {
    const { data, error } = await supabase
      .from("usernames")
      .update({ username: newUsername })
      .eq("user", userId)
      .select();

    if (error) {
      console.error("Error occurred in updating username: ", error.message);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err.message);
    throw err;
  }
}
