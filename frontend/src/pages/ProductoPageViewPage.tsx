import { useParams } from "react-router";
import { useMostrarProductoSeleccionadoStack } from "../stack/producto/productos-seleccionado-Stack";
import { ProductMainSection } from "../components/producto/product-details/main-section";
 
export const ProductoPageViewPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product } = useMostrarProductoSeleccionadoStack(slug || "");

  

  return (
    <div className="container mx-auto px-4 xl:px-6 py-8 xl:py-12">
      <div className="space-y-16">
        <ProductMainSection product={product ?? null} />
       </div>
    </div>
  );
};
