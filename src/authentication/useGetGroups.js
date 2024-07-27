import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../services/apiGroup";

export function useGetGroups(draftId) {
  const {
    data: selectedGroups,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedGroups", draftId],
    queryFn: () => getGroups(draftId),
    enabled: !!draftId,
  });

  return {
    selectedGroups,
    isPending,
    error,
    isFetching,
  };
}
