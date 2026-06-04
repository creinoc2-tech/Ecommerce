import {  useQuery } from "@tanstack/react-query";
import { useSubcription } from "../../store/auth.store";
import { useUsuariosStore } from "../../store/user.store";
 


export const useMostrarUsuarioAuthQuery = () => {
  const { mostrarUsuarioAuth } = useUsuariosStore();
  const { user } = useSubcription();
  const userId = user?.id;

  return useQuery({
    queryKey: ["mostrar user auth", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
      return mostrarUsuarioAuth({ user_id: userId });
    },
    enabled: !!userId,
  });
  
};