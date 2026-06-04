import type React from "react";
import { useState, type FC } from "react";

interface FilterGroupProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export  const FilterGroup:  FC<FilterGroupProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full ">
      
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-sm font-medium text-left hover:text-white transition"
      >
        {title}

        {/* Icono simple */}
        <span
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="pt-1 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}