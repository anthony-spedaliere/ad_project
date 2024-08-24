import { useQuery } from "@tanstack/react-query";
import { getDraftByUniqueId } from "../services/apiDrafts";

export function useGetDraftByUniqueId(uniqueDraftId) {
  const {
    data: selectedDraftByUniqueId,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedDraftByUniqueId", uniqueDraftId],
    queryFn: () => getDraftByUniqueId(uniqueDraftId),
    enabled: !!uniqueDraftId,
  });

  return {
    selectedDraftByUniqueId,
    isPending,
    error,
    isFetching,
  };
}
