import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeamOwnerAndRegenUuid } from "../services/apiTeam";

export function useUpdateTeamOwnerAndRegenUuid() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ userId, uniqueTeamId }) =>
      updateTeamOwnerAndRegenUuid(userId, uniqueTeamId),
    onSuccess: () => {
      queryClient.invalidateQueries("teamsDraftResults");
    },
  });

  return mutation;
}
