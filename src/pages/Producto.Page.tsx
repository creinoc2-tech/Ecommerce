import ActiveFilterChips from "../components/producto/active-filter-chips";
import { FilterSidebar } from "../components/producto/filter-sidebar";
import { ProductGrid } from "../components/producto/product-list/product-grid";
import { prepareProducts } from "../utils/productos";
 import { useState } from "react";
import { Pagination } from "../components/producto/Pagination";
import { useMostrarProductoFiltradoStack } from "../stack/producto/filtrar-productos.stack";

export const ProductoPage = () => {
  const [page, setPage] = useState(1);
  const [brands, setBrands] = useState<string[]>([]);
  const { data: product, isLoading } = useMostrarProductoFiltradoStack(
    page,
    brands,
  );
  const preparedProducts = prepareProducts(product?.products ?? []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-8">
          <aside
            className="sticky top-24 hidden
           xl:block w-64 shrink-0"
          >
            <FilterSidebar
              selectedBrands={brands}
              setSelectedBrands={setBrands}
            />
          </aside>

          <main className="min-w-0 flex-1">
            <ActiveFilterChips
              filters={[]}  
              onRemove={() => {}}
              onClearAll={() => {}}
            />

            <ProductGrid
              products={preparedProducts}
              isLoading={isLoading}
              hasNextPage={false}
              isFetchingNextPage={false}
              onLoadMore={() => {}}
            />

            {/* PAGINACION  */}
            <Pagination
              totalItems={product?.count ?? 0}
              page={page}
              setPage={setPage}
            />
          </main>
        </div>
      </div>
    </div>
  );
};
