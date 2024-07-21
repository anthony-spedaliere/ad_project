import supabase from "./supabase";

export async function insertPois(mapsArray, mapId) {
  const { data: pois, error } = await supabase
    .from("poi")
    .insert(
      mapsArray.pois.map((poi) => ({
        poi_name: poi.name,
        poi_number: poi.points,
        map_id: mapId,
      }))
    )
    .select();

  if (error) {
    console.error("Error inserting pois:", error);
  } else {
    console.log("Inserted pois:", pois);
  }

  return { pois, error };
}
