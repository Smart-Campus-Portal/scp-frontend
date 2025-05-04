import React, { useState } from 'react';
import '../../styles/student/BookStudyRoom.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookStudyRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentId] = useState(2); // ✅ Use correct student ID

  const roomId = roomType === 'small' ? 1 : roomType === 'medium' ? 2 : 3;

  const pad = (n) => String(n).padStart(2, '0');

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      const start = new Date(`${date}T${time}`);
      const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

      const startTime = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}T${pad(start.getHours())}:${pad(start.getMinutes())}:${pad(start.getSeconds())}`;
      const endTime = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}:${pad(end.getSeconds())}`;

      const bookingRequest = {
        studentId,
        roomId,
        startTime,
        endTime,
      };

      try {
        const response = await axios.post(
          'http://localhost:8267/api/student/book-study-room',
          bookingRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCb2lrYW55b0BnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVFVERU5UIn1dLCJpYXQiOjE3NDYzMzUwNDAsImV4cCI6MTc0NjQyMTQ0MH0.0a7-pSP6bPl6Xu4jUbbgz30KMW3GfT64haPAf72JeBc`,
            },
          }
        );

        toast.success(`✅ Study room booked successfully from ${startTime} to ${endTime}`, {
          position: 'top-center',
          autoClose: 3000,
        });

        setRoomType('');
        setDate('');
        setTime('');
        setDuration('');
        setDetails('');
      } catch (error) {
        console.error(error);
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
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            <option value="small">Small Room (10–20 people)</option>
            <option value="medium">Medium Room (20–40 people)</option>
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
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter any additional requests or details"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          <i className="fas fa-bookmark"></i> Book Study Room
        </button>
      </form>

      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>
              Are you sure you want to book a <strong>{roomType}</strong> room for <strong>{duration}</strong> hour(s) on <strong>{date}</strong> at <strong>{time}</strong>?
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

      <ToastContainer />
    </div>
  );
};

export default BookStudyRoom;
