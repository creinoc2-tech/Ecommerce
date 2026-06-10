import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/orden.store";

export const useGetOrderAll = () => {
  const { obtenerTodasLasOrdenes } = useOrderStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders admin"],
    queryFn: () => obtenerTodasLasOrdenes(),
  });
  return { data, error, isLoading };
};