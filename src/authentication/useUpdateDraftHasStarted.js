import { useMutation } from "@tanstack/react-query";
import { updateDraftHasStarted } from "../services/apiDrafts";
import toast from "react-hot-toast";

export function useUpdateDraftHasStarted() {
  const {
    mutate: setUpdateDraftHasStarted,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ hasDraftStarted, draftId }) =>
      updateDraftHasStarted(hasDraftStarted, draftId),
    onSuccess: () => {
      toast.success("Draft Started!");
    },
    onError: (error) => {
      toast.error(`There was an error starting the draft: ${error.message}`);
    },
  });

  return { setUpdateDraftHasStarted, isPending, error };
}
