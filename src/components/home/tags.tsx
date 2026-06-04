import type { FC } from "react";

interface TagsProps {
  items: string[];
  className?: string;
}

export const Tags:  FC<TagsProps> = ({ items, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          className="
             py-4 px-5 border border-dashed border-gray-600
            text-white 
            rounded-xl flex items-center justify-center
            transition-all duration-200
            hover:bg-[#2A2A2A]
            active:scale-95 text-[16px]
            shadow-md hover:shadow-lg
          "
        >
          {item}
        </button>
      ))}
    </div>
  );
}