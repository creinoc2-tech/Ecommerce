import { useQueries  } from "@tanstack/react-query";
import { useProductStore } from "../../store/producto.store";
 
export const useMostrarProductosStack = () => {
  const { mostrarproductosRandoms, mostrarproductosRecientes } = useProductStore();
  const [popularQuery, recentQuery] = useQueries({
    queries: [
      {
        queryKey: ["mostrar productos random"],
        queryFn: () => mostrarproductosRandoms(),
        enabled: true, // Habilita la consulta para que se ejecute automáticamente
      }, 
      {
        queryKey: ["mostrar productos recientes"],
        queryFn: () => mostrarproductosRecientes(),
        enabled: true, // Habilita la consulta para que se ejecute automáticamente

      }
    ],
  });

  return {
    isLoading: popularQuery.isLoading || recentQuery.isLoading,
    popularCelulares: popularQuery.data ?? [],
    recentCelulares: recentQuery.data ?? []
  }
};

