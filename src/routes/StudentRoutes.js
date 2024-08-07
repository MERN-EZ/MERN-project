import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentHomePage from "../pages/Student/Home/Home";
import StudentSchedulePage from "../pages/Student/Components/SchedulePage";
import Notification from "../pages/Student/Components/Notification";

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentHomePage />} />
    <Route path="/schedule" element={<StudentSchedulePage />} />
    <Route path="/notification" element={<Notification />} />
  </Routes>
);

export default StudentRoutes;
