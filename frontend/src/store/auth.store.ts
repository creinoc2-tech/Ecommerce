import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import type { User } from "@supabase/supabase-js";
import type { IAuthLogin, IAuthRegister } from "../interfaces/auth.interface";

interface AuthState {
  crearUserRegister: (p: IAuthRegister) => Promise<any>;
  cerrarSesion: () => Promise<void>;
  crearUserYLogin: (p: IAuthLogin) => Promise<any>;
}

interface SubcriptionState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>(() => ({
  crearUserRegister: async (p: IAuthRegister) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
      options: {
        data: {
          full_name: p.fullName,
          phone: p.phone,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    return data.user;
  },

  crearUserYLogin: async (p: IAuthLogin) => {
     const { data, error } = await supabase.auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  },

  cerrarSesion: async () => {
    await supabase.auth.signOut();
  },
}));

export const useSubcription = create<SubcriptionState>((set) => {
  const store = {
    user: null,
    setUser: (user: User | null) => set({ user }),
  };
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      set({ user: session.user });
    }
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      set({ user: session.user });
    } else {
      set({ user: null });
    }
  });
  return store;
});
