import { useQuery } from "@tanstack/react-query";
import { getStartClock } from "../services/apiDrafts";

export function useGetStartClock(draftId) {
  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["startClock", draftId],
    queryFn: () => getStartClock(draftId),
    enabled: !!draftId,
  });

  return {
    data,
    isPending,
    error,
    isFetching,
  };
}
