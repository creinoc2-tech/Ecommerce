import type { CategoryWithChildren } from "../../interfaces/categoria.interface";
import { Loader2 } from "lucide-react";
import { CategoryCard } from "./category-card";

interface CategoryCardGridProps {
   categories: CategoryWithChildren[];
  isLoading?: boolean;
  viewMode?: "grid" | "list";
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export const CategoryCardGrid = ({
   categories,
  isLoading = false,
  viewMode = "grid",
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: CategoryCardGridProps) => {
  if (isLoading && categories.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center text-[#b8b8bc]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

   return (
    <div className="space-y-8">
      {/* Grid / List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} variant={viewMode} />
        ))}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center pt-6">
          <button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="min-w-50 flex items-center justify-center gap-2 
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