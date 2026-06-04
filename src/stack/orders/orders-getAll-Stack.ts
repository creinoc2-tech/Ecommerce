import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/order.store";

export const useGetOrderAll = () => {
  const { getAllOrders } = useOrderStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders admin"],
    queryFn: () => getAllOrders(),
  });
  return { data, error, isLoading };
};