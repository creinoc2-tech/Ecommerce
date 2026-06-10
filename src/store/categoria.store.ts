import { create } from "zustand";
import Swal from "sweetalert2";
import type {
  Categoria,
  CategoriaInput,
  CategoryWithChildren,
} from "../interfaces/categoria.interface";
import { supabase } from "../supabase/supabase.config";

interface CategoriaStore {
  count: number;
  categorias: Categoria[];
  insertarcategorias: (categoria: CategoriaInput, files: File) => Promise<void>;
  mostrarCategorias: () => Promise<CategoryWithChildren[]>;
  mostrarCategoriasVendedor: () => Promise<CategoryWithChildren[]>;

}
const tabla = "categories";
export const useCategoriaStore = create<CategoriaStore>((set) => ({
  count: 0,
  categorias: [],
  insertarcategorias: async (categoria: CategoriaInput, file: File) => {
    const { error, data } = await supabase.rpc("insertar_categoria", {
      p_name: categoria.name,
      p_icone: categoria.icone,
      p_color: categoria.color,
      p_descripcion: categoria.descripcion,
      p_user_id: categoria.usuario_id,
    });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return;
    }
    const img = file.size;
    if (img != undefined) {
      const nueva_id = data as number;
      const urlIcono = await subirIcono(nueva_id, file);
      const p = {
        icono: urlIcono,
        id: nueva_id,
      };
      await editarIconoCategoria(p);
    }
  },
  mostrarCategorias: async () => {
    const { data, error } = await supabase
      .from(tabla)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return [];
    }
    for (const categoria of data ?? []) {
      const { count: productCount, error: productCountError } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("categoria_id", categoria.id);
      if (productCountError) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: productCountError.message,
        });
        continue;
      }
      (categoria as CategoryWithChildren).productCount = productCount ?? 0;
    }
    const categorias = (data ?? []) as CategoryWithChildren[];
    set({ categorias, count: categorias.length });
    return categorias;
  },

   mostrarCategoriasVendedor: async () => {
    const { data, error } = await supabase
      .from(tabla)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return [];
    }
    for (const categoria of data ?? []) {
      const { count: productCount, error: productCountError } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("categoria_id", categoria.id);
      if (productCountError) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: productCountError.message,
        });
        continue;
      }
      (categoria as CategoryWithChildren).productCount = productCount ?? 0;
    }
    const categorias = (data ?? []) as CategoryWithChildren[];
    set({ categorias, count: categorias.length });
    return categorias;
  },
}));

async function subirIcono(id: number, file: File) {
  const ruta = "icono/" + id;
  const { data, error } = await supabase.storage
    .from("archivos")
    .upload(ruta, file, {
      cacheControl: "0",
      upsert: true,
    });
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const { data: urlimagen } = await supabase.storage
      .from("archivos")
      .getPublicUrl(ruta);
    return urlimagen.publicUrl;
  }
}

async function editarIconoCategoria(p: Partial<Categoria>) {
  const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}
