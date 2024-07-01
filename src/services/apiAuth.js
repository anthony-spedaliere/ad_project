import toast from "react-hot-toast";
import supabase from "./supabase";

// helper function for signup to check if username is already taken
async function isUsernameUnique(username) {
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

export async function signup({ email, password, username }) {
  if (!(await isUsernameUnique(username))) {
    throw new Error("Username is already taken.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error("Login error: ", error.message);
    throw new Error(error.message);
  }

  // Create usernames entry with username
  const { error: profileError } = await supabase
    .from("usernames")
    .insert({ user: data.user.id, username });

  if (profileError) {
    console.log("Profile creation error: ", profileError.message);
    throw new Error(profileError.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(`There was an error logging up: ${error.message}`);

    console.error("Login error: ", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Login error: ", error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Signout error: ", error.message);
    throw new Error(error.message);
  }
}
