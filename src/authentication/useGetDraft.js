import { useQuery } from "@tanstack/react-query";
import { getDraft } from "../services/apiDrafts";

export function useGetDraft(draftId) {
  const {
    data: selectedDraft,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedDraft", draftId],
    queryFn: () => getDraft(draftId),
    enabled: !!draftId,
  });

  return {
    selectedDraft,
    isPending,
    error,
    isFetching,
  };
}
