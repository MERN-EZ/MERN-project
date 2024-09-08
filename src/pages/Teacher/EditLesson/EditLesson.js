import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import usePutRequest from '../../../hooks/usePutRequest';
import Alert from '../../../components/Alert/Alert';
import './EditLessons.scss';
import { useLocation } from 'react-router-dom';

const EditLesson = ({ setLessons }) => {
  const [lessonName, setLessonName] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [nameCharCount, setNameCharCount] = useState(0);
  const [numberCharCount, setNumberCharCount] = useState(0);
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);
  const location = useLocation();
  const lessonId = new URLSearchParams(location.search).get('lessonId');

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
    window.location.href = '/homework';
  };
  const [showAlert2, setShowAlert2] = useState(false);

  const handleErrorAlert = () => {
    setShowAlert2(false);
  };

  const { response } = usePutRequest(putEndpoint, putData);

  useEffect(() => {
    if (response) {
      setPutEndpoint(null); // Reset to prevent re-puting
      setPutData(null); // Reset to prevent re-puting
    }
    console.log(response);
  }, [response, setLessons]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setLessonName(value);
      setNameCharCount(value.length);
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setLessonNumber(value);
      setNumberCharCount(value.length);
    }
  };

  const handleEdit = () => {
    if (lessonName && lessonNumber) {
      handleAlertClick();
      setPutData({ title: lessonName, id: lessonNumber });
      console.log(lessonId);
      console.log('teacher/lessons/' + lessonId);
      setPutEndpoint('teacher/lessons/' + lessonId);
    } else setShowAlert2(true);
  };

  return (
    <div className="createLessonContainer teacher">
      <div className="closeButtonContainer">
        <Button
          variant={'primary'}
          text="Close"
          onClick={() => (window.location.href = '/homework')}
        />
      </div>
      <h2 className="title">Edit Lesson</h2>
      <div className="inputContainer">
        <label>
          <p>Enter Lesson Number</p>
          <input
            type="text"
            value={lessonNumber}
            onChange={handleNumberChange}
            className="inputField"
          />
          <span className="charCount">{numberCharCount}/10</span>
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter Lesson Title</p>
          <input
            type="text"
            value={lessonName}
            onChange={handleNameChange}
            className="inputField"
          />
          <span className="charCount">{nameCharCount}/30</span>
        </label>
      </div>
      <div className="createButtonContainer">
        <Button variant={'primary'} text="Update" onClick={handleEdit} />
      </div>{' '}
      {showAlert && (
        <Alert
          message="Lesson Updated Successfully"
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
      {showAlert2 && (
        <Alert
          message="Enter Lesson Number and Title"
          variant="message"
          onCancel={handleErrorAlert}
        />
      )}
    </div>
  );
};

export default EditLesson;
