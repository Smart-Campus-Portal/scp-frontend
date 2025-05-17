import React, { useEffect, useState } from 'react';
import '../../styles/student/MyBookings.css';

const MyBookings = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId || !token) return;

      try {
        const response = await fetch(`http://localhost:8080/api/appointment/view-bookings?userId=${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAppointments();
  }, [token, userId]);

  return (
    <div className="booking-container">
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Course</th>
              <th>Module</th>
              <th>Description</th>
              <th>Accepted</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.location}</td>
                <td>{appointment.courseName}</td>
                <td>{appointment.moduleName}</td>
                <td>{appointment.description}</td>
                <td>{appointment.accepted ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
