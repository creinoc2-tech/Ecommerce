import { useState, type ReactNode } from "react";
import type { CategoryWithChildren } from "../../interfaces/categoria.interface";

interface CategoryTreeProps {
  categories?: CategoryWithChildren[];
  className?: string;
  showProductCount?: boolean;
  expandedCategories?: string[];
  onExpandedChange?: (categoryId: string, expanded: boolean) => void;
}
export default function CategoryTree({
  categories = [],
  className = "",
  showProductCount = true,
  expandedCategories = [],
  onExpandedChange,
}: CategoryTreeProps) {
  const renderCategoryNode = (
    category: CategoryWithChildren,
    level = 0,
  ): ReactNode => {
    const categoryId = String(category.id);

    return (
      <li key={categoryId} className="space-y-1">
        <div
          className="group flex items-center gap-2  rounded-lg px-2 py-2 hover:bg-[#2a2a2a] cursor-pointer"
          style={{ paddingLeft: `${level * 12 + 4}px` }}
        >
          <span className="text-zinc-500">•</span>

          <span className="flex-1 truncate text-[15px] text-white/95 group-hover:text-white">
            {category.name}
          </span>

          {showProductCount && (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1a1a1a] px-2 text-[11px] text-zinc-300">
              {category.productCount}
            </span>
          )}
        </div>
      </li>
    );
  };

  if (categories.length === 0) {
    return (
      <div className={`text-sm text-zinc-500 ${className}`}>
        No categories available.
      </div>
    );
  }

  return (
    <div className={className}>
      <ul className="space-y-1">
        {categories.map((cat) => renderCategoryNode(cat))}
      </ul>
    </div>
  );
}
