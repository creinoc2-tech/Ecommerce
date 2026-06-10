import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useCartStore } from "../../store/carrito.store";
import { useOrderStore } from "../../store/orden.store";
import { useAuthStore } from "../../store/auth.store";
import type { CreatedOrder, OrderInput } from "../../interfaces/orden.interface";
import { useUsuariosStore } from "../../store/usuario.store";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const limpiarCarrito = useCartStore((state) => state.limpiarCarrito);

  const { crearOrden } = useOrderStore();
  const { usuario } = useAuthStore();
  const userId = usuario?.id;
  const { mostrarUsuarioAuth } = useUsuariosStore();

  return useMutation<CreatedOrder, Error, OrderInput>({
    mutationKey: ["crear orden"],
    mutationFn: async (order: OrderInput) => {
      if (!userId) throw new Error("Usuario no autenticado");
      const userData = await mostrarUsuarioAuth({ user_id: userId });
      const customerId = userData?.id;
      if (!customerId) throw new Error("No se encontró customerId");
      return crearOrden(order, customerId);
    },
    onError: (error) => {
      if (import.meta.env.DEV) console.error("Error al crear la orden:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      limpiarCarrito();
      navigate(`/pago/${data.id}/gracias`);
    },
  });
};

