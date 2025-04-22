import React, { useState } from 'react';
import '../../styles/student/BookStudyRoom.css'; // Ensure the CSS path is correct

const BookStudyRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // For confirmation popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation popup
  };

  const handleConfirmation = (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      setSuccessMessage('Your study room has been successfully booked!');
      setRoomType('');
      setDate('');
      setTime('');
      setDuration('');
      setDetails('');
    }
  };

  return (
    <div className="book-study-room-container">
      <h1 className="book-study-room-title">Book a Study Room</h1>
      
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="book-study-room-form">
        <div className="form-group">
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            <option value="small">Small Room (2-4 people)</option>
            <option value="medium">Medium Room (5-8 people)</option>
            <option value="large">Large Room (9+ people)</option>
          </select>
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
          <label htmlFor="duration">Duration (hours)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            max="4"
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
            placeholder="Enter any additional requests or details"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Book Study Room</button>
      </form>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>
              Are you sure you want to book a {roomType} for {duration} hour(s) on {date} at {time}?
            </p>
            <button onClick={() => handleConfirmation(true)} className="confirm-button">
              Yes
            </button>
            <button onClick={() => handleConfirmation(false)} className="cancel-button">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStudyRoom;
