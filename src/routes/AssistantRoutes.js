import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AssistantHomePage from '../pages/Assistant/Home/Home';
import NotFound from '../pages/NotFound/NotFound';

const AssistantRoutes = () => (
  <Routes>
    <Route path="/" element={<AssistantHomePage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AssistantRoutes;
