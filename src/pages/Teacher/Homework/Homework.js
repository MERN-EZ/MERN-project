import React, { useState, useEffect } from 'react';
import './Homework.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '../../../components/common/Button/Button';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import Alert from '../../../components/common/Alert/Alert';
// import { set } from 'mongoose';

const Homework = ({ homework, index, lesson_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [endpoint, setEndpoint] = useState(null);
  const { data, error, loading } = useDeleteRequest(endpoint);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setAlertMessage(`Error: ${error}`);
      // setShowAlert(true);
    } else if (data) {
      window.location.href = '/homework';
      setAlertMessage('Homework deleted successfully.');
      // setShowAlert(true);
    }
  }, [loading, error, data]);
  const [showAlert2, setShowAlert2] = useState(false);
  const handleConfirmDelete = () => {
    setShowAlert(false);
    setShowAlert2(true);
    setAlertMessage('Deleting homework...');
    setEndpoint(`teacher/homework/${lesson_id}/${homework.id}`);
  };

  const handleEdit = () => {
    window.location.href = `/homework/edit?lessonId=${lesson_id}&homeworkId=${homework.id}`;
  };
  return (
    <div className="homework teacher">
      {showAlert2 && (data || error) && (
        <Alert
          message={alertMessage}
          variant={'action'}
          onCancel={() => setShowAlert(false)}
          onConfirm={() => (window.location.href = '/homework')}
        />
      )}
      {showAlert && (
        <Alert
          message={'Are you sure you want to delete this homework?'}
          variant={'action'}
          onConfirm={() => handleConfirmDelete()}
          onCancel={() => setShowAlert(false)}
        />
      )}
      <div className="homework-header" onClick={toggleOpen}>
        <button>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</button>
        <h4>
          Homework {index + 1}: {homework.title}
        </h4>
      </div>
      {isOpen && (
        <div className="homework-body">
          <div className="homework-content">
            <span className="first-fr">
              {homework.description}
              <Button
                variant={'primary'}
                text={'Submissions'}
                onClick={() =>
                  (window.location.href = `/homework/view?lessonId=${lesson_id}&homeworkId=${homework.id}`)
                }
              ></Button>
            </span>
            <span className="middle">
              <span>Deadline: {homework.deadline}</span>
              <span>Reminders: {homework.reminders}</span>
            </span>
            <span className="right">
              <Button
                variant={'alt'}
                text={'Edit'}
                onClick={handleEdit}
              ></Button>
              <Button
                variant={'alt'}
                text={'Delete'}
                onClick={() => setShowAlert(true)}
              ></Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homework;
