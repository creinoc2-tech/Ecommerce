import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/order.store";

export const useGetOrdersByUserId = (orderId: number, customerId: string) => {
  const { getOrderById } = useOrderStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ["order", orderId, customerId],
    queryFn: () => getOrderById(orderId, customerId),
    enabled: !!orderId && !!customerId,
  });
  return { data, error, isLoading };
};
