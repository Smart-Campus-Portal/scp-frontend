import React, { useState } from 'react';
import '../../styles/student/BookStudyRoom.css'; // Ensure the CSS path is correct
import axios from 'axios';  // Import axios
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS

const BookStudyRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentId] = useState(1); // Assuming a student ID is available, this can be dynamic depending on user login
  
  // Replace with actual room ID that is selected or available
  const roomId = roomType === 'small' ? 1 : roomType === 'medium' ? 2 : 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation popup
  };

  const handleConfirmation = async (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      const startTime = `${date}T${time}:00`; // Combine date and time
      const endTime = new Date(new Date(startTime).getTime() + duration * 60 * 60 * 1000).toISOString(); // Calculate end time based on duration

      // Prepare the request data
      const bookingRequest = {
        studentId,
        roomId,
        startTime, // Start time in ISO 8601 format
        endTime, // End time in ISO 8601 format
      };

      try {
        // Make the POST request to the backend API
        const response = await axios.post('http://localhost:8267/api/student/book-study-room', bookingRequest, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add authorization header if needed
          },
        });

        // Handle successful booking
        toast.success(`✅ Study room booked successfully for ${startTime} to ${endTime}!`, {
          position: 'top-center',
          autoClose: 3000,
        });

        // Optionally reset the form fields after successful booking
        setRoomType('');
        setDate('');
        setTime('');
        setDuration('');
        setDetails('');
      }catch (error) {
  console.error(error); // Always log full error for dev
  const message =
    error.response && error.response.data
      ? error.response.data.message || 'Unknown error'
      : 'Server is unreachable';

  toast.error(`❌ ${message}`, {
    position: 'top-center',
    autoClose: 3000,
  });
}

    }
  };

  return (
    <div className="book-study-room-container">
      <h4 className="book-study-room-title">📖 Book Study Room</h4>

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
              Are you sure you want to book a <strong>{roomType}</strong> for <strong>{duration}</strong> hour(s) on <strong>{date}</strong> at <strong>{time}</strong>?
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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default BookStudyRoom;
