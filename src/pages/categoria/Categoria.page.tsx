import { CategoryCardGrid } from "../../components/category/category-card-grid";
import type { CategoryWithChildren } from "../../interfaces/categoria.interface";

const sampleCategories: CategoryWithChildren[] = [
  {
    id: 3,
    name: "Men's Wear",
    icone: "shirt",
    color: "#c38aff",
    descripcion: "Clothing and accessories for men",
    usuario_id: "StyleHaven Boutique",
    created_at: "2026-06-06T00:00:00Z",
    productCount: 1,
   },
  {
    id: 2,
    name: "Smartphones",
    icone: "phone",
    color: "#4f8cff",
    descripcion: "Latest smartphones and accessories",
    usuario_id: "Tech Hub",
    created_at: "2026-06-06T00:00:00Z",
    productCount: 20,
     
  },
  {
    id: 1,
    name: "Fresh Fruits",
    icone: "fruit",
    color: "#3ddc97",
    descripcion: "Fresh fruits and vegetables",
    usuario_id: "Green Market",
    created_at: "2026-06-06T00:00:00Z",
    productCount: 12,
    
  },
];

export const CategoriaPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <CategoryCardGrid
        categories={sampleCategories}
        isLoading={false}
        hasNextPage={false}
        isFetchingNextPage={false}
        onLoadMore={() => {}}
      />
    </div>
  );
};
