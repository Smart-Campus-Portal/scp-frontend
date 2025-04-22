// src/components/StudentProfile.js
import React from 'react';
import '../../styles/student/StudentProfile.css';

import { FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function StudentProfile() {
  const studentData = {
    name: 'Prince',
    lastname: 'Khomu',
    email: 'prince.khomu@example.com',
    phoneNumber: '+27 82 123-4567',
  };

  return (
    <div className="student-profile">
      <h2 className="student-title">👤 Student Profile</h2>
      <div className="profile-card">
        <div className="profile-item">
          <FaUser className="profile-icon" />
          <span><strong>Name:</strong> {studentData.name}</span>
        </div>
        <div className="profile-item">
          <FaUser className="profile-icon" />
          <span><strong>Last Name:</strong> {studentData.lastname}</span>
        </div>
        <div className="profile-item">
          <FaEnvelope className="profile-icon" />
          <span><strong>Email:</strong> {studentData.email}</span>
        </div>
        <div className="profile-item">
          <FaPhoneAlt className="profile-icon" />
          <span><strong>Phone Number:</strong> {studentData.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
