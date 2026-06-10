import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../../store/producto.store";
 
export const useBuscarProducto = (query: string) => {
  const {  buscarProducto  } = useProductStore();
  return useQuery({
    queryKey: ["buscar producto", query],
    queryFn: () => buscarProducto(query),
    enabled: true, // Habilita la consulta para que se ejecute automáticamente
  });
};