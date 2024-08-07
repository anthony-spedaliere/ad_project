import { deleteDraft as deleteDraftApi } from "../services/apiDrafts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function useDeleteDraft() {
  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.user.id);

  const { mutate: deleteDraft, isPending } = useMutation({
    mutationFn: (draftId) => deleteDraftApi(draftId),
    onSuccess: () => {
      queryClient.invalidateQueries(["uncompletedDrafts", userId]);
    },
    onError: (error) => {
      toast.error(`There was an error deleting the draft: ${error.message}`);
    },
  });

  return { deleteDraft, isPending };
}
