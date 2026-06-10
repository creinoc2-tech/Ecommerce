import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../../store/producto.store";
export const useMostrarProductoSeleccionadoStack = (categoria_id: number) => {
  const { mostrarCategoriasSeleccionadas } = useProductStore();

  return useQuery({
    queryKey: ["mostrar categorias seleccionadas", categoria_id],
    queryFn: () => mostrarCategoriasSeleccionadas(categoria_id),
    enabled: true, // Habilita la consulta para que se ejecute automáticamente
  });

}