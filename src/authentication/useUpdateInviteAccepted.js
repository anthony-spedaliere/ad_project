import { useMutation } from "@tanstack/react-query";
import { updateInviteAccepted } from "../services/apiTeam";

export function useUpdateInviteAccepted() {
  const {
    mutate: setInviteAccepted,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ isAccepted, uniqTeamId }) =>
      updateInviteAccepted(isAccepted, uniqTeamId),
  });

  return { setInviteAccepted, isPending, error };
}
