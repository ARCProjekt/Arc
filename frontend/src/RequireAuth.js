import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "./contexts/AuthContext";

export default function RequireAuth({ children, requiredRoles }) {
  let { user } = useAuthContext();

  if (!user || !requiredRoles.includes(user.jog)) {
    return <Navigate to="/bejelentkezes" />;
  }

  return children;
}
