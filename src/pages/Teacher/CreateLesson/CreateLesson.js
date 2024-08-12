import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from '../../../components/common/Button/Button';
import usePostRequest from '../../../hooks/usePostRequest';
import Alert from '../../../components/common/Alert/Alert';
import './CreateLessons.scss';

const CreateLesson = ({ setLessons }) => {
  const [lessonName, setLessonName] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [nameCharCount, setNameCharCount] = useState(0);
  const [numberCharCount, setNumberCharCount] = useState(0);
  const [postEndpoint, setPostEndpoint] = useState(null);
  const [postData, setPostData] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
  };

  const { response } = usePostRequest(postEndpoint, postData);

  useEffect(() => {
    if (response) {
      setPostEndpoint(null); // Reset to prevent re-posting
      setPostData(null); // Reset to prevent re-posting
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

  const handleCreate = () => {
    if (lessonName && lessonNumber) {
      handleAlertClick();
      setPostData({ title: lessonName, id: lessonNumber, homwork: [] });
      setPostEndpoint('lessons/');
    }
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
      <h2 className="title">Create Lesson</h2>
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
      <div className="createButtonContainer">
        <Button variant={'primary'} text="Create" onClick={handleCreate} />
      </div>{' '}
      {showAlert && (
        <Alert
          message="Lesson Added Successfully"
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
    </div>
  );
};

export default CreateLesson;
