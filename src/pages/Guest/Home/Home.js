import React from 'react';
import './Home.scss'; // Link to your SCSS stylesheet for the home page
import Button from '../../../components/common/Button/Button'; // Import the Button component

const GuestHomePage = () => {
  return (
    <div className="App">
      <header className="primary-header">
        <h1 className="primary-header-title">
          G.C.E. Ordinary Level
          <br />
          Information & Communication Technology
          <br />
          <span className="primary-header-author">by Savith Panangama</span>
        </h1>
      </header>
      <section className="course-section">
        <div className="course-card">
          <h2>Ordinary Level ICT 24</h2>
          <p className="course-location">Nugegoda - ISM</p>
          <p className="course-time">Monday: 3pm to 6pm</p>
          <Button text="Enroll the Class" variant="primary" />
          <div className="ongoing-lesson">
            <p>Ongoing Lesson: Flip Flops</p>
            <p>Admission Fee: Rs. 1500.00</p>
            <p>Monthly Fee: Rs. 2500.00</p>
            <p>To complete your registration, please pay the admission fee.</p>
          </div>
        </div>
        <div className="course-card">
          <h2>Ordinary Level ICT 25</h2>
          <p className="course-location">Nugegoda - ISM</p>
          <p className="course-time">Tuesday: 3pm to 6pm</p>
          <Button text="Enroll the Class" variant="primary" />
          <div className="ongoing-lesson">
            <p>Ongoing Lesson: Flip Flops</p>
            <p>Admission Fee: Rs. 1500.00</p>
            <p>Monthly Fee: Rs. 2500.00</p>
            <p>To complete your registration, please pay the admission fee.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestHomePage;
