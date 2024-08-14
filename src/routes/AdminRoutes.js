import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/Home/AdminRequestsMain';
import NotFound from '../pages/NotFound/NotFound';

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;
