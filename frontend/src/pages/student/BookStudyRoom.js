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
      <h4 className="book-study-room-title">Book Study Room</h4>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="book-study-room-form">
        <div className="form-group">
          <label htmlFor="roomType">
            <i className="fas fa-door-closed form-icon"></i> Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            <option value="small">Small Room (10-20 people)</option>
            <option value="medium">Medium Room (20-40 people)</option>
            <option value="large">Large Room (40+ people)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">
            <i className="fas fa-calendar-alt form-icon"></i> Preferred Date
          </label>
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
          <label htmlFor="time">
            <i className="fas fa-clock form-icon"></i> Preferred Time
          </label>
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
          <label htmlFor="duration">
            <i className="fas fa-hourglass form-icon"></i> Duration (hours)
          </label>
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
          <label htmlFor="details">
            <i className="fas fa-pencil-alt form-icon"></i> Additional Details
          </label>
          <textarea
            id="details"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter any additional requests or details"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          <i className="fas fa-bookmark"></i> Book Study Room
        </button>
      </form>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>
              Are you sure you want to book a {roomType} for {duration} hour(s) on {date} at {time}?
            </p>
            <button onClick={() => handleConfirmation(true)} className="confirm-button">
              <i className="fas fa-check"></i> Yes
            </button>
            <button onClick={() => handleConfirmation(false)} className="cancel-button">
              <i className="fas fa-times"></i> No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStudyRoom;
