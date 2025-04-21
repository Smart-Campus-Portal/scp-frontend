import React, { useState } from 'react';
import '../../styles/ReportIssue.css'; // Import the CSS for styling

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueCategory: '',
    description: '',
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
    console.log('Reported Issue:', formData);
    // Handle form submission (e.g., make API call)
  };

  return (
    <div className="report-issue-container">
      <h1 className="report-title">Report an Issue</h1>
      <p className="report-description">
        If you're experiencing any issues related to a lecture, lecturer, or facilities, please submit them below.
      </p>
      
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issueCategory" className="form-label">Issue Category</label>
          <select
            id="issueCategory"
            name="issueCategory"
            value={formData.issueCategory}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a category</option>
            <option value="lecturer">Lecturer</option>
            <option value="lecture-room">Lecture Room</option>
            <option value="course-material">Course Material</option>
            <option value="app-functionality">App Functionality</option>
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
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportIssue;
