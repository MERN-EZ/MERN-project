import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Assistant/Dashboard/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import Payment from '../pages/Assistant/Payment/Payment';
import Attendance from '../pages/Assistant/Attendance/Attendance';

const AssistantRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/payments" element={<Payment />} />
    <Route path="/attendance" element={<Attendance />} />
  </Routes>
);

export default AssistantRoutes;
