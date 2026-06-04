import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../../store/producto-store";
 export const useMostrarProductoSeleccionadoStack = (slug: string) => {
    const { mostrarproductoSeleccionado } = useProductStore();
     
  return useQuery({
    queryKey: ["mostrar producto seleccionado", slug],
    queryFn: () => mostrarproductoSeleccionado(slug),
    enabled: true, // Habilita la consulta para que se ejecute automáticamente
  });

}