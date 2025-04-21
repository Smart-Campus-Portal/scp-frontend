import React from 'react';
import '../../styles/student/DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="welcome-message">
        <h2>Good evening, John Student!</h2>
        <p>Here's an overview of your campus activities and services.</p>
      </div>

      <div className="dashboard-sections">
        <div className="card">
          <h3>Room Booking</h3>
          <p>Book a room</p>
        </div>
        <div className="card">
          <h3>Class Schedule</h3>
          <p>View timetable</p>
        </div>
        <div className="card">
          <h3>Maintenance</h3>
          <p>Report an issue</p>
        </div>
        <div className="card">
          <h3>Announcements</h3>
          <p>Campus updates</p>
        </div>
      </div>

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
            <li><strong>Career Fair Next Week</strong> – 2 days ago – Don’t miss the annual career fair in the Student Center next Wednesday!</li>
          </ul>
          <button>View all announcements</button>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
