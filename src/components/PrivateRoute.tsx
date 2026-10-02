import React from 'react';
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isAuthenticated } from "../services/api";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth-login" replace />;
};

export default PrivateRoute;