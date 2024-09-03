import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './StudentRequests.scss';
import useGetRequest from '../../hooks/useGetRequest';
import Alert from '../../components/common/Alert/Alert';

// Styled components for customizing the table's appearance
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#78E7F7',
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover, // Alternate background color for odd rows
  },
  '&:last-child td, &:last-child th': {
    border: 0, // Remove border for the last row
  },
}));

// Handle student requests
const StudentRequests = () => {
  // Fetch student requests data from API
  const { data, error, loading } = useGetRequest('admin/studentRequests');

  // State for managing the list of student requests
  const [requests, setRequests] = useState([]);

  // State for indicating whether an action is currently in progress
  const [actionLoading, setActionLoading] = useState(false);

  // Populate the requests state when data is fetched
  useEffect(() => {
    if (data) setRequests(data);
  }, [data]);

  // Handle accept/reject actions on student requests
  const handleAction = async (studentId, action) => {
    if (
      window.confirm(
        `Are you sure you want to ${action} the student with ID ${studentId}?`
      )
    ) {
      setActionLoading(true);
      try {
        // PUT request to update the student's status based on the action
        const response = await fetch(
          `http://localhost:5000/admin/studentRequests/${action}/${studentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ test: 'test' }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to process request');
        }

        const result = await response.json();
        console.log(
          `${action.charAt(0).toUpperCase() + action.slice(1)} student:`,
          result
        );

        // Update the requests state based on the action performed
        setRequests((prevRequests) => {
          if (action === 'accept') {
            // If the action is 'accept', remove the student from the table
            return prevRequests.filter(
              (request) => request.studentId !== studentId
            );
          } else {
            // If the action is 'reject', update the status to 'Rejected'
            return prevRequests.map((request) =>
              request.studentId === studentId
                ? { ...request, status: 'Rejected' }
                : request
            );
          }
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setActionLoading(false); // Reset loading state after the action is complete
      }
    }
  };

  if (loading || actionLoading) {
    return <Alert message="Loading..." variant="message" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Student ID</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Registered Date</StyledTableCell>
            <StyledTableCell align="center">Transaction ID</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Loop through the requests array and display each request as a table row */}
          {requests.map((request) => (
            <StyledTableRow key={request.studentId}>
              <StyledTableCell component="th" scope="row" align="center">
                {request.studentId}
              </StyledTableCell>
              <StyledTableCell align="center">
                {request.firstName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {request.lastName}
              </StyledTableCell>
              <StyledTableCell align="center">{request.email}</StyledTableCell>
              <StyledTableCell align="center">
                {request.registeredDate}
              </StyledTableCell>
              <StyledTableCell align="center">
                {request.transactionId}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Stack direction="row" spacing={2}>
                  {/* Button to accept the student request */}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAction(request.studentId, 'accept')}
                    disabled={request.status !== 'Pending'}
                  >
                    Accept
                  </Button>
                  {/* Button to reject the student request */}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleAction(request.studentId, 'reject')}
                    disabled={request.status !== 'Pending'}
                  >
                    Reject
                  </Button>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentRequests;
