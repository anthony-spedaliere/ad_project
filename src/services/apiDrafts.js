import supabase from "./supabase";

export async function getDraft(draftId) {
  let { data: draft, error } = await supabase
    .from("draft")
    .select("*")
    .eq("id", draftId);

  if (error) {
    console.error("Error fetching drafts:", error);
    return;
  }

  return { draft, error };
}

export async function getDraftByUniqueId(uniqueDraftId) {
  let { data: draft, error } = await supabase
    .from("draft")
    .select("*")
    .eq("unique_draft_url", uniqueDraftId);

  if (error) {
    console.error("Error fetching drafts:", error);
    return;
  }

  return { draft, error };
}

export async function getDraftDetails(draftId) {
  const { data, error } = await supabase.rpc("get_draft_data", {
    draft_id_param: draftId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

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

export async function getUncompletedDraftsForUser({ queryKey }) {
  const [, userId] = queryKey;

  const { data, error } = await supabase
    .from("draft")
    .select("*")
    .eq("admin", userId)
    .eq("is_draft_complete", false);

  if (error) {
    console.error("Error fetching drafts:", error);
    return;
  }

  return data;
}

// insert a new draft
export async function insertNewDraft(
  draftName,
  draftType,
  drafTimePerPick,
  draftDate,
  draftTime,
  shouldSendEmail,
  numGroups,
  numTeams,
  numMap,
  id
) {
  const { data, error } = await supabase
    .from("draft")
    .insert([
      {
        name: draftName,
        draft_type: draftType,
        draft_time_per_pick: drafTimePerPick,
        draft_date: draftDate,
        draft_time: draftTime,
        send_email: shouldSendEmail,
        number_of_groups: numGroups,
        number_of_teams: numTeams,
        number_of_maps: numMap,
        is_draft_complete: false,
        admin: id,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting draft:", error);
  }

  return { draft: data[0], error };
}

export async function deleteDraft(draftId) {
  const { error } = await supabase.from("draft").delete().eq("id", draftId);

  if (error) {
    console.error("Error deleting draft:", error);
  }
}
