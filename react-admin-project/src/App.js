import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardLayoutAdmin from './components/DashboardLayoutAdmin';
import DashboardAdminHome from './admin/pages/DashboardAdminHome';
import GenerateReports from './admin/pages/GenerateReports';
import ReportIssue from './admin/pages/ReportIssue';
import ViewUserAccounts from './admin/pages/ViewUserAccounts';
import UpdateAccountDetails from './admin/pages/UpdateAccountDetails';
import DeleteUserAccount from './admin/pages/DeleteUserAccount';
import CreateUserAccount from './admin/pages/CreateUserAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayoutAdmin />}>
          <Route index element={<DashboardAdminHome />} />
          <Route path="generate-report" element={<GenerateReports />} />
          <Route path="report-issue" element={<ReportIssue />} />
          <Route path="view-users" element={<ViewUserAccounts />} />
          <Route path="update-account" element={<UpdateAccountDetails />} />
          <Route path="delete-user" element={<DeleteUserAccount />} />
          <Route path="create-user" element={<CreateUserAccount />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
