import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './components/WelcomePage';

import ProtectedRoute from './pages/ProtectedRoute';

// Student Dashboard
import DashboardLayoutStudent from './components/DashboardLayoutStudent';
import DashboardHome from './pages/student/DashboardHome';
import ViewTimetable from './pages/student/ViewTimetable';
import LectureSchedule from './pages/student/LectureSchedule';
import BookLecture from './pages/student/BookLecture';
import BookStudyRoom from './pages/student/BookStudyRoom';

import ViewRooms from './pages/student/ViewRooms';
import StudentProfile from './pages/student/StudentProfile';
import ViewReportedIssues from './pages/student/ViewReportedIssues';
import ReportIssue from './pages/student/ReportIssue';
import Announcement from './pages/student/Announcement';
import ViewAvailableRooms from './pages/student/ViewAvailableRooms';


// Other Dashboards
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hhh" element={<WelcomePage />} />

        {/* Student Dashboard */}
        <Route
          path="/studentDashboard"
          element={
            <ProtectedRoute role="student">
              <DashboardLayoutStudent />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="view-timetable" element={<ViewTimetable />} />
          <Route path="lecture-schedule" element={<LectureSchedule />} />
          <Route path="book-lecture" element={<BookLecture />} />
          <Route path="book-study-room" element={<BookStudyRoom />} />
          <Route path="view-rooms" element={<ViewRooms />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="issues" element={<ViewReportedIssues />} />
          <Route  path='available-rooms' element={<ViewAvailableRooms />}/>
          <Route path="report-issue" element={<ReportIssue />} />
          <Route path="announcements" element={<Announcement />} />
        </Route>

        {/* Lecturer Dashboard */}
        <Route
          path="/lecturerDashboard"
          element={
            <ProtectedRoute role="lecture">
              <LecturerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={<div style={{ padding: '2rem' }}><h2>Page Not Found</h2></div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
