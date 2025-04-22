import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/student/ReportIssue.css'; // Your existing styles

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueCategory: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.issueCategory || !formData.priority || !formData.description) {
      toast.error('⚠️ Please fill out all fields.', { position: 'top-center' });
      return;
    }

    // Simulate sending to backend
    console.log('📩 Submitted Report:', formData);

    // Success toast
    toast.success(
      `✅ ${formData.issueCategory} issue (Priority: ${formData.priority}) reported successfully!`,
      { position: 'top-center', autoClose: 3000 }
    );

    // Reset form
    setFormData({
      issueCategory: '',
      priority: '',
      description: '',
    });
  };

  return (
    <div className="report-issue-container">
      <h1 className="report-title">Report an Issue</h1>
      <p className="report-description">
        If you're experiencing any issues related to lectures, lecturers, or facilities, please submit them below.
      </p>

      <ToastContainer />

      <form className="report-form" onSubmit={handleSubmit}>
        {/* Issue Category */}
        <div className="form-group">
          <label htmlFor="issueCategory" className="form-label">Issue Category</label>
          <select
            id="issueCategory"
            name="issueCategory"
            value={formData.issueCategory}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select a category</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Lecture Room">Lecture Room</option>
            <option value="Course Material">Course Material</option>
            <option value="App Functionality">App Functionality</option>
          </select>
        </div>

        {/* Priority */}
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
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Description */}
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

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportIssue;
