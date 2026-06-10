import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/orden.store";

export const useGetOrdersByUserId = (orderId: number, customerId: string) => {
  const { obtenerOrdenPorId } = useOrderStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ["order", orderId, customerId],
    queryFn: () => obtenerOrdenPorId(orderId, customerId),
    enabled: !!orderId && !!customerId,
  });
  return { data, error, isLoading };
};
