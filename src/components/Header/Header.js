import React from 'react';
import './Header.css';
import { useUserRole } from './../../context/UserRoleContext';
import {
  // student_tabs,
  teacher_tabs,
  assistant_tabs,
  admin_tabs,
  //guest_tabs,
} from './tabs';
import { useDB } from './../../context/DatabaseContext';

const Header = () => {
  const { userRole } = useUserRole();
  const { DB, setDB } = useDB();

  const tabButtonsMap = {
    teacher: teacher_tabs,
    // student: student_tabs,
    admin: admin_tabs,
    assistant: assistant_tabs,
    //guest: guest_tabs,
  };
  const tab_buttons = tabButtonsMap[userRole] || [];

  const getSubHeaderText = () => {
    switch (userRole) {
      case 'teacher':
        return 'Teacher Dashboard';
      case 'admin':
        return 'Admin Panel';
      default:
        return 'Welcome';
    }
  };
  const rolesWithSubHeader = [
    'student',
    'teacher',
    'admin',
    'assistant',
    //'guest',
  ];
  const rolesWithSubHeaderTabs = ['teacher', 'admin', 'assistant'];
  const rolesWithSubHeaderText = ['student', 'teacher', 'admin', 'assistant'];
  const rolesWithBatchToggler = ['teacher', 'admin'];

  const handleDBChange = (event) => {
    const selectedDB = event.target.value;
    setDB(selectedDB);
  };

  return (
    <header className="main-header">
      <div className="header-bar">
        <div className="logo-container">
          <img src=" /assets/logo.png" alt="Sci ~ Ez Logo" className="logo" />
          <h1 className="site-title">InfoTech</h1>
        </div>
        {rolesWithBatchToggler.includes(userRole) && (
          <div className="db-switch-button">
            <select onChange={handleDBChange} value={DB}>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        )}
      </div>
      {rolesWithSubHeader.includes(userRole) && (
        <div className="tabs">
          {rolesWithSubHeaderText.includes(userRole) && (
            <span className="tab-text">{getSubHeaderText()}</span>
          )}
          {rolesWithSubHeaderTabs.includes(userRole) && (
            <span className="tab-buttons">
              <ul>
                {tab_buttons.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className={link.isActive ? 'active' : ''}
                    >
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
