import React, { useState } from 'react';
import '../../styles/student/ViewRooms.css';
import { bookedRoomsData } from '../../dummyData/bookedRoomsData'; // ✅ Import dummy data

const ViewRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = bookedRoomsData.filter((room) =>
    room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-rooms-container">
      <h1 className="view-rooms-title">Your Booked Study Rooms</h1>

      <input
        type="text"
        placeholder="Search by room type..."
        className="room-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRooms.length > 0 ? (
        <ul className="room-list">
          {filteredRooms.map((room) => (
            <li key={room.id} className="room-card">
              <h3>{room.roomType}</h3>
              <p><strong>Date:</strong> {room.date}</p>
              <p><strong>Time:</strong> {room.time}</p>
              <p><strong>Duration:</strong> {room.duration}</p>
              <p><strong>Details:</strong> {room.details}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-rooms-message">No rooms match your search.</p>
      )}
    </div>
  );
};

export default ViewRooms;
