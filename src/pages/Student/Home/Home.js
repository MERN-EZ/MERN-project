import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import Button from '../../../components/common/Button/Button';
import classImage from './../Images/classImage.png';
// import homeworkData from '../Data/homeWorkData';
import useGetRequest from '../../../hooks/useGetRequest';

const calculateTimeRemaining = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate - now;

  const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minsLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return { daysLeft, hoursLeft, minsLeft };
};

const RegStudentLanding = () => {

  const [homework, setHomework] = useState([]);

  const { data} = useGetRequest('student/homeworks');

  useEffect(() => {
    if (data) {
      console.log(data);
      setHomework(data);
    }
  }, [data]);
  console.log(data);

  const navigate = useNavigate();

  const handleShowCalendarClick = () => {
    navigate('/schedule');
  };

  const handleSeeMoreClick = () => {
    navigate('/homework-submission');
  };

  const handleDeadlineClick = (homeworkId) => {
    navigate(`/homework-submission/${homeworkId}`);
  };  

  return (
    <div className="student-home container">
      <header className="class-info-rounded-edge-rectangle">
        <div className="class-info">
          <h1>Ordinary Level ICT 22/223</h1>
          <p>
            Nugegoda - ISM
            <br />
            6.00 P.M. - 8.00 P.M.
            <Button
              text="Show Calendar"
              variant="secondary"
              onClick={handleShowCalendarClick}
            />
          </p>
        </div>
        <div className="header-actions">
          <img src={classImage} alt="Classroom" className="image" />
        </div>
      </header>
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Home Works</h2>
        <a
          href="#homeworksmore-"
          onClick={handleSeeMoreClick}
          className="see-more-link"
        >
          See More
        </a>
        <div className="homework-items-container">
          <div className="homework-items">
            {homework.map((homework) => (
              <div
                key={homework.id}
                className="homework-item"
                onClick={() => handleDeadlineClick(homework.id)}
              >
                <h3>{homework.title}</h3>
                <p>{homework.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="deadlines">
        <h2>Deadlines</h2>
        {homework.map((homework) => {
          const { daysLeft, hoursLeft, minsLeft } = calculateTimeRemaining(
            homework.deadline
          );
          return (
            <div
              key={homework.id}
              className="deadline-item"
              onClick={() => handleDeadlineClick(homework.id)}
            >
              <h3>{homework.title}</h3>
              <p className="deadline-details">
                Due on: {new Date(homework.deadline).toLocaleDateString()}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {new Date(homework.deadline).toLocaleTimeString()}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {daysLeft} days {hoursLeft} hours {minsLeft} minutes left
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default RegStudentLanding;
