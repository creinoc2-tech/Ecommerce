
import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
const tabla = "usuario";

interface UsuariosState {
  dataUsuarioAuth: any;
  mostrarUsuarioAuth: (p: { user_id: string }) => Promise<any>;
}


export const useUsuariosStore = create<UsuariosState>((set) => ({
  dataUsuarioAuth: null,
  mostrarUsuarioAuth: async (p) => {
    const { data, error } = await supabase
      .from(tabla)
      .select()
      .eq("user_id", p.user_id)
      .maybeSingle();
    if (error) {
      throw new Error(error.message);
    }
    set({ dataUsuarioAuth: data });
    return data;
  },
 
}));