import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../pages/Assistant/Dashboard/Dashboard';
import NotFound from '../components/NotFound/NotFound';
import Attendance from '../pages/Assistant/Attendance/Attendance';
import CreateAttendance from '../pages/Assistant/createAttendance/CreateAttendance';
import EditAttendance from '../pages/Assistant/EditAttendance/EditAttendance';
import Logout from '../components/Logout/logout';

const AssistantRoutes = () => (
  <Routes>
    <Route path="/" element={<Attendance />} />
    <Route path="/attendance" element={<Attendance />} />
    <Route path="/attendance/create" element={<CreateAttendance />} />
    <Route path="/attendance/edit" element={<EditAttendance />} />
    <Route path="/Logout" element={<Logout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AssistantRoutes;
