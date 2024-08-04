import React from "react";
import { Route, Routes } from "react-router-dom";
import TeacherHomePage from "../pages/Teacher/Home/Home";
import HomeworkManager from "../pages/Teacher/Homework/HomeworkManager";

const TeacherRoutes = () => (
  <Routes>
    <Route path="/" element={<TeacherHomePage />} />
    <Route path="/homework" element={<HomeworkManager />} />
    {/* Add more guest-specific routes here */}
  </Routes>
);

export default TeacherRoutes;
