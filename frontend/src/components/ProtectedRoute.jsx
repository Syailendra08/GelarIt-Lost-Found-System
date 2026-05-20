import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute() {
  const { isLogin } = useContext(AuthContext);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}