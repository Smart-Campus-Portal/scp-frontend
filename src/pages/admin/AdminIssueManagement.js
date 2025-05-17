import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/admin/AdminIssueManagement.css';

const AdminIssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;

  const token = localStorage.getItem('token');

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:8080/api/maintenance/issues/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setIssues(sorted);
      setError('');
    } catch (err) {
      console.error('Fetch failed, using placeholder issues', err);
      setIssues([
        {
          id: 1,
          category: 'Electrical',
          description: 'Sample issue',
          location: 'Block A - Lab 3',
          status: 'REPORTED',
          priority: 'HIGH',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          category: 'HVAC',
          description: 'Broken AC',
          location: 'Block B - 205',
          status: 'IN_PROGRESS',
          priority: 'MEDIUM',
          createdAt: new Date().toISOString(),
        },
      ]);
      setError('❌ Failed to fetch from server. Showing sample issues.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/maintenance/issues/${issueId}/update`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status < 300) {
        toast.success(`✅ Status updated to ${newStatus}`, {
          position: 'top-center',
          autoClose: 3000,
        });
        fetchIssues();
      } else throw new Error();
    } catch {
      toast.error('❌ Failed to update issue status.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  const filteredIssues = issues.filter(issue =>
    issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  return (
    <div className="admin-issue-management">
      <ToastContainer />
      <h2 className="page-title">🛠️ Manage Reported Issues</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search by description, category, or location..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <>
          <div className="issues-table-wrapper">
            <table className="issues-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {currentIssues.map(issue => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.category}</td>
                    <td className="description-cell" title={issue.description}>
                      {issue.description}
                    </td>
                    <td>{issue.location}</td>
                    <td>
                      <span className={`priority-badge priority-${issue.priority}`}>
                        {issue.priority}
                      </span>
                    </td>
                    <td>{formatDate(issue.createdAt)}</td>
                    <td>
                      <span className={`status-cell status-${issue.status}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </td>
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
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  className={idx + 1 === currentPage ? 'active' : ''}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminIssueManagement;
