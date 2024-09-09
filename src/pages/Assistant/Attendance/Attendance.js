import React, { useState, useEffect } from 'react';
import './Attendance.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../../../context/DatabaseContext';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import { useAuth } from '../../../context/AuthContext';

const Attendance = () => {
  const [searchId, setSearchId] = useState('');
  const [sendId, setSendId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const { DB } = useDB();
  const { Auth } = useAuth();

  const [deleteRecordData, setDeleteRecordData] = useState({
    studentId: null,
    date: null,
  });

  const [endpoint, setEndpoint] = useState(null);
  const { data: deleteResponse, error: deleteError } =
    useDeleteRequest(endpoint);

  useEffect(() => {
    if (deleteResponse) {
      setAttendanceData((prevData) =>
        prevData.filter(
          (record) =>
            !(
              record.studentId === deleteRecordData.studentId &&
              record.date === deleteRecordData.date
            )
        )
      );
      setDeleteRecordData({ studentId: null, date: null });
      setEndpoint(null);
    }
  }, [deleteResponse, deleteRecordData]);

  useEffect(() => {
    if (deleteError) {
      console.error('Error deleting record:', deleteError);
    }
  }, [deleteError]);

  const handleDeleteClick = (studentId, date) => {
    console.log(studentId, date);
    setDeleteRecordData({ studentId, date });
    setEndpoint(`assistant/attendance/${studentId}/${date}`);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!sendId) return;
    const fetchAttendanceData = async (searchId, DB) => {
      try {
        console.log('searchId ', searchId);
        const response = await axios.get(
          `http://localhost:5000/assistant/attendance/${searchId}`,
          { headers: { 'db-name': DB, Authorization: `Bearer ${Auth}` } }
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
  }, [sendId, DB, searchId, Auth]);

  const handleIdChange = (e) => {
    setSearchId(e.target.value);
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record) => (
              <tr key={record._id}>
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
                <td>
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteClick(record.studentId, record.date)
                    }
                  >
                    Delete
                  </button>
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
