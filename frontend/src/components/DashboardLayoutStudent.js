import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './DashboardLayoutStudent.css';

const navItems = [
  { path: 'view-timetable', label: 'View Class Timetable' },
  { path: 'lecture-schedule', label: 'View Lecture Schedule' },
  { path: 'book-lecture', label: 'Book Lecture Appointment' },
  { path: 'book-study-room', label: 'Book Study Room' },
  { path: 'account-detail', label: 'Update Account Detail' },
  { path: 'report-issue', label: 'Report An Issue' },
];

const DashboardLayoutStudent = () => {
  const location = useLocation();

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
                className={`nav-item ${location.pathname.endsWith(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
    
          <Outlet />
       
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayoutStudent;
