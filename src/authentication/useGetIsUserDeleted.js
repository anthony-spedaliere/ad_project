import { useQuery } from "@tanstack/react-query";
import { getIsUserDeleted } from "../services/apiUsernames";

export function useGetIsUserDeleted(userId) {
  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["isUserDeleted", userId],
    queryFn: () => getIsUserDeleted(userId),
    enabled: !!userId,
  });

  return {
    data,
    isPending,
    error,
    isFetching,
    isDeleted: data?.isDeleted[0].is_deleted,
  };
}
