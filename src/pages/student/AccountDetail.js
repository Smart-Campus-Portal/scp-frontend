import React, { useState } from 'react';
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend or API
    console.log('Updated Account Details:', formData);
    // You can handle the submission here, like sending it to your backend or API.
  };

  return (
    <div className="account-detail-container">
      <h1 className="account-title">Update Account Details</h1>
      <p className="account-description">Please update your personal information below:</p>
      
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your phone number"
          />
        </div>

        <button type="submit" className="submit-btn">Update Details</button>
      </form>
    </div>
  );
};

export default AccountDetail;
