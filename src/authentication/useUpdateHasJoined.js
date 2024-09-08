import { useMutation } from "@tanstack/react-query";
import { updateHasJoined } from "../services/apiTeam";

export function useUpdateHasJoined() {
  const {
    mutate: setHasJoined,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ hasJoined, teamOwner }) =>
      updateHasJoined(hasJoined, teamOwner),
  });

  return { setHasJoined, isPending, error };
}
