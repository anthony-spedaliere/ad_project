import { useMutation } from "@tanstack/react-query";
import { updateDraftedBy } from "../services/apiPoi";

export function useUpdateDraftedBy() {
  const {
    mutate: setDraftedBy,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ poiId, userUuid }) => updateDraftedBy(poiId, userUuid),
  });

  return { setDraftedBy, isPending, error };
}
