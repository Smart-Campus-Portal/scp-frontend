import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isLoggedIn || (requiredRole && userRole !== requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
