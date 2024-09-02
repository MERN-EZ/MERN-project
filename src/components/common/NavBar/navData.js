import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt from '@mui/icons-material/PersonAddAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssistantIcon from '@mui/icons-material/Assistant';
import LogoutIcon from '@mui/icons-material/Logout';

const navLinks_teacher = [
  { path: '/', name: 'Home', exact: true, icon: <HomeIcon /> },
  { path: '/homework', name: 'Homework', icon: <ContactMailIcon /> },
];

const navLinks_student = [
  { path: '/', name: 'Home', exact: true, icon: <HomeIcon /> },
  {
    path: '/student/StudentSupportPage',
    name: 'Inquiries',
    icon: <QuizIcon />,
  },
  { path: '/student/users', name: 'Profile', icon: <AccountCircleIcon /> },
  { path: '/student/logout', name: 'Logout', icon: <LogoutIcon /> },
];

const navLinks_admin = [
  { path: '/', name: 'Home', exact: true, icon: <HomeIcon /> },
  { path: '/admin', name: 'Admin Panel', icon: <AdminPanelSettingsIcon /> },
];

const navLinks_assistant = [
  { path: '/', name: 'Home', exact: true, icon: <HomeIcon /> },
  { path: '/assistant', name: 'Assistant', icon: <AssistantIcon /> },
];

const navLinks_guest = [
  { path: '/login', name: 'Login', exact: true, icon: <LoginIcon /> },
  { path: '/register', name: 'Register', icon: <PersonAddAlt /> },
  {
    path: '/staffLogin',
    name: 'Staff Login',
    icon: <AdminPanelSettingsIcon />,
  },
];

export {
  navLinks_teacher,
  navLinks_student,
  navLinks_admin,
  navLinks_assistant,
  navLinks_guest,
};
