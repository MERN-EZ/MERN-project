import React, { useState, useEffect } from 'react';
import { useTheme } from './../../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import {
  navLinks_teacher,
  navLinks_student,
  navLinks_admin,
  navLinks_assistant,
  navLinks_guest,
} from './navData';
import { useUserRole } from './../../context/UserRoleContext';

const NavBar = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { userRole } = useUserRole();

  let navLinks;
  switch (userRole) {
    case 'teacher':
      navLinks = navLinks_teacher;
      break;
    case 'student':
      navLinks = navLinks_student;
      break;
    case 'admin':
      navLinks = navLinks_admin;
      break;
    case 'assistant':
      navLinks = navLinks_assistant;
      break;
    case 'guest':
      navLinks = navLinks_guest;
      break;
    default:
      navLinks = [];
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`navbar navbar-${theme}`}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
      style={{ width: isMenuOpen ? '180px' : '3rem' }}
    >
      <div className="navbar-buttons">
        {navLinks.map((link) => (
          <div key={link.name}>
            <NavLink
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                isActive ? 'nav-link active-link' : 'nav-link'
              }
            >
              <div className="nav-item-content">
                <div className="nav-item">{link.icon}</div>
                <span
                  className={
                    isMenuOpen && !isMobile ? 'link-name visible' : 'link-name'
                  }
                >
                  {link.name}
                </span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
