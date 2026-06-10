import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";

export const useLoginGoogleMutate = () => {
  const { loginGoogle } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login google"],
    mutationFn: loginGoogle,
    onError: (error) => {
      if (import.meta.env.DEV) console.error("Error al iniciar sesion con Google:", error);
    },
  });
  return { mutate, isPending };
};
