import { Loader2 } from "lucide-react";
import type { FC } from "react";
import { ProductGridSkeleton } from "../details/product-grid-skeleton";
import { ProductCard } from "../details/product-card";
import type { PreparedProducts  } from "../../../interfaces/producto.interface";
 
interface ProductGridProps {
  products:  PreparedProducts[];
  isLoading?: boolean;
  viewMode?: "grid" | "list";
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export const ProductGrid: FC<ProductGridProps> = ({
  products,
  isLoading,
  viewMode = "grid",
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}) => {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Grid / List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant={viewMode} />
        ))}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center pt-6">
          <button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="min-w-[200px] flex items-center justify-center gap-2 
                       border border-[#2a2a2a] bg-[#151515] text-white 
                       px-6 py-2 rounded-lg 
                       hover:bg-[#1f1f1f] transition 
                       disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
