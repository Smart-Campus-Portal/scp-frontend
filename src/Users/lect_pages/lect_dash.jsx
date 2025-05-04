import React from 'react';
import '../../scss/Lecturer/lect_dash.css';
import Navbar from '../../Components/Navbar/navbar';
import Sidebar from '../../Components/Sidebar/sidebar';
import { FaRegCalendar, FaScrewdriverWrench } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoMdNotifications } from "react-icons/io";
import apptData from '../../apptData';
import dummyIssues from '../../dummyIssues';
import dummyNotifications from '../../dummyNotifications';
import { format, formatDistanceToNow } from 'date-fns';
import dummyLecturer from '../../dummyLecturer';

function LectDashboard(){

    return(
        <>
        <div className='dash-layout'>
            <Navbar/>

            <div className='dash-side'>
                <Sidebar/>

                <div className='content'>
                    <div className='greeting-cont'>
                        <h1 className='ns-greeting'>Hello, {dummyLecturer.name} {dummyLecturer.surname}</h1>
                        <p className='p-greeting'>Welcome back to your dashboard, find your latest updates below!</p>
                    </div>

                    <div className='lect-updates'>

                        <div className="appt-booking-updates">
                        
                            <div className="dash-header">
                                <h1 className="dash-btn-txt"> <FaRegCalendar className="dash-appt-icon" /> Appointment Bookings</h1>
                            </div>

                        <div className="appointments-list">
                            {apptData.slice(0, 3).map((app) => (
                            <div key={app.id} className="appointment-card">
                            <div className="appointment-date">
                                <span>
                                    <div className='date-block'>
                                        {format (new Date(app.date), 'EEEE,')} <br/>
                                        {format(new Date(app.date), 'dd MMM')}
                                    </div>
                                </span>
                            </div>

                        <div className="appointment-details">
                            <p className='appt-p-db'><strong>{app.topic}</strong></p>
                            <p className='appt-p-db'><strong><CiClock2/></strong> {app.time}</p>

                            <span className={`status ${app.status.toLowerCase()}`}>
                                {app.status}
                            </span>
                                
                        </div>
                        </div>
                        ))}
                        </div>

                        <div className="view-all-link">
                        <Link to="/appt_bookings" className='view-all-btn'>View All Bookings</Link>
                        </div>
                        </div>

                    <div className="issues-section">

                        <div className="section-header">
                            <h2 className='dash-issues-txt'> <FaScrewdriverWrench className='dash-issues-icon'/> Maintenance Issues</h2>
                        </div>

                        <div className="issue-cards">
                            {dummyIssues.map(issue => (
                            <div key={issue.id} className="issue-card">

                        <div className="issue-icon">
                            <div className="icon-block">
                                <FaScrewdriverWrench/>
                            </div>
                        </div>

                        <div className="issue-details">
                            <p className='issue-desc'><strong>{issue.type}</strong></p>
                        <div className='issue-stats'>

                            <div className={`priority-label ${issue.priority.toLowerCase()}`}>
                            {issue.priority}
                            </div>
                            <div className={`status-label ${issue.status.toLowerCase()}`}>
                            {issue.status}
                            </div>

                        </div>
                        </div>
                        </div>
                        ))}
                        </div>

                        <div className='issues-view-all-link'>
                            <Link to="/view_reported" className="issues-view-all-btn">View All Issues</Link>
                        </div>
                    </div>

                    <div className="lect-notifications-ovv">
                        <div className='lect-notification-head'>
                            <h1 className='dash-btn-txt'> <IoMdNotifications/> Notifications</h1>
                        </div>
                            

                    <div className="notifications-list">
                        {dummyNotifications.map((notif) => (
                        <div key={notif.id} className="lect-notification-box">

                        <div className='lect-message'>
                            <h2 className='lect-notif-title'>{notif.title}</h2>
                            <p className='lect-notif-msg'>{notif.message}</p>
                        </div>

                        <p className="lect-notification-time">
                        {formatDistanceToNow(new Date(notif.time), { addSuffix: true })}
                        </p>
                        </div>
                    ))}
                    </div>
                    </div>


                </div>
            </div>
        </div>
        </div>


        </>
    );
};

export default LectDashboard;