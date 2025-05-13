import React from 'react';
import '../styles/student/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();

  // Get the user's name from localStorage
  const userName = localStorage.getItem('userName') || 'Student';

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        {/* Left: Personalized Welcome */}
        <div className="left-section">
          <span className="greeting-text">
            👋 Welcome back, <strong>{userName}</strong>!
          </span>
        </div>

        {/* Center: Title */}
        <h4 className="header-title">🎓 Student Campus Portal</h4>

        {/* Right: Notifications & Logout */}
        <div className="right-section">
          <Link to="announcements" className="notification-container" title="View Announcements">
            <FaBell className="notification-bell" />
            <span className="notification-count">3</span>
          </Link>
          <button className="nav-link logout-button" onClick={handleLogout} title="Logout">
            <FiLogOut className="logout-icon" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
