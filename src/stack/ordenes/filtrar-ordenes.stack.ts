import { useQuery } from "@tanstack/react-query";
import { useOrderStore } from "../../store/orden.store";

export const useMostrarOrderFiltradoStack = (
  customerId: string,
  pag: number = 1,
  status: string[] = [],
) => {
  const { mostrarOrderFiltrado } = useOrderStore();

  return useQuery({
    queryKey: ["mostrar order filtrado", customerId, pag, status],
    queryFn: () => mostrarOrderFiltrado(customerId, pag, status),
    enabled: true, // Habilita la consulta para que se ejecute automáticamente
  });
};
