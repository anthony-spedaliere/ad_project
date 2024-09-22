import { useMutation } from "@tanstack/react-query";
import { updateNumberPicked } from "../services/apiPoi";

export function useUpdateNumberPicked() {
  const {
    mutate: setNumberPicked,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ poiId, numberPicked }) =>
      updateNumberPicked(poiId, numberPicked),
  });

  return { setNumberPicked, isPending, error };
}
