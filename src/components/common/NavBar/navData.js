import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssistantIcon from "@mui/icons-material/Assistant";

const navLinks_teacher = [
  { path: "/", name: "Home", exact: true, icon: <HomeIcon /> },
  { path: "/about/slideshow", name: "About", icon: <InfoIcon /> },
  { path: "/contact/branch1", name: "Contact Us", icon: <ContactMailIcon /> },
];

const navLinks_student = [
  { path: "/", name: "Home", exact: true, icon: <HomeIcon /> },
  { path: "/about", name: "About", icon: <InfoIcon /> },
];

const navLinks_admin = [
  { path: "/", name: "Home", exact: true, icon: <HomeIcon /> },
  { path: "/admin", name: "Admin Panel", icon: <AdminPanelSettingsIcon /> },
];

const navLinks_assistant = [
  { path: "/", name: "Home", exact: true, icon: <HomeIcon /> },
  { path: "/assistant", name: "Assistant", icon: <AssistantIcon /> },
];

export {
  navLinks_teacher,
  navLinks_student,
  navLinks_admin,
  navLinks_assistant,
};
