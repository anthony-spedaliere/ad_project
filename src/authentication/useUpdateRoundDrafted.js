import { useMutation } from "@tanstack/react-query";
import { updateRoundDrafted } from "../services/apiPoi";

export function useUpdateRoundDrafted() {
  const {
    mutate: setRoundDrafted,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ poiId, roundDrafted }) =>
      updateRoundDrafted(poiId, roundDrafted),
  });

  return { setRoundDrafted, isPending, error };
}
