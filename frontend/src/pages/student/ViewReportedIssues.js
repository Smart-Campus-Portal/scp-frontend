import React, { useState } from 'react';
import '../../styles/student/ViewReportedIssues.css';
import { reportedIssuesData } from '../../dummyData/reportedIssuesData'; // ✅ Import dummy data

function ViewReportedIssues() {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIssues = reportedIssuesData.filter((issue) => {
    const matchStatus = statusFilter ? issue.status === statusFilter : true;
    const matchSearch = searchQuery
      ? Object.values(issue)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;
    return matchStatus && matchSearch;
  });

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="reported-issues-container">
      <h2>Reported Issues</h2>

      {/* Filters */}
      <div className="filters">
        <div>
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by title, lecture, lecturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ul className="issues-list">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue, index) => (
            <li key={index} className="issue-item">
              <h3>{issue.title}</h3>
              <p><strong>Lecture:</strong> {issue.lecture}</p>
              <p><strong>Lecturer:</strong> {issue.lecturer}</p>
              <p><strong>Reported on:</strong> {formatDateTime(issue.dateReported)}</p>
              <p>{issue.description}</p>
              <span className={`issue-status status-${issue.status.toLowerCase().replace(/\s/g, '-')}`}>
                {issue.status === 'Open' ? '🟥' : issue.status === 'In Progress' ? '🟨' : '🟩'} {issue.status}
              </span>
            </li>
          ))
        ) : (
          <p style={{ marginTop: '2rem', textAlign: 'center', color: '#999' }}>No issues match the selected filters.</p>
        )}
      </ul>
    </div>
  );
}

export default ViewReportedIssues;
