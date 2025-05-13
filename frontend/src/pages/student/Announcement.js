import React, { useState } from 'react';
import { announcementsData } from '../../dummyData/announcementsData'; // 👈 import the dummy announcements

import '../../styles/student/Announcement.css';

const Announcement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredAnnouncements = announcementsData.filter((a) => {
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
