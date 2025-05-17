import React, { useState } from 'react';

const CreateUserAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Account Created:', formData);
    // Add logic to send data to your backend or API
  };

  return (
    <div className="dashboard-content">
      <h2>Create User Account</h2>
      <form className="form-section" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="form-input"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="view-accounts-btn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateUserAccount;