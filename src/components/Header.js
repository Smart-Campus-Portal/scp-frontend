import React, { useEffect, useState } from 'react';
import '../styles/student/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const userName = localStorage.getItem('userName') || 'Student';
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchUnreadCount = async () => {
    if (!token || !userId || userId === 'undefined') return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/maintenance/notifications?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      const unread = data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    const handleNotificationRead = () => {
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    };

    window.addEventListener('notification-read', handleNotificationRead);

    return () => {
      window.removeEventListener('notification-read', handleNotificationRead);
    };
  }, [token, userId]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="left-section">
          <span className="greeting-text">
            👋 Welcome back, <strong>{userName}</strong>!
          </span>
        </div>

        <h4 className="header-title">🎓 Student Campus Portal</h4>

        <div className="right-section">
          <Link
            to="/studentDashboard/announcements"
            className="notification-container"
            title="View Announcements"
          >
            <FaBell className="notification-bell" />
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
          </Link>
          <button
            className="nav-link logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut className="logout-icon" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
