import supabase from "./supabase";

export async function insertGroupName(groupNames, draftId) {
  const { data: group, error } = await supabase
    .from("group")
    .insert(
      groupNames.map((groupName) => ({
        group_name: groupName,
        draft: draftId,
      }))
    )
    .select();

  if (error) {
    console.error("Error inserting groups:", error);
  }

  return { group, error };
}

export async function getGroups(draftId) {
  let { data: group, error } = await supabase
    .from("group")
    .select("group_name")
    .eq("draft", draftId);

  if (error) {
    console.error("Error getting groups:", error);
  }

  return { group, error };
}

export async function updateGroupName(updatedGroupName, groupId) {
  const { data: updateGroupNameData, error } = await supabase
    .from("group")
    .update({ group_name: updatedGroupName })
    .eq("id", groupId)
    .select();

  if (error) {
    console.error("Error updating group name:", error);
  }

  return { updateGroupNameData, error };
}
