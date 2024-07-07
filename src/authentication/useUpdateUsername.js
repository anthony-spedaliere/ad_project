import { useMutation } from "@tanstack/react-query";
import { updateUsername as updateUsernameApi } from "../services/apiUsernames";
import toast from "react-hot-toast";

export function useUpdateUsername() {
  const { mutate: updateUsername, isPending } = useMutation({
    mutationFn: ({ userId, newUsername }) =>
      updateUsernameApi(userId, newUsername),
    onError: (error) => {
      toast.error(`There was an error signing up: ${error.message}`);
    },
  });

  return { updateUsername, isPending };
}
