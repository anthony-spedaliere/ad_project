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
  } else {
    console.log("Inserted groups:", group);
  }

  return { group, error };
}
