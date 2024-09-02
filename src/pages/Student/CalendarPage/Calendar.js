import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './../CalendarPage/calendar.scss'
import useGetRequest from '../../../hooks/useGetRequest';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [homework, setHomework] = useState([]);
  const { data } = useGetRequest('student/homeworks');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (data) {
      const flattenedHomework = data.flatMap((lesson) => lesson.homework);
      setHomework(flattenedHomework);
    }
  }, [data]);

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
    .map((hw) => ({
      date: new Date(hw.deadline),
      id: hw._id, // Include homework ID
    }))
    .filter(({ date }) => date.getMonth() === currentDate.getMonth());

  const handleDayClick = (day) => {
    const deadline = deadlines.find(({ date }) => date.getDate() === day);
    if (deadline) {
      navigate(`/homework-submission/${deadline.id}`); // Navigate to specific homework
    }
  };

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
          const isDeadline = deadlines.some(({ date }) => date.getDate() === day);
          return (
            <div
              key={day}
              className={`calendar-day ${isDeadline ? 'deadline' : ''}`}
              onClick={() => handleDayClick(day)} // Add click handler
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
