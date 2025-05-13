import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';



const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ email: '', password: '', confirmPassword: '' });
  const [popupError, setPopupError] = useState('');
  const [popupSuccess, setPopupSuccess] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePopupChange = (e) => {
    setPopupData({ ...popupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8267/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Invalid email or password');

      const data = await response.json();
      const { token, user } = data;

      if (!token || !user?.role || !user?.id || !user.firstName || !user.lastName) {
        setError('Login failed: Missing token, role, or user details');
        return;
      }

      let role = '';
      switch (user.role) {
        case 'ROLE_STUDENT':
          role = 'student';
          break;
        case 'ROLE_LECTURER':
          role = 'lecture';
          break;
        case 'ROLE_ADMIN':
          role = 'admin';
          break;
        default:
          setError(`Unknown role received: ${user.role}`);
          return;
      }

      const fullName = `${user.firstName} ${user.lastName}`;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userName', fullName);

      navigate(`/${role}Dashboard`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    setPopupError('');
    setPopupSuccess('');

    if (popupData.password !== popupData.confirmPassword) {
      setPopupError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8267/api/auth/complete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: popupData.email,
          password: popupData.password,
        }),
      });

      if (!response.ok) throw new Error('Failed to set password');

      setPopupSuccess('✅ Password created successfully! Redirecting to login...');
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 2000);

      setPopupData({ email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setPopupError('❌ Could not create password. Try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome to SmartCampus</h2>

          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />

<div className="password-input-wrapper" style={{ position: 'relative' }}>
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    className="login-input"
    style={{ paddingRight: '40px' }}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#555',
    }}
  >
    {showPassword ? '🙈' : '👁️'}
  </span>
</div>


          <button type="submit" className="login-button">Login</button>

          <p className="forgot-link">
            <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setShowPopup(true)}>
              Just created account? Click here to create your password
            </span>
          </p>

          <p className="forgot-link">
            <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => navigate('/forgot-password')}>
              Forgot your password?
            </span>
          </p>
        </form>
      </div>

      {/* Popup form */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Create Your Password</h3>
            {popupError && <p className="error-message">{popupError}</p>}
            {popupSuccess && <p className="success-message">{popupSuccess}</p>}
            <form onSubmit={handlePopupSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={popupData.email}
                onChange={handlePopupChange}
                required
                className="login-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={popupData.password}
                onChange={handlePopupChange}
                required
                className="login-input"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={popupData.confirmPassword}
                onChange={handlePopupChange}
                required
                className="login-input"
              />
              <div style={{ marginTop: '10px' }}>
                <button type="submit" className="login-button">Submit</button>
                <button
                  type="button"
                  className="login-button"
                  style={{ marginLeft: '10px', backgroundColor: '#6b7280' }}
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
