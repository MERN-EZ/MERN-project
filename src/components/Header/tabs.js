const teacher_tabs = [];
const assistant_tabs = [
  { text: 'Overview', url: '/', isActive: true },
  // { text: 'Class Schedules', url: '/schedules', isActive: false },
  { text: 'Attendance', url: '/attendance', isActive: false },
  // { text: 'Payments', url: '/payments', isActive: false },
];
const admin_tabs = [
  { text: 'Home', url: '/', isActive: true },
  { text: 'Student Requests', url: '/student-requests', isActive: false },
  { text: 'Create Assistant', url: '/create-assistant', isActive: false },
  { text: 'Staff Registration', url: '/reg-staff', isActive: false },
];


export {
  // student_tabs,
  teacher_tabs,
  assistant_tabs,
  admin_tabs,
  //guest_tabs,
};
