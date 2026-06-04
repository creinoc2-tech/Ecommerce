import { useMemo, useState, type FC } from "react";
import type {
  Product,
  VariantProduct,
} from "../../../interfaces/product.interface";
import { ProductoAction } from "./producto-action";

interface Acc {
  [key: string]: {
    name: string;
    storages: string[];
  };
}

interface ProductoColorProps {
  product: Product | null;
}

export const ProductoColor: FC<ProductoColorProps> = ({ product }) => {
  const colors = useMemo(() => {
    return (
      product?.variants.reduce((acc: Acc, variant: VariantProduct) => {
        const { color, color_name, storage } = variant;
        if (!acc[color]) {
          acc[color] = {
            name: color_name,
            storages: [],
          };
        }

        if (!acc[color].storages.includes(storage)) {
          acc[color].storages.push(storage);
        }

        return acc;
      }, {} as Acc) || {}
    );
  }, [product?.variants]);

  const availableColors = Object.keys(colors);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    availableColors[0] ?? null,
  );
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  const activeColor = selectedColor ?? availableColors[0] ?? null;

  const storagesForActiveColor = activeColor
    ? (colors[activeColor]?.storages ?? [])
    : [];
  const activeStorage =
    selectedStorage && storagesForActiveColor.includes(selectedStorage)
      ? selectedStorage
      : (storagesForActiveColor[0] ?? null);

  const selectedVariant =
    activeColor && activeStorage
      ? (product?.variants.find(
          (variant) =>
            variant.color === activeColor && variant.storage === activeStorage,
        ) ?? null)
      : null;

  return (
    <div>
      {/* Selector de color mejorado visualmente */}
      <div className="flex flex-col gap-2 mt-4">
        <span className="uppercase text-xs tracking-widest font-semibold text-gray-400 mb-1">
          Color Seleccionado
        </span>
        <div className="flex gap-3">
          {availableColors.map((color) => {
            const selected = activeColor === color;
            return (
              <button
                key={color}
                className={`relative flex items-center uppercase px-4 py-2 rounded-full border transition-all duration-200 focus:outline-none
                  ${
                    selected
                      ? "border-2 border-amber-100 bg-[#23201c] shadow-[0_0_0_2px_rgba(255,255,255,0.08)]"
                      : "border border-gray-700 bg-[#181818] hover:border-amber-100"
                  }
                `}
                onClick={() => setSelectedColor(color)}
              >
                <span
                  className="w-5 h-5 rounded-full border border-gray-700 mr-2"
                  style={{ backgroundColor: color }}
                />
                <span
                  className={`text-xs font-medium ${selected ? "text-white" : "text-gray-400"}`}
                >
                  {colors[color]?.name || color}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* OPCIONES DE ALMACENAMIENTO */}
      {/* Selector de almacenamiento mejorado visualmente */}
      <div className="flex flex-col gap-2 mt-4 my-5">
        <span className="uppercase text-xs tracking-widest font-semibold text-gray-400 mb-1">
          Almacenamiento disponible
        </span>
        {activeColor && (
          <div className="flex gap-3">
            <select
              className="border border-gray-700 bg-[#181818] text-gray-100 rounded-lg px-3 py-1 focus:border-amber-100 focus:ring-0"
              value={selectedStorage || ""}
              onChange={(e) => setSelectedStorage(e.target.value)}
            >
              {colors[activeColor].storages.map((storage) => (
                <option value={storage} key={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <ProductoAction id={product?.id || ""} product={product}
       selectedVariant={selectedVariant}
      />
    </div>
  );
};
