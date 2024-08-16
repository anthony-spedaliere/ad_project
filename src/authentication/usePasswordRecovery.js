import { useMutation } from "@tanstack/react-query";
import { passwordRecovery } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function usePasswordRecovery() {
  const navigate = useNavigate();

  const { mutate: pwRecovery, isPending } = useMutation({
    mutationFn: (email) => passwordRecovery(email),
    onSuccess: () => {
      toast.success("Check your email for password recovery link.");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error("An error has occurred.");
      console.error("Error resetting password: ", err);
    },
  });

  return { pwRecovery, isPending };
}
