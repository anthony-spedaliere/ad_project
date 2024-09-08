import supabase from "./supabase";

export async function insertPois(poisArray, mapId, draftId) {
  const { data: pois, error } = await supabase
    .from("poi")
    .insert(
      poisArray.map((poi) => ({
        poi_name: poi.name,
        poi_number: poi.points,
        map_id: mapId,
        draft_id: draftId,
      }))
    )
    .select();

  if (error) {
    console.error("Error inserting pois:", error);
  }

  return { pois, error };
}

export async function getPois(mapId) {
  let { data: pois, error } = await supabase
    .from("poi")
    .select("*")
    .eq("map_id", mapId);

  if (error) {
    console.error("Error getting pois:", error);
  }

  return { pois, error };
}

export async function getPoisWithDraftId(draftId) {
  const { data: pois, error } = await supabase.rpc("get_poi_by_draft_id", {
    draft_id_param: draftId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return pois;
}
