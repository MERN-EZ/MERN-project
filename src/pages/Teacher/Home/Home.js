import React, { useEffect, useState } from 'react';
import './Home.scss';
import useGetRequest from '../../../hooks/useGetRequest';
import Alert from '../../../components/Alert/Alert';

const GuestHomePage = () => {
  const { data, error, loading } = useGetRequest('teacher/class');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data) setCourses(data[0]);
  }, [data]);

  const [homework, setHomework] = useState([]);
  const { data: homeworkData } = useGetRequest('teacher/homework');

  useEffect(() => {
    if (homeworkData) {
      const flattenedHomework = homeworkData.flatMap(
        (lesson) => lesson.homework
      );
      setHomework(flattenedHomework);
    }
  }, [homeworkData]);

  const [showAlert, setShowAlert] = useState(true);
  if (loading && showAlert)
    return (
      <Alert
        message={'Loading...'}
        variant={'message'}
        onCancel={() => setShowAlert(false)}
      />
    );
  if (error && showAlert)
    return (
      <Alert
        message={'Error: ' + error}
        variant={'message'}
        onCancel={() => setShowAlert(false)}
      />
    );

  return (
    <div className="teacher-home container">
      <section className="course-section">
        {courses ? (
          <div className="course-card">
            <h2>{courses.name}</h2>
            <p className="course-location">{courses.location}</p>
            <p className="course-time">{courses.time}</p>

            <div className="ongoing-lesson">
              <p>Ongoing Lesson: {courses.ongoingLesson}</p>
            </div>
          </div>
        ) : (
          <p>Error fetching content</p>
        )}
      </section>
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Home Works</h2>
        <div className="homework-items-container">
          {homework.length === 0 ? (
            <p>No homework</p>
          ) : (
            <div className="homework-items">
              {homework.map(({ _id, title, description, deadline }) => (
                <div
                  key={_id}
                  className="homework-item"
                  onClick={() => (window.location.href = `/homework`)}
                >
                  <div>
                    <span> {deadline.split('T')[0]}</span>
                    <pre>- </pre>
                    <span className="hw-title"> {title}</span>
                  </div>
                  <div>
                    <pre className="des">* {description}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GuestHomePage;
