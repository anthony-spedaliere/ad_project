import { useQuery } from "@tanstack/react-query";
import { getMaps } from "../services/apiMap";

export function useGetMaps(draftId) {
  const {
    data: selectedMaps,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedMaps", draftId],
    queryFn: () => getMaps(draftId),
    enabled: !!draftId,
  });

  return {
    selectedMaps,
    isPending,
    error,
    isFetching,
  };
}
