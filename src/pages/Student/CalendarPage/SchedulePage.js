import React from 'react';
import Calendar from './Calendar'; 
import './schedulePage.scss';

const SchedulePage = () => {
  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1>Ordinary Level ICT 22/223</h1>
        
      </header>
      <section className="schedule-content">
        <Calendar />
      </section>
    </div>
  );
};

export default SchedulePage;
