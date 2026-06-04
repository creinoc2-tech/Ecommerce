import type { Product } from "../interfaces/product.interface";
import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

interface ProductStore {
  count: number;
  dataRespuestaProductos: Product[];
  mostrarproductosRecientes: () => Promise<Product[]>;
  mostrarproductosRandoms: () => Promise<Product[]>;
  mostrarproductoFiltrado: (
    pag: number,
    brands: string[],
  ) => Promise<{ products: Product[]; count: number }>;
  mostrarproductoSeleccionado: (slug: string) => Promise<Product | null>;
  buscarProducto: (query: string) => Promise<Product[] | null>;
}

const tabla = "products";

export const useProductStore = create<ProductStore>()((set) => ({
  count: 0,
  dataRespuestaProductos: [],
  mostrarproductosRandoms: async () => {
    const { data: products, error } = await supabase
      .from(tabla)
      .select(`* , variants(*)`)
      .limit(20);
    if (error) {
      throw new Error(error.message);
    }

    const randomizedProducts =
      products?.sort(() => 0.5 - Math.random()).slice(0, 4) ?? [];

    const product = (randomizedProducts ?? []) as Product[];
    set({ dataRespuestaProductos: product });
    return product;
  },
  mostrarproductosRecientes: async () => {
    const { data, error } = await supabase
      .from(tabla)
      .select(`* , variants(*)`)
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) {
      throw new Error(error.message);
    }
    const products = (data ?? []) as Product[];
    set({ dataRespuestaProductos: products });
    return products;
  },
  mostrarproductoSeleccionado: async (slug: string) => {
    const { data, error } = await supabase
      .from(tabla)
      .select(`* , variants(*)`)
      .eq("slug", slug)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    const product = (data ?? null) as Product | null;
    set({ dataRespuestaProductos: product ? [product] : [] });
    return product;
  },

  mostrarproductoFiltrado: async (pag: number = 1, brands: string[] = []) => {
    const itemsPerPage = 10;
    const from = (pag - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("products")
      .select("*, variants(*)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (brands.length > 0) {
      query = query.in("brand", brands);
    }
    const { data, error, count } = await query;
    if (error) {
      throw new Error(error.message);
    }
    const products = (data ?? []) as Product[];
    set({ dataRespuestaProductos: products, count: count ?? 0 });
    return {
      products,
      count: count ?? 0,
    };
  },
  buscarProducto: async (query: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*, variants(*)")
      .ilike("name", `%${query}%`); //Buscar productos cuyo nombre contenga el término de búsqueda

    if (error) {
      throw new Error(error.message);
    }

    const products = (data ?? []) as Product[];
    set({ dataRespuestaProductos: products });
    return products;
  },
}));
