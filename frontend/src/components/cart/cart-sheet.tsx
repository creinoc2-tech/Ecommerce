import React from "react";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart-store";
import { Link } from "react-router";
import { RiSecurePaymentLine } from 'react-icons/ri';
import { CartItem } from "./cart-item";

export const CartSheet = () => {
  const closeSheet = useGlobalStore((state) => state.closeSheet);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartItems = useCartStore((state) => state.items);
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);

  return (
    <div className="fixed top-0 right-0 h-full w-[400px]   z-50 shadow-2xl flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
        <span className="font-semibold text-base text-white">Cart ({totalItemsInCart})</span>
        <button
          className="text-2xl text-zinc-400 hover:text-amber-400 transition-colors duration-150"
          onClick={closeSheet}
        >
          &times;
        </button>
      </div>

      {totalItemsInCart > 0 ? (
        <>
          <div className="p-5 overflow-auto flex-1 bg-zinc-900">
            <ul className="space-y-7">
              {cartItems.map((item) => (
                <CartItem key={item.variantId} item={item} />
              ))}
            </ul>
          </div>

          <div className="mt-2 p-5 border-t border-zinc-800 bg-zinc-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-zinc-400 text-sm">Subtotal</span>
              <span className="text-lg font-bold text-white">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="text-xs text-zinc-500 mb-4">Shipping and taxes calculated at checkout.</div>
            <Link
              to="/cart"
              onClick={closeSheet}
              className="w-full bg-[#0f0f10]
               text-white font-semibold py-2.5 rounded-md flex items-center justify-center
                gap-2 shadow hover:bg-[#1a1a1a] transition-colors duration-150 mb-2"
            >
              <RiSecurePaymentLine size={20} />
              View Cart
            </Link>

            <button
              onClick={clearCart}
              className="w-full text-zinc-900 bg-[#bca789] rounded-md py-2.5 
              font-semibold hover:bg-[#a59478] hover:text-zinc-900 transition-colors duration-150"
            >
              Limpiar Carrito
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center bg-zinc-900">
          {/* Icono de bolsa */}
          <svg width="48" height="48" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 7V6a6 6 0 1 1 12 0v1" />
            <rect x="3" y="7" width="18" height="14" rx="2" />
          </svg>
          <div className="mt-4 text-zinc-400 text-lg">Your cart is empty</div>
          <Link
            to="/product"
            onClick={closeSheet}
            className="mt-3 text-amber-200 font-mono text-base hover:underline"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};
