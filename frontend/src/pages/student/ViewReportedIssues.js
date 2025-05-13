import React, { useEffect, useState } from 'react';
import '../../styles/student/ViewReportedIssues.css';

function ViewReportedIssues() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
 const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('http://localhost:8267/api/maintenance/issues?reporterId=2', {
          method: 'GET',
          headers: {
 'Authorization': `Bearer ${token}`          }
        });

        if (!response.ok) throw new Error('Failed to fetch issues');

        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const matchStatus = statusFilter ? issue.status === statusFilter.toUpperCase() : true;
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

      <div className="filters">
        <div>
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="REPORTED">Reported</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ul className="issues-list">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <li key={issue.id} className="issue-item">
              <h3>{issue.category}</h3>
              <p><strong>Priority:</strong> {issue.priority}</p>
              <p><strong>Reported on:</strong> {formatDateTime(issue.createdAt)}</p>
              <p>{issue.description}</p>
              <span className={`issue-status status-${issue.status.toLowerCase().replace(/\s/g, '-')}`}>
                {issue.status === 'REPORTED' ? '🟥' : issue.status === 'IN_PROGRESS' ? '🟨' : '🟩'} {issue.status}
              </span>
            </li>
          ))
        ) : (
          <p style={{ marginTop: '2rem', textAlign: 'center', color: '#999' }}>
            No issues match the selected filters.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ViewReportedIssues;
