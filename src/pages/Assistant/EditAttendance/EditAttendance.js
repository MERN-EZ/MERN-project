import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import usePutRequest from '../../../hooks/usePutRequest'; // This is your custom hook for PUT requests
import Alert from '../../../components/Alert/Alert';
import './EditAttendance.scss';

const EditAttendance = () => {
  const [studentID, setStudentID] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  const handleAlertClick = () => {
    setShowAlert(true);
  };

  const handleCancelAlert = () => {
    setShowAlert(false);
    window.location.href = '/attendance';
  };

  const handleErrorAlert = () => {
    setShowAlert2(false);
  };

  const { response } = usePutRequest(putEndpoint, putData);

  useEffect(() => {
    if (response) {
      setPutEndpoint(null);
      setPutData(null);
      console.log('Response received:', response);
    }
  }, [response]);

  const handleIDChange = (e) => setStudentID(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleEdit = () => {
    if (studentID && date) {
      setPutData({
        studentID,
        date,
        attendance: status,
      });
      setPutEndpoint(`assistant/attendance/edit`);
      handleAlertClick();
    } else {
      setShowAlert2(true);
    }
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
            onChange={handleIDChange}
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
            onChange={handleDateChange}
            className="inputField"
          />
        </label>
      </div>

      <div className="inputContainer">
        <label>
          <p>Select Attendance Status</p>
          <select
            value={status}
            onChange={handleStatusChange}
            className="inputField"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
      </div>

      <div className="button-row">
        <div className="editButtonContainer">
          <Button variant={'primary'} text="Update" onClick={handleEdit} />
        </div>

        <div className="closeButtonContainer">
          <Button
            variant={'primary'}
            text="Close"
            onClick={() => (window.location.href = '/attendance')}
          />
        </div>
      </div>

      {showAlert && (
        <Alert
          message="Attendance Updated Successfully"
          variant="message"
          onCancel={handleCancelAlert}
        />
      )}

      {showAlert2 && (
        <Alert
          message="Enter Student ID and Date"
          variant="message"
          onCancel={handleErrorAlert}
        />
      )}
    </div>
  );
};

export default EditAttendance;
