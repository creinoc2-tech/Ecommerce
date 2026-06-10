import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/orden.store";

export const useGetOrderUsuarios = (customerId: string) => {
  const { obtenerOrdenesDeUsuario } = useOrderStore();

  return useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => obtenerOrdenesDeUsuario(customerId),
    enabled: !!customerId,
  });
};