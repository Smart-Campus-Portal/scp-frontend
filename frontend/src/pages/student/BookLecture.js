import React, { useState } from 'react';
import { FaEnvelope, FaCalendarAlt, FaClock, FaInfoCircle, FaBookOpen } from 'react-icons/fa';
import '../../styles/student/BookLecture.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Important to import toastify styles

const BookLecture = () => {
  const [course, setCourse] = useState('');
  const [module, setModule] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const namePart = lecturerEmail.split('@')[0];
    const formattedName = namePart
      .split('.')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ');

    // Log appointment info
    console.log('📚 Lecture Appointment Booked:', {
      course,
      module,
      lecturerName: formattedName,
      lecturerEmail,
      date,
      time,
      details,
    });

    // Show toast notification
    toast.success(
      `✅ Your appointment request has been sent to ${formattedName}!`,
      {
        position: 'top-center',
        autoClose: 3000,
      }
    );

    // Reset form fields
    setCourse('');
    setModule('');
    setLecturerEmail('');
    setDate('');
    setTime('');
    setDetails('');
  };

  return (
    <div className="book-lecture-wrapper">
      <div className="book-lecture-container">
        <h1 className="book-lecture-title">📚 Book Lecture Appointment</h1>

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

        {/* Toast popup */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default BookLecture;
