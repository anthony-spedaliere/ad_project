import toast from "react-hot-toast";
import supabase from "./supabase";

import { isUsernameUnique } from "./apiUsernames";

export async function signup({ email, password, username }) {
  if (!(await isUsernameUnique(username))) {
    throw new Error("Username is already taken.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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
    console.error("Profile creation error: ", profileError.message);
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

export async function updateUserEmail(email) {
  const { error } = await supabase.auth.updateUser({
    email: email,
  });

  if (error) {
    console.error("Error updating email: ", error.message);
    throw new Error(error.message);
  }
}

export async function updateUserPassword(password) {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error("Error updating password: ", error.message);
    throw new Error(error.message);
  }
}

export async function deleteAccount(userId) {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error("There was an error in deleting account: ", error.message);
    throw new Error(error.message);
  }
}

export async function passwordRecovery(email) {
  const redirectUrl = import.meta.env.VITE_PASSWORD_RECOVERY_REDIRECT_URL;

  let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  if (error) {
    console.error("There was an error: ", error.message);
    throw new Error(error.message);
  }

  return data;
}
