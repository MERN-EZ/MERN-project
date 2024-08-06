import React from 'react';
import Calendar from './Calendar'; // Import the Calendar component
import './SchedulePage.css';

const SchedulePage = () => {
  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1>Ordinary Level ICT 22/223</h1>
        <p>
          Nugegoda - ISM<br />
          Every Saturday 6.00 P.M. - 8.00 P.M.
        </p>
      </header>
      <section className="schedule-content">
        <Calendar />
      </section>
    </div>
  );
};

export default SchedulePage;
