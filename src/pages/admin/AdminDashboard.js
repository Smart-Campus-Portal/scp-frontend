import React, { useEffect, useState } from 'react';
import '../../styles/admin/DashboardHome.css';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <- import this like this
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminDashboard = () => {
  const [overview, setOverview] = useState({
    usersByRole: {},
    studyRoomBookingsByStatus: {},
    maintenanceIssuesByStatus: {},
  });
  const [topBookedRooms, setTopBookedRooms] = useState([]);
  const [openIssues, setOpenIssues] = useState([]);

  const COLORS = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#8e44ad', '#1abc9c'];

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Overview Data
    fetch('http://localhost:8080/api/admin/dashboard/overview', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch((err) => console.error('Failed to fetch admin overview:', err));

    // Top Study Rooms
    fetch('http://localhost:8080/api/admin/dashboard/top-booked-study-rooms', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTopBookedRooms(data))
      .catch((err) => console.error('Failed to fetch top booked rooms:', err));

    // Open Issues
    fetch('http://localhost:8080/api/maintenance/dashboard/open-issues', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOpenIssues(data))
      .catch((err) => console.error('Failed to fetch open issues:', err));
  }, []);

  const transformData = (dataObj) =>
    Object.entries(dataObj).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    }));

  const renderLegend = (dataObj) => (
    <div className="legend-list">
      {transformData(dataObj).map((entry, index) => (
        <div key={index} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: entry.fill }}></span>
          <span className="legend-label">
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

  const renderPieChart = (title, dataObj, icon) => (
    <div className="chart-card">
      <div className="card-header">
        <div>{icon}</div>
        <h3>{title}</h3>
      </div>
      {Object.keys(dataObj).length > 0 ? (
        <div className="chart-with-legend">
          <ResponsiveContainer width="60%" height={250}>
            <PieChart>
              <Pie
                data={transformData(dataObj)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {transformData(dataObj).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {renderLegend(dataObj)}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );

  const renderTopBookedRoomsChart = () => (
    <div className="chart-card">
      <div className="card-header">
        <div>🏆</div>
        <h3>Top Booked Study Rooms</h3>
      </div>
      {topBookedRooms.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topBookedRooms} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="roomName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookingCount" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );

  const renderOpenIssues = () => (
    <div className="open-issues-card">
      <h3>🚨 Open Maintenance Issues</h3>
      {openIssues.length > 0 ? (
        <ul className="open-issues-list">
          {openIssues.map((issue) => (
            <li key={issue.id} className="issue-item">
              <div>
                <strong>Category:</strong> {issue.category}
              </div>
              <div>
                <strong>Priority:</strong>{' '}
                <span className={`priority ${issue.priority.toLowerCase()}`}>{issue.priority}</span>
              </div>
              <div>
                <strong>Description:</strong> {issue.description}
              </div>
              <div>
                <strong>Location:</strong> {issue.location || 'N/A'}
              </div>
              <div>
                <strong>Status:</strong> {issue.status}
              </div>
              <div>
                <strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No open issues found.</p>
      )}
    </div>
  );

  // PDF export function fixed
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Admin Dashboard Report', 14, 20);

    doc.setFontSize(14);
    doc.text('Users By Role', 14, 30);
    const usersByRoleRows = Object.entries(overview.usersByRole).map(([role, count]) => [role, count]);
    autoTable(doc, {
      startY: 35,
      head: [['Role', 'Count']],
      body: usersByRoleRows,
      theme: 'striped',
    });

    doc.text('Study Room Bookings By Status', 14, doc.lastAutoTable.finalY + 10);
    const bookingsRows = Object.entries(overview.studyRoomBookingsByStatus).map(([status, count]) => [status, count]);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Status', 'Count']],
      body: bookingsRows,
      theme: 'striped',
    });

    doc.text('Maintenance Issues By Status', 14, doc.lastAutoTable.finalY + 10);
    const issuesRows = Object.entries(overview.maintenanceIssuesByStatus).map(([status, count]) => [status, count]);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Status', 'Count']],
      body: issuesRows,
      theme: 'striped',
    });

    doc.text('Top Booked Study Rooms', 14, doc.lastAutoTable.finalY + 10);
    const topRoomsRows = topBookedRooms.map(({ roomName, bookingCount }) => [roomName, bookingCount]);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Room Name', 'Booking Count']],
      body: topRoomsRows,
      theme: 'striped',
    });

    doc.text('Open Maintenance Issues', 14, doc.lastAutoTable.finalY + 10);
    const openIssuesRows = openIssues.map(({ category, priority, description, location, status, createdAt }) => [
      category,
      priority,
      description,
      location || 'N/A',
      status,
      new Date(createdAt).toLocaleString(),
    ]);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Category', 'Priority', 'Description', 'Location', 'Status', 'Created']],
      body: openIssuesRows,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [52, 152, 219] },
    });

    doc.save('admin_dashboard_report.pdf');
  };

  // Excel export function unchanged
  const exportExcel = () => {
    const wb = XLSX.utils.book_new();

    // Users By Role sheet
    const usersByRoleData = [
      ['Role', 'Count'],
      ...Object.entries(overview.usersByRole),
    ];
    const wsUsers = XLSX.utils.aoa_to_sheet(usersByRoleData);
    XLSX.utils.book_append_sheet(wb, wsUsers, 'Users By Role');

    // Study Room Bookings sheet
    const bookingsData = [
      ['Status', 'Count'],
      ...Object.entries(overview.studyRoomBookingsByStatus),
    ];
    const wsBookings = XLSX.utils.aoa_to_sheet(bookingsData);
    XLSX.utils.book_append_sheet(wb, wsBookings, 'Room Bookings');

    // Maintenance Issues sheet
    const issuesData = [
      ['Status', 'Count'],
      ...Object.entries(overview.maintenanceIssuesByStatus),
    ];
    const wsIssues = XLSX.utils.aoa_to_sheet(issuesData);
    XLSX.utils.book_append_sheet(wb, wsIssues, 'Maintenance Issues');

    // Top Booked Rooms sheet
    const topRoomsData = [
      ['Room Name', 'Booking Count'],
      ...topBookedRooms.map(({ roomName, bookingCount }) => [roomName, bookingCount]),
    ];
    const wsTopRooms = XLSX.utils.aoa_to_sheet(topRoomsData);
    XLSX.utils.book_append_sheet(wb, wsTopRooms, 'Top Booked Rooms');

    // Open Issues sheet
    const openIssuesData = [
      ['Category', 'Priority', 'Description', 'Location', 'Status', 'Created'],
      ...openIssues.map(({ category, priority, description, location, status, createdAt }) => [
        category,
        priority,
        description,
        location || 'N/A',
        status,
        new Date(createdAt).toLocaleString(),
      ]),
    ];
    const wsOpenIssues = XLSX.utils.aoa_to_sheet(openIssuesData);
    XLSX.utils.book_append_sheet(wb, wsOpenIssues, 'Open Issues');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'admin_dashboard_report.xlsx');
  };

  return (
    <div className="analytics-container">
      <h1>📊 Admin Analytics Overview</h1>

      <div className="report-buttons">
        <button className="btn-report" onClick={exportPDF}>
          📄 Download PDF Report
        </button>
        <button className="btn-report" onClick={exportExcel}>
          📊 Download Excel Report
        </button>
      </div>

      <div className="dashboard-flex">
        <div className="analytics-grid">
          {renderPieChart('👥 Users By Role', overview.usersByRole, '👥')}
          {renderPieChart('📅 Study Room Bookings', overview.studyRoomBookingsByStatus, '📅')}
          {renderPieChart('🛠️ Maintenance Issues', overview.maintenanceIssuesByStatus, '🛠️')}
          {renderTopBookedRoomsChart()}
        </div>
        <div className="open-issues-section">{renderOpenIssues()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
