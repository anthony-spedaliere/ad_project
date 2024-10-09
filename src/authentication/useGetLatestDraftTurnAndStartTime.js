import { useQuery } from "@tanstack/react-query";
import { fetchLatestDraftTurnAndStartTime } from "../services/apiDrafts";

export function useGetLatestDraftTurnAndStartTime(draftId) {
  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["LatestDraftTurnAndStartTime", draftId],
    queryFn: () => fetchLatestDraftTurnAndStartTime(draftId),
    enabled: !!draftId,
  });

  return { data, isPending, error, isFetching };
}
