import React from 'react';
import '../../styles/student/DashboardHome.css';
import { FaBookOpen, FaCalendarAlt, FaTools, FaBullhorn } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="welcome-message">
        <h2>Good evening, John Student!</h2>
     
      </div>

      {/* Statistics Overview */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <Link to="/room-bookings"> {/* Link to the room bookings page */}
            <FaBookOpen />
            <div>
              <h4>Room Bookings</h4>
              <p>3 Upcoming</p>
            </div>
          </Link>
        </div>
        <div className="stat-card">
          <Link to="/class-schedule"> {/* Link to the class schedule page */}
            <FaCalendarAlt />
            <div>
              <h4>Classes Today</h4>
              <p>2 Scheduled</p>
            </div>
          </Link>
        </div>
        <div className="stat-card">
          <Link to="/maintenance"> {/* Link to the maintenance page */}
            <FaTools />
            <div>
              <h4>Maintenance</h4>
              <p>1 Pending</p>
            </div>
          </Link>
        </div>
        <div className="stat-card">
          <Link to="/announcements"> {/* Link to the announcements page */}
            <FaBullhorn />
            <div>
              <h4>New Announcements</h4>
              <p>3 Recent</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Other Sections */}
      <div className="dashboard-lists">
        <section>
          <h4>Upcoming Bookings</h4>
          <div className="booking-entry">
            <strong>Apr 21</strong>
            <p>Room Booking<br />14:00 - 16:00<br />Approved</p>
          </div>
          <button>View all bookings</button>
        </section>

        <section>
          <h4>Maintenance Requests</h4>
          <ul>
            <li><strong>Projector not working</strong> – Electrical – Assigned – High</li>
            <li><strong>Broken chair</strong> – Furniture – Reported – Medium</li>
          </ul>
          <button>View all maintenance requests</button>
        </section>

        <section>
          <h4>Campus Announcements</h4>
          <ul>
            <li><strong>Library Hours Extended</strong> – 2 hours ago – The main library will remain open until midnight during finals week.</li>
            <li><strong>WiFi Maintenance Scheduled</strong> – 1 day ago – Campus WiFi will be undergoing maintenance on Saturday from 7 AM to 9 AM.</li>
          
          </ul>
          <button>View all announcements</button>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
