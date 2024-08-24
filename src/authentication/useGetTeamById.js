import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "../services/apiTeam";

export function useGetTeamById(teamId) {
  const {
    data: selectedTeam,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedDraft", teamId],
    queryFn: () => getTeamById(teamId),
    enabled: !!teamId,
  });

  return {
    selectedTeam,
    isPending,
    error,
    isFetching,
  };
}
