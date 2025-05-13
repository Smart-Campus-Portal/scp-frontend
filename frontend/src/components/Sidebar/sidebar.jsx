import React from "react";
import { NavLink } from 'react-router-dom';
import { FaHome, FaExclamationCircle, FaChalkboardTeacher, FaUserEdit } from "react-icons/fa";  
import { MdOutlineEditCalendar } from "react-icons/md";
import { LuCalendarCheck2 } from "react-icons/lu";

import '../../scss/Lecturer/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="page-links">

        <NavLink 
          to='/lecturerDashboard' 
          end
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <FaHome className="dash-icon" /> Dashboard
        </NavLink>

        <NavLink 
          to='/lecturerDashboard/update_timetable' 
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <MdOutlineEditCalendar className="dash-icon" /> Update Timetable
        </NavLink>

        <NavLink 
          to='/lecturerDashboard/view_timetable' 
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <FaChalkboardTeacher className="dash-icon" /> View Timetable
        </NavLink>

        <NavLink 
          to='/lecturerDashboard/appt_bookings' 
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <LuCalendarCheck2 className="dash-icon" /> Check Appointments
        </NavLink>

        <NavLink 
          to='/lecturerDashboard/lect_report' 
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <FaExclamationCircle className="dash-icon" /> Report An Issue
        </NavLink>

        <NavLink 
          to='/lecturerDashboard/view_reported_issues' 
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <FaExclamationCircle className="dash-icon" /> View Reported Issues
        </NavLink>

        <NavLink 
          to='/lecturerDashboard/lect_profile' 
          className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}
        >
          <FaUserEdit className="dash-icon" /> Profile
        </NavLink>

      </ul>
    </div>
  );
};

export default Sidebar;
