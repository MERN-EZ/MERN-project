import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Assistant/Dashboard/Dashboard';
import NotFound from '../components/NotFound/NotFound';
import Payment from '../pages/Assistant/Payment/Payment';
import Assistanthome from '../pages/Assistant/Dashboard/Dashboard'

const AssistantRoutes = () => (
  <Routes>
    <Route path="/payments" element={<Payment />} />
    <Route path="/stafflogin" element={<Assistanthome />} />
    <Route path="*" element={<NotFound />} />
    
  </Routes>
);

export default AssistantRoutes;
