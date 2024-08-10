import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import homeworkData from './../Data/homeWorkData';
import './homeWorkSubmission.scss';

const HomeworkSubmissionComponent = () => {
  const { homeworkId } = useParams();
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedHomework, setExpandedHomework] = useState(null);

  // Function to calculate time left
  const getTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;

    if (timeDiff <= 0) return 'Deadline passed';

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, and ${minutes} minutes left`;
  };

  // Extract unique lessons from homeworkData
  const lessons = Array.from(new Set(homeworkData.map((hw) => hw.lesson))).map(
    (lessonTitle) => ({
      lessonTitle,
      homework: homeworkData.filter((hw) => hw.lesson === lessonTitle),
    })
  );

  // Find the specific homework to highlight
  const homeworkToHighlight = homeworkData.find((hw) => hw.id === homeworkId);

  useEffect(() => {
    // Find the lesson index containing the specific homework
    const lessonIndex = lessons.findIndex((lesson) =>
      lesson.homework.some((hw) => hw.id === homeworkId)
    );

    if (lessonIndex !== -1) {
      setExpandedLesson(lessonIndex);
      const homeworkIndex = lessons[lessonIndex].homework.findIndex(
        (hw) => hw.id === homeworkId
      );
      setExpandedHomework(homeworkIndex);
    }
  }, [homeworkId, lessons]);

  const toggleLesson = (index) => {
    setExpandedLesson(expandedLesson === index ? null : index);
    setExpandedHomework(null);
  };

  const toggleHomework = (lessonIndex, homeworkIndex) => {
    setExpandedHomework(
      expandedHomework === homeworkIndex && expandedLesson === lessonIndex
        ? null
        : homeworkIndex
    );
  };

  return (
    <div className="homework-submission-container">
      {lessons.map((lesson, lessonIndex) => (
        <div key={lessonIndex} className="lesson-section">
          <div
            className="lesson-header"
            onClick={() => toggleLesson(lessonIndex)}
          >
            <h3>
              Lesson {lessonIndex + 1}: {lesson.lessonTitle}
            </h3>
            <span
              className={`arrow ${expandedLesson === lessonIndex ? 'up' : 'down'}`}
            ></span>
          </div>
          {expandedLesson === lessonIndex && lesson.homework.length > 0 && (
            <div className="homework-list">
              {lesson.homework.map((homework, homeworkIndex) => (
                <div key={homeworkIndex} className="homework-item">
                  <div
                    className="homework-header"
                    onClick={() => toggleHomework(lessonIndex, homeworkIndex)}
                  >
                    <span>
                      Homework {homeworkIndex + 1}: {homework.title}
                    </span>
                    <span
                      className={`arrow ${expandedHomework === homeworkIndex ? 'up' : 'down'}`}
                    ></span>
                  </div>
                  {expandedHomework === homeworkIndex && (
                    <div className="homework-details">
                      <p>{homework.description}</p>
                      <div className="deadline">
                        <strong>Deadline:</strong>{' '}
                        {new Date(homework.deadline).toLocaleString()}
                      </div>
                      <div className="time-left">
                        <strong>Time Left:</strong>{' '}
                        {getTimeLeft(homework.deadline)}
                      </div>
                      <button className="submit-btn">Add submission</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {homeworkToHighlight && (
        <div className="highlighted-homework">
          <h2>{homeworkToHighlight.title}</h2>
          <p>{homeworkToHighlight.description}</p>
          <div className="deadline">
            <strong>Deadline:</strong>{' '}
            {new Date(homeworkToHighlight.deadline).toLocaleString()}
          </div>
          <div className="time-left">
            <strong>Time Left:</strong>{' '}
            {getTimeLeft(homeworkToHighlight.deadline)}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkSubmissionComponent;
