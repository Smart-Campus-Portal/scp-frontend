import React from 'react';
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import '../../styles/student/ViewTimetable.css'; // Make sure the updated CSS is saved here

const ViewTimetable = () => {

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const timetableElement = document.querySelector(".timetable-container");

    doc.html(timetableElement, {
      callback: function (doc) {
        doc.save("student_timetable.pdf");
      },
      margin: [20, 20, 20, 20],
      autoPaging: true,
    });
  };

  const handleDownloadExcel = () => {
    const timetableData = [
      ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      ["8:00 AM - 9:30 AM", "Computer Science 101 (Room 101)", "Mathematics 102 (Room 204)", "Biology 103 (Room 305)", "Chemistry 104 (Room 406)", "English Literature 105 (Room 507)"],
      ["9:45 AM - 11:15 AM", "Physics 201 (Room 202)", "Computer Science 202 (Room 103)", "Mathematics 203 (Room 204)", "Biology 204 (Room 305)", "Chemistry 205 (Room 406)"],
      ["11:30 AM - 1:00 PM", "History 101 (Room 101)", "Philosophy 102 (Room 203)", "Physics 103 (Room 202)", "English Literature 104 (Room 507)", "Computer Science 105 (Room 103)"],
      ["1:30 PM - 3:00 PM", "Mathematics 201 (Room 204)", "History 102 (Room 101)", "Philosophy 103 (Room 203)", "Chemistry 204 (Room 406)", "Biology 205 (Room 305)"],
      ["3:15 PM - 4:45 PM", "Political Science 101 (Room 309)", "Mathematics 202 (Room 204)", "History 103 (Room 101)", "Physics 104 (Room 202)", "English Literature 105 (Room 507)"]
    ];

    const ws = XLSX.utils.aoa_to_sheet(timetableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Timetable");

    XLSX.writeFile(wb, "student_timetable.xlsx");
  };

  return (
    <div className="timetable-container">
      <h2 className="timetable-title">University Student Timetable</h2>
      <p className="timetable-description">
        Below is your class timetable for the current semester. You can see your courses and the corresponding times, locations, and professors.
      </p>

      {/* Buttons for downloading PDF and Excel */}
      <div className="download-buttons">
        <button onClick={handleDownloadPDF} className="download-button">Download as PDF</button>
        <button onClick={handleDownloadExcel} className="download-button">Download as Excel</button>
      </div>

      {/* Scrollable table wrapper */}
      <div className="timetable-scroll-wrapper">
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8:00 AM - 9:30 AM</td>
              <td>Computer Science 101 (Room 101)</td>
              <td>Mathematics 102 (Room 204)</td>
              <td>Biology 103 (Room 305)</td>
              <td>Chemistry 104 (Room 406)</td>
              <td>English Literature 105 (Room 507)</td>
            </tr>
            <tr>
              <td>9:45 AM - 11:15 AM</td>
              <td>Physics 201 (Room 202)</td>
              <td>Computer Science 202 (Room 103)</td>
              <td>Mathematics 203 (Room 204)</td>
              <td>Biology 204 (Room 305)</td>
              <td>Chemistry 205 (Room 406)</td>
            </tr>
            <tr>
              <td>11:30 AM - 1:00 PM</td>
              <td>History 101 (Room 101)</td>
              <td>Philosophy 102 (Room 203)</td>
              <td>Physics 103 (Room 202)</td>
              <td>English Literature 104 (Room 507)</td>
              <td>Computer Science 105 (Room 103)</td>
            </tr>
            <tr>
              <td>1:30 PM - 3:00 PM</td>
              <td>Mathematics 201 (Room 204)</td>
              <td>History 102 (Room 101)</td>
              <td>Philosophy 103 (Room 203)</td>
              <td>Chemistry 204 (Room 406)</td>
              <td>Biology 205 (Room 305)</td>
            </tr>
            <tr>
              <td>3:15 PM - 4:45 PM</td>
              <td>Political Science 101 (Room 309)</td>
              <td>Mathematics 202 (Room 204)</td>
              <td>History 103 (Room 101)</td>
              <td>Physics 104 (Room 202)</td>
              <td>English Literature 105 (Room 507)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTimetable;
