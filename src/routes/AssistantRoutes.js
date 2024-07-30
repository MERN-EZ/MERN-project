import React from "react";
import { Route, Routes } from "react-router-dom";
import AssistantHomePage from "../pages/Assistant/Home/Home";

const AssistantRoutes = () => (
  <Routes>
    <Route path="/" element={<AssistantHomePage />} />
    {/* Add more Assistant-specific routes here */}
  </Routes>
);

export default AssistantRoutes;
