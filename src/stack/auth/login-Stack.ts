import { useMutation } from "@tanstack/react-query";
 import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth.store";
  
export const useLoginUsuarioYSesionMutate = () => {
  const navigate = useNavigate();
  const { crearUserYLogin } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["iniciar con email testes"],
    mutationFn:crearUserYLogin ,
    onError: (error) => {
        console.error("Error al iniciar sesión:", error);
     },
    onSuccess: () => {
        console.log("Inicio de sesión exitoso");
        navigate("/");
    },
  });
  return { mutate, isPending };
};