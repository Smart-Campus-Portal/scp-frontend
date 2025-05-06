import React, { useState } from 'react';
import '../../scss/Lecturer/navbar.css';
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import dummyNotifications from '../../dummyNotifications';
import dummyLecturer from '../../dummyLecturer';
import LogoutComponent from '../Logout/logout';

const Navbar = () => {

const [isOpen, setIsOpen] = useState(false);

  const unreadCount = dummyNotifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <header className='header'>

            <nav className='lect-navbar'>
                <a href='' className='lect-nav-links'>Hello, {dummyLecturer.name}</a>
            </nav>

            <a href='/' className='logo'>🎓 STUDENT CAMPUS PORTAL</a>

            <nav className='lect-navbar'>

              <div className="lect-notification-wrapper">
                <div className="lect-bell-icon" onClick={() => setIsOpen(!isOpen)}>
                <IoMdNotifications size={40} />
                {unreadCount > 0 && <span className="lect-badge">{unreadCount}</span>}
                </div>

              {isOpen && (
              <div className="lect-notification-dropdown">
              {dummyNotifications.map(note => (
              <div key={note.id} className={`lect-notification-item ${note.read ? 'read' : 'unread'}`}>
              {note.message}
              </div>
              ))}
              </div>
              )}
              </div>

                <LogoutComponent/>
            </nav>
        </header>
    </div>
  )
}
export default Navbar