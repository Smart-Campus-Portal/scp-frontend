import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaChartPie ,FaHome, FaCalendarAlt, FaChalkboardTeacher, FaExclamationCircle, FaDoorOpen, FaBookReader, FaUser } from 'react-icons/fa';
import Header from './Header';
import '../styles/student/DashboardLayoutStudent.css';

const navItems = [
  { path: '', label: 'Dashboard', icon: <FaHome /> },
  { path: '/studentDashboard', label: 'Overview', icon: <FaChartPie  /> },
  { path: 'view-timetable', label: 'View Class Timetable', icon: <FaCalendarAlt /> },
  { path: 'lecture-schedule', label: 'View Lecture Schedule', icon: <FaChalkboardTeacher /> },
  { path: 'book-lecture', label: 'Book Lecture Appointment', icon: <FaBookReader /> },
  { path: 'book-study-room', label: 'Book Study Room', icon: <FaDoorOpen /> },
  { path: 'report-issue', label: 'Report An Issue', icon: <FaExclamationCircle /> },

  { path: 'profile', label: 'Profile', icon: <FaUser /> },
  
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

      
    </div>
  );
};

export default DashboardLayoutStudent;
