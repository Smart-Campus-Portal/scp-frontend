import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/student/ViewAvailableRooms.css';
import axios from 'axios';

const ViewAvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCb2lrYW55b0BnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVFVERU5UIn1dLCJpYXQiOjE3NDYzMzUwNDAsImV4cCI6MTc0NjQyMTQ0MH0.0a7-pSP6bPl6Xu4jUbbgz30KMW3GfT64haPAf72JeBc';

  const formatDateTime = (datetime) => {
    return datetime ? `${datetime}:00` : '';
  };

  const fetchAvailableRooms = async () => {
    setLoading(true);
    setError('');

    const formattedStartTime = formatDateTime(startTime);
    const formattedEndTime = formatDateTime(endTime);

    if (!formattedStartTime || !formattedEndTime) {
      setError('Please select both start and end time.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8267/api/student/available-study-rooms',
        {
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(response.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch rooms. Please check time format or server status.');
    }

    setLoading(false);
  };

  return (
    <div className="available-rooms-container">
      <h3 className="title">🏫 Available Study Rooms</h3>

      <div className="time-inputs">
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button onClick={fetchAvailableRooms}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading rooms...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : rooms.length > 0 ? (
        <div className="room-list">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <h4 className="room-name">{room.name}</h4>
              <p className="room-description">{room.description}</p>
              <p className="room-location"><strong>📍 Location:</strong> {room.location}</p>
              <p className="room-capacity"><strong>👥 Capacity:</strong> {room.capacity} students</p>
           

               <Link to="/studentDashboard/book-study-room" className="book-room-button">
              📘 Book this Study Room
              </Link>

            </div>
          ))}
        </div>
      ) : (
        <p className="no-rooms">No rooms available for the selected time.</p>
      )}
    </div>
  );
};

export default ViewAvailableRooms;
