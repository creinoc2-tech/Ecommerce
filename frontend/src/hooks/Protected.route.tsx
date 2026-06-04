import { Navigate, Outlet } from "react-router-dom";
import type { FC } from "react";
import { useSubcription } from "../store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  authenticated?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  authenticated = true,
}) => {
  const { user } = useSubcription();
  if (authenticated === false) {
    if (!user) {
      return children ? children : <Outlet />;
    } else {
      return <Navigate to={"/"} replace />;
    }
  }

  if (authenticated) {
    if (user) {
      return children;
    } else {
      return <Navigate to={"/auth/sign-in"} replace />;
    }
  }
  return <Navigate to="/" replace />;
};
