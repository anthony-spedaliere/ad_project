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

export async function getIsUserDeleted(userId) {
  try {
    let { data: isDeleted, error } = await supabase
      .from("usernames")
      .select("is_deleted")
      .eq("user", userId);

    if (error) {
      console.error("Error occurred: ", error.message);
      throw new Error(error.message);
    }

    return { isDeleted, error };
  } catch (err) {
    console.error("Unexpected error: ", err.message);
    throw err;
  }
}

// set the is_deleted column in the usernames data table to true
export async function updateIsUserDeletedToTrue(userId) {
  try {
    const { data, error } = await supabase
      .from("usernames")
      .update({ is_deleted: true })
      .eq("user", userId)
      .select();

    if (error) {
      console.error("Error occurred: ", error.message);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Unexpected error: ", err.message);
    throw err;
  }
}
