import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentHomePage from "../pages/Student/Home/Home";

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentHomePage />} />
    {/* Add more student-specific routes here */}
  </Routes>
);

export default StudentRoutes;
