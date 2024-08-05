import React from "react";
import { Route, Routes } from "react-router-dom";
import TaecherHomePage from "../pages/Teacher/Home/Home";

const TaecherRoutes = () => (
  <Routes>
    <Route path="/" element={<TaecherHomePage />} />
    {/* Add more guest-specific routes here */}
  </Routes>
);

export default TaecherRoutes;
