import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/Admin/Home/AdminMain";
import StudentRequests from "../pages/Admin/StudentRequests";
import CreateAssistant from "../pages/Admin/CreateAssistant";
// import StudentManagement from "../pages/Admin/StudentManagement";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminHomePage />} />
    <Route path="/student-requests" element={<StudentRequests />} />
    <Route path="/create-assistant" element={<CreateAssistant />} />
    {/*<Route path="/manage-student" element={<StudentManagement />} /> */}
    {/* Add more guest-specific routes here */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;
