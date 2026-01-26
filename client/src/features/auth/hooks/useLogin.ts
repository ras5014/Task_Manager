import { trpc } from "../../../shared/utils/trpc";

export const useLogin = () => {
  return trpc.auth.login.useMutation({
    onSuccess(data) {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      // Navigate to dashboard page / Task Page
    },
    onError(error) {
      console.error("Login failed:", error);
    },
  });
};
