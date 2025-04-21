import React from 'react';
import '../../styles/student/LectureSchedule.css';

const lectures = [
  {
    course: 'Introduction to Computer Science',
    date: '2025-04-25',
    time: '10:00 AM - 12:00 PM',
    location: 'Room 101, Block A',
  },
  {
    course: 'Mathematics I',
    date: '2025-04-26',
    time: '9:00 AM - 11:00 AM',
    location: 'Room 203, Block B',
  },
  {
    course: 'Physics II',
    date: '2025-04-27',
    time: '1:00 PM - 3:00 PM',
    location: 'Room 304, Block C',
  },
  {
    course: 'Data Structures',
    date: '2025-04-28',
    time: '2:00 PM - 4:00 PM',
    location: 'Room 305, Block D',
  },
];

const LectureSchedule = () => {
  return (
    <div className="lecture-schedule-container">
      <h1 className="title">Lecture Schedule</h1>
      <p className="subheading">Here is your upcoming lecture schedule.</p>

      <div className="table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture, index) => (
              <tr key={index}>
                <td>{lecture.course}</td>
                <td>{lecture.date}</td>
                <td>{lecture.time}</td>
                <td>{lecture.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LectureSchedule;
