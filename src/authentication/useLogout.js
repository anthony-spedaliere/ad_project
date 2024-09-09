import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { persistor } from "../store/store";
import { useDispatch } from "react-redux";
import {
  resetSelectedFavorites,
  resetTeamsHaveJoined,
} from "../store/slices/liveDraftSlice";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      persistor.purge().then(() => {
        navigate("/login", { replace: true });
        dispatch(resetTeamsHaveJoined());
        dispatch(resetSelectedFavorites());
      });
    },
  });

  return { logout, isPending };
}
