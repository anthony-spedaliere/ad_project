import supabase from "./supabase";

export async function login({ email, password }) {
  console.log(email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error: ", error.message);
    throw new Error(error.message);
  }

  return data;
}
