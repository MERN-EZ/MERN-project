import React, { useState, useEffect } from 'react';
import Lesson from './Lesson';
import useGetRequest from './../../../hooks/useGetRequest';
import useDeleteRequest from './../../../hooks/useDeleteRequest';
import './HomeworkManager.scss';
import Alert from '../../../components/Alert/Alert';
import Button from '../../../components/Button/Button';

const HomeworkManager = () => {
  const { data, error, loading } = useGetRequest('teacher/lessons');
  const [lessons, setLessons] = useState([]);
  const [deleteEndpoint, setDeleteEndpoint] = useState(null);

  const {
    data: deleteData,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  useEffect(() => {
    if (data) {
      console.log(data);
      setLessons(data);
    }
  }, [data]);


  useEffect(() => {
    console.log(deleteData);
    console.log('updating lessons');
    if (deleteData) {
      setLessons(deleteData);
    }
  }, [deleteData]);

  const deleteLesson = (lessonId) => {
    handleAlertClick();
    setDeleteEndpoint(`teacher/lessons/${lessonId}`);
  };

  const updateLesson = (lessonId, type = 'add-homework') => {
    if (type === 'add-homework')
      window.location.href = `/homework/create?lessonId=${lessonId}`;
    else window.location.href = `/lessons/edit?lessonId=${lessonId}`;
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
    <div className="homework-manager teacher">
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
        <div className="create-lesson">
          <Button
            variant={'primary'}
            text="Create lesson"
            onClick={() => (window.location.href = '/lessons/create')}
          ></Button>
        </div>
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
