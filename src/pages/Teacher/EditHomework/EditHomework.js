import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import usePutRequest from '../../../hooks/usePutRequest';
import Alert from '../../../components/Alert/Alert';
import './EditHomework.scss';
import { useLocation } from 'react-router-dom';

const EditHomework = () => {
  const [homeworkName, setHomeworkName] = useState('');
  const [homeworkDescription, setHomeworkDescription] = useState('');
  const [nameCharCount, setNameCharCount] = useState(0);
  const [desciptionCharCount, setDescriptionCharCount] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);
  const location = useLocation();
  const lessonId = new URLSearchParams(location.search).get('lessonId');
  const homeworkId = new URLSearchParams(location.search).get('homeworkId');

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  const handleCancelAlert = () => {
    setShowAlert(false);
    window.location.href = '/homework';
  };

  const { response, error, loading } = usePutRequest(putEndpoint, putData);

  useEffect(() => {
    setShowAlert(true);
    console.log(response, error);
  }, [response, error]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setHomeworkName(value);
      setNameCharCount(value.length);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setHomeworkDescription(value);
      setDescriptionCharCount(value.length);
    }
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const reminderOptions = [
    { name: 'reminder1', label: '2 days before' },
    { name: 'reminder2', label: '1 day before' },
    { name: 'reminder3', label: '3 hours before' },
  ];
  const [reminders, setReminders] = useState({
    reminder1: false,
    reminder2: false,
    reminder3: false,
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setReminders((prevReminders) => ({
      ...prevReminders,
      [name]: checked,
    }));
  };
  const handleEdit = () => {
    if (homeworkName && homeworkDescription && deadline) {
      setShowAlert2(true);
      setPutData({
        title: homeworkName,
        description: homeworkDescription,
        reminders: Object.values(reminders),
        deadline: deadline,
      });
      setPutEndpoint(`teacher/homework/${lessonId}/${homeworkId}`);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="editHomeworkContainer teacher">
      <div className="closeButtonContainer">
        <Button
          variant={'primary'}
          text="Close"
          onClick={() => (window.location.href = '/homework')}
        />
      </div>
      <h2 className="title">Edit Homework</h2>
      <div className="inputContainer">
        <label>
          <p>Enter Homework Title</p>
          <input
            type="text"
            value={homeworkName}
            onChange={handleNameChange}
            className="inputField"
          />
          <span className="charCount">{nameCharCount}/30</span>
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter Description</p>
          <input
            type="text"
            value={homeworkDescription}
            onChange={handleDescriptionChange}
            className="inputField"
          />
          <span className="charCount">{desciptionCharCount}/100</span>
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter Deadline</p>
          <input
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
            className="inputField"
          />
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter Reminders</p>
          {reminderOptions.map((option) => (
            <div key={option.name}>
              <label>
                <input
                  type="checkbox"
                  name={option.name}
                  checked={reminders[option.name]}
                  onChange={handleCheckboxChange}
                />
                {option.label}
              </label>
            </div>
          ))}
        </label>
      </div>
      <div className="editButtonContainer">
        <Button variant={'primary'} text="Edit" onClick={handleEdit} />
      </div>{' '}
      {showAlert && error && (
        <Alert
          message={`Error: ${error.message}`}
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
      {showAlert && response && (
        <Alert
          message={`Homework updated successfully`}
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
      {showAlert2 && loading && (
        <Alert
          message={`Updating...`}
          variant="message"
          onCancel={() => setShowAlert2(false)}
        />
      )}
    </div>
  );
};

export default EditHomework;
