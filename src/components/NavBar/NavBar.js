import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
// Importing Material-UI icons
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Switch from "@mui/material/Switch";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { path: "/", name: "Home", exact: true, icon: <HomeIcon /> },
    { path: "/about/slideshow", name: "About", icon: <InfoIcon /> },
    { path: "/contact/branch1", name: "Contact Us", icon: <ContactMailIcon /> },
  ];

  return (
    <nav
      className={`navbar navbar-${theme}`}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}>
      <div className="navbar-buttons">
        {navLinks.map((link) => (
          <div key={link.name}>
            <NavLink
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }>
              <div className="nav-item-content">
                <div className="nav-item">{link.icon}</div>
                <span
                  className={
                    isMenuOpen && !isMobile ? "link-name visible" : "link-name"
                  }>
                  {link.name}
                </span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="theme-toggle-wrapper nav-item-content">
        <div className="nav-item">
          <Switch
            className="theme-toggle"
            checked={theme === "dark"}
            onChange={toggleTheme}
            name="themeToggle"
            color="default"
          />
        </div>
        <span
          className={
            isMenuOpen && !isMobile ? "link-name visible" : "link-name"
          }>
          {theme === "light" ? "Light Theme" : "Dark Theme"}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
