import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './homeWorkSubmission.scss';
import useGetRequest from '../../../hooks/useGetRequest';

const HomeworkSubmissionComponent = () => {
  const { homeworkId } = useParams();
  const navigate = useNavigate(); 
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedHomework, setExpandedHomework] = useState(null);
  const [submissionLinks, setSubmissionLinks] = useState({});
  const [submittedHomeworkIds, setSubmittedHomeworkIds] = useState(new Set()); 

  const [lessons, setLessons] = useState([]);
  const { data } = useGetRequest('student/homeworks');

  useEffect(() => {
    if (data) {
      // Group the homework by lesson title
      const groupedLessons = data.reduce((acc, item) => {
        const existingLesson = acc.find(lesson => lesson.title === item.title);
        if (existingLesson) {
          existingLesson.homework.push(item.homework);
        } else {
          acc.push({
            title: item.title,
            homework: [item.homework],
          });
        }
        return acc;
      }, []);
      
      setLessons(groupedLessons);
    }
  }, [data]);

  // Automatically expand the lesson and homework based on the homeworkId in the URL
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
    setExpandedHomework(null);
    navigate('/homework-submission#homeworksmore');
  };

  const toggleHomework = (lessonIndex, homeworkIndex) => {
    const selectedHomework = lessons[lessonIndex].homework[homeworkIndex];
    setExpandedHomework(homeworkIndex);
    setExpandedLesson(lessonIndex);
    navigate(`/homework-submission/${selectedHomework._id}#homeworksmore`);
  };

  const handleLinkChange = (homeworkId, value) => {
    setSubmissionLinks((prevLinks) => ({
      ...prevLinks,
      [homeworkId]: value,
    }));
  };

  const submitHomework = (homeworkId) => {
    console.log('Submitting homework with ID:', homeworkId);
    setTimeout(() => {
      setSubmittedHomeworkIds((prev) => new Set(prev).add(homeworkId));
      console.log(`Homework with ID ${homeworkId} submitted successfully!`);
    }, 1000);
  };

  const updateHomework = (homeworkId) => {
    console.log('Updating homework with ID:', homeworkId);
  };

  const deleteHomework = (homeworkId) => {
    console.log('Deleting homework with ID:', homeworkId);
  };

  const getTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;

    if (timeDiff <= 0) {
      return <span className="deadline-passed">Deadline passed</span>;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, and ${minutes} minutes left`;
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
              Lesson {lessonIndex + 1}: {lesson.title}
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
                >
                  <div
                    className="homework-header"
                    onClick={() => toggleHomework(lessonIndex, homeworkIndex)}
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
                        <div>
                          <input
                            type="text"
                            placeholder="Enter Google link"
                            value={submissionLinks[homework._id] || ''}
                            onChange={(e) =>
                              handleLinkChange(homework._id, e.target.value)
                            }
                            disabled={submittedHomeworkIds.has(homework._id)}
                          />
                        </div>
                      </div>
                      <div className="submit-btn">
                        <button
                          onClick={() => submitHomework(homework._id)}
                          disabled={submittedHomeworkIds.has(homework._id)}
                        >
                          Submit Homework
                        </button>
                        <button onClick={() => updateHomework(homework._id)}>Update Homework</button>
                        <button onClick={() => deleteHomework(homework._id)}>Delete Homework</button>
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
