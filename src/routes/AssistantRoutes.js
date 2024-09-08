import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Assistant/Dashboard/Dashboard';
import NotFound from '../components/NotFound/NotFound';
import Payment from '../pages/Assistant/Payment/Payment';
import Logout from '../components/Logout/logout';

const AssistantRoutes = () => (
  <Routes>
    <Route path="/staffLogin" element={<Dashboard />} />
    <Route path="/payments" element={<Payment />} />
    <Route path="/Logout" element={<Logout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AssistantRoutes;
