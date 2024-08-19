import { useQuery } from "@tanstack/react-query";
import { getDraftsJoined } from "../services/apiTeam";

export function useGetDraftsJoined(teamOwnerId) {
  const {
    data: draftsJoined,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["draftsJoined", teamOwnerId],
    queryFn: () => getDraftsJoined(teamOwnerId),
    enabled: !!teamOwnerId,
  });

  return {
    draftsJoined,
    isPending,
    error,
    isFetching,
  };
}
