import { create } from "zustand";
import type {
  CreatedOrder,
  OrderInput,
  OrderItem,
  OrderItemSingle,
  OrderWithCustomer,
} from "../interfaces/orden.interface";
import { supabase } from "../supabase/supabase.config";
import {
  actualizarStock,
  guardarDireccion,
  guardarItemsOrden,
  verificarStock,
} from "../supabase/ordenes.supabase";

interface OrderStore {
  count: number;
  orders: OrderInput[];
  crearOrden: (order: OrderInput, customerId: string) => Promise<CreatedOrder>;
  obtenerOrdenesDeUsuario: (customerId: string) => Promise<OrderItemSingle[] | null>;
  obtenerOrdenPorId: (orderId: number, customerId: string) => Promise<any | null>;
  obtenerTodasLasOrdenes: () => Promise<OrderWithCustomer[] | null>;

  mostrarOrderFiltrado: (
    customerId: string,
    pag: number,
    brands: string[],
  ) => Promise<{ orders: OrderInput[]; count: number }>;
}

const tabla = "orders";

export const useOrderStore = create<OrderStore>((set) => ({
  count: 0,
  orders: [],
  crearOrden: async (order: OrderInput, customerId: string) => {
    await verificarStock(order);
    const addressData = await guardarDireccion(order, customerId);

    const { data: orderData, error: orderError } = await supabase
      .from(tabla)
      .insert({
        usuario_id: customerId,
        addresses_id: addressData.id,
        total_amount: order.totalAmount,
        status: "Pending",
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(orderError.message);
    }

    const orderItems = order.cartItems.map((item) => ({
      orders_id: orderData.id,
      variant_id: item.variantId,
      quantity: item.quantity,
      price: item.price,
    }));
    await guardarItemsOrden(orderItems);
    await actualizarStock(order);

    set((state) => ({ orders: [...state.orders, order] }));
    return orderData;
  },

  obtenerOrdenesDeUsuario: async (customerId: string) => {
    const { data: orders, error: ordersError } = await supabase
      .from(tabla)
      .select("id, total_amount, status, created_at")
      .eq("usuario_id", customerId)
      .order("created_at", {
        ascending: false,
      });

    if (ordersError) {
      throw new Error(ordersError.message);
    }

    return orders;
  },

  obtenerOrdenPorId: async (orderId: number, customerId: string) => {
    const { data: order, error } = await supabase
      .from(tabla)
      .select(
        "*, addresses(*), usuario(full_name, email), order_item(quantity, price, variants(color_name, storage, products(name, images)))",
      )
      .eq("usuario_id", customerId)
      .eq("id", orderId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      usuario: {
        email: order?.usuario?.email,
        full_name: order?.usuario?.full_name,
      },
      totalAmount: order.total_amount,
      status: order.status,
      created_at: order.created_at,
      address: {
        addressLine1: order.addresses?.addresse_line1,
        addressLine2: order.addresses?.addresse_line2,
        city: order.addresses?.city,
        state: order.addresses?.state,
        postalCode: order.addresses?.postal_code,
        country: order.addresses?.country,
      },
      orderItems: order.order_item.map((item: OrderItem) => ({
        quantity: item.quantity,
        price: item.price,
        color_name: item.variants?.color_name,
        storage: item.variants?.storage,
        productName: item.variants?.products?.name,
        productImage: item.variants?.products?.images?.[0],
      })),
    };
  },

  obtenerTodasLasOrdenes: async () => {
    const { data: orders, error } = await supabase
      .from(tabla)
      .select("*, usuario(full_name, email)")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return orders;
  },
  mostrarOrderFiltrado: async (
    customerId: string,
    pag: number = 1,
    status: string[] = [],
  ) => {
    const itemsPerPage = 5;
    const from = (pag - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from(tabla)
      .select("*", { count: "exact" })
      .eq("usuario_id", customerId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (status.length > 0) {
      query = query.in("status", status);
    }

    const { data, error, count } = await query;
    if (error) {
      throw new Error(error.message);
    }
    const orders = (data ?? []) as OrderInput[];
    set({ orders: orders, count: count ?? 0 });
    return {
      orders,
      count: count ?? 0,
    };
  },

}));
