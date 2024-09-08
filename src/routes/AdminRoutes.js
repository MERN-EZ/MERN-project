import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/Home/AdminMain';
import StudentRequests from '../pages/Admin/ManageStudentRequests/StudentRequests';
import CreateAssistant from '../pages/Admin/ManageAssistant/CreateAssistantPage';
import Logout from '../components/Logout/logout';
import NotFound from '../components/NotFound/NotFound';
import StaffReg from '../pages/Admin/StaffReg/StaffReg';

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="/student-requests" element={<StudentRequests />} />
    <Route path="/create-assistant" element={<CreateAssistant />} />
    <Route path="/reg-staff" element={<StaffReg />} />
    <Route path="/Logout" element={<Logout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;
