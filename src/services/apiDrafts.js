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
  const { data: draft, error } = await supabase
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
  } else {
    console.log("Inserted draft:", draft);
  }

  return { draft, error };
}

// Sample Call
//   insertNewDraft(
//     "Scrim Draft Groups A+C",
//     "standard",
//     90,
//     "2024-06-29",
//     "18:40:00",
//     true,
//     2,
//     21,
//     2,
//     "f8b46572-e5cc-42d0-aa36-5644e56eece9"
//   );
