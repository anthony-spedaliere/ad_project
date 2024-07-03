import { useQuery } from "@tanstack/react-query";
import { getCompletedDraftsForUser } from "../services/apiDrafts";

export function useCompletedDrafts(userId) {
  const { data, error, isPending } = useQuery({
    queryKey: ["draft", userId],
    queryFn: getCompletedDraftsForUser,
  });

  if (error) {
    console.error("There was an error: ", error.message);
    throw new Error(error.message);
  }

  return { data, error, isPending };
}
