import React from "react";
import "./Header.css";
import { useUserRole } from "../../context/UserRoleContext";
import {
  // student_tabs,
  teacher_tabs,
  assistant_tabs,
  admin_tabs,
} from "./tabs";

const Header = () => {
  const { userRole } = useUserRole();

  let tab_buttons;
  switch (userRole) {
    case "teacher":
      tab_buttons = teacher_tabs;
      break;
    // case "student":
    //   tab_buttons = student_tabs;
    //   break;
    case "admin":
      tab_buttons = admin_tabs;
      break;
    case "assistant":
      tab_buttons = assistant_tabs;
      break;
    default:
      tab_buttons = [];
  }

  const getHeaderText = () => {
    switch (userRole) {
      case "student":
        return "2026 > Saturday";
      case "teacher":
        return "Teacher Dashboard";
      case "admin":
        return "Admin Panel";
      default:
        return "Welcome";
    }
  };

  return (
    <header className="header">
      <div className="header-bar">
        <div className="logo-container">
          <img src=" /assets/react.png" alt="Sci ~ Ez Logo" className="logo" />
          <h1 className="site-title">InfoTech</h1>
        </div>
      </div>
      {["student", "teacher", "admin", "assistant"].includes(userRole) && (
        <div className="tabs">
          {["student", "teacher", "admin", "assistant"].includes(userRole) && (
            <span className="tab-text">{getHeaderText()}</span>
          )}
          {["teacher", "admin", "assistant"].includes(userRole) && (
            <span className="tab-buttons">
              <ul>
                {tab_buttons.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className={link.isActive ? "active" : ""}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </span>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
