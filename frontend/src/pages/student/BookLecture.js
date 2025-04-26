import React, { useState } from 'react';
import { FaEnvelope, FaCalendarAlt, FaClock, FaInfoCircle, FaBookOpen } from 'react-icons/fa';
import '../../styles/student/BookLecture.css';

const BookLecture = () => {
  const [course, setCourse] = useState('');
  const [module, setModule] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const namePart = lecturerEmail.split('@')[0];
    const formattedName = namePart
      .split('.')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ');

    setSuccessMessage(
      `🎉 Your lecture appointment has been successfully sent to ${formattedName} (${lecturerEmail}).`
    );

    setCourse('');
    setModule('');
    setLecturerEmail('');
    setDate('');
    setTime('');
    setDetails('');

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="book-lecture-wrapper">
      <div className="book-lecture-container">
        <h1 className="book-lecture-title">📚 Book Lecture Appointment</h1>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="book-lecture-form">
          <div className="form-group">
            <label htmlFor="course">
              <FaBookOpen className="form-icon" /> Course Name
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="module">
              <FaInfoCircle className="form-icon" /> Module Name
            </label>
            <input
              type="text"
              id="module"
              value={module}
              onChange={(e) => setModule(e.target.value)}
              placeholder="Enter module name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lecturerEmail">
              <FaEnvelope className="form-icon" /> Lecturer's Email
            </label>
            <input
              type="email"
              id="lecturerEmail"
              value={lecturerEmail}
              onChange={(e) => setLecturerEmail(e.target.value)}
              placeholder="Enter lecturer's email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">
              <FaCalendarAlt className="form-icon" /> Preferred Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">
              <FaClock className="form-icon" /> Preferred Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">
              <FaInfoCircle className="form-icon" /> Additional Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter any additional details or requests"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookLecture;
