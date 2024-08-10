import React, { useState } from 'react';
import './Homework.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '../../../components/common/Button/Button';
// import useDeleteRequest from '../../../hooks/useDeleteRequest';

const Homework = ({ homework, index, lesson_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleDelete = () => {
    console.log('delete homework');
  };
  return (
    <div className="homework teacher">
      <div className="homework-header" onClick={toggleOpen}>
        <button>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</button>
        <h4>
          Homework {index + 1}: {homework.title}
        </h4>
      </div>
      {isOpen && (
        <div className="homework-body">
          <div className="homework-content">
            <span>{homework.description}</span>
            <span className="middle">
              <span>Deadline: {homework.deadline}</span>
              <span>Reminders: {homework.reminders}</span>
            </span>
            <span className="right">
              <Button variant={'alt'} text={'Edit'}></Button>
              <Button
                variant={'alt'}
                text={'Delete'}
                onClick={handleDelete}
              ></Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homework;
