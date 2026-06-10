import { useMutation, useQueryClient } from "@tanstack/react-query";

 import { useCategoriaStore } from "../../store/categoria.store";
import type { CategoriaInput } from "../../interfaces/categoria.interface";

export const useCreateCategoria = () => {
  const { insertarcategorias } = useCategoriaStore();
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({
      categoria,
      files,
    }: {
      categoria: CategoriaInput;
      files: File;
    }) => {
      await insertarcategorias(categoria, files);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mostrar categorias"],
      });
    },
    onError: (error) => {
      console.error("Error al crear la categoria:", error);
    },
  });
};
