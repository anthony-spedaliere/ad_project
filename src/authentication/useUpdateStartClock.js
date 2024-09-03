import { useMutation } from "@tanstack/react-query";
import { updateStartClock } from "../services/apiDrafts";

export function useUpdateStartClock() {
  const {
    mutate: setStartClock,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ startTime, draftId }) =>
      updateStartClock(startTime, draftId),
  });

  return { setStartClock, isPending, error };
}
