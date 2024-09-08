import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import usePutRequest from '../../../hooks/usePutRequest';
import Alert from '../../../components/Alert/Alert';
import './EditAttendance.scss';

const EditAttendance = () => {
  const [studentID, setStudentID] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { response, error } = usePutRequest(putEndpoint, putData);

  useEffect(() => {
    if (response) {
      setPutEndpoint(null);
      setPutData(null);
      setAlertMessage('Attendance updated successfully');
      console.log('Response received:', response);
      setShowAlert(true);
    }
  }, [response]);

  useEffect(() => {
    console.log('Error:', error);
    if (error) {
      setAlertMessage('Record not found');
      setShowAlert(true);
    }
  }, [error]);
  const handleEdit = () => {
    if (!studentID || !date)
      return setAlertMessage('Enter Student ID and Date');

    setPutData({ studentID, date, attendance: status });
    setPutEndpoint('assistant/attendance/edit');
  };

  return (
    <div className="editAttendanceContainer teacher">
      <h2 className="title">Edit Attendance</h2>

      <div className="inputContainer">
        <label>
          <p>Enter Student ID</p>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            className="inputField"
          />
        </label>
      </div>

      <div className="inputContainer">
        <label>
          <p>Enter Date</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="inputField"
          />
        </label>
      </div>

      <div className="inputContainer">
        <label>
          <p>Select Attendance Status</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="inputField"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
      </div>

      <div className="button-row">
        <Button variant="primary" text="Update" onClick={handleEdit} />
        <Button
          variant="primary"
          text="Close"
          onClick={() => (window.location.href = '/attendance')}
        />
      </div>

      {showAlert && (
        <Alert
          message={alertMessage}
          variant="message"
          onCancel={() => {
            setAlertMessage('');
            setShowAlert(false);
            window.location.href = '/attendance';
          }}
        />
      )}
    </div>
  );
};

export default EditAttendance;
