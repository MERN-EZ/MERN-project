import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './homeWorkSubmission.scss';
import useGetRequest from '../../../hooks/useGetRequest';
import usePostRequest from '../../../hooks/usePostRequest';

const HomeworkSubmissionComponent = () => {
  const { homeworkId } = useParams();
  const navigate = useNavigate();
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedHomework, setExpandedHomework] = useState(null);
  const [submissionText, setSubmissionText] = useState({});
  const [submittedHomeworkIds, setSubmittedHomeworkIds] = useState(new Set());

  const [lessons, setLessons] = useState([]);
  const { data } = useGetRequest('student/homeworks');
  const [postData, setPostData] = useState(null);
  const [postEndPoint, setPostEndpoint] = useState(null);
  const { response, error, loading } = usePostRequest(postEndPoint, postData);

  useEffect(() => {
    if (data) {
      const groupedLessons = data.reduce((acc, item) => {
        const existingLesson = acc.find((lesson) => lesson._id === item._id);
        if (existingLesson) {
          existingLesson.homework.push(item.homework);
        } else {
          acc.push({
            _id: item._id, // Ensure _id is included
            title: item.title,
            homework: [item.homework],
          });
        }
        return acc;
      }, []);

      setLessons(groupedLessons);
    }
  }, [data]);

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

  useEffect(() => {
    if (response) {
      if (postData && postData.homeworkId) {
        console.log(postData)
        setSubmittedHomeworkIds((prevIds) =>
          new Set(prevIds).add(postData.homeworkId)
        );
      }
      setPostData(null);
    }
  }, [response, postData]);

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

  const handleTextChange = (homeworkId, value) => {
    setSubmissionText((prevText) => ({
      ...prevText,
      [homeworkId]: value,
    }));
  };

  const submitHomework = (homeworkId) => {
    const submissionTextValue = submissionText[homeworkId];
    const studentId = '66bf72a3360ed91fa26e01d2'; // Replace with actual student ID

    if (submissionTextValue) {
      const selectedLesson = lessons[expandedLesson]; // Get the currently expanded lesson
      console.log('Selected Lesson:', selectedLesson);
      const lessonId = selectedLesson._id; // Using _id for the lesson
      console.log('Selected lesson:', lessonId);
      console.log(
        'Submitting homework:',
        homeworkId,
        'with text:',
        submissionTextValue
      );

      setPostEndpoint(
        `student/homeworks/homework-submissions/${lessonId}/${homeworkId}`
      );

      setPostData({
        studentId,
        submissionText: submissionTextValue,
        homeworkId
      });
      // navigate(`/student/homeworks/homework-submissions/${lessonId}/${homeworkId}`);
    } else {
      alert('Please enter the submission text');
    }
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
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
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
          {expandedLesson === lessonIndex && (
            <div className="homework-list">
              {lesson.homework.length > 0 ? (
                lesson.homework.map((homework, homeworkIndex) => (
                  <div key={homework._id} className="homework-item">
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
                        <div className="submit-text">
                          <div>
                            <input
                              type="text"
                              placeholder="Enter your submission text"
                              value={submissionText[homework._id] || ''}
                              onChange={(e) =>
                                handleTextChange(homework._id, e.target.value)
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
                          <button onClick={() => updateHomework(homework._id)}>
                            Update Homework
                          </button>
                          <button onClick={() => deleteHomework(homework._id)}>
                            Delete Homework
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No homework assigned for this lesson.</p>
              )}
            </div>
          )}
        </div>
      ))}
      {loading && <p>Submitting...</p>}
      {response && <p>Homework submitted successfully!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default HomeworkSubmissionComponent;
