import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GuestHomePage from '../pages/Guest/Home/Home';
import RegistrationPage from '../pages/Guest/RegistrationPage/RegistrationPage';
import LoginPage from '../pages/Guest/Login/LoginPage';
import NotFound from '../components/NotFound/NotFound.js';
import StaffLoginPage from '../pages/Guest/staffLogin/StaffLoginPage.js';

const GuestRoutes = () => (
  <Routes>
    <Route path="/" element={<GuestHomePage />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/staffLogin" element={<StaffLoginPage />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default GuestRoutes;
