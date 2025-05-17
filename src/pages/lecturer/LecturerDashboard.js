import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import '../../scss/Lecturer/lect_dash.css';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Sidebar/sidebar';
import { FaRegCalendar, FaScrewdriverWrench } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import apptData from '../../apptData';
import { format, formatDistanceToNow } from 'date-fns';

function LecturerDashboard() {
  const location = useLocation();
  const isDefaultDashboard = location.pathname === '/lecturerDashboard';

  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState('Lecturer');
  const [surname, setSurname] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Get name & surname from localStorage (you should store them during login)
    const storedName = localStorage.getItem('userName');
    const storedSurname = localStorage.getItem('userSurname');
    if (storedName) setUserName(storedName);
    if (storedSurname) setSurname(storedSurname);

    // Fetch maintenance issues
    const fetchIssues = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/maintenance/dashboard/open-issues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch issues');
        }

        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setIssues([]);
      }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/maintenance/notifications?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    fetchIssues();
    fetchNotifications();
  }, [userId, token]);

  return (
    <div className='dash-layout'>
      <Navbar />
      <div className='dash-side'>
        <Sidebar />
        <div className='content'>
          {isDefaultDashboard ? (
            <>
              <div className='greeting-cont'>
                <h1 className='ns-greeting'>Hello, {userName} {surname}</h1>
                <p className='p-greeting'>Welcome back to your dashboard, find your latest updates below!</p>
              </div>

              <div className='lect-updates'>
                {/* Appointments */}
                <div className="appt-booking-updates">
                  <div className="dash-header">
                    <h1><FaRegCalendar /> Appointment Bookings</h1>
                  </div>
                  <div className="appointments-list">
                    {apptData.slice(0, 3).map(app => (
                      <div key={app.id} className="appointment-card">
                        <div className="appointment-date">
                          <div className="date-block">
                            {format(new Date(app.date), 'EEEE,')}<br />
                            {format(new Date(app.date), 'dd MMM')}
                          </div>
                        </div>
                        <div className="appointment-details">
                          <p className='appt-p-db'><strong>{app.topic}</strong></p>
                          <p className='appt-p-db'><CiClock2 /> {app.time}</p>
                          <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="view-all-link">
                    <Link to="/lecturerDashboard/appt_bookings" className="view-all-btn">View All Bookings</Link>
                  </div>
                </div>

                {/* Issues */}
                <div className="issues-section">
                  <div className="section-header">
                    <h2><FaScrewdriverWrench /> Maintenance Issues</h2>
                  </div>
                  <div className="issue-cards">
                    {issues.slice(0, 3).map(issue => (
                      <div key={issue.id} className="issue-card">
                        <div className="issue-icon">
                          <div className="icon-block"><FaScrewdriverWrench /></div>
                        </div>
                        <div className="issue-details">
                          <p className="issue-desc"><strong>{issue.type}</strong></p>
                          <div className="issue-stats">
                            <div className={`priority-label ${issue.priority.toLowerCase()}`}>{issue.priority}</div>
                            <div className={`status-label ${issue.status.toLowerCase()}`}>{issue.status}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="issues-view-all-link">
                    <Link to="/lecturerDashboard/issues" className="issues-view-all-btn">View All Issues</Link>
                  </div>
                </div>

                {/* Notifications */}
                <div className="lect-notifications-ovv">
                  <div className="lect-notification-head"><IoMdNotifications /> Notifications</div>
                  <div className="notifications-list">
                    {notifications.slice(0, 3).map(notif => {
                      const date = new Date(notif.timestamp);
                      const isValidDate = !isNaN(date.getTime());

                      return (
                        <div key={notif.id} className="lect-notification-box">
                          <div className="lect-message">
                            <h4 className="lect-notif-title">{notif.title}</h4>
                            <p className="lect-notif-msg">{notif.message}</p>
                          </div>
                          <div className="lect-notification-time">
                            {isValidDate
                              ? formatDistanceToNow(date, { addSuffix: true })
                              : 'Invalid date'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;
