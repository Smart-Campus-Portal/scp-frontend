import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './components/WelcomePage';

import ProtectedRoute from './pages/ProtectedRoute';
import { UserProvider } from './Context/UserContext';  // Added UserProvider import

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

//Admin

import AdminDashboard from './pages/admin/AdminDashboard';
import CreateUserAccounts from './pages/admin/CreateUserAccounts';
import DeleteUserAccounts from './pages/admin/DeleteUserAccounts';
import GeneralSystemReport from './pages/admin/GenerateSystemReport';
import Logout from './pages/admin/Logout';
import NotificationPage from './pages/admin/NotificationPage';
import ReportanIssue from './pages/admin/ReportanIssues';
import UpdateAccountDetails from './pages/admin/UpdateAccountDetails';
import ViewUserAccount from './pages/admin/ViewUserAccounts';

// Other Dashboards
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import AppointmentBookings from './pages/lecturer/appt_bookings';
import ViewReportedIssuesLecturer from './pages/lecturer/view_reported_issues';
import UpdateTimetable from './pages/lecturer/update_timetable';
import ViewTimetableLecturer from './pages/lecturer/view_timetable';
import LectReportIssue from './pages/lecturer/lect_report_issue';
import LectProfile from './pages/lecturer/lect_profile';

import DashboardLayoutAdmin from './components/DashboardLayoutAdmin';
// Removed duplicate import of ViewReportedIssues from lecturer folder





const App = () => {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
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

               <Route index element={<AdminDashboard/>} />
              <Route path="notifications" element={<NotificationPage />} />
              <Route path="generate-report" element={<GeneralSystemReport />} />
              <Route path="report-issue" element={<ReportanIssue />} />
              <Route path="view-users" element={<ViewUserAccount />} />
              <Route path="update-account" element={<UpdateAccountDetails />} />
              <Route path="delete-user" element={<DeleteUserAccounts />} />
              <Route path="create-user" element={<CreateUserAccounts />} />

       


          </Route>

          {/* Lecturer Dashboard */}
          <Route
            path="/lecturerDashboard"
            element={
              <ProtectedRoute role="lecture">
                <LecturerDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="appt_bookings" element={<AppointmentBookings />} />
            <Route path="view_reported_issues" element={<ViewReportedIssuesLecturer />} />
            <Route path="update_timetable" element={<UpdateTimetable />} />
            <Route path="view_timetable" element={<ViewTimetableLecturer />} />
            <Route path="lect_report" element={<LectReportIssue />} />
            <Route path="lect_profile" element={<LectProfile />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayoutAdmin />
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
    </UserProvider>
  );
};

export default App;
