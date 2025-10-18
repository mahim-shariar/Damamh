// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const adminData = localStorage.getItem("adminData");

  // Check if user is authenticated
  const isAuthenticated = !!(token && adminData);

  return isAuthenticated ? children : <Navigate to="/*" replace />;
};

export default PrivateRoute;
