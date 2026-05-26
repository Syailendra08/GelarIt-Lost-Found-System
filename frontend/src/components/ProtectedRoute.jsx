import { useContext } from "react";

import {
  Navigate,
  Outlet
} from "react-router-dom";

import {
  AuthContext
} from "../contexts/AuthContext";

export default function ProtectedRoute({adminOnly = false}) {

  const {
    isLogin,
    isAdmin    
  } = useContext(AuthContext);

 
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}