import { useMutation } from "@tanstack/react-query";
import { updateUserEmail as updateUserEmailApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateEmail() {
  const { mutate: updateUserEmail, isPending } = useMutation({
    mutationFn: (email) => updateUserEmailApi(email),
    onError: (error) => {
      toast.error(`There was an error signing up: ${error.message}`);
    },
  });

  return { updateUserEmail, isPending };
}
