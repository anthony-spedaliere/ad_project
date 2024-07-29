import { useQuery } from "@tanstack/react-query";
import { getUncompletedDraftsForUser } from "../services/apiDrafts";

export function useUncompletedDrafts(userId) {
  const { data, error, isPending } = useQuery({
    queryKey: ["uncompletedDrafts", userId],
    queryFn: () =>
      getUncompletedDraftsForUser({ queryKey: ["uncompletedDrafts", userId] }),
    enabled: !!userId,
    refetchOnWindowFocus: true,
  });

  if (error) {
    console.error("There was an error: ", error.message);
    throw new Error(error.message);
  }

  return { data, error, isPending };
}
