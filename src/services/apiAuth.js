import toast from "react-hot-toast";
import supabase from "./supabase";

export async function signup({ username, email, password }) {
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

export async function checkIfUsernameExists() {}
