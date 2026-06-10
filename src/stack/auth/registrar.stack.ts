import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
   
export const useCrearUsuarioYSesionMutate = () => {
  const { registrarUsuario } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["crear usuario y login"],
    mutationFn: registrarUsuario,
    onError: (error) => {
      if (import.meta.env.DEV) console.error("Error al crear usuario:", error);
    },
  });
  return { mutate, isPending };
};