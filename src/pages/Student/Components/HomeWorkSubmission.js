import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './homeWorkSubmission.scss';
import useGetRequest from '../../../hooks/useGetRequest';

const HomeworkSubmissionComponent = () => {
  const { homeworkId } = useParams();
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedHomework, setExpandedHomework] = useState(null);
  const [submissionLinks, setSubmissionLinks] = useState({});
  const [homework, setHomework] = useState([]);

  // Fetch homework data from the server
  const { data } = useGetRequest('student/homeworks');

  useEffect(() => {
    if (data) {
      setHomework(data);
    }
  }, [data]);

  // Calculate time left function
  const getTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;

    if (timeDiff <= 0) {
      return <span className="deadline-passed">Deadline passed</span>;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, and ${minutes} minutes left`;
  };

  // Extract unique lessons from homework data
  const lessons = Array.from(new Set(homework.map((hw) => hw.lesson))).map(
    (lessonTitle) => ({
      lessonTitle,
      homework: homework.filter((hw) => hw.lesson === lessonTitle),
    })
  );

  useEffect(() => {
    if (homeworkId && lessons.length > 0) {
      for (let i = 0; i < lessons.length; i++) {
        const homeworkIndex = lessons[i].homework.findIndex(
          (hw) => hw._id === homeworkId
        );
        if (homeworkIndex !== -1) {
          setExpandedLesson(i);
          setExpandedHomework(homeworkIndex);
          break;
        }
      }
    }
  }, [homeworkId, lessons]);

  const toggleLesson = (index) => {
    setExpandedLesson(expandedLesson === index ? null : index);
    setExpandedHomework(null); // Close any expanded homework if the lesson is toggled
  };

  const toggleHomework = (lessonIndex, homeworkIndex) => {
    setExpandedHomework(
      expandedHomework === homeworkIndex && expandedLesson === lessonIndex
        ? null
        : homeworkIndex
    );
  };

  const handleLinkChange = (homeworkId, value) => {
    setSubmissionLinks((prevLinks) => ({
      ...prevLinks,
      [homeworkId]: value,
    }));
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
                <div
                  key={homework._id}
                  className="homework-item"
                  onClick={() => toggleHomework(lessonIndex, homeworkIndex)}
                >
                  <div
                    className="homework-header"
                  >
                    <span>
                      Homework {homeworkIndex + 1}: {homework.title}
                    </span>
                    <span
                      className={`arrow ${
                        expandedHomework === homeworkIndex ? 'up' : 'down'
                      }`}
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
                      <div className="submit-link">
                        <input
                          type="text"
                          placeholder="Enter Google link"
                          value={submissionLinks[homework._id] || ''}
                          onChange={(e) =>
                            handleLinkChange(homework._id, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeworkSubmissionComponent;
