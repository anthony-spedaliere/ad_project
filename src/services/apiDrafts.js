import supabase from "./supabase";

export async function getCompletedDraftsForUser({ queryKey }) {
  const [, userId] = queryKey;

  const { data, error } = await supabase
    .from("draft")
    .select("*")
    .eq("admin", userId)
    .eq("is_draft_complete", true);

  if (error) {
    console.error("Error fetching drafts:", error);
    return;
  }

  return data;
}
