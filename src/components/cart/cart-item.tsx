import { LuMinus, LuPlus } from "react-icons/lu";
import type { Props } from "../../interfaces/cart.interface";
import { useCartStore } from "../../store/cart-store";
import { formatPrice } from "../../utils/productos";

export const CartItem = ({ item }: Props) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const increment = () => {
    updateItemQuantity(item.variantId, item.quantity + 1);
  };

  const decrement = () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.variantId, item.quantity - 1);
    }
  };

  return (
    <li className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-md object-cover border border-zinc-800 bg-zinc-800"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-base text-white truncate">
              {item.name}
            </div>
            <div className="text-xs text-zinc-400 truncate">
              GadgetWorld Hub
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[15px] font-semibold text-white">
              {formatPrice(item.price || 0)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-zinc-500">{item.storage}</span>
          <span className="text-xs text-zinc-700">/</span>
          <span className="text-xs text-zinc-500">{item.color}</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div
            className="flex items-center bg-zinc-800 rounded-md overflow-hidden border
           border-[#3a3732]"
          >
            <button
              onClick={decrement}
              disabled={item.quantity === 1}
              className="px-2 py-1 text-zinc-400 hover:bg-zinc-700 disabled:opacity-50"
            >
              <LuMinus size={14} />
            </button>
            <span
              className="px-2 text-sm text-[#b3a58a] select-none min-w-[18px] 
            text-center"
            >
              {item.quantity}
            </span>
            <button
              onClick={increment}
              className="px-2 py-1 text-zinc-400 hover:bg-zinc-700"
            >
              <LuPlus size={14} />
            </button>
          </div>
          <button
            className="ml-2 p-2 rounded-md bg-zinc-800 hover:bg-red-500 hover:text-white text-red-400 transition-colors duration-150"
            title="Eliminar"
            onClick={() => removeItem(item.variantId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.5 3a2.5 2.5 0 0 0-2.5 2.5V6H4a1 1 0 1 0 0 2h1.07l.8 10.14A3 3 0 0 0 8.86 21h6.28a3 3 0 0 0 2.99-2.86L18.93 8H20a1 1 0 1 0 0-2h-3V5.5A2.5 2.5 0 0 0 14.5 3h-5ZM8 5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V6H8v-.5Zm-1.12 3h10.24l-.79 10.01a1 1 0 0 1-1 .92H8.86a1 1 0 0 1-1-.92L7.12 8.5ZM10 11a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};
