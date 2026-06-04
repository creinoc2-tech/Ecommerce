import { useMutation , useQueryClient } from "@tanstack/react-query";
 
 
import { useNavigate } from "react-router";
import { useCartStore } from "../../store/cart-store";
import { useOrderStore } from "../../store/order.store";
import { useSubcription } from "../../store/auth.store";
import type { CreatedOrder, OrderInput } from "../../interfaces/order.interface";
import { useUsuariosStore } from "../../store/user.store";
 
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const { createOrder } = useOrderStore();
  const { user } = useSubcription();
  const userId = user?.id;
  const { mostrarUsuarioAuth } = useUsuariosStore();

  return useMutation<CreatedOrder, Error, OrderInput>({
    mutationKey: ["crear orden"],
    mutationFn: async (order: OrderInput) => {
      if (!userId) throw new Error("Usuario no autenticado");
      const userData = await mostrarUsuarioAuth({ user_id: userId });
      const customerId = userData?.id;
      if (!customerId) throw new Error("No se encontró customerId");
      return createOrder(order, customerId);
    },
    onError: (error) => {
      console.error("Error al crear la orden:", error);
    },
    onSuccess: (data) => {
      console.log("Orden creada exitosamente", data);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      clearCart();
      navigate(`/checkout/${data.id}/thank-you`);
    },
  });
};

