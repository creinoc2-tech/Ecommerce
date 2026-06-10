import { useQuery } from "@tanstack/react-query";
import { useCategoriaStore } from "../../store/categoria.store";

export const useMostrarCategorias = () => {
  const { mostrarCategorias } = useCategoriaStore();

  return useQuery({
    queryKey: ["mostrar categorias"],
    queryFn: () => mostrarCategorias(),
    enabled: true, // Habilita la consulta para que se ejecute automáticamente
  });
};
