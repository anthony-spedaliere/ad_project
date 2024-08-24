import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTeamOwner } from "../services/apiTeam";
import { useNavigate } from "react-router-dom";

export function useUpdateTeamOwner() {
  const navigate = useNavigate();

  const {
    mutate: setTeamOwner,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ userId, uniqTeamId }) => updateTeamOwner(userId, uniqTeamId),
    onSuccess: () => {
      toast.success("Invitation accepted.");
      navigate("/dashboard/my-drafts");
    },
    onError: (error) => {
      toast.error(`There was an error: ${error.message}`);
    },
  });

  return { setTeamOwner, isPending, error };
}
