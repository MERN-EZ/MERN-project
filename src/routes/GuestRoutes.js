import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GuestHomePage from '../pages/Guest/Home/Home';
import RegistrationPage from '../pages/Guest/RegistrationPage/RegistrationPage';
import LoginPage from '../pages/Guest/Login/LoginPage';

const GuestRoutes = () => (
  <Routes>
    <Route path="/" element={<GuestHomePage />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route path="/login" element={<LoginPage />} />
    {/* Add more guest-specific routes here */}
  </Routes>
);

export default GuestRoutes;
