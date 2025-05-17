import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaBookOpen,
} from 'react-icons/fa';
import '../../styles/student/BookLecture.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookLecture = () => {
  const [course, setCourse] = useState('');
  const [module, setModule] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [lecturers, setLecturers] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');

  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/appointment/get-all-lecturers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLecturers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lecturers:', error);
        toast.error('❌ Failed to load lecturers. Please try again.');
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedLecturer = lecturers.find(
      (l) => l.id === parseInt(lecturerId)
    );

    if (!selectedLecturer) {
      toast.error('Please select a valid lecturer.');
      return;
    }

    // Convert time to HH:mm:ss format
    const formattedTime = time ? `${time}:00` : '';

    const appointmentData = {
      studentId: parseInt(studentId),
      lecturerId: parseInt(lecturerId),
      date,
      time: formattedTime, // Correct format for java.sql.Time
      location: 'Building A, Room 205',
      description: details,
      courseName: course,
      moduleName: module,
    };
console.log(token)
console.log(appointmentData)
    axios
      .post('http://localhost:8080/api/appointment/book', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      })
      .then(() => {
        toast.success(
          `✅ Your appointment request has been sent to ${selectedLecturer.name}!`
        );
        // Reset form
        setCourse('');
        setModule('');
        setLecturerId('');
        setDate('');
        setTime('');
        setDetails('');
      })
      .catch((error) => {
        console.error('Error booking appointment:', error);
        toast.error('❌ Failed to book appointment. Please try again.');
      });
  };

  return (
    <div className="book-lecture-wrapper">
      <div className="book-lecture-container">
        <h1 className="book-lecture-title">📚 Book Lecture Appointment</h1>


        <form onSubmit={handleSubmit} className="book-lecture-form" noValidate>
        <Link to="/studentDashboard/bookings" className="view-bookings-button">
  📅 View My Bookings
</Link>
          <div className="form-group">
            <label htmlFor="course">
              <FaBookOpen className="form-icon" /> Course Name
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="module">
              <FaInfoCircle className="form-icon" /> Module Name
            </label>
            <input
              type="text"
              id="module"
              value={module}
              onChange={(e) => setModule(e.target.value)}
              placeholder="Enter module name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lecturerId">
              <FaEnvelope className="form-icon" /> Select Lecturer
            </label>
            <select
              id="lecturerId"
              value={lecturerId}
              onChange={(e) => setLecturerId(e.target.value)}
              required
            >
              <option value="">-- Select Lecturer --</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name} ({lecturer.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">
              <FaCalendarAlt className="form-icon" /> Preferred Date
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
              <FaClock className="form-icon" /> Preferred Time
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
            <label htmlFor="details">
              <FaInfoCircle className="form-icon" /> Additional Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter any additional details or requests"
              rows={5}
            />
          </div>

          <button type="submit" className="submit-button">
            Book Appointment
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default BookLecture;
