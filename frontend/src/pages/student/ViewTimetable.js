import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { timetableData } from '../../dummyData/timetableData'; // ✅ correct import
import '../../styles/student/ViewTimetable.css';

const ViewTimetable = () => {
  const handleDownloadPDF = () => {
    const tableWrapper = document.querySelector('.timetable-wrapper');

    html2canvas(tableWrapper, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', 0, y, imgWidth, imgHeight);
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
    </div>
  );
};

export default ViewTimetable;
