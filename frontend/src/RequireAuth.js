import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "./contexts/AuthContext";

export default function RequireAuth({ children, requiredRoles }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/bejelentkezes" />;
  }

  if (!requiredRoles.includes(user.jog)) {
    return <Navigate to="/bejelentkezes" />;
  }

  return children;
}
