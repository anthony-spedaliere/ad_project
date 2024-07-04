import { useQuery } from "@tanstack/react-query";
import { getUsername } from "../services/apiUsernames";

export function useGetUsername(userId) {
  const { isPending, data, error, isFetching } = useQuery({
    queryKey: ["usernames", userId],
    queryFn: () => getUsername(userId),
    enabled: !!userId,
  });

  return {
    isPending,
    data,
    error,
    isFetching,
  };
}
