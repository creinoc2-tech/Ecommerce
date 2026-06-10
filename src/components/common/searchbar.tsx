import { Search, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";

interface SearchBarProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  className,
  value,
  onChange,
  placeholder ,
}) => {
  const [localValue, setLocalValue] = useState(value);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#151515] text-white placeholder:text-gray-500 
                   pl-10 pr-10 py-3 rounded-lg 
                   border border-[#2a2a2a] 
                   focus:outline-none focus:ring-2 focus:ring-[#3a3a3a]"
      />

      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
        >
          <X className="size-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
};