import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
import { useUsuariosStore } from "../../store/usuario.store";

export const useMostrarUsuarioAuthQuery = () => {
  const { mostrarUsuarioAuth } = useUsuariosStore();
  const { usuario } = useAuthStore();
  const userId = usuario?.id;

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