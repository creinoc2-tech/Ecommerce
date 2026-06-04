import type { FC } from "react";
import { FilterGroup } from "./filter-group";

interface FilterSidebarProps {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;

  className?: string;
}

const availableBrands = [
  "Samsung",
  "Apple",
  "Huawei",
  "Xiaomi",
  "Realme",
  "Honor",
];

export const FilterSidebar: FC<FilterSidebarProps> = (
  { className = "" , selectedBrands, setSelectedBrands }) => {

  const handleBrandChange = (brand: string) => {
		if (selectedBrands.includes(brand)) {
			setSelectedBrands(selectedBrands.filter(b => b !== brand));
		} else {
			setSelectedBrands([...selectedBrands, brand]);
		}
	};

  
  return (
    <div className={`space-y-6 px-4 text-white ${className}`}>
      <h2 className="text-lg font-semibold">Filters</h2>
      <FilterGroup id="categories" title="Categories">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {availableBrands.map((brand) => {
            const checked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                htmlFor={`cat-${brand}`}
                className={`flex items-center gap-3 cursor-pointer text-[15px] select-none transition-all duration-200
                  border rounded-lg px-3 py-2 bg-[#181818]/80 border-[#333] shadow-sm
                  ${checked ? "border-gray-300 bg-gray-800/60 text-gray-100" : "hover:border-white/30 text-gray-300"}`}
                style={{ boxShadow: checked ? "0 0 0 2px #bbb" : "none" }}
              >
                <input
                  id={`cat-${brand}`}
                  type="checkbox"
                  className={`w-5 h-5 cursor-pointer appearance-none border-2 rounded bg-[#232323] border-[#888] mr-2
                    ${checked ? "bg-gray-300 border-gray-300" : 
                      "bg-[#232323] border-[#888]"}`}
                  checked={selectedBrands.includes(brand)}
								  onChange={() => handleBrandChange(brand)}

                />
                <span className="ml-1 font-medium">{brand}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>
    </div>
  );
};
