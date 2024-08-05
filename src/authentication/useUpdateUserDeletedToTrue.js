import { useMutation } from "@tanstack/react-query";
import { updateIsUserDeletedToTrue } from "../services/apiUsernames";
import toast from "react-hot-toast";

export function useUpdateUserDeletedToTrue() {
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (userId) => updateIsUserDeletedToTrue(userId),
    onSuccess: () => {
      toast.success("Account successfully deleted.");
    },
    onError: (error) => {
      toast.error(`There was an error deleting the draft: ${error.message}`);
    },
  });

  return { deleteUser, isPending };
}
