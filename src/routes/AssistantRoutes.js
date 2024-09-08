import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Assistant/Dashboard/Dashboard';
import NotFound from '../components/common/NotFound/NotFound';
import Payment from '../pages/Assistant/Payment/Payment';
import Attendance from '../pages/Assistant/Attendance/Attendance';
import CreateAttendance from '../pages/Assistant/createAttendance/CreateAttendance';
import EditAttendance from '../pages/Assistant/EditAttendance/EditAttendance';

const AssistantRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/payments" element={<Payment />} />
    <Route path="/attendance" element={<Attendance />} />
    <Route path="/attendance/create" element={<CreateAttendance />} />
    <Route path="/attendance/edit" element={<EditAttendance />} />
  </Routes>
);

export default AssistantRoutes;
