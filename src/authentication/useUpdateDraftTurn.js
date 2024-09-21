import { useMutation } from "@tanstack/react-query";
import { updateDraftTurn } from "../services/apiDrafts";

export function useUpdateDraftTurn() {
  const {
    mutate: setDraftTurn,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ newTurn, draftId }) => updateDraftTurn(newTurn, draftId),
  });

  return { setDraftTurn, isPending, error };
}
