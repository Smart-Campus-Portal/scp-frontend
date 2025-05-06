import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';

import apptData from '../../apptData';
import '../../scss/Lecturer/viewappts.css';

const AppointmentBookings= () => {

const [appointments, setAppointments] = useState(apptData);

  const handleResponse = (id, action) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: action } : app
      )
    );
  };

  return (
    <div className='appts-layout'>
            <Navbar/>

            <div className='appts-side'>
             

                <div className='appts-content'>
                            
                        <div className='appts-view'>
                            <h2 className='appts-head'>STUDENT APPOINTMENT BOOKINGS</h2>

                            {appointments.map(app => (
                        <div key={app.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <p className='appts-label'><strong>Student:</strong> {app.student}</p>
                            <p className='appts-label'><strong>Date:</strong> {app.date}</p>
                            <p className='appts-label'><strong>Time:</strong> {app.time}</p>
                            <p className='appts-label'><strong>Module:</strong> {app.module}</p>
                            <p className='appts-label'><strong>Topic:</strong> {app.topic}</p>
                            <p className='appts-label'><strong>Status:</strong> <span style={{ fontWeight: 'bold', color: app.status === 'Accepted' ? 'green' : app.status === 'Declined' ? 'red' : 'orange' }}>{app.status}</span></p>

                        {app.status === 'Pending' && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => handleResponse(app.id, 'Accepted')} className='appt-accept-btn'>
                                Accept
                            </button>
                            <button onClick={() => handleResponse(app.id, 'Declined')} className='appt-decline-btn'>
                                Decline
                            </button>
                            </div>
                            )}
                        </div>
                        ))}
                        </div>
                </div>
            </div>
    </div>
  );
};
export default AppointmentBookings