import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Student Dashboard</h1>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/home" className="nav-link">Hello, Prince</Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li>
              <Link to="account-detail" className="nav-link">Settings</Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link">Logout</Link>
            </li>
          </ul>
        </nav>

        {/* Bell wrapped with Link */}
        <Link to="announcements" className="notification-container">
          <FaBell className="notification-bell" />
          <span className="notification-count">3</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
