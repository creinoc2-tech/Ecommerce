import { createContext, useContext, useEffect, useState, type FC } from "react";
import { supabase } from "../supabase/supabase.config";
import type { User } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}
interface AuthContextType {
  user: User | null;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session == null) {
        setUser(null);
      } else {
        setUser(session?.user);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
