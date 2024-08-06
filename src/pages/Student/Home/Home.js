import React from 'react';
import './Home.css';
import './../../../App.css';
import Button from '../../../components/common/Button/Button';
import classImage from './../Images/classImage.png';
import homeworkData from './homeWorkData';

const RegStudentLanding = () => {
  return (
    <div className="container">
      <header className="class-info-rounded-edge-rectangle">
        <div className="class-info">
          <h1>Ordinary Level ICT 22/223</h1>
          <p>
            Nugegoda - ISM<br/>
            6.00 P.M. - 8.00 P.M. <Button text="Show Calendar" variant="secondary" onClick={() => { /* Your click handler here */ }} />
          </p>
        </div>
        <div className="header-actions">
          <img src={classImage} alt="Classroom" className="image" />
        </div>
      </header>
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Home Works</h2>
        <a href="#more-homeworks" className="see-more-link">See More</a>
        <div className="homework-items-container">
          <div className="homework-items">
            {homeworkData.map((homework) => (
              <div key={homework.id} className="homework-item">
                <h3>{homework.title}</h3>
                <p>{homework.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="deadlines">
        <h2>Deadlines</h2>
        <div className="deadline-item">
          <h3>Home work 1.2</h3>
          <p>Due on: 2022/03/05</p>
          <p>11.59 p.m.</p>
        </div>
      </section>
    </div>
  );
};

export default RegStudentLanding;
