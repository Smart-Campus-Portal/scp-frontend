import React, { useState, useEffect } from 'react';
import '../../scss/Lecturer/navbar.css';
import { IoMdNotifications } from "react-icons/io";
import LogoutComponent from '../Logout/logout';
import {  useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState('Lecturer');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }

    const fetchNotifications = async () => {
      if (!userId || !token) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/maintenance/notifications?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [userId, token]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <header className="header">
      <nav className="lect-navbar">
        <span className="lect-nav-links">Hello, {userName}</span>
      </nav>

      <a href="/" className="logo">🎓 STUDENT CAMPUS PORTAL</a>

      <nav className="lect-navbar">
        <div className="lect-notification-wrapper">
          <div className="lect-bell-icon" onClick={() => setIsOpen(!isOpen)}>
            <IoMdNotifications size={28} />
            {unreadCount > 0 && (
              <span className="lect-badge">{unreadCount}</span>
            )}
          </div>

          {isOpen && (
            <div className="lect-notification-dropdown">
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    className={`lect-notification-item ${note.read ? 'read' : 'unread'}`}
                  >
                    {note.message}
                  </div>
                ))
              ) : (
                <div className="lect-notification-item">No notifications</div>
              )}
            </div>
          )}
        </div>

        <LogoutComponent />
      </nav>
    </header>
  );
};

export default Navbar;
