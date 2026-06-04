export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`skeleton-${i}`} className="space-y-4">

          {/* Imagen */}
          <div className="h-[300px] w-full rounded-xl bg-[#1a1a1a] animate-pulse" />

          {/* Texto */}
          <div className="space-y-2">
            <div className="h-4 w-[250px] bg-[#1a1a1a] rounded animate-pulse" />
            <div className="h-4 w-[200px] bg-[#1a1a1a] rounded animate-pulse" />
          </div>

        </div>
      ))}
    </div>
  );
}