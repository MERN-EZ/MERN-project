import React, { useState, useEffect } from 'react';
import './calendar.scss';
import useGetRequest from '../../../hooks/useGetRequest';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [homework, setHomework] = useState([]);

  // Fetch homework data from the server

  const { data} = useGetRequest('student/homeworks');

  useEffect(() => {
    if (data) {
      console.log(data);
      setHomework(data);
    }
  }, [data]);
  console.log(data);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();

  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(i);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get homework deadlines for the current month
  const deadlines = homework
    .map((hw) => new Date(hw.deadline))
    .filter((date) => date.getMonth() === currentDate.getMonth());
    

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <button onClick={prevMonth}>Previous</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>Next</button>
      </header>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index} className="calendar-day-empty"></div>
        ))}
        {daysInMonth.map((day) => {
          const isDeadline = deadlines.some(date => date.getDate() === day);
          console.log(`Day: ${day}, isDeadline: ${isDeadline}`);
          return (
            <div key={day} className={`calendar-day ${isDeadline ? 'deadline' : ''}`}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
