import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import usePostRequest from '../../../hooks/usePostRequest';
import Alert from '../../../components/Alert/Alert';
import './CreateAttendance.scss';

const MarkAttendance = ({ setAttendances }) => {
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceNumber, setAttendanceNumber] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [postEndpoint, setPostEndpoint] = useState(null);
  const [postData, setPostData] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
    window.location.href = '/attendance';
  };

  const { response } = usePostRequest(postEndpoint, postData);

  useEffect(() => {
    if (response) {
      setPostEndpoint(null);
      setPostData(null);
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
    setAttendanceStatus(value);
  };

  const handleMark = () => {
    console.log(attendanceNumber, attendanceDate, attendanceStatus);
    if (attendanceNumber && attendanceDate && attendanceStatus) {
      handleAlertClick();
      setPostEndpoint('assistant/attendance/');
      setPostData({
        studentId: attendanceNumber,
        date: attendanceDate,
        status: attendanceStatus,
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="markAttendanceContainer teacher">
      <div className="closeButtonContainer">
        <Button
          variant={'primary'}
          text="Close"
          onClick={() => (window.location.href = '/attendance')}
        />
      </div>
      <h2 className="title">Mark Attendance</h2>
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
            type="date"
            value={attendanceDate}
            onChange={handleDateChange}
            className="inputField"
          />
        </label>
      </div>
      <div className="inputContainer">
        <label>
          <p>Enter the status</p>
          <select
            value={attendanceStatus}
            onChange={handleStatusChange}
            className="inputField"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
      </div>
      <div className="markButtonContainer">
        <Button variant={'primary'} text="Mark" onClick={handleMark} />
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

export default MarkAttendance;
