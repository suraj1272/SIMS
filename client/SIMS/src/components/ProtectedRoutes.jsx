import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const location = useLocation(); // Get the current route

  if (!token) {
    // Redirect to the appropriate login page based on the route
    if (location.pathname.startsWith("/adminHome")) {
      return <Navigate to="/adminLogin" />;
    } else if (location.pathname.startsWith("/staffHome")) {
      return <Navigate to="/staffLogin" />;
    } else if (location.pathname.startsWith("/studentHome")) {
      return <Navigate to="/studentLogin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!allowedRoles.includes(payload.role)) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    if (location.pathname.startsWith("/adminHome")) {
      return <Navigate to="/adminLogin" />;
    } else if (location.pathname.startsWith("/staffHome")) {
      return <Navigate to="/staffLogin" />;
    } else if (location.pathname.startsWith("/studentHome")) {
      return <Navigate to="/studentLogin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children; // Render the protected component if the token is valid
};

export default ProtectedRoute;
