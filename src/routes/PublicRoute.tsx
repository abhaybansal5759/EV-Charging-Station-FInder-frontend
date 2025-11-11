import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/authUtils";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const user = getUser();

  // ✅ If already logged in → go to welcome
  if (user) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
}

