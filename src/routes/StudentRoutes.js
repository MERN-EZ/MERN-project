import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentHomePage from '../pages/Student/Home/Home';
import StudentSchedulePage from '../pages/Student/Components/SchedulePage';
import Notification from '../pages/Student/Components/Notification';
import Profile from '../pages/Student/Components/Profile';
import EditProfile from '../pages/Student/Components/EditProfile';
import Payments from '../pages/Student/Components/Payments';
import HomeworkSubmission from '../pages/Student/Components/HomeWorkSubmission';

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentHomePage />} />
    <Route path="/schedule" element={<StudentSchedulePage />} />
    <Route path="/notification" element={<Notification />} />
    <Route path="/student/users" element={<Profile />} />
    <Route path="/student/users/:id" element={<Profile />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/homework-submission" element={<HomeworkSubmission />} />
    <Route path="/homework-submission/:homeworkId" element={<HomeworkSubmission />} />
  </Routes>
);

export default StudentRoutes;
