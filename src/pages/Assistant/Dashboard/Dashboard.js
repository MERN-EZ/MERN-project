import React from 'react';
import Classcard from './Components/Classcard';
import './Dashboard.scss';

const Dashboard = () => {
  const classes = [
    {
      className: '2024 O/L',
      date: '2024-08-10',
      time: '10:00 AM',
    },
    {
      className: '2025 O/L',
      date: '2024-08-11',
      time: '1:00 PM',
    },

    {
      className: '2026 O/L',
      date: '2024-08-11',
      time: '1:00 PM',
    },
  ];

  const sortedClasses = [...classes].sort((a, b) => {
    const order = ['GRADE 08', 'GRADE 09', 'GRADE 10', 'GRADE 11'];
    return order.indexOf(a.className) - order.indexOf(b.className);
  });

  const totalClassesToday = sortedClasses.filter(
    (c) => new Date(c.date).toDateString() === new Date().toDateString()
  ).length;
  const upcomingClasses = sortedClasses.length;
  const totalStudents = 100; 

  return (
    <div className="dashboard assistant">
      <div className="overview-section">
        <h1>Welcome, Assistant!</h1>
        <div className="flex-container">
          <div className="notifications">
            <h2>Notifications</h2>
            <ul>
              <li>Reminder: Staff meeting at 3 PM today.</li>
              <li>New class schedule has been updated.</li>
            </ul>
          </div>
          <div className="quick-stats">
            <h2>Quick Stats</h2>
            <p>
              Total Classes Today: <span>01</span>
            </p>
            <p>
              Upcoming Classes: <span>01</span>
            </p>
            <p>
              Total Students: <span>140</span>
            </p>
          </div>
        </div>
      </div>

      <div className="classes-section">
        <div className="class-cards-wrapper">
          <h2>Today's Classes</h2>
          <div className="class-cards-container">
            {sortedClasses.map((classItem, index) => (
              <Classcard
                key={index}
                className={classItem.className}
                date={classItem.date}
                time={classItem.time}
              />
            ))}
          </div>
        </div>

        <div className="class-schedule-overview">
          <h2>Class Schedule Overview</h2>
          <div className="info-box-content">
            {sortedClasses.map((classItem, index) => (
              <div className="info-card" key={index}>
                {classItem.className}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
