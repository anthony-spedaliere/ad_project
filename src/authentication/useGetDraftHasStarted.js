import { useQuery } from "@tanstack/react-query";
import { getDraftHasStarted } from "../services/apiDrafts";

export function useGetDraftHasStarted(draftId) {
  const { data, isPending, error } = useQuery({
    queryKey: ["hasDraftStarted", draftId],
    queryFn: () => getDraftHasStarted(draftId),
    enabled: !!draftId,
  });

  return {
    data,
    isPending,
    error,
  };
}
