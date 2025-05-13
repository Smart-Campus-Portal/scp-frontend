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
    fetch('http://localhost:8267/api/admin/dashboard/overview', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch((err) => console.error('Failed to fetch admin overview:', err));

    // Top Study Rooms
    fetch('http://localhost:8267/api/admin/dashboard/top-booked-study-rooms', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTopBookedRooms(data))
      .catch((err) => console.error('Failed to fetch top booked rooms:', err));

    // Open Issues
    fetch('http://localhost:8267/api/maintenance/dashboard/open-issues', {
      headers: {
        'Authorization': `Bearer ${token}`,
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
          <span className="legend-label">{entry.name}: {entry.value}</span>
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
              <div><strong>Category:</strong> {issue.category}</div>
              <div><strong>Priority:</strong> <span className={`priority ${issue.priority.toLowerCase()}`}>{issue.priority}</span></div>
              <div><strong>Description:</strong> {issue.description}</div>
              <div><strong>Location:</strong> {issue.location || 'N/A'}</div>
              <div><strong>Status:</strong> {issue.status}</div>
              <div><strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No open issues found.</p>
      )}
    </div>
  );

  return (
    <div className="analytics-container">
      <h1>📊 Admin Analytics Overview</h1>
      <div className="dashboard-flex">
        <div className="analytics-grid">
          {renderPieChart('👥 Users By Role', overview.usersByRole, '👥')}
          {renderPieChart('📅 Study Room Bookings', overview.studyRoomBookingsByStatus, '📅')}
          {renderPieChart('🛠️ Maintenance Issues', overview.maintenanceIssuesByStatus, '🛠️')}
          {renderTopBookedRoomsChart()}
        </div>
        <div className="open-issues-section">
          {renderOpenIssues()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
