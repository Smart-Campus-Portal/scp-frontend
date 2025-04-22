import React from 'react';
import './WelcomePage.css';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUsers, FaRegCalendarAlt, FaTools } from 'react-icons/fa';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <main className="welcome-main">
        <section className="intro-section">
          <h2>Streamline Your Campus Experience</h2>
          <p>Your all-in-one solution for managing bookings, schedules, maintenance requests, and campus announcements.</p>
        </section>

        <section className="analytics-dashboard">
          <h3>System Analytics</h3>
          <div className="analytics-grid">
            <div className="analytics-card">
              <FaUsers />
              <h4>Active Users</h4>
              <p>1,245</p>
            </div>
            <div className="analytics-card">
              <FaRegCalendarAlt />
              <h4>Upcoming Events</h4>
              <p>32</p>
            </div>
            <div className="analytics-card">
              <FaTools />
              <h4>Maintenance Requests</h4>
              <p>5 Pending</p>
            </div>
            <div className="analytics-card">
              <FaChartLine />
              <h4>System Uptime</h4>
              <p>99.8%</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h3>Everything You Need in One Place</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Room Bookings</h4>
              <p>Easily reserve classrooms, meeting rooms, and study spaces with real-time availability.</p>
            </div>
            <div className="feature-card">
              <h4>Class Schedules</h4>
              <p>Access your timetable at a glance with personalized views.</p>
            </div>
            <div className="feature-card">
              <h4>Maintenance Requests</h4>
              <p>Report facility issues and track their resolution in real time.</p>
            </div>
            <div className="feature-card">
              <h4>Announcements</h4>
              <p>Stay informed with campus news, events, and alerts.</p>
            </div>
          </div>
        </section>

        <section className="roles-section">
          <h3>Tailored for Everyone</h3>
          <div className="roles-grid">
            <div className="role-card">
              <h4>For Students</h4>
              <ul>
                <li>Personal timetable</li>
                <li>Study room reservations</li>
                <li>Report issues</li>
                <li>Campus updates</li>
              </ul>
              <Link to="/register/student" className="role-btn">Register as Student</Link>
            </div>
            <div className="role-card">
              <h4>For Lecturers</h4>
              <ul>
                <li>Manage teaching schedules</li>
                <li>Book classrooms</li>
                <li>Report equipment issues</li>
                <li>Create announcements</li>
              </ul>
              <Link to="/register/lecturer" className="role-btn">Register as Lecturer</Link>
            </div>
            <div className="role-card">
              <h4>For Administrators</h4>
              <ul>
                <li>User management</li>
                <li>Resource allocation</li>
                <li>Assign maintenance</li>
                <li>Campus-wide news</li>
              </ul>
              <Link to="/register/admin" className="role-btn">Register as Administrator</Link>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h3>Ready to Transform Your Campus Experience?</h3>
          <p>Join thousands of students and staff already using SmartCampus.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-btn">Create an Account</Link>
            <Link to="/demo" className="cta-btn secondary">Watch Demo</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;
