import React, { useState }from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../../scss/Lecturer/logout.css';

const LogoutComponent = () => {

const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmLogout = () => {
    navigate('/login'); 
  };


  return (
    <>
        <a href='' onClick={handleLogoutClick} className='lect-nav-links'>
        <MdOutlineLogout /> Logout
        </a>

      {showModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-box">
            <h3 className='logout-q'>Are you sure you want to logout?</h3>
            <div className="logout-modal-buttons">
              <button className="yes-btn" onClick={confirmLogout}>Yes</button>
              <button className="no-btn" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default LogoutComponent