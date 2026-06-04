import { X } from "lucide-react";

export interface ActiveFilter {
  id: string;
  label: string;
  type: string;
}

interface ActiveFilterChipsProps {
  filters: ActiveFilter[];
  onRemove: (id: string, type: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({
  filters,
  onRemove,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
      
      <span className="text-gray-400">Active Filters:</span>

      {filters.map((filter) => (
        <div
          key={`${filter.type}-${filter.id}`}
          className="flex items-center gap-1 bg-[#1a1a1a] text-white px-2 py-1 rounded-full"
        >
          {filter.label}

          <button
            onClick={() => onRemove(filter.id, filter.type)}
            className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#2a2a2a] transition"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}

      {/* Clear All */}
      <button
        onClick={onClearAll}
        className="ml-2 text-gray-400 hover:text-white transition"
      >
        Clear All
      </button>

    </div>
  );
}