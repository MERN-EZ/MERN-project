import React, { useState } from 'react';
import Homework from './Homework';
import Button from './../../../components/Button/Button';
import './Lesson.scss';
import Alert from '../../../components/Alert/Alert';

const Lesson = ({ lesson, deleteLesson, updateLesson }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [showAlert, setShowAlert] = useState(false);
  const handleDeleteClick = () => {
    setShowAlert(true);
  };
  const handleConfirmDelete = () => {
    deleteLesson(lesson._id);
    setShowAlert(false);
  };
  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  return (
    <div className="teacher lesson">
      <div className="lesson-header" onClick={toggleOpen}>
        <h2>
          Lesson {lesson.id}: {lesson.title}
        </h2>
        <button>{isOpen ? '▼' : '▶'}</button>
      </div>
      {isOpen && (
        <div className="lesson-body">
          {lesson.homework.length === 0 ? (
            <div id="no-homework">No homeworks currently</div>
          ) : (
            lesson.homework.map((homework, index) => (
              <Homework
                key={homework.id}
                homework={homework}
                index={index}
                lesson_id={lesson._id}
              />
            ))
          )}
          <div className="buttons">
            <span className="left-btn-group">
              <Button
                onClick={() => updateLesson(lesson._id, 'edit-lesson')}
                text="Edit Lesson"
                variant={'alt'}
              ></Button>
              <Button
                onClick={handleDeleteClick}
                variant={'alt'}
                text="Delete Lesson"
                margin={'0'}
              ></Button>
            </span>
            <Button
              onClick={() => updateLesson(lesson._id)}
              text="Add Homework"
              variant={'primary'}
              className="right-btn-group"
            ></Button>
          </div>
        </div>
      )}
      {showAlert && (
        <Alert
          message="Are you sure you want to delete this lesson?"
          variant={'action'}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Lesson;
