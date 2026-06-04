import { Filter, X } from "lucide-react";
import React, { type FC } from "react";
import type { FilterState } from "../../store/product-filters-store";
import { FilterSidebar } from "./filter-sidebar";
  

interface MobileFilterDrawerProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  totalResults: number;
  className?: string;
}

export const MobileFilterDrawer:  FC<MobileFilterDrawerProps> = ({
  filters,
  updateFilter,
  totalResults,
  className = "",
} ) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Botón abrir */}
      <button
        onClick={() => setOpen(true)}
        className={`flex xl:hidden items-center gap-2 border border-[#2a2a2a] 
                    bg-[#151515] text-white px-4 py-2 rounded-lg 
                    hover:bg-[#1f1f1f] transition ${className}`}
      >
        <Filter className="h-4 w-4" />
        Filters
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-50 
                    w-[300px] sm:w-[360px] 
                    bg-[#0f0f10] text-white 
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <h2 className="text-lg font-semibold">
            Filters ({totalResults})
          </h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
           {/*<FilterSidebar
            selectedBrands={filters.brands}
            setSelectedBrands={(brands) => updateFilter("brands", brands)}
          />*/}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#2a2a2a] bg-[#0f0f10] p-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full bg-white text-black py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Show {totalResults} Results
          </button>
        </div>
      </div>
    </>
  );
}