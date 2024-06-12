import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),

    onSuccess: (user) => {
      toast.success(`${user.user.email} successfully logged in`);
      navigate("/dashboard");
    },

    onError: (err) => {
      toast.error("Provided email or password is incorrect");
      console.log("Error", err);
    },
  });

  return { login, isLoading };
}
