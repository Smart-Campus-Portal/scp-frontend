import React from 'react';
import './WelcomePage.css';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <h1>SmartCampus</h1>
        <nav className="welcome-nav">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Get Started</Link>
        </nav>
      </header>

      <main className="welcome-main">
        <section className="intro-section">
          <h2>Streamline Your Campus Experience</h2>
          <p>Your all-in-one solution for managing bookings, schedules, maintenance requests, and campus announcements.</p>
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

      <footer className="welcome-footer">
        <div className="footer-columns">
          <div>
            <h4>Services</h4>
            <ul>
              <li>Room Bookings</li>
              <li>Class Schedules</li>
              <li>Maintenance Requests</li>
              <li>Campus Announcements</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>123 Campus Drive</li>
              <li>info@smartcampus.edu</li>
              <li>+1 (800) 123-4567</li>
              <li>Campus Directory</li>
            </ul>
          </div>
        </div>
        <p className="footer-bottom">© 2025 SmartCampus. All rights reserved. | Privacy Policy | Terms of Service | Accessibility</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
