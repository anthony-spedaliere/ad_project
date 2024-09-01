import { useQuery } from "@tanstack/react-query";
import { getLiveDraft } from "../services/apiDrafts";

export function useGetLiveDraft(draftId) {
  const {
    data: liveDraftDetails,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["liveDraftDetails", draftId],
    queryFn: () => getLiveDraft(draftId),
    enabled: !!draftId,
  });

  return {
    liveDraftDetails,
    isPending,
    error,
    isFetching,
  };
}
