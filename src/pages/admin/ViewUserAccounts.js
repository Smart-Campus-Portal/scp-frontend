import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/admin/ViewUserAccounts.css'; // Custom CSS

const ViewUserAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query = '') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = query.trim()
        ? `http://localhost:8080/api/user/search?query=${query}`
        : 'http://localhost:8080/api/user/search?query=';

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      const userList = data.content.flat(); // Flatten nested array
      setUsers(userList);

      if (userList.length === 0) {
        toast.info('No users found.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete user by ID
  const deleteUser = async (id) => {
    if (!window.confirm(`Are you sure you want to delete user ID ${id}?`)) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Failed to delete user');
      }

      toast.success(`User ID ${id} deleted successfully.`);
      // Refresh users list after deletion
      fetchUsers(searchTerm.trim());
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(`Error deleting user ID ${id}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchTerm.trim());
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="view-user-container">
      <h2 className="title">User Accounts</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search here (e.g., Boikanyo)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <p className="loading">Loading...</p>}

      {!loading && users.length > 0 && (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role.replace('ROLE_', '')}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(user.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ViewUserAccount;
