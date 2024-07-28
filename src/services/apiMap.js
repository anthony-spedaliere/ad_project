import supabase from "./supabase";

export async function insertMaps(mapArray, draftId) {
  const { data: maps, error } = await supabase
    .from("map")
    .insert(
      mapArray.map((map) => ({
        map_name: map.mapName,
        num_poi: map.numPoi,
        draft_id: draftId,
      }))
    )
    .select();

  if (error) {
    console.error("Error inserting maps:", error);
  }

  return { maps, error };
}

export async function getMaps(draftId) {
  let { data: maps, error } = await supabase
    .from("map")
    .select("*")
    .eq("draft_id", draftId);

  if (error) {
    console.error("Error getting maps:", error);
  }

  return maps;
}
