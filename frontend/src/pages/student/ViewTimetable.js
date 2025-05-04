import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import '../../styles/student/ViewTimetable.css';

const ViewTimetable = () => {
  const [timetableData, setTimetableData] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch('http://localhost:8267/api/student/view-timetable', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCb2lrYW55b0BnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVFVERU5UIn1dLCJpYXQiOjE3NDYzMzUwNDAsImV4cCI6MTc0NjQyMTQ0MH0.0a7-pSP6bPl6Xu4jUbbgz30KMW3GfT64haPAf72JeBc',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch timetable');

        const data = await response.json();
        setTimetableData(data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
  }, []);

  const handleDownloadPDF = () => {
    const tableWrapper = document.querySelector('.timetable-wrapper');
    html2canvas(tableWrapper, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      const y = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', 0, y, pageWidth, imgHeight);
      pdf.save('student_timetable.pdf');
    });
  };

  const handleDownloadExcel = () => {
    const table = document.querySelector('.timetable-full-table');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Timetable' });
    XLSX.writeFile(wb, 'student_timetable.xlsx');
  };

  return (
    <div className="timetable-container">
      <h2 className="timetable-title">University Student Timetable</h2>
      <p className="timetable-description">
        Below is your class timetable for the current semester. You can see your courses, corresponding times, locations, and professors.
      </p>

      <div className="download-buttons">
        <button onClick={handleDownloadPDF} className="download-button">Download as PDF</button>
        <button onClick={handleDownloadExcel} className="download-button">Download as Excel</button>
      </div>

      {timetableData ? (
        <div className="timetable-wrapper pdf-friendly">
          <table className="timetable-full-table">
            <thead>
              <tr>
                <th colSpan="6" style={{ textAlign: 'center', fontSize: '18px', padding: '10px 0' }}>
                  Course: {timetableData.courseInfo}
                </th>
              </tr>
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
              {timetableData.schedule.map((row, index) => (
                <tr key={index}>
                  <td>{row.time}</td>
                  <td>{row.monday}</td>
                  <td>{row.tuesday}</td>
                  <td>{row.wednesday}</td>
                  <td>{row.thursday}</td>
                  <td>{row.friday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Time table is not available</p>
      )}
    </div>
  );
};

export default ViewTimetable;
