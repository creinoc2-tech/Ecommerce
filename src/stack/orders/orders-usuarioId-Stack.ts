import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/order.store";

export const useGetOrderUsuarios = (customerId: string) => {
  const { getOrderUsuarioId } = useOrderStore();

  return useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => getOrderUsuarioId(customerId),
    enabled: !!customerId,
  });
};