import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Assistant/Dashboard/Dashboard';
import NotFound from '../components/common/NotFound/NotFound';
import Payment from '../pages/Assistant/Payment/Payment';

const AssistantRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/payments" element={<Payment />} />
  </Routes>
);

export default AssistantRoutes;
