import React, { useEffect, useState } from 'react';
import '../../styles/student/DashboardHome.css';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaTools,
  FaClock,
  FaFilePdf,
  FaFileExcel
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const DashboardHome = () => {
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fullWeekSchedule = [
      { time: '08:00 - 09:00', monday: 'CFA115D', tuesday: 'WEB115D', wednesday: 'PPA115D', thursday: 'COH115D', friday: 'DTD316D', saturday: 'MAT115D' },
      { time: '09:00 - 10:00', monday: 'PPA115D', tuesday: 'CFA115D', wednesday: 'WEB115D', thursday: 'DTD316D', friday: 'COH115D', saturday: 'PHY115D' },
      { time: '10:00 - 11:00', monday: '', tuesday: 'PPA115D', wednesday: 'CFA115D', thursday: '', friday: 'WEB115D', saturday: '' },
      { time: '11:00 - 12:00', monday: 'WEB115D', tuesday: '', wednesday: '', thursday: 'CFA115D', friday: 'PPA115D', saturday: '' },
      { time: '12:00 - 13:00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' },
    ];

    const todayIndex = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    if (todayIndex > 0 && todayIndex < 7) { // Monday to Saturday
      const today = weekdays[todayIndex];
      const filtered = fullWeekSchedule
        .map(entry => ({ time: entry.time, subject: entry[today] }))
        .filter(item => item.subject);
      setTodaySchedule(filtered);
    } else {
      setTodaySchedule([]);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`http://localhost:8080/api/maintenance/issues/count/not-resolved`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPendingCount(data.count ?? 0))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) return;

    fetch(`http://localhost:8080/api/student/bookings/count?studentId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setBookingCount(data.bookingCount ?? 0))
      .catch(console.error);
  }, []);

  const handleDownloadPDF = () => {
    const tableWrapper = document.querySelector('.timetable-today-table');
    html2canvas(tableWrapper, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 20, pageWidth, imgHeight);
      pdf.save('todays_timetable.pdf');
    });
  };

  const handleDownloadExcel = () => {
    const worksheetData = [['Time', 'Subject']];
    todaySchedule.forEach(item => worksheetData.push([item.time, item.subject]));
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Today');
    XLSX.writeFile(workbook, 'todays_timetable.xlsx');
  };

  return (
    <div className="dashboard-home">
      <div className="welcome-message">
        <h2>Welcome back, {localStorage.getItem('userName') || 'Student'}!</h2>
        <p>Here's your overview for today.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <FaBookOpen />
          <div>
            <h4>Room Bookings</h4>
            <p>{bookingCount} BOOKED</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCalendarAlt />
          <div>
            <h4>Classes Today</h4>
            <p>{todaySchedule.length} Scheduled</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTools />
          <div>
            <h4>Maintenance</h4>
            <p>{pendingCount} Pending</p>
          </div>
        </div>
      </div>

      <div className="timetable-today-section">
        <div className="timetable-header">
          <h3><FaClock /> Today's Timetable</h3>
        </div>

        {todaySchedule.length > 0 ? (
          <>
            <div className="timetable-buttons">
              <button onClick={handleDownloadPDF}><FaFilePdf /> Download PDF</button>
              <button onClick={handleDownloadExcel}><FaFileExcel /> Download Excel</button>
            </div>

            <table className="timetable-today-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {todaySchedule.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.time}</td>
                    <td>{entry.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="no-classes-msg">No classes scheduled for today.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
