import React from 'react';
import '../../styles/student/LectureSchedule.css';
import { lectureScheduleData } from '../../dummyData/lectureScheduleData'; // ✅ Import dummy data

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
            {lectureScheduleData.map((lecture, index) => (
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
