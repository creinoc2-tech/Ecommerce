import { Package2 } from "lucide-react";
import clsx from "clsx";
import type { CategoryWithChildren } from "../../interfaces/categoria.interface";

interface CategoryCardProps {
  category: CategoryWithChildren;
  className?: string;
  variant?: "grid" | "list";
}

export const CategoryCard = ({
  category,
  className,
  variant = "grid",
}: CategoryCardProps) => {
  const isList = variant === "list";

  const productLabel = category.productCount === 1 ? "product" : "products";
  const categoryDescription = `${category.name} category for ${category.usuario_id}`;

  return (
    <article
      className={clsx(
        "group overflow-hidden rounded-[14px] border border-white/8 bg-[#1b1b1d] text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)]",
        isList ? "flex min-h-45" : "min-h-80",
        className,
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#2b2c2f_0%,#15161a_60%,#121317_100%)]",
          isList ? "w-52.5 shrink-0" : "h-44 w-full",
        )}
      />

      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <div className="space-y-2">
          <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-white">
            {category.name}
          </h3>

          <p className="max-w-[24ch] text-sm leading-6 text-[#9d9d9f]">
            {categoryDescription}
          </p>
        </div>

        <div className="mt-auto border-t border-white/5 pt-3.5">
          <div className="flex items-center gap-2 text-sm text-[#b8b8bc]">
          <Package2 size={15} className="text-[#8b8b90]" />
          <span>
            {category.productCount} {productLabel}
          </span>
          </div>
        </div>
      </div>
    </article>
  );
};
