// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayoutStudent from './components/DashboardLayoutStudent';
import ViewTimetable from './pages/student/ViewTimetable';
import LectureSchedule from './pages/student/LectureSchedule';
import BookLecture from './pages/student/BookLecture';
import BookStudyRoom from './pages/student/BookStudyRoom';
import AccountDetail from './pages/student/AccountDetail';
import ReportIssue from './pages/student/ReportIssue';
import DashboardHome from './pages/student/DashboardHome';
import Announcement from './pages/student/Announcement';
import WelcomePage from './components/WelcomePage'; // Import the WelcomePage component


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/hhh" element={<WelcomePage />} /> 
          <Route path="/" element={<DashboardLayoutStudent />}>
          <Route index element={<DashboardHome />} />
          <Route path="view-timetable" element={<ViewTimetable />} />
          <Route path="lecture-schedule" element={<LectureSchedule />} />
          <Route path="book-lecture" element={<BookLecture />} />
          <Route path="book-study-room" element={<BookStudyRoom />} />
          <Route path="account-detail" element={<AccountDetail />} />
          <Route path="report-issue" element={<ReportIssue />} />
          <Route path="announcements" element={<Announcement />} />
          </Route>
      </Routes>
    </Router>
  );
};

export default App;