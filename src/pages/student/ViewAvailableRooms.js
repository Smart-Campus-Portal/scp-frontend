import React, { useEffect, useState } from 'react';
import '../../styles/student/ViewAvailableRooms.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('userId'); // Assumes userId is stored after login

  // Format datetime-local string to 'YYYY-MM-DDTHH:mm:ss'
  const formatDateTimeLocal = (datetimeStr) => {
    if (!datetimeStr) return '';
    return datetimeStr.length === 16 ? `${datetimeStr}:00` : datetimeStr;
  };

  const fetchRooms = async (customStartTime = '', customEndTime = '') => {
    setLoading(true);
    try {
      let start, end;

      if (customStartTime && customEndTime) {
        start = formatDateTimeLocal(customStartTime);
        end = formatDateTimeLocal(customEndTime);
      } else {
        const now = new Date().toISOString().slice(0, 19);
        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
        const future = threeMonthsLater.toISOString().slice(0, 19);

        start = now;
        end = future;
      }

      if (!token) {
        toast.error('Authentication token missing.');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:8080/api/student/available-study-rooms', {
        params: { startTime: start, endTime: end },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setRooms(response.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch rooms. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms(); // Initial load
  }, []);

  const handleSearch = () => {
    if (!startTime || !endTime) {
      toast.error('Please select both start and end time to filter.');
      return;
    }
    fetchRooms(startTime, endTime);
  };

  const handleBookRoom = async (roomId) => {
    if (!startTime || !endTime) {
      toast.error('Please select both start and end time before booking.');
      return;
    }

    if (!studentId) {
      toast.error('Student ID not found. Please login again.');
      return;
    }

    const bookingRequest = {
      studentId: Number(studentId),
      roomId: roomId,
      startTime: formatDateTimeLocal(startTime),
      endTime: formatDateTimeLocal(endTime),
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/student/book-study-room',
        bookingRequest,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`✅ Study room booked successfully from ${bookingRequest.startTime} to ${bookingRequest.endTime}`);
      } else {
        toast.error('Failed to book the room. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to book the room. Please try again.');
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
      ) : rooms.length > 0 ? (
        <div className="room-list">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <h4 className="room-name">{room.name}</h4>
              <p className="room-description">{room.description}</p>
              <p className="room-location"><strong>📍 Location:</strong> {room.location}</p>
              <p className="room-capacity"><strong>👥 Capacity:</strong> {room.capacity}</p>
              <button onClick={() => handleBookRoom(room.id)} className="book-room-button">
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
