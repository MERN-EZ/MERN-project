import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GuestHomePage from '../pages/Guest/Home/Home';
import RegistrationPage from '../pages/Guest/RegistrationPage/RegistrationPage';
import LoginPage from '../pages/Guest/Login/LoginPage';
import NotFound from '../pages/NotFound/NotFound';

const GuestRoutes = () => (
  <Routes>
    <Route path="/" element={<GuestHomePage />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route path="/login" element={<LoginPage />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default GuestRoutes;
