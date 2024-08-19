import { useQuery } from "@tanstack/react-query";
import { getDraftsJoined } from "../services/apiTeam";

export function useGetDraftsJoined(teamOwnerId) {
  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["draftsJoined", teamOwnerId],
    queryFn: () => getDraftsJoined(teamOwnerId),
    enabled: !!teamOwnerId,
    refetchOnWindowFocus: true,
  });

  if (error) {
    console.error("There was an error: ", error.message);
    throw new Error(error.message);
  }

  return {
    data,
    isPending,
    error,
    isFetching,
  };
}
