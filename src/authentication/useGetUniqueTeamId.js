import { useQuery } from "@tanstack/react-query";
import { getUniqueTeamId } from "../services/apiTeam";

export function useGetUniqueTeamId({ userId, draftId }) {
  const {
    data: selectedTeam,
    isPending: isPendingUseGetUniqueTeamId,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["selectedDraft", userId, draftId],
    queryFn: () => getUniqueTeamId(userId, draftId),
    enabled: !!userId && !!draftId,
  });

  return {
    selectedTeam,
    isPendingUseGetUniqueTeamId,
    error,
    isFetching,
  };
}
