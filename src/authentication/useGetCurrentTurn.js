import { useQuery } from "@tanstack/react-query";
import { getCurrentTurn } from "../services/apiDrafts";

export function useGetCurrentTurn(draftId) {
  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["currentDraftTurn", draftId],
    queryFn: () => getCurrentTurn(draftId),
    enabled: !!draftId,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    onError: (error) => {
      console.error("Error fetching current draft turn:", error);
    },
  });

  return {
    currentTurn: data?.turn,
    isPending,
    error,
    isFetching,
  };
}
