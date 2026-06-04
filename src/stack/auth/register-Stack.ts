import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
   
export const useCrearUsuarioYSesionMutate = () => {
  const { crearUserRegister } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationKey: ["crear usuario y login"],
    mutationFn: crearUserRegister,
    onError: (error) => {
        console.error("Error al crear usuario y iniciar sesión:", error);
     },
    onSuccess: () => {
        console.log("Usuario creado e inicio de sesión exitoso");
    },
  });
  return { mutate, isPending };
};