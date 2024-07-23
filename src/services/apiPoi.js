import supabase from "./supabase";

export async function insertPois(poisArray, mapId) {
  const { data: pois, error } = await supabase
    .from("poi")
    .insert(
      poisArray.map((poi) => ({
        poi_name: poi.name,
        poi_number: poi.points,
        map_id: mapId,
      }))
    )
    .select();

  if (error) {
    console.error("Error inserting pois:", error);
  }

  return { pois, error };
}
