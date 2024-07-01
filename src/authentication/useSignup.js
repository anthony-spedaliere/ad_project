import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the new account form the users email address"
      );
      navigate("/dashboard/my-drafts", { replace: true });
    },
    onError: (error) => {
      toast.error(`There was an error signing up: ${error.message}`);
    },
  });

  return { signup, isPending };
}
