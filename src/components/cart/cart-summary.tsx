import React from "react";
import { useCartStore } from "../../store/cart-store";
import { Link } from "react-router";

export const CartSummary = ({ cartItems }: { cartItems: any[] }) => {
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 20798 ? 0 : subtotal * 0.05;
  const total = subtotal + deliveryFee;

  return (
    <div className="rounded-2xl border border-[#23211c] p-7 shadow-lg text-[#e6e1d5] bg-[#181716] w-full max-w-[400px] mx-auto">
      <h2 className="mb-6 font-bold text-xl text-white tracking-tight">
        Order Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[#b6a789] text-[15px]">
            Subtotal ({totalItemsInCart}{" "}
            {totalItemsInCart === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-[#e6e1d5] text-[15px]">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#b6a789] text-[15px]">Delivery Fee</span>
          <span className="font-semibold text-[15px]">
            {deliveryFee === 0 ? (
              <span className="text-green-500">Free</span>
            ) : (
              `$${deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="border-b border-[#23211c] pb-1"></div>
        <div className="flex justify-between items-center font-bold text-lg text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {/* Campo de cupón y botones debajo del total */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center bg-[#23211c] rounded-full px-4 py-2 border border-[#23211c] focus-within:border-[#b6a789] transition-colors">
          <span className="mr-2 text-[#b6a789] text-lg">🏷️</span>
          <input
            type="text"
            placeholder="Enter coupon code..."
            className="flex-1 bg-transparent outline-none text-[#e6e1d5] placeholder-[#6e6a5e] text-[15px]"
          />
          <button className="ml-2 px-4 py-1 rounded-full bg-[#23211c] border border-[#23211c] text-[#b6a789] font-semibold text-[15px] hover:bg-[#b6a789] hover:text-[#23211c] transition-colors">
            Apply
          </button>
        </div>
        <Link
          to="/checkout"
          className="w-full rounded-full bg-[#b6a789] text-[#23211c] font-semibold py-3 text-base flex items-center justify-center gap-2 transition-colors hover:bg-[#c8b99a] shadow-sm text-[17px]"
        >
          Go to Checkout
          <span className="ml-2 text-lg">→</span>
        </Link>
        <button
          className="w-full rounded-full border border-[#23211c] text-[#6e6a5e] font-semibold py-3 text-base flex items-center justify-center gap-2 bg-transparent mt-1 shadow-sm text-[17px] cursor-not-allowed"
          disabled
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};
