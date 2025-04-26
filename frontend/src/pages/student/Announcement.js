import React, { useState } from 'react';
import '../../styles/student/Announcement.css';

const Announcement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const announcements = [
    { id: 1, title: "Semester Exam Schedule Released", date: "2025-04-20", content: "The exam schedule for the upcoming semester is now available on the portal. Please check the dates and times carefully." },
    { id: 2, title: "Maintenance Downtime", date: "2025-04-22", content: "The website will be undergoing maintenance on April 25th from 1 AM to 3 AM. Please plan accordingly." },
    { id: 3, title: "New Library Resources", date: "2025-04-15", content: "New books and research papers have been added to the library. You can access them through the student portal." },
    { id: 4, title: "Guest Lecture on AI", date: "2025-04-18", content: "Join us for a guest lecture on Artificial Intelligence on April 28th at 10 AM in the main auditorium." }
  ];

  const filteredAnnouncements = announcements.filter(a => {
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = dateFilter ? a.date === dateFilter : true;

    return matchSearch && matchDate;
  });

  return (
    <div className="announcement-container">
      <h1 className="announcement-title">Notifications</h1>
      <p className="announcement-description">
        Stay up to date with the latest news and updates from the university.
      </p>

      {/* Filters */}
      <div className="announcement-filters">
        <input
          type="text"
          placeholder="🔍 Search announcements..."
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
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <div className="announcement-card" key={announcement.id}>
              <h2 className="announcement-card-title">{announcement.title}</h2>
              <p className="announcement-card-date">{new Date(announcement.date).toLocaleDateString()}</p>
              <p className="announcement-card-content">{announcement.content}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '1rem' }}>
            No announcements match your filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
