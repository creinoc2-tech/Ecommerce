import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import type { User } from "@supabase/supabase-js";
import type { IAuthLogin, IAuthRegister } from "../interfaces/auth.interface";

interface AuthStore {
  usuario: User | null;
  user: User | null;
  cargando: boolean;
  loading: boolean;
  iniciarSesion: (p: IAuthLogin) => Promise<any>;
  registrarUsuario: (p: IAuthRegister) => Promise<any>;
  cerrarSesion: () => Promise<void>;
  inicializarAuth: () => () => void;
  loginGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  user: null,
  cargando: true,
  loading: true,

  inicializarAuth: () => {
    const setUsuario = (usuario: User | null) => {
      set({ usuario, user: usuario, cargando: false, loading: false });
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      setUsuario(sesion?.user ?? null);
    });

    return () => subscription.unsubscribe();
  },

  registrarUsuario: async (p: IAuthRegister) => {
    const correo = p.correo ?? p.email;
    const contrasena = p.contrasena ?? p.password;
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contrasena,
      options: {
        data: {
          full_name: p.nombreCompleto ?? p.fullName,
          phone: p.telefono ?? p.phone,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    return data.user;
  },

  iniciarSesion: async (p: IAuthLogin) => {
    const correo = p.correo ?? p.email;
    const contrasena = p.contrasena ?? p.password;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  },

  cerrarSesion: async () => {
    await supabase.auth.signOut();
    set({ usuario: null, user: null });
  },

  loginGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  },
}));
