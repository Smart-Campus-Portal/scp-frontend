import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaChalkboardTeacher,
  FaExclamationCircle,
  FaUserEdit,
} from 'react-icons/fa';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { LuCalendarCheck2 } from 'react-icons/lu';
import '../../scss/Lecturer/sidebar.css';

const Nav = () => {
  return (
    <div className="dashboard-sidebar">
      <nav className="nav">
        <div className="nav-upper-options">

          <NavLink
            to="/lecturerDashboard"
            end
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <FaHome className="dash-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/lecturerDashboard/update_timetable"
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <MdOutlineEditCalendar className="dash-icon" />
            <span>Update Timetable</span>
          </NavLink>

          <NavLink
            to="/lecturerDashboard/view_timetable"
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <FaChalkboardTeacher className="dash-icon" />
            <span>View Timetable</span>
          </NavLink>

          <NavLink
            to="/lecturerDashboard/appt_bookings"
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <LuCalendarCheck2 className="dash-icon" />
            <span>Check Appointments</span>
          </NavLink>

          <NavLink
            to="/lecturerDashboard/lect_report"
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <FaExclamationCircle className="dash-icon" />
            <span>Report An Issue</span>
          </NavLink>

          <NavLink
            to="/lecturerDashboard/view_reported_issues"
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <FaExclamationCircle className="dash-icon" />
            <span>View Reported Issues</span>
          </NavLink>

          <NavLink
            to="/lecturerDashboard/lect_profile"
            className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
          >
            <FaUserEdit className="dash-icon" />
            <span>Profile</span>
          </NavLink>

        </div>
      </nav>
    </div>
  );
};

export default Nav;
