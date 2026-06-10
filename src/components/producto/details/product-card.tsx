import React, { useState, type FC } from "react";
import { Eye, ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router";
import type { PreparedProducts } from "../../../interfaces/producto.interface";
import { useCartStore } from "../../../store/carrito.store";

interface ProductCardProps {
  product: PreparedProducts;
  className?: string;
  variant?: "grid" | "list";
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  variant,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const [activeColor, setActiveColor] = useState<{
    name: string;
    color: string;
  }>(product.colors ? product.colors[0] : { name: "", color: "" });

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (selectedVariant && selectedVariant.stock > 0) {
        addItem({
          variantId: selectedVariant.id,
          productId: product.slug || "",
          name: product.name || "",
          image: product.images ? product.images[0] : "",
          color: activeColor.name,
          storage: selectedVariant.storage,
          price: selectedVariant.price,
          quantity: 1,
        });
      } else {
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error al añadir el producto al carrito:", error);
    }
  };

  const selectedVariant = product.variants?.find(
    (variant) => variant.color === activeColor.color,
  );

  return (
    <div
      className={`group relative flex rounded-xl border-2 border-dashed border-[#2a2a2a] p-4 
      hover:border-white/30 transition ${
        variant === "grid" ? "flex-col" : "flex-col xl:flex-row gap-6"
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-[#151515] border border-[#232323] 
        ${variant === "grid" ? "aspect-square w-full" : "aspect-square w-full xl:w-48 shrink-0"}`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge de descuento */}
        {product.variants[0]?.price &&
          product.variants[0]?.price < product.price && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
              -
              {Math.round(
                100 - (product.variants[0].price / product.price) * 100,
              )}
              %
            </span>
          )}

        {/* Overlay de acciones */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition">
          <button className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 transition">
            <Eye className="w-5 h-5" />
          </button>
          <button
              onClick={handleAddClick}
          className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 transition disabled:opacity-50">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col flex-1 ${
          variant === "grid" ? "mt-4 gap-3" : "gap-4 py-2"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          {/* Stock */}
          <span
            className={`text-xs px-2 py-1 rounded-full border ${product.variants.some((v) => v.stock > 0) ? "border-green-500 text-green-400" : "border-red-500 text-red-400"}`}
          >
            {product.variants.some((variant) => variant.stock > 0)
              ? "In Stock"
              : "Out of Stock"}
          </span>
          {/* Características principales */}
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            {product.features.slice(0, 2).map((f, idx) => {
              // Limitar a 6 palabras por característica
              const words = f.split(" ");
              const limited =
                words.length > 6 ? words.slice(0, 6).join(" ") + "..." : f;
              return (
                <span
                  key={idx}
                  className="bg-[#232323] px-2 py-1 
                rounded-full max-w-[140px] truncate inline-block"
                  title={f}
                >
                  {limited}
                </span>
              );
            })}
          </div>
        </div>

        {/* Nombre y slug */}
        <Link to={`/productos/${product.slug}`}>
          <h3
            className="text-lg font-semibold  text-gray-200
          hover:text-[#bca789] transition line-clamp-1"
          >
            {product.name}
          </h3>
        </Link>
        <span className="text-xs text-gray-500">{product.slug}</span>

        {/* Descripción (solo en lista) */}
        {variant === "list" && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {typeof product.description === "string" ? product.description : ""}
          </p>
        )}

        {/* Marca */}
        <div className="flex items-center gap-1 text-gray-400 text-xs mt-2">
          <Store className="w-4 h-4" />
          {product.brand}
        </div>

        {/* Precio y colores */}
        <div
          className={`flex justify-between items-center border-t border-[#2a2a2a] ${
            variant === "grid" ? "pt-3 mt-2" : "mt-auto pt-4"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              ${product.price}
            </span>
            {product.variants[0]?.price &&
              product.variants[0]?.price < product.price && (
                <span className="text-xs line-through text-gray-400">
                  ${product.variants[0].price}
                </span>
              )}
          </div>
          <div className="flex items-center gap-1">
            {product.colors?.map((c, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border border-white"
                style={{ background: c.color }}
                title={c.name}
                onClick={() => setActiveColor(c)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
