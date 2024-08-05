//
const teacher_tabs = [
  { text: "Overview", url: "/overview", isActive: true },
  { text: "Homework", url: "/homework", isActive: false },
  { text: "Resources", url: "/resources", isActive: false },
  { text: "Announcements", url: "/announcements", isActive: false },
];
const assistant_tabs = [
  { text: "Overview", url: "/", isActive: true },
  { text: "Class Schedules", url: "/schedules", isActive: false },
  { text: "Attendance", url: "/attendance", isActive: false },
  { text: "Payments", url: "/payments", isActive: false },
];
const admin_tabs = [
  { text: "Home", url: "/home", isActive: true },
  { text: "Requests", url: "/requests", isActive: false },
  { text: "Announcements", url: "/announcements", isActive: false },
  { text: "Student Management", url: "/StudentManagement", isActive: false },
];
export {
  // student_tabs,
  teacher_tabs,
  assistant_tabs,
  admin_tabs,
};
