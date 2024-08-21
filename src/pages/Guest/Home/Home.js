import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import Button from '../../../components/common/Button/Button';
import useGetRequest from '../../../hooks/useGetRequest';
import Teacher from '../../../images/Teacher.jpg'; // Ensure the correct path

const GuestHomePage = () => {
  const [courses, setCourses] = useState([]);
  console.log('Before get request');
  const { data, error, loading } = useGetRequest('guest/classes'); // Ensure the correct endpoint
  useEffect(() => {
    if (data) {
      setCourses(data);
    }
  }, [data]);

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Courses Data:', courses);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="guest-home container">
      <header className="primary-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="primary-header-title">
              G.C.E. Advanced Level
              <br />
              Information & Communication Technology
              <br />
              <span className="primary-header-author">by Savith Panangama</span>
            </h1>
          </div>
          <div className="header-image-wrapper">
            <img src={Teacher} alt="Teacher" className="header-image" />
          </div>
        </div>
      </header>
      <section className="course-section">
        {courses && courses.length > 0 ? (
          courses.map((course, index) => (
            <div className="course-card" key={index}>
              <h2>{course.name}</h2>
              <p className="course-location">{course.location}</p>
              <p className="course-time">{course.time}</p>
              <Link to={`/register?year=${course.year}`}>
                <Button text="Enroll the Class" variant="primary" />
              </Link>
              <div className="ongoing-lesson">
                <p>Ongoing Lesson: {course.ongoingLesson}</p>
                <p>
                  Admission Fee: Rs.{' '}
                  {course.admissionFee ? course.admissionFee.toFixed(2) : '-'}
                </p>
                <p>
                  Monthly Fee: Rs.{' '}
                  {course.monthlyFee ? course.monthlyFee.toFixed(2) : '-'}
                </p>
                <p>
                  To complete your registration, please pay the admission fee.
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </section>
    </div>
  );
};

export default GuestHomePage;
