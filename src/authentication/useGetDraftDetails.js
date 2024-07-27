import { useQuery } from "@tanstack/react-query";
import { getDraftDetails } from "../services/apiDrafts";

export function useGetDraftDetails(draftId) {
  const {
    data: draftDetails,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["editDraftDetails", draftId],
    queryFn: () => getDraftDetails(draftId),
    enabled: !!draftId,
  });

  return {
    draftDetails,
    isPending,
    error,
    isFetching,
  };
}
