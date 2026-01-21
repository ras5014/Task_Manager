import { trpc } from "../utils/trpc";

export const useRegister = () => {
  return trpc.auth.register.useMutation({
    onSuccess(data) {
      console.log("Registration successful:", data);
      localStorage.setItem("token", data.token);
      // Navigate to dashboard page / Task Page
    },
    onError(error) {
      console.error("Registration failed:", error);
    },
  });
};
