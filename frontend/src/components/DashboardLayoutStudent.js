import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './DashboardLayoutStudent.css';

const navItems = [
  { path: '', label: 'Dashboard' },  {/* Changed 'dashboard' to '' for default route */},
  { path: 'view-timetable', label: 'View Class Timetable' },
  { path: 'lecture-schedule', label: 'View Lecture Schedule' },
  { path: 'book-lecture', label: 'Book Lecture Appointment' },
  { path: 'book-study-room', label: 'Book Study Room' },
  { path: 'account-detail', label: 'Update Account Detail' },
  { path: 'report-issue', label: 'Report An Issue' },
  { path: 'announcements', label: 'Announcements' }, {/* Added Announcements link */}
];

const DashboardLayoutStudent = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '') return location.pathname === '/';  // Default route
    return location.pathname.endsWith(path);
  };

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-main">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayoutStudent;
