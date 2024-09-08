import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import usePutRequest from '../../../hooks/usePutRequest';
import Alert from '../../../components/Alert/Alert';
import './EditAttendance.scss';
import { useLocation } from 'react-router-dom';

const EditAttendance = ({ setAttendance }) => {
  const [studentID, setStudentID] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);
  const location = useLocation();
  const attendanceId = new URLSearchParams(location.search).get('attendanceId');

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
    window.location.href = '/attendance';
  };
  const [showAlert2, setShowAlert2] = useState(false);

  const handleErrorAlert = () => {
    setShowAlert2(false);
  };

  const { response } = usePutRequest(putEndpoint, putData);

  useEffect(() => {
    if (response) {
      setPutEndpoint(null); // Reset to prevent re-putting
      setPutData(null); // Reset to prevent re-putting
    }
    console.log(response);
  }, [response, setAttendance]);

  const handleIDChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setStudentID(value);
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setDate(value);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleEdit = () => {
    if (studentID && date) {
      handleAlertClick();
      setPutData({ studentID: studentID, date: date, status: status });
      console.log('attendance/' + attendanceId);
      setPutEndpoint('attendance/' + attendanceId);
    } else setShowAlert2(true);
  };

  return (
    <div className="editAttendanceContainer teacher">
      <div className="closeButtonContainer">
        <Button
          variant={'primary'}
          text="Close"
          onClick={() => (window.location.href = '/attendance')}
        />
      </div>
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
      <div className="editButtonContainer">
        <Button variant={'primary'} text="Update" onClick={handleEdit} />
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
