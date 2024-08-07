import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TeacherHomePage from '../pages/Teacher/Home/Home';
import HomeworkManager from '../pages/Teacher/Homework/HomeworkManager';
import CreateLesson from '../pages/Teacher/CreateLesson/CreateLesson';
// import Test from "../pages/Teacher/Test/Test";
import './../pages/Teacher/Teacher.css';
const TeacherRoutes = () => (
  <Routes>
    <Route path="/" element={<TeacherHomePage />} />
    <Route path="/homework" element={<HomeworkManager />} />
    <Route path="/lessons/create" element={<CreateLesson />} />
    {/* Add more guest-specific routes here */}
  </Routes>
);

export default TeacherRoutes;
