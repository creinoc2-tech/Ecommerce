import { LuMinus, LuPlus } from "react-icons/lu";
import { useCartStore } from "../../store/carrito.store";
import { formatPrice } from "../../utils/productos";

export const CartItemsList = ({ cartItems }: { cartItems: any[] }) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const increment = (item: { variantId: string; quantity: number }) => {
    updateItemQuantity(item.variantId, item.quantity + 1);
  };

  const decrement = (item: { variantId: string; quantity: number }) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.variantId, item.quantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="divide-y rounded-lg border border-[#3a3732] p-6 shadow-sm text-[#737578]">
        <ul className="space-y-5">
          {cartItems.map((item) => (
            <>
              <li
                key={item.variantId}
                className="flex justify-between items-center gap-6 f "
              >
                <div className="flex relative border border-stone-300 bg-stone-200 rounded-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                <div className="flex-1 ">
                  <div className="flex justify-between">
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div
                        className="flex items-center bg-zinc-800 rounded-md overflow-hidden border
                           border-[#3a3732]"
                      >
                        <button
                          onClick={() => decrement(item)}
                          disabled={item.quantity === 1}
                          className="px-2 py-1 text-zinc-400 hover:bg-zinc-700 disabled:opacity-50"
                        >
                          <LuMinus size={14} />
                        </button>
                        <span
                          className="px-2 text-sm text-white select-none min-w-[18px] 
                            text-center"
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item)}
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
                  <div className="flex flex-col ">
                    <p className="text-[13px] text-gray-600">
                      {item.storage} /{item.color} / {item.productId}
                    </p>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              </li>
              <div className="border-b border-[#2a2a2a] pb-1"></div>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
