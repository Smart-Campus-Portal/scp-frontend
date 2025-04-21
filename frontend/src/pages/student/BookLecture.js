import React, { useState } from 'react';
import '../../styles/BookLecture.css'; // Ensure the CSS path is correct

const BookLecture = () => {
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, display a success message
    setSuccessMessage('Your lecture appointment has been booked successfully!');
  };

  return (
    <div className="book-lecture-container">
      <h1 className="book-lecture-title">Book Lecture Appointment</h1>
      
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="book-lecture-form">
        <div className="form-group">
          <label htmlFor="course">Course Name</label>
          <input
            type="text"
            id="course"
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Preferred Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">Additional Details</label>
          <textarea
            id="details"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter any additional details or requests"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookLecture;
