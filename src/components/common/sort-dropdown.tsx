 import type { FC } from "react";
export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
  | "best-selling";
interface SortDropdownProps {


  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export const SortDropdown: FC<SortDropdownProps> = ({
  value,
  onChange,
  className = "",
} ) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className={`w-45 bg-[#151515] text-gray-600 border
         border-[#2a2a2a] rounded-lg px-3 py-3.5 focus:outline-none 
         focus:ring-2
          focus:ring-[#3a3a3a] ${className}`}
    >
      <option value="relevance">Relevance</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
      <option value="rating">Top Rated</option>
      <option value="best-selling">Best Selling</option>
    </select>
  );
}