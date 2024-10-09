import { useMutation } from "@tanstack/react-query";
import { updateIsDraftComplete } from "../services/apiDrafts";

export function useUpdateIsDraftComplete() {
  const { mutate: setIsDraftComplete, isPending } = useMutation({
    mutationFn: ({ isDraftComplete, draftId }) =>
      updateIsDraftComplete(isDraftComplete, draftId),
  });

  return { setIsDraftComplete, isPending };
}
