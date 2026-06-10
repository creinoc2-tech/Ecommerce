
import { useCartStore } from "../../store/carrito.store";
import { formatPrice } from "../../utils/productos";

export const CheckoutOrderSummary = () => {
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  // Simulación de valores para referencia visual
  const subtotal = totalAmount;
  const shipping = 5.99;
  const taxes = 5.0;
  const grandTotal = subtotal + shipping + taxes;

  return (
    <div className="bg-[#181716] border border-[#39332a] rounded-xl p-7 shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">Your Cart</h2>
      <ul className="space-y-5">
        {cartItems.map((item) => (
          <li
            key={item.variantId}
            className="flex justify-between items-center gap-5"
          >
            <div className="flex relative border border-[#39332a] bg-[#23211e] rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs absolute -right-2 -top-2 font-bold  ">
                {item.quantity}
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-white text-base">
                  {item.name}
                </p>
                <p className="text-sm font-semibold text-white">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex gap-3">
                <p className="text-xs text-white">
                  {item.storage} / {item.color}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Línea divisoria */}
      <div className="border-t border-[#39332a] my-6"></div>

      {/* Promo code input */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Add promo code"
          className="flex-1 bg-[#23211e] border border-[#39332a] rounded-md px-3 py-2 text-sm text-white placeholder-[#b0a991] focus:outline-none focus:ring-2 focus:ring-[#39332a]"
        />
        <button className="px-4 py-2 rounded-md bg-transparent border border-[#39332a] text-[#b0a991] text-sm font-semibold hover:bg-[#23211e] transition-all">
          Apply
        </button>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-[#b0a991] text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#b0a991] text-sm">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-[#b0a991] text-sm">
          <span>Estimated taxes</span>
          <span>{formatPrice(taxes)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center font-bold text-xl text-white mb-6">
        <span>Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      
    </div>
  );
};
