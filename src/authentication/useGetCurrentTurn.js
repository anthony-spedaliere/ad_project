import { useQuery } from "@tanstack/react-query";
import { getCurrentTurn } from "../services/apiDrafts";

export function useGetCurrentTurn(draftId) {
  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["currentDraftTurn", draftId],
    queryFn: () => getCurrentTurn(draftId),
    enabled: !!draftId,
  });

  return {
    data,
    isPending,
    error,
    isFetching,
  };
}
