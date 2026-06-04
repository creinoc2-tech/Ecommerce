import { create } from "zustand";
import type {
  CreatedOrder,
  OrderInput,
  OrderItem,
  OrderItemSingle,
  OrderWithCustomer,
} from "../interfaces/order.interface";
import { supabase } from "../supabase/supabase.config";

interface OrderStore {
  count: number;
  orders: OrderInput[];
  createOrder: (order: OrderInput, customerId: string) => Promise<CreatedOrder>;
  getOrderUsuarioId: (customerId: string) => Promise<OrderItemSingle[] | null>;
  getOrderById: (orderId: number, customerId: string) => Promise<any | null>;
  getAllOrders: () => Promise<OrderWithCustomer[] | null>;

  mostrarOrderFiltrado: (
    customerId: string,
    pag: number,
    brands: string[],
  ) => Promise<{ orders: OrderInput[]; count: number }>;
}

type OrderItemInsert = {
  orders_id: number;
  variant_id: string;
  quantity: number;
  price: number;
};

const tabla = "orders";

export const useOrderStore = create<OrderStore>((set) => ({
  count: 0,
  orders: [],
  createOrder: async (order: OrderInput, customerId: string) => {
    await checkStock(order);
    const addressData = await addressStore(order, customerId);

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
      console.log(orderError);
      throw new Error(orderError.message);
    }

    const orderItems = order.cartItems.map((item) => ({
      orders_id: orderData.id,
      variant_id: item.variantId,
      quantity: item.quantity,
      price: item.price,
    }));
    await orderItemsStore(orderItems);
    await updateStock(order);

    set((state) => ({ orders: [...state.orders, order] }));
    return orderData;
  },

  getOrderUsuarioId: async (customerId: string) => {
    const { data: orders, error: ordersError } = await supabase
      .from(tabla)
      .select("id, total_amount, status, created_at")
      .eq("usuario_id", customerId)
      .order("created_at", {
        ascending: false,
      });

    if (ordersError) {
      console.log(ordersError);
      throw new Error(ordersError.message);
    }

    return orders;
  },

  getOrderById: async (orderId: number, customerId: string) => {
    const { data: order, error } = await supabase
      .from(tabla)
      .select(
        "*, addresses(*), usuario(full_name, email), order_item(quantity, price, variants(color_name, storage, products(name, images)))",
      )
      .eq("usuario_id", customerId)
      .eq("id", orderId)
      .single();

    if (error) {
      console.log(error);
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

  getAllOrders: async () => {
    const { data: orders, error } = await supabase
      .from(tabla)
      .select("*, usuario(full_name, email)")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
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

const checkStock = async (order: OrderInput) => {
  for (const item of order.cartItems) {
    const { data: variantData, error: variantError } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();

    if (variantError) {
      throw new Error(variantError.message);
    }

    if (!variantData) {
      throw new Error("La variante no existe");
    }

    if (variantData.stock < item.quantity) {
      throw new Error(
        "No hay stock suficiente para los articulos seleccionados",
      );
    }
  }
};

const addressStore = async (order: OrderInput, customerId: string) => {
  // 3. Guardar la dirección del envío
  const { data: addressData, error: addressError } = await supabase
    .from("addresses")
    .insert({
      addresse_line1: order.address?.addressLine1,
      addresse_line2: order.address?.addressLine2,
      city: order.address?.city,
      state: order.address?.state,
      postal_code: order.address?.postalCode,
      country: order.address?.country,
      usuario_id: customerId,
    })
    .select()
    .single();

  if (addressError) {
    console.log(addressError);
    throw new Error(addressError.message);
  }

  if (!addressData) {
    throw new Error("No se pudo guardar la dirección");
  }

  return addressData;
};

const orderItemsStore = async (orderItems: OrderItemInsert[]) => {
  const { error: orderItemsError } = await supabase
    .from("order_item")
    .insert(orderItems);

  if (orderItemsError) {
    console.log(orderItemsError);
    throw new Error(orderItemsError.message);
  }
};

const updateStock = async (order: OrderInput) => {
  for (const item of order.cartItems) {
    // Obtener el stock actual
    const { data: variantData, error: variantError } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();

    if (variantError) {
      throw new Error(variantError.message);
    }

    if (!variantData) {
      throw new Error("No se encontró la variante");
    }

    const newStock = variantData.stock - item.quantity;

    const { error: updatedStockError } = await supabase
      .from("variants")
      .update({
        stock: newStock,
      })
      .eq("id", item.variantId);

    if (updatedStockError) {
      console.log(updatedStockError);
      throw new Error(`No se pudo actualizar el stock de la variante`);
    }
  }
};
