import type { FC } from "react";

interface ProductPriceProps {
  currentPrice: number;
   currency?: string;
  discountPercentage?: number;
  inStock?: boolean;
  className?: string;
}

export const ProductPrice: FC<ProductPriceProps> = ({
  currentPrice,
  currency = "$",
  inStock,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className} S pb-2`}>
      {/* Precio principal */}
      <div className="flex items-center gap-4">
        <span className="flex items-end gap-1">
          <span className="text-2xl text-gray-200 font-sans align-super 
          leading-none">{currency}</span>
          <span className="font-sans text-2xl text-gray-200   leading-none">{currentPrice.toFixed(2)}</span>
        </span>

        {/* Badge de stock */}
        <span
          className={`ml-2 text-xs px-3 py-1 rounded-full border font-semibold tracking-wide transition-colors duration-200
            ${inStock
              ? "border-green-500 text-green-400 bg-green-900/20"
              : "border-red-500 text-red-400 bg-red-900/20"
            }`
          }
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Línea divisoria sutil */}
      <div className="w-full h-px bg-gray-800 opacity-60 mt-2" />
    </div>
  );
}