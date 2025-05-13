import React from 'react';
import Navbar from '../../components/Navbar/navbar';

import '../../scss/Lecturer/view_reported_issues.css';
import dummyIssues from '../../dummyIssues';

const ViewReportedIssues = () => {
  return (
    
    <div className='reported-layout'>
            <Navbar/>

            <div className='reported-side'>
              

                <div className='reported-content'>

                    <div className='reported-issues-cont'>

                        <h2 className='reported-heading'>Your Reported Issues</h2>

                        <div className="issues-container">
                            {dummyIssues.map((issue) => (
                        <div className="issue-card" key={issue.id}>
                                <h3 className='issue-type'>{issue.type}</h3>
                            <p className={`priority ${issue.priority.toLowerCase()}`}>
                            {issue.priority}
                            </p>
                            <p className='issue-info'><strong>Status:</strong> {issue.status}</p>
                            <p className='issue-info'><strong>Description:</strong> {issue.description}</p>
                            <p className="issue-date"><strong>Date Reported:</strong> {issue.date}</p>
                        </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
    </div>

  )
}
export default ViewReportedIssues