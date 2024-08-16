//
const teacher_tabs = [];
const assistant_tabs = [
  { text: 'Overview', url: '/', isActive: true },
  { text: 'Class Schedules', url: '/schedules', isActive: false },
  { text: 'Attendance', url: '/attendance', isActive: false },
  { text: 'Payments', url: '/payments', isActive: false },
];
const admin_tabs = [
  { text: 'Home', url: '/home', isActive: true },
  { text: 'Requests', url: '/requests', isActive: false },
  { text: 'Announcements', url: '/announcements', isActive: false },
  { text: 'Student Management', url: '/StudentManagement', isActive: false },
];

const guest_tabs = [
  { text: 'Register', url: '/register', isActive: true },
  { text: 'Login', url: '/login', isActive: false },
];

export {
  // student_tabs,
  teacher_tabs,
  assistant_tabs,
  admin_tabs,
  guest_tabs,
};
