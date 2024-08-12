import { useQuery } from "@tanstack/react-query";
import { getPoisWithDraftId } from "../services/apiPoi";

export function useGetPoisWithDraftId(draftId) {
  const {
    data: pois,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["poisDraftResults", draftId],
    queryFn: () => getPoisWithDraftId(draftId),
    enabled: !!draftId,
  });

  return {
    pois,
    isPending,
    error,
    isFetching,
  };
}
