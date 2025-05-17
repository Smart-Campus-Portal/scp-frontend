import React, { useState, useEffect } from 'react';
import '../../styles/student/Announcement.css';

const Announcement = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:8080/api/maintenance/notifications?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();

        // Debug log to check notification IDs:
        console.log('Fetched notifications:', data);

        // Filter out notifications without a valid id:
        const filteredData = data.filter((n) => n.id !== undefined && n.id !== null);

        if (filteredData.length !== data.length) {
          console.warn('Some notifications had invalid or missing id and were filtered out.');
        }

        setNotifications(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchNotifications();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [token, userId]);

  const handleNotificationClick = async (notificationId) => {
    // Defensive checks before calling backend
    if (
      notificationId === undefined ||
      notificationId === null ||
      notificationId === 'undefined' ||
      notificationId === ''
    ) {
      console.error('Invalid notificationId:', notificationId);
      return;
    }

    const index = notifications.findIndex((n) => n.id === notificationId);
    if (index === -1) {
      console.error('Notification ID not found in state:', notificationId);
      return;
    }
    const selected = notifications[index];

    if (!selected || selected.read) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/maintenance/notifications/${notificationId}/mark-read`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to mark as read');

      // Update notification as read locally
      const updated = [...notifications];
      updated[index] = { ...selected, read: true };
      setNotifications(updated);

      setStatusMessage('Notification marked as read');
      setTimeout(() => setStatusMessage(''), 3000);

      // Notify other components (Header) to decrement unread count
      window.dispatchEvent(new Event('notification-read'));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Error marking notification as read');
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    const matchSearch = n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const notificationDate = n.timestamp.split('T')[0];
    const matchDate = dateFilter ? notificationDate === dateFilter : true;
    return matchSearch && matchDate;
  });

  if (loading) return <p style={{ textAlign: 'center' }}>Loading notifications...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div className="announcement-container">
      <h1 className="announcement-title">Notifications</h1>
      <p className="announcement-description">
        Stay up to date with the latest news and updates from the university.
      </p>

      {statusMessage && <p className="announcement-status">{statusMessage}</p>}

      <div className="announcement-filters">
        <input
          type="text"
          placeholder="🔍 Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="announcement-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`announcement-card ${n.read ? 'read' : 'unread'}`}
              onClick={() => handleNotificationClick(n.id)}
            >
              <p className="announcement-card-content">{n.message}</p>
              <p className="announcement-card-date">
                {new Date(n.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>
            No notifications match your filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
