import React from 'react';
import Classcard from './Components/Classcard';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data
  const classes = [
    {
      className: 'GRADE 09',
      date: '2024-08-10',
      time: '10:00 AM',
    },
    {
      className: 'GRADE 08',
      date: '2024-08-11',
      time: '1:00 PM',
    },
    {
      className: 'GRADE 10',
      date: '2024-08-12',
      time: '3:00 PM',
    },
    {
      className: 'GRADE 11',
      date: '2024-08-13',
      time: '2:00 PM',
    }, // New card added
  ];

  // Sort classes so that "GRADE 08" comes before "GRADE 09"
  const sortedClasses = [...classes].sort((a, b) => {
    const order = ['GRADE 08', 'GRADE 09', 'GRADE 10', 'GRADE 11'];
    return order.indexOf(a.className) - order.indexOf(b.className);
  });

  // Sample stats
  const totalClassesToday = sortedClasses.filter(
    (c) => new Date(c.date).toDateString() === new Date().toDateString()
  ).length;
  const upcomingClasses = sortedClasses.length;
  const totalStudents = 100; // Example static number for demonstration

  return (
    <div className="dashboard">
      <div className="overview-section">
        <h1>Welcome, Assistant!</h1>
        <div className="flex-container">
          <div className="notifications">
            <h2>Notifications</h2>
            <ul>
              <li>Reminder: Staff meeting at 3 PM today.</li>
              <li>New class schedule has been updated.</li>
              {/* Add more notifications as needed */}
            </ul>
          </div>
          <div className="quick-stats">
            <h2>Quick Stats</h2>
            <p>
              Total Classes Today: <span>{totalClassesToday}</span>
            </p>
            <p>
              Upcoming Classes: <span>{upcomingClasses}</span>
            </p>
            <p>
              Total Students: <span>{totalStudents}</span>
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
