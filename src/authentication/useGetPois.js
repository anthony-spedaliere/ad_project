import { useQuery } from "@tanstack/react-query";
import { getPois } from "../services/apiPoi";

export function useGetPois(mapId) {
  const {
    data: selectedPois,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedPois", mapId],
    queryFn: () => getPois(mapId),
    enabled: !!mapId,
  });

  return {
    selectedPois,
    isPending,
    error,
    isFetching,
  };
}
