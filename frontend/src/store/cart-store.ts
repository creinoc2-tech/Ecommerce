import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ICartItem } from "../interfaces/cart.interface";

export interface CartState {
  items: ICartItem[];
  totalItemsInCart: number;
  totalAmount: number;

  addItem: (item: ICartItem) => void;
  removeItem: (variantId: string) => void;
  updateItemQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const storeApi: StateCreator<CartState> = (set) => ({
  items: [],
  totalItemsInCart: 0,
  totalAmount: 0,
  addItem: (item: ICartItem) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.variantId === item.variantId,
      );
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        updatedItems = [...state.items, item];
      }

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0,
      );

      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0,
      );

      return {
        items: updatedItems,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  removeItem: (variantId: string) =>
    set((state) => {
      const updatedItems = state.items.filter((i) => i.variantId !== variantId);

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0,
      );

      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0,
      );

      return {
        items: updatedItems,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  updateItemQuantity: (variantId: string, quantity: number) =>
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i,
      );

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0,
      );

      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0,
      );

      return {
        items: updatedItems,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  clearCart: () => set({ items: [], totalItemsInCart: 0, totalAmount: 0 }),
});

export const useCartStore = create<CartState>()(
  devtools(
    persist(storeApi, {
      name: "cart-store",
    }),
  ),
);
