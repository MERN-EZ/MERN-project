import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/Admin/Home/AdminRequestsMain";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    {/* Add more guest-specific routes here */}
  </Routes>
);

export default AdminRoutes;
