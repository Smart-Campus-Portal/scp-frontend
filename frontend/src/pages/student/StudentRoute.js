import React from 'react';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const role = localStorage.getItem('userRole');

  if (!isLoggedIn || role !== 'student') {
    return <Navigate to="/" />;
  }

  return children;
};

export default StudentRoute;
