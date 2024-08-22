import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTeamOwner } from "../services/apiTeam";

export function useUpdateTeamOwner() {
  const {
    mutate: setTeamOwner,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ userId, uniqTeamId }) => updateTeamOwner(userId, uniqTeamId),
    onSuccess: () => {
      toast.success("Invitation accepted.");
    },
    onError: (error) => {
      toast.error(`There was an error: ${error.message}`);
    },
  });

  return { setTeamOwner, isPending, error };
}
