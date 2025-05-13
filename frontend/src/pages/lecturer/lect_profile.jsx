import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/Sidebar/sidebar';
import dummyLecturer from '../../dummyLecturer';
import { FaUser, FaPhone, FaLock } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import '../../scss/Lecturer/lect_profile.css'

const LecturerProfile = () => {

const [formData, setFormData] = useState(dummyLecturer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated profile:', formData);
    alert("Profile updated (check console)");
  };


  return (
    <>
    <div className='lect-profile-layout'>
            <Navbar/>

            <div className='lect-profile-side'>
                <Sidebar/>

                <div className='lect-profile-content'>
                    
                    <div className='lect-prof-cont'>

                        <form className="lect-profile-form" onSubmit={handleSubmit}>
                            <h2 className='lect-form-heading'><FaUser/> Lecturer Profile</h2>

                            <div className="lect-prof-input-group">
                                <MdDriveFileRenameOutline className="lect-prof-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Name"
                                    onChange={handleChange}
                                    className='lect-prof-input'
                                />
                            </div>

                            <div className="lect-prof-input-group">
                                <MdDriveFileRenameOutline className="lect-prof-icon" />
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    placeholder="Surname"
                                    onChange={handleChange}
                                    className='lect-prof-input'
                                />
                            </div>

                            <div className="lect-prof-input-group">
                                <FaPhone className="lect-prof-icon" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    className='lect-prof-input'
                                />
                            </div>

                            <div className="lect-prof-input-group">
                                <FaLock className="lect-prof-icon" />
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    placeholder="Old Password"
                                    onChange={handleChange}
                                    className='lect-prof-input'
                                />
                            </div>

                            <div className="lect-prof-input-group">
                                <FaLock className="lect-prof-icon" />
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    placeholder="New Password"
                                    onChange={handleChange}
                                    className='lect-prof-input'
                                />
                            </div>

                        <button type="submit" className='prof-sub-btn'>Save Changes</button>
                        </form>

                    </div>

                </div>
            </div>
    </div>

    </>

  )
}
export default LecturerProfile