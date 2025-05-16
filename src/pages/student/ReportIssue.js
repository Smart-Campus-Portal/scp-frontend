import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/student/ReportIssue.css';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.priority || !formData.description || !formData.location) {
      toast.error('⚠️ Please fill out all fields.', { position: 'top-center' });
      return;
    }

    const reporterId = localStorage.getItem('userId');

    const newIssue = {
      ...formData,
      status: 'REPORTED',
      created_at: new Date().toISOString(),
      reporterId: reporterId,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/maintenance/report-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newIssue),
      });

      if (!response.ok) {
        throw new Error('Failed to submit issue');
      }

      toast.success(
        `✅ ${formData.category} issue (Priority: ${formData.priority}) reported successfully!`,
        { position: 'top-center', autoClose: 3000 }
      );

      setFormData({
        category: '',
        priority: '',
        description: '',
        location: '',
      });
    } catch (error) {
      toast.error('❌ Failed to report the issue.', { position: 'top-center' });
      console.error('API error:', error);
    }
  };

  return (
    <div className="report-issue-container">
      <div className="report-header">
        <h1 className="report-title">Report an Issue</h1>
        <Link to="/studentDashboard/issues" className="view-issues-button">
          View Reported Issues
        </Link>
      </div>

      <p className="report-description">
        If you're experiencing any issues related to facilities, safety, or systems, please report them below.
      </p>

      <ToastContainer />

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Issue Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select a category</option>
            <option value="Cleaning & Sanitation">Cleaning & Sanitation</option>
            <option value="Facilities & Infrastructure">Facilities & Infrastructure</option>
            <option value="IT & Technical Support">IT & Technical Support</option>
            <option value="Safety & Security">Safety & Security</option>
            <option value="Smart Systems / IoT Devices">Smart Systems / IoT Devices</option>
            <option value="Software & Portal Issues">Software & Portal Issues</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">Issue Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Issue Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe the issue in detail..."
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">Building Name (Location)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter building name"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportIssue;
