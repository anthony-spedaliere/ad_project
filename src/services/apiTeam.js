import supabase from "./supabase";

export async function insertTeams(teamArray, groupId, draftId) {
  const { data: teams, error } = await supabase
    .from("team")
    .insert(
      teamArray.map((mapName) => ({
        team_name: mapName.teamName,
        draft_priority: mapName.draftPriority,
        group_id: groupId,
        draft_id: draftId,
      }))
    )
    .select();

  if (error) {
    console.error("Error inserting teams: ", error);
  } else {
    console.log("Inserted teams: ", teams);
  }

  return { teams, error };
}
