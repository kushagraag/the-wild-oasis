import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),

    onSuccess: (user) => {
      // problem was user has both session and user, so passing just user sets
      // user data as null even though its authenticated (in useUser -> apiAuth)
      queryClient.setQueryData(["user"], user.user);
      toast.success(`${user.user.email} successfully logged in`);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      toast.error("Provided email or password is incorrect");
      console.log("Error", err);
    },
  });

  return { login, isLoading };
}
