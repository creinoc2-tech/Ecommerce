import { supabase } from "./supabase.config";
import type { OrderInput } from "../interfaces/orden.interface";

type ItemOrdenInsertar = {
  orders_id: number;
  variant_id: string;
  quantity: number;
  price: number;
};

export const verificarStock = async (orden: OrderInput) => {
  for (const item of orden.cartItems) {
    const { data, error } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error("La variante no existe");
    if (data.stock < item.quantity) {
      throw new Error("No hay stock suficiente para los articulos seleccionados");
    }
  }
};

export const guardarDireccion = async (orden: OrderInput, clienteId: string) => {
  const { data, error } = await supabase
    .from("addresses")
    .insert({
      addresse_line1: orden.address?.addressLine1,
      addresse_line2: orden.address?.addressLine2,
      city: orden.address?.city,
      state: orden.address?.state,
      postal_code: orden.address?.postalCode,
      country: orden.address?.country,
      usuario_id: clienteId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No se pudo guardar la direccion");
  return data;
};

export const guardarItemsOrden = async (items: ItemOrdenInsertar[]) => {
  const { error } = await supabase.from("order_item").insert(items);
  if (error) throw new Error(error.message);
};

export const actualizarStock = async (orden: OrderInput) => {
  for (const item of orden.cartItems) {
    const { data, error } = await supabase
      .from("variants")
      .select("stock")
      .eq("id", item.variantId)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error("No se encontro la variante");

    const { error: actualizacionError } = await supabase
      .from("variants")
      .update({ stock: data.stock - item.quantity })
      .eq("id", item.variantId);

    if (actualizacionError) {
      throw new Error("No se pudo actualizar el stock de la variante");
    }
  }
};
