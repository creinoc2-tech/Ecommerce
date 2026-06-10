import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ICartItem } from "../interfaces/carrito.interface";

export interface CartState {
  items: ICartItem[];
  totalItemsEnCarrito: number;
  montoTotal: number;
  totalItemsInCart: number;
  totalAmount: number;

  agregarItem: (item: ICartItem) => void;
  eliminarItem: (variantId: string) => void;
  actualizarCantidad: (variantId: string, quantity: number) => void;
  limpiarCarrito: () => void;

  addItem: (item: ICartItem) => void;
  removeItem: (variantId: string) => void;
  updateItemQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const storeApi: StateCreator<CartState> = (set) => ({
  items: [],
  totalItemsEnCarrito: 0,
  montoTotal: 0,
  totalItemsInCart: 0,
  totalAmount: 0,
  agregarItem: (item: ICartItem) =>
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
        totalItemsEnCarrito: newTotalItems,
        montoTotal: newTotalAmount,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  eliminarItem: (variantId: string) =>
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
        totalItemsEnCarrito: newTotalItems,
        montoTotal: newTotalAmount,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  actualizarCantidad: (variantId: string, quantity: number) =>
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
        totalItemsEnCarrito: newTotalItems,
        montoTotal: newTotalAmount,
        totalItemsInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }),

  limpiarCarrito: () =>
    set({
      items: [],
      totalItemsEnCarrito: 0,
      montoTotal: 0,
      totalItemsInCart: 0,
      totalAmount: 0,
    }),

  addItem: (item: ICartItem) => useCartStore.getState().agregarItem(item),
  removeItem: (variantId: string) => useCartStore.getState().eliminarItem(variantId),
  updateItemQuantity: (variantId: string, quantity: number) =>
    useCartStore.getState().actualizarCantidad(variantId, quantity),
  clearCart: () => useCartStore.getState().limpiarCarrito(),
});

export const useCartStore = create<CartState>()(
  devtools(
    persist(storeApi, {
      name: "cart-store",
    }),
  ),
);
