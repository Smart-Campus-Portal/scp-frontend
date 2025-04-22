import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaPhone, FaIdBadge, FaLock } from 'react-icons/fa';
import '../../styles/student/AccountDetail.css';

const AccountDetail = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Updated Account Details:', formData);

    // Fake password validation logic here for demonstration
    if (formData.oldPassword && formData.newPassword) {
      toast.success('✅ Password and details updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } else {
      toast.success('✅ Account details updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    }

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      oldPassword: '',
      newPassword: '',
    });
  };

  return (
    <div className="account-detail-container">
      <h1 className="account-title">Student Settings</h1>
      <p className="account-description">Manage your personal information and password here.</p>

      <ToastContainer />

      <form className="account-form" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            <FaUser className="input-icon" /> First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            <FaIdBadge className="input-icon" /> Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <FaEnvelope className="input-icon" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            <FaPhone className="input-icon" /> Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Old Password */}
        <div className="form-group">
          <label htmlFor="oldPassword" className="form-label">
            <FaLock className="input-icon" /> Current Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your current password"
          />
        </div>

        {/* New Password */}
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            <FaLock className="input-icon" /> New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your new password"
          />
        </div>

        <button type="submit" className="submit-btn">Update Details</button>
      </form>
    </div>
  );
};

export default AccountDetail;
