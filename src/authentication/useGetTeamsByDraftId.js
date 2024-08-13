import { useQuery } from "@tanstack/react-query";
import { getTeamsByDraftId } from "../services/apiTeam";

export function useGetTeamsByDraftId(draftId) {
  const {
    data: teams,
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["teamsDraftResults", draftId],
    queryFn: () => getTeamsByDraftId(draftId),
    enabled: !!draftId,
  });

  return {
    teams,
    isPending,
    error,
    isFetching,
  };
}
