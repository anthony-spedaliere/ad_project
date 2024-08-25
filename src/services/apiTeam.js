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

export async function getTeamById(teamId) {
  let { data: team, error } = await supabase
    .from("team")
    .select("*")
    .eq("id", teamId);

  if (error) {
    console.error("Error retrieving team: ", error);
  }

  return { team, error };
}

export async function getTeamsByDraftId(draftId) {
  let { data: team, error } = await supabase
    .from("team")
    .select("*")
    .eq("draft_id", draftId);

  if (error) {
    console.error("Error retrieving teams: ", error);
  }

  return { team, error };
}

export async function getDraftsJoined(teamOwnerId) {
  let { data, error } = await supabase.rpc("get_drafts_by_team_owner", {
    team_owner_uuid: teamOwnerId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTeamOwner(userId, uniqTeamId) {
  const { data, error } = await supabase
    .from("team")
    .update({ team_owner: userId })
    .eq("unique_team_id", uniqTeamId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateInviteAccepted(isAccepted, uniqTeamId) {
  console.log("isAccepted: ", isAccepted);
  console.log("uniqTeamId: ", uniqTeamId);

  const { data, error } = await supabase
    .from("team")
    .update({ invite_accepted: isAccepted })
    .eq("unique_team_id", uniqTeamId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTeamOwnerAndRegenUuid(userId, uniqueTeamId) {
  let { data, error } = await supabase.rpc(
    "update_team_owner_and_regenerate_uuid",
    {
      uniqueteamid: uniqueTeamId, // Match the parameter names expected by the function
      userid: userId,
    }
  );
  if (error) {
    console.error("RPC Error:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function getUniqueTeamId(userId, draftId) {
  let { data: team, error } = await supabase
    .from("team")
    .select("*")
    .eq("team_owner", userId)
    .eq("draft_id", draftId)
    .maybeSingle();

  if (error) {
    console.error("Error retrieving team: ", error);
  }

  return { team, error };
}
