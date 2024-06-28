import toast from "react-hot-toast";
import supabase from "./supabase";

export async function registerUsername({ username }) {
  const { data, error } = await supabase
    .from("usernames")
    .insert({ username: username })
    .select();
}
