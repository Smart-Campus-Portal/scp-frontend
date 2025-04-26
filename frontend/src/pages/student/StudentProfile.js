import React, { useState } from 'react';
import '../../styles/student/StudentProfile.css';
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from 'react-icons/fa';

function StudentProfile() {
  const [studentData, setStudentData] = useState({
    name: 'Prince',
    lastname: 'Khomu',
    email: 'prince.khomu@example.com',
    phoneNumber: '+27 82 123-4567',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You'd send `studentData` and `passwords` to backend here
    alert('Profile updated!');
  };

  return (
    <div className="student-profile">
      <h2 className="student-title">👤 Student Profile</h2>
      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-item">
          <FaUser className="profile-icon" />
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="profile-item">
          <FaUser className="profile-icon" />
          <input
            type="text"
            name="lastname"
            value={studentData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="profile-item">
          <FaEnvelope className="profile-icon" />
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="profile-item">
          <FaPhoneAlt className="profile-icon" />
          <input
            type="text"
            name="phoneNumber"
            value={studentData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className="profile-item">
          <FaLock className="profile-icon" />
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            placeholder="Old Password"
          />
        </div>
        <div className="profile-item">
          <FaLock className="profile-icon" />
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
          />
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
}

export default StudentProfile;
