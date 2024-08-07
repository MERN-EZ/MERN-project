import React, { useState, useEffect } from 'react';
import Lesson from './Lesson';
import useGetRequest from './../../../hooks/useGetRequest';
import useDeleteRequest from './../../../hooks/useDeleteRequest';
import './HomeworkManager.css';
import Alert from '../../../components/common/Alert/Alert';

const HomeworkManager = () => {
  const { data, error, loading } = useGetRequest('lessons');
  const [lessons, setLessons] = useState([]);
  const [deleteEndpoint, setDeleteEndpoint] = useState(null);

  const {
    data: deleteData,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  useEffect(() => {
    if (data) {
      setLessons(data);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      setLessons(error);
    }
  }, [error]);

  useEffect(() => {
    if (deleteData) {
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson.id !== deleteData.id)
      );
    }
  }, [deleteData]);

  const deleteLesson = (lessonId) => {
    handleAlertClick();
    setDeleteEndpoint(`lessons/${lessonId}`);
  };

  const updateLesson = (lessonId) => {
    // Update lesson logic
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
  };

  if (loading) return <Alert message="Loading..." variant="message" />;
  if (error) return <p>{error}</p>;

  return (
    <div className="homework-manager">
      {deleteLoading && showAlert && (
        <Alert
          message="Deleting Lesson..."
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
      {deleteError && showAlert && (
        <Alert
          message={`Error: ${deleteError}`}
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
      <div className="lesson-holder">
        {lessons.map((lesson) => (
          <Lesson
            key={lesson._id}
            lesson={lesson}
            deleteLesson={deleteLesson}
            updateLesson={updateLesson}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeworkManager;
