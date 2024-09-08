import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './homeWorkSubmission.scss';
import useGetRequest from '../../../hooks/useGetRequest';
import usePostRequest from '../../../hooks/usePostRequest';
import usePutRequest from '../../../hooks/usePutRequest';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import { useUser } from '../../../context/UserContext';

const HomeworkSubmissionComponent = () => {
  const navigate = useNavigate();

  const { homeworkId } = useParams();
  const [lessons, setLessons] = useState([]);

  const { userDetails } = useUser();
  const [student, setStudent] = useState(userDetails);
  const studentId = student.studentId;

  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedHomework, setExpandedHomework] = useState(null);

  const [submissionText, setSubmissionText] = useState({});
  const [submittedHomeworkIds, setSubmittedHomeworkIds] = useState(new Set());
  const [editableHomeworkId, setEditableHomeworkId] = useState(null);

  const [postData, setPostData] = useState(null);
  const [postEndPoint, setPostEndpoint] = useState(null);

  const [putData, setPutData] = useState(null);
  const [putEndpoint, setPutEndpoint] = useState(null);

  const [deleteEndpoint, setDeleteEndpoint] = useState(null);
  const { data: deleteResponse, error: deleteError } =
    useDeleteRequest(deleteEndpoint);
  const [deleteSubmissionData, setDeleteSubmissionData] = useState({
    homeworkId: null,
    studentId: null,
  });

  // get student details
  useEffect(() => {
    if (userDetails) {
      setStudent(userDetails);
    }
  }, [userDetails]);

  //get the homeworks of the respective student
  const {
    data,
    error: getError,
    loading: getLoading,
  } = useGetRequest('student/homeworks', []);

  const {
    response,
    error: postError,
    loading: postLoading,
  } = usePostRequest(postEndPoint, postData);

  const {
    response: putResponse,
    error: putError,
    loading: putLoading,
  } = usePutRequest(putEndpoint, putData);

  const isHomeworkSubmitted = (homeworkId) => {
    console.log('submittedHomeworkIds:', submittedHomeworkIds);
    console.log('Type of submittedHomeworkIds:', typeof submittedHomeworkIds);
    console.log('Instance of Set:', submittedHomeworkIds instanceof Set);
    const isSubmitted = submittedHomeworkIds.has(homeworkId);
    return isSubmitted;
  };

  useEffect(() => {
    if (data) {
      console.log('Homework data:', data);
      const groupedLessons = data.reduce((acc, item) => {
        const existingLesson = acc.find((lesson) => lesson._id === item._id);
        if (existingLesson) {
          existingLesson.homework.push(item.homework);
        } else {
          acc.push({
            _id: item._id,
            title: item.title,
            homework: [item.homework],
          });
        }
        return acc;
      }, []);

      const flattenedLessons = groupedLessons.map((lesson) => ({
        ...lesson,
        homework: lesson.homework.flat(),
      }));

      setLessons(flattenedLessons);

      setSubmittedHomeworkIds((prevIds) => {
        const newIds = new Set(prevIds);
        flattenedLessons.forEach((lesson) => {
          lesson.homework.forEach((hw) => {
            if (
              hw.submissions &&
              hw.submissions.some((sub) => sub.studentId === studentId)
            ) {
              newIds.add(hw._id);
            }
          });
        });
        console.log('New submitted homework IDs:', newIds);
        return newIds;
      });
    }
  }, [data, studentId]);

  //when a homework is submitted add the homework id to the already submitted homeworks list
  useEffect(() => {
    if (response) {
      if (postData && postData.homeworkId) {
        setSubmittedHomeworkIds((prevIds) =>
          new Set(prevIds).add(postData.homeworkId)
        );
      }
      setPostData(null);
    }
  }, [response, postData]);

  const deleteHomework = (homeworkId) => {
    setDeleteSubmissionData({
      homeworkId,
      studentId,
    });


    setDeleteEndpoint(
      `student/homeworks/homework-submissions/${homeworkId}/${studentId}`
    );
  };

  useEffect(() => {
    if (deleteResponse) {
      console.log('Submission deleted successfully:', deleteResponse);
      setSubmittedHomeworkIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(deleteSubmissionData.homeworkId);
        return newIds;
      });
      setDeleteSubmissionData({ homeworkId: null, studentId: null });
      setDeleteEndpoint(null);
    }
  }, [
    deleteResponse,
    deleteSubmissionData.homeworkId,
    deleteSubmissionData.studentId,
  ]);

  useEffect(() => {
    if (deleteError) {
      console.error('Error deleting submission:', deleteError);
    
    }
  }, [deleteError]);

  const handleTextChange = (homeworkId, value) => {
    setSubmissionText((prevText) => ({
      ...prevText,
      [homeworkId]: value,
    }));
  };

  const submitHomework = (homeworkId) => {
    const submissionTextValue = submissionText[homeworkId];

    if (submissionTextValue) {
       // Get the currently expanded lesson
      const selectedLesson = lessons[expandedLesson];
      const lessonId = selectedLesson._id; 

      setPostEndpoint(
        `student/homeworks/homework-submissions/${lessonId}/${homeworkId}`
      );
      console.log('CHECK');
      console.log('ID', studentId);

      setPostData({
        studentId,
        submissionText: submissionTextValue,
        homeworkId,
      });
      console.log('Post data:', postData);
    } else {
      alert('Please enter the submission text');
    }
    console.log('Post data:', postData);
  };

  const updateHomework = (homeworkId) => {
    const submissionTextValue = submissionText[homeworkId];
    

    if (submissionTextValue) {
      const selectedLesson = lessons[expandedLesson]; 
      const lessonId = selectedLesson._id; 

      setPutEndpoint(
        `student/homeworks/homework-submissions/${homeworkId}/${studentId}`
      );

      setPutData({
        lessonId,
        studentId,
        submissionText: submissionTextValue,
      });
    } else {
      alert('Please enter the submission text');
    }
  };

  useEffect(() => {
    if (putResponse) {
      console.log('Homework updated successfully:', putResponse);
      // Disable edit mode after successful update
      setEditableHomeworkId(null); 
      setPutData(null);
      setPutEndpoint(null);
    }
  }, [putResponse]);

  //Expand the selected homework when coming to the page
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

  const enableEditMode = (homeworkId) => {
    setEditableHomeworkId(homeworkId);
  };

  const toggleLesson = (index) => {
    setExpandedLesson(expandedLesson === index ? null : index);
    setExpandedHomework(null);
    navigate('/homework-submission#homeworksmore');
  };

  const toggleHomework = (lessonIndex, homeworkIndex) => {
    const selectedHomework = lessons[lessonIndex].homework[homeworkIndex];
    setExpandedHomework(homeworkIndex);
    setExpandedLesson(lessonIndex);
    setEditableHomeworkId(null); 
    navigate(`/homework-submission/${selectedHomework._id}#homeworksmore`);
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

  const convertToSriLankanTime = (utcDate) => {
    const date = new Date(utcDate);
    const options = {
      timeZone: 'Asia/Colombo', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleString('en-US', options);
  };

  if (getLoading || postLoading || putLoading) {
    return <div>Loading...</div>;
  }

  if (postError || putError) {
    return (
      <div className="error">
        An error occurred:{' '}
        {getError?.message || postError?.message || putError?.message}
      </div>
    );
  }

  if (getError) {
    return (
      <div className="homework-submission-container">
        <div className="lesson-section">
          <div class="nohw">No homeworks available.</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="homework-submission-container"
      key={submittedHomeworkIds.size}
    >
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
                        className={`arrow ${expandedHomework === homeworkIndex ? 'up' : 'down'}`}
                      ></span>
                    </div>
                    {expandedHomework === homeworkIndex && (
                      <div className="homework-details">
                        <p>
                          <strong>Description:</strong> {homework.description}
                        </p>
                        <p>
                          <strong>Deadline:</strong>{' '}
                          {convertToSriLankanTime(homework.deadline)}
                        </p>
                        <p>
                          <strong>Time left:</strong>{' '}
                          {getTimeLeft(homework.deadline)}
                        </p>
                        <textarea
                          value={submissionText[homework._id] || ''}
                          onChange={(e) =>
                            handleTextChange(homework._id, e.target.value)
                          }
                          placeholder="Enter your submission here..."
                          disabled={
                            isHomeworkSubmitted(homework._id) &&
                            editableHomeworkId !== homework._id
                          }
                          className="submission-textarea"
                        ></textarea>
                        <div className="button-container">
                          {isHomeworkSubmitted(homework._id) &&
                          editableHomeworkId !== homework._id ? (
                            <>
                              <button
                                onClick={() => enableEditMode(homework._id)}
                                className="update-btn"
                              >
                                Update Homework
                              </button>
                              <button
                                onClick={() => deleteHomework(homework._id)}
                                className="delete-btn"
                              >
                                Delete Homework
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                isHomeworkSubmitted(homework._id)
                                  ? updateHomework(homework._id)
                                  : submitHomework(homework._id)
                              }
                            >
                              {editableHomeworkId === homework._id
                                ? 'Save'
                                : 'Submit Homework'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No homework available for this lesson.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeworkSubmissionComponent;
