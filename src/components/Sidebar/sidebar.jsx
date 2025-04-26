import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaExclamationCircle, FaChalkboardTeacher, FaUserEdit } from "react-icons/fa";  
import { MdOutlineEditCalendar } from "react-icons/md";
import { LuCalendarCheck2 } from "react-icons/lu";


import '../../scss/Lecturer/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="page-links">
        
        <NavLink to='/lecturerDash' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}><FaHome className="dash-icon"/> Dashboard</NavLink>
        <NavLink to='/lecturerEditTT' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}><MdOutlineEditCalendar className="dash-icon"/> Update Timetable</NavLink><br/>
        <NavLink to='/lecturerViewTT' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}><FaChalkboardTeacher className="dash-icon"/> View Timetable</NavLink><br/>
        <NavLink to='/appt_bookings' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}><LuCalendarCheck2 className="dash-icon"/> Check Appointments</NavLink><br/>
        <NavLink to='/lect_report' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}> <FaExclamationCircle className="dash-icon"/> Report An Issue</NavLink>
        <NavLink to='/view_reported' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}> <FaExclamationCircle className="dash-icon"/> View Reported Issues</NavLink>
        <NavLink to='/lect_profile' className={({ isActive }) => isActive ? "page-btns active" : "page-btns"}> <FaUserEdit className="dash-icon"/> Profile </NavLink>

      </ul>
    </div>
  )
}
export default Sidebar