import React from 'react';
import '../../styles/student/ViewReportedIssues.css';

function ViewReportedIssues() {
  const issues = [
    {
      lecture: 'Introduction to Programming',
      lecturer: 'Dr. Jane Smith',
      title: 'Slide missing in week 2',
      description: 'Lecture 2 slide 5 is blank and missing content.',
      status: 'Open',
    },
    {
      lecture: 'Data Structures',
      lecturer: 'Prof. Mark Johnson',
      title: 'Incorrect example in Lecture 5',
      description: 'The binary search example has a logical error.',
      status: 'In Progress',
    },
    {
      lecture: 'Database Systems',
      lecturer: 'Dr. Lisa Ray',
      title: 'Video not loading',
      description: 'Lecture 3 video does not play past 10 minutes.',
      status: 'Resolved',
    },
  ];

  return (
    <div className="reported-issues-container">
      <h2>Reported Lecture Issues</h2>
      <ul className="issues-list">
        {issues.map((issue, index) => (
          <li key={index} className="issue-item">
            <h3>{issue.title}</h3>
            <p><strong>Lecture:</strong> {issue.lecture}</p>
            <p><strong>Lecturer:</strong> {issue.lecturer}</p>
            <p>{issue.description}</p>
            <span className={`issue-status status-${issue.status.toLowerCase().replace(/\s/g, '-')}`}>
              Status: {issue.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewReportedIssues;
