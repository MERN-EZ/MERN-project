import React, { useState, useEffect } from 'react';
import './Attendance.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../../../context/DatabaseContext';

const Attendance = () => {
  const [searchId, setSearchId] = useState('');
  const [sendId, setSendId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const { DB } = useDB();

  const navigate = useNavigate();

  useEffect(() => {
    if (!sendId) return;
    const fetchAttendanceData = async (searchId, DB) => {
      try {
        console.log('searchId ', searchId);
        const response = await axios.get(
          `http://localhost:5000/assistant/attendance/${searchId}`,
          { headers: { 'db-name': DB } }
        );
        console.log('response', response);
        console.log('response', response.data[0]);
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setSendId(null);
      }
    };

    fetchAttendanceData(searchId, DB);
  }, [sendId, DB, searchId]);

  const handleIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleToggleAttendance = (id, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.studentId === id ? { ...student, attendance: status } : student
      )
    );
  };

  const handleCreateClick = () => {
    navigate('/attendance/create'); 
  };
  const handleEditClick = (id) => {
    navigate(`/attendance/edit`); 
  };

  return (
    <div className="attendance-container">
      <h2>Mark Attendance</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by student ID"
          value={searchId}
          onChange={handleIdChange}
        />
      </div>
      <div className="table-buttons-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record) => (
              <tr key={record.studentId}>
                <td>{record.date}</td>
                <td>
                  <div className="attendance-options">
                    <span
                      className={`${
                        record.status === 'Present' ? 'present' : 'absent'
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="record-buttons">
          <button className="record-button create" onClick={handleCreateClick}>
            Create Record
          </button>
          <button className="record-button edit" onClick={handleEditClick}>
            Edit Record
          </button>
          <button className="record-button delete">Delete Record</button>
          <button
            className="record-button search"
            onClick={() => setSendId(searchId)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
