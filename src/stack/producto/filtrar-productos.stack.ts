import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../../store/producto.store";

export const useMostrarProductoFiltradoStack = (
  pag: number,
  brands: string[],
) => {
  const { mostrarproductoFiltrado } = useProductStore();
  return useQuery({
    queryKey: ["mostrar producto filtrado", pag, brands],
    queryFn: () => mostrarproductoFiltrado(pag, brands),
    enabled: true, // Habilita la consulta para que se ejecute automáticamente
  });
};
