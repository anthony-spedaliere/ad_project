import { useMutation } from "@tanstack/react-query";
import { updateUserEmail as updateUserEmailApi } from "../services/apiAuth";

export function useUpdateEmail() {
  const { mutateAsync: updateUserEmail, isPending } = useMutation({
    mutationFn: (email) => updateUserEmailApi(email),
  });

  return { updateUserEmail, isPending };
}
