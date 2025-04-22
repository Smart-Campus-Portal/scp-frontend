import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaChalkboardTeacher, FaUserEdit, FaBullhorn, FaExclamationCircle, FaDoorOpen, FaBookReader } from 'react-icons/fa';
import Footer from './Footer';
import Header from './Header';
import './DashboardLayoutStudent.css';

const navItems = [
  { path: '', label: 'Dashboard', icon: <FaHome /> },
  { path: '', label: 'Dashboard', icon: <FaHome /> },
  { path: 'view-timetable', label: 'View Class Timetable', icon: <FaCalendarAlt /> },
  { path: 'lecture-schedule', label: 'View Lecture Schedule', icon: <FaChalkboardTeacher /> },
  { path: 'book-lecture', label: 'Book Lecture Appointment', icon: <FaBookReader /> },
  { path: 'book-study-room', label: 'Book Study Room', icon: <FaDoorOpen /> },
  { path: 'account-detail', label: 'Update Account Detail', icon: <FaUserEdit /> },
  { path: 'report-issue', label: 'Report An Issue', icon: <FaExclamationCircle /> },
  { path: 'announcements', label: 'Announcements', icon: <FaBullhorn /> },
];

const DashboardLayoutStudent = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '') return location.pathname === '/';
    return location.pathname.endsWith(path);
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
                to={item.path === '' ? '/' : item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayoutStudent;
