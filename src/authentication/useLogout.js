import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { resetUserState } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { resetDraftForm } from "../store/slices/newDraftSlice";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(resetUserState());
      dispatch(resetDraftForm());
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
