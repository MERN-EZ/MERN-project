import React from 'react';
import './assistant.css';

// BatchCard Component
function BatchCard({ title, link }) {
  return (
    <div className="batch-card">
      <h3>{title}</h3>
      <a href={link} className="batch-card-link">View Details</a>
    </div>
  );
}

// TodaysClass Component
function TodaysClass({ time, location }) {
  return (
    <div className="todays-class">
      <p>{time}</p>
      <p>{location}</p>
    </div>
  );
}

// Calendar Component (Basic Example)
function Calendar() {
  return (
    <div className="calendar">
      <h3>Calendar</h3>
      {/* Implement calendar functionality here */}
    </div>
  );
}

// Assistant Component
function Assistant() {
  return (
    <div className="assistant">
      <Navbar />
      <div className="header">
        <h2>Class Schedule Overview</h2>
        <button>See More</button>
      </div>
      <div className="batch-cards">
        <BatchCard title="2025 OL Batch" link="/batch/2025" />
        {/* Add more BatchCard components as needed */}
      </div>
      <div className="calendar">
        <Calendar />
      </div>
      <div className="todays-classes">
        <h2>Today's Classes</h2>
        <TodaysClass time="Sat 8am-12pm" location="ISM - Nugegoda" />
        {/* Add more TodaysClass components as needed */}
      </div>
    </div>
  );
}

export default Assistant;
