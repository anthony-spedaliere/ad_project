import { useMutation } from "@tanstack/react-query";
import { updateUserPassword as updateUserPasswordApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const { mutate: updateUserPassword, isPending } = useMutation({
    mutationFn: (password) => updateUserPasswordApi(password),
    onError: (error) => {
      toast.error(`There was an error signing up: ${error.message}`);
    },
  });

  return { updateUserPassword, isPending };
}
