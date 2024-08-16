// src/components/ClassCard.js
import React from 'react';
import './Classcard.css';

const Classcard = ({ className, date, time, instructor }) => {
  return (
    <div className="class-card">
      <h3 className="class-card-title">{className}</h3>
      <p className="class-card-info">Date: {date}</p>
      <p className="class-card-info">Time: {time}</p>
    </div>
  );
};

export default Classcard;
