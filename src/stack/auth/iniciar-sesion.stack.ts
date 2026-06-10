import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth.store";
  
export const useLoginUsuarioYSesionMutate = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["iniciar con email testes"],
    mutationFn: iniciarSesion,
    onError: (error) => {
      if (import.meta.env.DEV) console.error("Error al iniciar sesion:", error);
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  return { mutate, isPending };
};