import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');

  // Redirect if not logged in or if role does not match
  if (!isLoggedIn || (requiredRole && userRole !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
