import { Navigate, Outlet } from "react-router-dom";
import type { FC } from "react";
import { useAuthStore } from "../store/auth.store";

interface RutaProtegidaProps {
  children: React.ReactNode;
  autenticado?: boolean;
}

export const RutaProtegida: FC<RutaProtegidaProps> = ({
  children,
  autenticado = true,
}) => {
  const { usuario, cargando } = useAuthStore();

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (autenticado === false) {
    return !usuario ? (
      children ? (
        children
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to="/" replace />
    );
  }

  if (autenticado) {
    return usuario ? (
      children ? (
        children
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to="/auth/iniciar-sesion" replace />
    );
  }

  return <Navigate to="/" replace />;
};
