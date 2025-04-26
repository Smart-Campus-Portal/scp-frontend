import React from 'react';
import '../styles/student/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        {/* Left: Hello */}
        <div className="left-section">
          <span className="greeting-text">Hello, Prince</span>
        </div>

        {/* Center: Title */}
        <h4 className="header-title">🎓 STUDENT CAMPUS PORTAL</h4>

        {/* Right: Notification & Logout */}
        <div className="right-section">
          <Link to="announcements" className="notification-container">
            <FaBell className="notification-bell" />
            <span className="notification-count">3</span>
          </Link>
          <Link to="/" className="nav-link logout-button" onClick={handleLogout}>
            <FiLogOut className="logout-icon" /> Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
