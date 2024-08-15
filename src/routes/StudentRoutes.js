import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentHomePage from '../pages/Student/Home/Home';
import StudentSchedulePage from '../pages/Student/Components/SchedulePage';
import Notification from '../pages/Student/Components/Notification';
import Profile from '../pages/Student/Components/Profile';
import EditProfile from '../pages/Student/Components/EditProfile';
import Payments from '../pages/Student/Components/Payments';
import HomeworkSubmission from '../pages/Student/Components/HomeWorkSubmission';
import NotFound from '../pages/NotFound/NotFound';

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentHomePage />} />
    <Route path="/schedule" element={<StudentSchedulePage />} />
    <Route path="/notification" element={<Notification />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/homework-submission" element={<HomeworkSubmission />} />
    <Route
      path="/homework-submission/:homeworkId"
      element={<HomeworkSubmission />}
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default StudentRoutes;
