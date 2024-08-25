import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import Button from '../../../components/common/Button/Button';
import classImage from './../Images/classImage.png';
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

  const { data: course } = useGetRequest('teacher/class'); // Ensure the correct endpoint
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (course) setCourses(course[0]);
  }, [course]);


  const [homework, setHomework] = useState([]);
  const { data } = useGetRequest('student/homeworks');

  useEffect(() => {
    if (data) {
      // Flatten the homework array from lessons
      const flattenedHomework = data.flatMap((lesson) => lesson.homework);
      setHomework(flattenedHomework);
    }
  }, [data]);

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
          <h1>{courses.name}</h1>
          <p>
            {courses.location}
            <br />
            {courses.time}
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
            {homework.map(({ _id, title, description }) => (
              <div
                key={_id}
                className="homework-item"
                onClick={() => handleDeadlineClick(_id)}
              >
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="deadlines">
        <h2>Deadlines</h2>
        {homework.map(({ _id, title, deadline }) => {
          const { daysLeft, hoursLeft, minsLeft } =
            calculateTimeRemaining(deadline);
          return (
            <div
              key={_id}
              className="deadline-item"
              onClick={() => handleDeadlineClick(_id)}
            >
              <h3>{title}</h3>
              <p className="deadline-details">
                Due on: {new Date(deadline).toLocaleDateString()}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {new Date(deadline).toLocaleTimeString()}
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
