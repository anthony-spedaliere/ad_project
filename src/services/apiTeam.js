import supabase from "./supabase";

export async function insertTeams(teamArray, groups, draftId) {
  const teamsToInsert = teamArray
    .map((team) => {
      const group = groups.find((g) => g.group_name === team.groupOfTeam);

      if (!group) {
        console.error(`Group not found for team: ${team.teamName}`);
        return null;
      }

      return {
        team_name: team.teamName,
        draft_priority: team.draftPriority,
        group_id: group.id,
        draft_id: draftId,
      };
    })
    .filter((team) => team !== null);

  const { data: teams, error } = await supabase
    .from("team")
    .insert(teamsToInsert)
    .select();

  if (error) {
    console.error("Error inserting teams: ", error);
  }

  return { teams, error };
}
