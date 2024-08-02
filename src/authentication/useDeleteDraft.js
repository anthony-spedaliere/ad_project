import { deleteDraft as deleteDraftApi } from "../services/apiDrafts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useDeleteDraft() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.user.id);
  const isEditing = useSelector((state) => state.newDraft.isEditing);

  const { mutate: deleteDraft, isPending } = useMutation({
    mutationFn: (draftId) => deleteDraftApi(draftId),
    onSuccess: () => {
      if (isEditing) {
        toast.success("Draft successfully deleted.");
      }
      navigate("/dashboard/my-drafts", { replace: true });
      // Invalidate the drafts query cache to refetch the drafts data
      queryClient.invalidateQueries(["uncompletedDrafts", userId]);
    },
    onError: (error) => {
      toast.error(`There was an error deleting the draft: ${error.message}`);
    },
  });

  return { deleteDraft, isPending };
}
