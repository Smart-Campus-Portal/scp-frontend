import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/Lecturer/lect_report.css';
import LecturerNavbar from '../../components/Navbar/navbar';


const LecturerReportIssue = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    description: '',
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

    if (!formData.category || !formData.priority || !formData.description) {
      toast.error('⚠️ Please fill out all fields.', { position: 'top-center' });
      return;
    }

    const token = localStorage.getItem('token');
    const reporterId = localStorage.getItem('userId');

    if (!token || !reporterId) {
      toast.error('❌ Missing authentication. Please login again.', {
        position: 'top-center',
      });
      return;
    }

    const newIssue = {
      ...formData,
      status: 'REPORTED',
      created_at: new Date().toISOString(),
      reporterId: parseInt(reporterId), // Ensure it's a number
    };

    try {
      const response = await fetch(
        'http://localhost:8080/api/maintenance/report-issue',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newIssue),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit issue');
      }

      toast.success(
        `✅ ${formData.category} issue (Priority: ${formData.priority}) reported successfully!`,
        { position: 'top-center', autoClose: 3000 }
      );

      // Reset form
      setFormData({
        category: '',
        priority: '',
        description: '',
      });
    } catch (error) {
      toast.error('❌ Failed to report the issue.', { position: 'top-center' });
      console.error('API error:', error);
    }
  };

  return (
    <div className="lect-rep-layout">
      <LecturerNavbar />

      <div className="lect-rep-side">
     

        <div className="lect-rep-content">
          <div className="rep-form-container">
            <form className="issue-form" onSubmit={handleSubmit}>
              <h2 className="rep-form-heading">REPORT AN ISSUE</h2>
              <p className="rep-form-desc">
                If you're experiencing any issues related to lectures, lecturers, or facilities, please submit them below.
              </p>

              <label className="rep-form-lbl">Issue Category:</label> <br />
              <select
                className="rep-form-input"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select an issue --</option>
                <option value="Smart Systems / IoT Devices">Smart Systems / IoT Devices</option>
                <option value="Safety & Security">Safety & Security</option>
                <option value="IT & Technical Support">IT & Technical Support</option>
                <option value="Software & Portal Issues">Software & Portal Issues</option>
                <option value="Facilities & Infrastructure">Facilities & Infrastructure</option>
                <option value="Cleaning & Sanitation">Cleaning & Sanitation</option>
              </select> <br />

              <label className="rep-form-lbl">Priority:</label> <br />
              <select
                className="rep-form-input"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">-- Select priority --</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select> <br />

              <label className="rep-form-lbl">Description:</label> <br />
              <textarea
                onChange={handleChange}
                value={formData.description}
                rows="4"
                id="description"
                name="description"
                className="rep-form-input"
                placeholder="Describe the issue in detail..."
                required
              ></textarea> <br />

              <button type="submit" className="rep-sub-btn">Submit Issue</button>
            </form>

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerReportIssue;
