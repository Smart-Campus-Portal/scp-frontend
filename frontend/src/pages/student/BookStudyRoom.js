import React, { useEffect, useState } from 'react';
import '../../styles/student/ViewAvailableRooms.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAvailableRooms = () => {
  const token = localStorage.getItem('token');
  const now = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(now.getMonth() + 3);

  const [startTime, setStartTime] = useState(now.toISOString().slice(0, 16));
  const [endTime, setEndTime] = useState(threeMonthsLater.toISOString().slice(0, 16));
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Format to 'YYYY-MM-DDTHH:mm:ss'
  const formatDateTimeLocal = (datetimeStr) => {
    if (!datetimeStr) return '';
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const fetchRooms = async (customStartTime, customEndTime) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const start = formatDateTimeLocal(customStartTime);
      const end = formatDateTimeLocal(customEndTime);

      if (!token) {
        setError('Authentication token missing.');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:8267/api/student/available-study-rooms', {
        params: { startTime: start, endTime: end },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(response.data.data || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError('Access denied. Please check your role or login status.');
      } else {
        setError('Failed to fetch rooms. Please try again.');
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRooms(startTime, endTime);
  }, []);

  const handleSearch = () => {
    if (!startTime || !endTime) {
      setError('Please select both start and end time to filter.');
      toast.error('❌ Please select both start and end time to filter.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    fetchRooms(startTime, endTime);
  };

  const handleBookRoom = async (roomId) => {
    setError('');
    setSuccessMessage('');

    if (!startTime || !endTime) {
      toast.error('❌ Please select both start and end time before booking.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    const bookingRequest = {
      studentId: 4, // Update this as needed
      roomId: roomId,
      startTime: formatDateTimeLocal(startTime),
      endTime: formatDateTimeLocal(endTime),
    };

    try {
      const response = await axios.post(
        'http://localhost:8267/api/student/book-study-room',
        bookingRequest,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Room booked successfully!');
        toast.success(`✅ Study room booked successfully from ${startTime} to ${endTime}`, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error('❌ Failed to book the room. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        toast.error('❌ Access denied. Please check your role or login status.', {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error('❌ Failed to book the room. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="available-rooms-container">
      <ToastContainer />
      <h3 className="title">🏫 Available Study Rooms</h3>

      <div className="time-inputs">
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading rooms...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : successMessage ? (
        <p className="success">{successMessage}</p>
      ) : rooms.length > 0 ? (
        <div className="room-list">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <h4 className="room-name">{room.name}</h4>
              <p className="room-description">{room.description}</p>
              <p className="room-location"><strong>📍 Location:</strong> {room.location}</p>
              <p className="room-capacity"><strong>👥 Capacity:</strong> {room.capacity} students</p>
              <button
                onClick={() => handleBookRoom(room.id)}
                className="book-room-button"
              >
                📘 Book this Study Room
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-rooms">No rooms found in this time range.</p>
      )}
    </div>
  );
};

export default ViewAvailableRooms;
