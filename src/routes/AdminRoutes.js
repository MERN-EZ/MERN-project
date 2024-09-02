import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/Home/AdminMain';
import StudentRequests from '../pages/Admin/StudentRequests';
import CreateAssistant from '../pages/Admin/CreateAssistant';
import StudentManagement from '../pages/Admin/StudentManagement';
import Logout from '../components/common/Logout/logout';
import NotFound from '../components/common/NotFound/NotFound';
// import StudentManagement from "../pages/Admin/StudentManagement";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="/student-requests" element={<StudentRequests />} />
    <Route path="/create-assistant" element={<CreateAssistant />} />
    <Route path="/manage-student" element={<StudentManagement />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;
