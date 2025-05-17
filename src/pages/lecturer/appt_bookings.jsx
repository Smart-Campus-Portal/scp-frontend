import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/navbar';
import '../../scss/Lecturer/viewappts.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentBookings = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token || !userId) {
        console.error('Missing token or userId');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/appointment/view-bookings?userId=${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.statusText}`);
        }

        const data = await response.json();

        const mappedAppointments = data.map(app => ({
          id: app.id,
          studentName: app.studentName || 'Unknown',
          studentEmail: app.studentEmail || 'N/A',
          date: app.date,
          time: app.time,
          module: app.moduleName || app.module || 'N/A',
          topic: app.description || 'N/A',
          accepted: app.accepted, // true, false or null
        }));

        setAppointments(mappedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [token, userId]);

  const handleResponse = async (id, accepted) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointment/update-status/${id}?accepted=${accepted}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      setAppointments(prev =>
        prev.map(app => (app.id === id ? { ...app, accepted } : app))
      );

      toast.success(`Appointment marked as ${accepted ? 'Accepted' : 'Declined'}`);
    } catch (error) {
      toast.error('Error updating appointment status');
      console.error('Error updating appointment status:', error);
    }
  };

  const getStatusLabel = (accepted) => {
    if (accepted === true) return 'Accepted';
    if (accepted === false) return 'Declined';
    return 'Pending';
  };

  const getStatusColor = (accepted) => {
    if (accepted === true) return 'green';
    if (accepted === false) return 'red';
    return 'orange';
  };

  return (
    <div className='appts-layout'>
      <Navbar />
      <ToastContainer position='top-right' />

      <div className='appts-side'>
        <div className='appts-content'>
          <div className='appts-view'>
           <br></br> <h2 className='appts-head'>STUDENT APPOINTMENT BOOKINGS</h2>

            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              appointments.map(app => (
                <div
                  key={app.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <p className='appts-label'><strong>Student Name:</strong> {app.studentName}</p>
                  <p className='appts-label'><strong>Student Email:</strong> {app.studentEmail}</p>
                  <p className='appts-label'><strong>Date:</strong> {app.date}</p>
                  <p className='appts-label'><strong>Time:</strong> {app.time}</p>
                  <p className='appts-label'><strong>Module:</strong> {app.module}</p>
                  <p className='appts-label'><strong>Topic:</strong> {app.topic}</p>
                  <p className='appts-label'>
                    <strong>Status:</strong>{' '}
                    <span style={{ fontWeight: 'bold', color: getStatusColor(app.accepted) }}>
                      {getStatusLabel(app.accepted)}
                    </span>
                  </p>

                  <div style={{ marginTop: '0.5rem' }}>
                    <label htmlFor={`status-select-${app.id}`} style={{ marginRight: '0.5rem' }}>
                      <strong>Update Status:</strong>
                    </label>
                    <select
                      id={`status-select-${app.id}`}
                      value={app.accepted === null ? '' : app.accepted ? 'Accepted' : 'Declined'}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        if (newStatus === 'Accepted') {
                          handleResponse(app.id, true);
                        } else if (newStatus === 'Declined') {
                          handleResponse(app.id, false);
                        }
                      }}
                    >
                      <option value="">-- Select --</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookings;
