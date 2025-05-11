import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../../styles/admin/AdminIssueManagement.css';

const AdminIssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Fetch issues from the API
  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:8267/api/maintenance/issues/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIssues(response.data);
      setError('');
    } catch (err) {
      console.error('Fetch failed, using placeholder issues');
      setIssues([
        {
          id: 1,
          description: 'Sample issue description',
          location: 'Block A - Lab 3',
          status: 'REPORTED',
        },
        {
          id: 2,
          description: 'Broken air conditioner',
          location: 'Block B - Room 205',
          status: 'IN_PROGRESS',
        },
      ]);
      setError('❌ Failed to fetch from database. Showing sample issues.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Handle status change and show toast notification
  const handleStatusChange = async (issueId, newStatus) => {
    try {
      const response = await axios.post(
        `http://localhost:8267/api/maintenance/issues/${issueId}/update`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Show toast based on response status
      if (response.status === 200 || response.status === 201) {
        toast.success(`✅ Status updated to ${newStatus}`, {
          position: 'top-center',
          autoClose: 3000,
        });
        fetchIssues(); // Refresh list after update
      } else {
        toast.error('❌ Failed to update issue status. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error('❌ Failed to update issue status. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="admin-issue-management">
      <h2>Manage Reported Issues</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <table className="issues-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.description}</td>
                <td>{issue.location}</td>
                <td>{issue.status}</td>
                <td>
                  <select
                    value={issue.status}
                    onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                  >
                    <option value="REPORTED">Reported</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminIssueManagement;
