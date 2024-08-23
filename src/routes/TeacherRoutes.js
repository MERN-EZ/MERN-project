import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TeacherHomePage from '../pages/Teacher/Home/Home';
import HomeworkManager from '../pages/Teacher/Homework/HomeworkManager';
import CreateLesson from '../pages/Teacher/CreateLesson/CreateLesson';
import EditLesson from '../pages/Teacher/EditLesson/EditLesson';
import CreateHomework from '../pages/Teacher/CreateHomework/CreateHomework';
import EditHomework from '../pages/Teacher/EditHomework/EditHomework';
import ViewSubmission from '../pages/Teacher/ViewSubmission/ViewSubmission';
import NotFound from '../pages/NotFound/NotFound';
import './../pages/Teacher/Teacher.css';

const TeacherRoutes = () => (
  <Routes>
    <Route path="/" element={<TeacherHomePage />} />
    <Route path="/homework" element={<HomeworkManager />} />
    <Route path="/lessons/create" element={<CreateLesson />} />
    <Route path="/lessons/edit" element={<EditLesson />} />
    <Route path="/homework/create" element={<CreateHomework />} />
    <Route path="/homework/edit" element={<EditHomework />} />
    <Route path="/homework/view" element={<ViewSubmission />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default TeacherRoutes;
