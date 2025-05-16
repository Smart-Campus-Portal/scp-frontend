import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/admin/CreateUserAccounts.css'; // Ensure this path is correct

const CreateUserAccounts = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'ROLE_STUDENT',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error('❌ Invalid email format', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    const userToCreate = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/api/admin/add-user',
        userToCreate,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`✅ User "${form.firstName} ${form.lastName}" created successfully!`, {
          position: 'top-center',
          autoClose: 3000,
        });

        // Reset form on success
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          role: 'ROLE_STUDENT',
        });
      }
    } catch (err) {
      console.error(err);

      if (err.response?.status === 409) {
        toast.error('❌ A user with this email already exists.', {
          position: 'top-center',
          autoClose: 3000,
        });
      } else if (err.response?.status === 403) {
        toast.error('❌ Access denied. Please check your login status.', {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error('❌ Failed to create user. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="create-user-container">
      <ToastContainer />
      <h2 className="page-title">Adding Users</h2>

      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-input"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-input"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="example@domain.com"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            className="form-input"
            value={form.role}
            onChange={handleChange}
          >
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_STUDENT">Student</option>
            <option value="ROLE_LECTURER">Lecturer</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="create-account-btn">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserAccounts;
