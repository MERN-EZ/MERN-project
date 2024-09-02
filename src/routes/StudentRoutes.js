import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentHomePage from '../pages/Student/Home/Home';
import StudentSchedulePage from '../pages/Student/CalendarPage/SchedulePage';
import Notification from '../pages/Student/Components/Notification';
import Profile from '../pages/Student/Profile/Profile';
import EditProfile from '../pages/Student/EditProfile/EditProfile';
import Payments from '../pages/Student/Components/Payments';
import HomeworkSubmission from '../pages/Student/Components/HomeWorkSubmission';
import NotFound from '../components/common/NotFound/NotFound';
import StudentSupportPage from '../pages/Student/StudentSupportPage/StudentSupportPage';
import Logout from '../components/common/Logout/logout';

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentHomePage />} />
    <Route path="/schedule" element={<StudentSchedulePage />} />
    <Route path="/notification" element={<Notification />} />
    <Route path="/student/users" element={<Profile />} />
    <Route path="/student/users/:id" element={<Profile />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route
      path="/student/StudentSupportPage"
      element={<StudentSupportPage />}
    />
    <Route path="/payments" element={<Payments />} />
    <Route path="/homework-submission" element={<HomeworkSubmission />} />
    <Route path="/logout" element={<Logout />} />
    <Route
      path="/homework-submission/:lessonId/:homeworkId"
      element={<HomeworkSubmission />}
    />

    <Route
      path="/homework-submission/:homeworkId"
      element={<HomeworkSubmission />}
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default StudentRoutes;
