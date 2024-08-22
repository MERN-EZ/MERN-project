import React, { useState } from 'react';
import './Attendance.scss';

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchId, setSearchId] = useState('');
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      name: 'John Doe',
      year: '2025',
      attendance: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      year: '2025',
      attendance: true,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      year: '2024',
      attendance: true,
    },
    {
      id: 4,
      name: 'Bob Brown',
      year: '2024',
      attendance: false,
    },
    // Add more students as needed
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearChange = (e) => {
    setSearchYear(e.target.value);
  };

  const handleIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleToggleAttendance = (id, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === id ? { ...student, attendance: status } : student
      )
    );
  };

  const filteredData = attendanceData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      student.year.includes(searchYear) &&
      student.id.toString().includes(searchId)
  );

  return (
    <div className="attendance-container">
      <h2>Mark Attendance</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search student by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Search by year"
          value={searchYear}
          onChange={handleYearChange}
        />
        <input
          type="text"
          placeholder="Search by student ID"
          value={searchId}
          onChange={handleIdChange}
        />
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.year}</td>
              <td>
                <div className="attendance-options">
                  <button
                    className={`attendance-button present ${
                      student.attendance ? 'active' : 'fade'
                    }`}
                    onClick={() => handleToggleAttendance(student.id, true)}
                  >
                    Present
                  </button>
                  <button
                    className={`attendance-button absent ${
                      !student.attendance ? 'active' : 'fade'
                    }`}
                    onClick={() => handleToggleAttendance(student.id, false)}
                  >
                    Absent
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
