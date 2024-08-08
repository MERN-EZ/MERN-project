import React from "react";
import { Route, Routes } from "react-router-dom";
import GuestHomePage from "../pages/Guest/Home/Home";

const GuestRoutes = () => (
  <Routes>
    <Route path="/" element={<GuestHomePage />} />
    {/* Add more guest-specific routes here */}
  </Routes>
);

export default GuestRoutes;
