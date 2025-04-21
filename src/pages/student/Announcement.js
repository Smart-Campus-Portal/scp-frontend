import React from 'react';
import '../../styles/student/Announcement.css'; // Import the stylesheet for styling

const Announcement = () => {
  const announcement = [
    { id: 1, title: "Semester Exam Schedule Released", date: "April 20, 2025", content: "The exam schedule for the upcoming semester is now available on the portal. Please check the dates and times carefully." },
    { id: 2, title: "Maintenance Downtime", date: "April 22, 2025", content: "The website will be undergoing maintenance on April 25th from 1 AM to 3 AM. Please plan accordingly." },
    { id: 3, title: "New Library Resources", date: "April 15, 2025", content: "New books and research papers have been added to the library. You can access them through the student portal." },
    { id: 4, title: "Guest Lecture on AI", date: "April 18, 2025", content: "Join us for a guest lecture on Artificial Intelligence on April 28th at 10 AM in the main auditorium." }
  ];

  return (
    <div className="announcement-container">
      <h1 className="announcement-title">Announcements</h1>
      <p className="announcement-description">Stay up to date with the latest news and updates from the university.</p>

      <div className="announcement-list">
        {announcement.map((announcement) => (
          <div className="announcement-card" key={announcement.id}>
            <h2 className="announcement-card-title">{announcement.title}</h2>
            <p className="announcement-card-date">{announcement.date}</p>
            <p className="announcement-card-content">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
