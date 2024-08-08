// src/components/Dashboard.js
import React from 'react';
import ClassCard from './ClassCard';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data
  const classes = [
    { className: 'Math 101', date: '2024-08-10', time: '10:00 AM', instructor: 'John Doe' },
    { className: 'History 202', date: '2024-08-11', time: '1:00 PM', instructor: 'Jane Smith' },
    { className: 'Biology 303', date: '2024-08-12', time: '3:00 PM', instructor: 'Alice Johnson' }
  ];

  return (
    <div className="dashboard">
      <h1>Assistant Dashboard</h1>
      <div className="class-cards-container">
        {classes.map((classItem, index) => (
          <ClassCard
            key={index}
            className={classItem.className}
            date={classItem.date}
            time={classItem.time}
            instructor={classItem.instructor}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
