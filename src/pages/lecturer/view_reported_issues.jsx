import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import '../../scss/Lecturer/view_reported_issues.css';

const ViewReportedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          console.error('Token or userId missing from localStorage');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/maintenance/issues?reporterId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
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
      ? Object.values(issue).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className='reported-layout'>
      <Navbar />
      <div className='reported-side'>
        <div className='reported-content'>
          <div className='reported-issues-cont'>
            <h2 className='reported-heading'>Your Reported Issues</h2>

            <div className="filters">
              <div>
                <label>Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
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

            <div className="issues-container">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <div className="issue-card" key={issue.id}>
                    <h3 className='issue-type'>{issue.category}</h3>
                    <p className={`priority ${issue.priority.toLowerCase()}`}>
                      {issue.priority}
                    </p>
                    <p className='issue-info'><strong>Status:</strong> {issue.status}</p>
                    <p className='issue-info'><strong>Description:</strong> {issue.description}</p>
                    <p className="issue-date"><strong>Date Reported:</strong> {formatDateTime(issue.createdAt)}</p>
                  </div>
                ))
              ) : (
                <p className="no-issues-msg">
                  No issues match the selected filters.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReportedIssues;
