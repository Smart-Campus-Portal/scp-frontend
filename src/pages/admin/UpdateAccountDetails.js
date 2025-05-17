import React, { useState, useEffect } from 'react';
import '../../styles/student/StudentProfile.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function StudentProfile() {
  const [studentData, setStudentData] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    email: localStorage.getItem('userEmail') || '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { firstName, lastName, email } = response.data;
        setStudentData({ firstName, lastName, email });

        localStorage.setItem('firstName', firstName);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('lastName',lastName)
      } catch (error) {
        console.error(error);
      
       
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/update',
        {
          ...studentData,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('✅ Profile updated successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });

        localStorage.setItem('firstName', studentData.firstName);
        localStorage.setItem('userEmail', studentData.email);

        setPasswords({
          oldPassword: '',
          newPassword: '',
        });
      } else {
        toast.error('❌ Failed to update profile.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update profile.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="student-profile">
      

      <h2 className="student-title">👤 Admin Profile</h2>

      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-item">
          <FaUser className="profile-icon" />
          <input
            type="text"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="profile-item">
          <FaUser className="profile-icon" />
          <input
            type="text"
            name="lastName"
            value={studentData.lastName}
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
      <ToastContainer />
    </div>
  );
}

export default StudentProfile;
