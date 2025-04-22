import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import '../../styles/student/AccountDetail.css';

const AccountDetail = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

    toast.success('✅ Your account details have been updated successfully!', {
      position: 'top-center',
      autoClose: 3000,
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="account-detail-container">
      <h1 className="account-title">Update Account Details</h1>
      <p className="account-description">Keep your information up to date for smooth communication.</p>

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

        <button type="submit" className="submit-btn">Update Details</button>
      </form>
    </div>
  );
};

export default AccountDetail;
