import React from "react";
import "./Header.css";
import { useUserRole } from "../../context/UserRoleContext";
import { student_horizontal_navLinks } from "./MiniHeader";

const Header = () => {
  const { userRole } = useUserRole();

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
      <div className="header-main">
        <div className="logo-container">
          <img src=" /assets/react.png" alt="Sci ~ Ez Logo" className="logo" />
          <h1 className="site-title">InfoTech</h1>
        </div>
      </div>
      {userRole === "student" && (
        <div className="mini-nav-text">{getHeaderText()}</div>
      )}
      {userRole === "student" && (
        <nav className="sub-nav">
          <ul>
            {student_horizontal_navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className={link.isActive ? "active" : ""}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
