import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTeamOwnerAndRegenUuid } from "../services/apiTeam";

export function useUpdateTeamOwnerAndRegenUuid() {
  const mutation = useMutation({
    mutationFn: ({ userId, uniqueTeamId }) =>
      updateTeamOwnerAndRegenUuid(userId, uniqueTeamId),
    onSuccess: () => {
      toast.success("Invitation rejected and team owner updated.");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return mutation;
}
