import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function RequireRole({ allowed, children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  const ok = Array.isArray(allowed) ? allowed.includes(user.role) : user.role === allowed;
  if (ok) return children;
  return <Navigate to={user.role === 'superadmin' ? '/panel' : '/cliente/panel'} replace />;
}
