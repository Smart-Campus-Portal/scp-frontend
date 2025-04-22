import React from 'react';
import '../styles/student/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'; // New logout icon

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove logged-in status and user role from localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
    // Navigate to the login page
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Student Dashboard</h1>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/studentDashboard" className="nav-link">Home</Link>
            </li>
            <li>Hello, Prince</li>
            <li>
              <Link to="profile" className="nav-link">Profile</Link>
            </li>
            <li>
              <Link to="account-detail" className="nav-link">Settings</Link>
            </li>
            <li>
              {/* Use Link to trigger logout */}
              <Link to="/" className="nav-link logout-button" onClick={handleLogout}>
                <FiLogOut className="logout-icon" /> Logout
              </Link>
            </li>
          </ul>
        </nav>

        {/* Notification Bell */}
        <Link to="announcements" className="notification-container">
          <FaBell className="notification-bell" />
          <span className="notification-count">3</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
