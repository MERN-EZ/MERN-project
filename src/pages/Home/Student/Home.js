import React from 'react';
import './Home.css';

const RegStudentLanding = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Ordinary Level ICT 22/223</h1>
        <p>Nugegoda - ISM</p>
        <button>Show Calendar</button>
        <img src="path/to/your/image.png" alt="Classroom" className="image"/>
      </header>
      <section className="homework-list">
        <h2>Home Works</h2>
        <div className="homework-item">
          <h3>Home Work 1</h3>
          <p>Create an ER diagram</p>
        </div>
        <div className="homework-item">
          <h3>Home Work 2</h3>
          <p>Monthly paper</p>
        </div>
        <div className="homework-item">
          <h3>Home Work 3</h3>
          <p>IP address tutorial</p>
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
