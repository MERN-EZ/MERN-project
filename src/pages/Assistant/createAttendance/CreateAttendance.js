import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import usePostRequest from '../../../hooks/usePostRequest';
import Alert from '../../../components/Alert/Alert';
import './CreateAttendance.scss';

const CreateAttendance = ({ setAttendances }) => {
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceNumber, setAttendanceNumber] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [postEndpoint, setPostEndpoint] = useState(null);
  const [postData, setPostData] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
    window.location.href = '/homework';
  };

  const { response } = usePostRequest(postEndpoint, postData);

  useEffect(() => {
    if (response) {
      setPostEndpoint(null); // Reset to prevent re-posting
      setPostData(null); // Reset to prevent re-posting
    }
    console.log(response);
  }, [response, setAttendances]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setAttendanceDate(value);
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setAttendanceNumber(value);
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setAttendanceStatus(value);
    }
  };

  const handleCreate = () => {
    if (attendanceNumber && attendanceDate && attendanceStatus) {
      handleAlertClick();
      //setPostData({ title: attendanceName, id: attendanceNumber, homwork: [] });
      setPostEndpoint('teacher/attendances/');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="createAttendanceContainer teacher">
      <div className="closeButtonContainer">
        <Button
          variant={'primary'}
          text="Close"
          onClick={() => (window.location.href = '/homework')}
        />
      </div>
      <h2 className="title">Create Attendance</h2>
      <div className="inputContainer">
        <label>
          <p>Enter Student ID</p>
          <input
            type="text"
            value={attendanceNumber}
            onChange={handleNumberChange}
            className="inputField"
          />
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter the date</p>
          <input
            type="text"
            value={attendanceDate}
            onChange={handleDateChange}
            className="inputField"
          />
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter the status</p>
          <input
            type="text"
            value={attendanceStatus}
            onChange={handleStatusChange}
            className="inputField"
          />
        </label>
      </div>
      <div className="createButtonContainer">
        <Button variant={'primary'} text="Create" onClick={handleCreate} />
      </div>{' '}
      {showAlert && (
        <Alert
          message="Attendance Added Successfully"
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}
    </div>
  );
};

export default CreateAttendance;
