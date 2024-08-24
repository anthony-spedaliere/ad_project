import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTeamOwnerAndRegenUuid } from "../services/apiTeam";
import { useNavigate } from "react-router-dom";

export function useUpdateTeamOwnerAndRegenUuid() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ userId, uniqueTeamId }) =>
      updateTeamOwnerAndRegenUuid(userId, uniqueTeamId),
    onSuccess: () => {
      toast.success("Thank you for responding.");
      navigate("/dashboard/my-drafts");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  return mutation;
}
