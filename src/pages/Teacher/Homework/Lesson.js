import React, { useState } from 'react';
import Homework from './Homework';
import Button from './../../../components/common/Button/Button';
import './Lesson.scss';
import Alert from '../../../components/common/Alert/Alert';

const Lesson = ({ lesson, deleteLesson, updateLesson }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [showPopup, setShowPopup] = useState(false);
  const handleDeleteClick = () => {
    setShowPopup(true);
  };
  const handleConfirmDelete = () => {
    deleteLesson(lesson._id);
    setShowPopup(false);
  };
  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className="teacher lesson">
      <div className="lesson-header" onClick={toggleOpen}>
        <h3>{lesson.title}</h3>
        <button>{isOpen ? '▼' : '▶'}</button>
      </div>
      {isOpen && (
        <div className="lesson-body">
          {lesson.homeworks.map((homework) => (
            <Homework key={homework.id} homework={homework} />
          ))}
          <Button
            onClick={() => updateLesson(lesson.id)}
            text="Edit Lesson"
            variant={'alt'}
            padding={'0.3rem 1rem'}
          ></Button>
          <Button
            onClick={handleDeleteClick}
            variant={'alt'}
            text="Delete Lesson"
            padding={'0.3rem 1rem'}
            margin={'0'}
          ></Button>
        </div>
      )}
      {showPopup && (
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
