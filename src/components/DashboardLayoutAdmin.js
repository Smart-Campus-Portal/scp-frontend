import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  FaTachometerAlt,
  
  FaUsers,
  FaUserEdit,
  FaUserTimes,
  FaUserPlus,
 
} from 'react-icons/fa';

import Header from './Header';

import '../styles/admin/DashboardLayoutAdmin.css'; // Adjust if your path differs

const navItems = [
  { path: '', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { path: '', label: 'Dashboard', icon: <FaTachometerAlt /> },
 
 
  { path: 'view-users', label: 'View User Accounts', icon: <FaUsers /> },
  { path: 'update-account', label: 'Update Account Details', icon: <FaUserEdit /> },

  { path: 'create-user', label: 'Create User Accounts', icon: <FaUserPlus /> },
  { path: 'update-status', label: 'Issue Management', icon:<FaUserTimes/>},

];

const DashboardLayoutAdmin = () => {
  const location = useLocation();

  // Check if the current path matches this nav item's path
  const isActive = (path) => {
    const fullPath = `/adminDashboard/${path}`;
    if (path === '') return location.pathname === '/adminDashboard';
    return location.pathname === fullPath;
  };

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={`/adminDashboard/${item.path}`} // Correct nested path
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="dashboard-content">
          {/* Nested route content will render here */}
          <Outlet />
        </div>
      </div>


    </div>
  );
};

export default DashboardLayoutAdmin;
