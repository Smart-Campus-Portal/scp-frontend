import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Clear any previous login state when visiting the login page
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userRole', formData.role);

    switch (formData.role) {
      case 'student':
        navigate('/studentDashboard');
        break;
      case 'lecture':
        navigate('/lecturerDashboard');
        break;
      case 'admin':
        navigate('/adminDashboard');
        break;
      default:
        alert('Unknown role selected!');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome to SmartCampus</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="login-select"
          >
            <option value="student">Student</option>
            <option value="lecture">Lecturer</option>
            <option value="admin">Administrator</option>
          </select>

          <button type="submit" className="login-button">Login</button>

          <p className="forgot-link">
            <Link to="/forgot">Forgot password or email?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
