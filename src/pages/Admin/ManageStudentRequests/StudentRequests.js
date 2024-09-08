import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, Button, Stack } from '@mui/material';
import './StudentRequests.scss';
import useGetRequest from '../../../hooks/useGetRequest';
import Alert from './../../../components/Alert/Alert';
import { useDB } from './../../../context/DatabaseContext'; 

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
  const { DB } = useDB(); // Retrieve the current DB from context
  const { data, error, loading } = useGetRequest('admin/studentRequests'); // Fetch student requests

  // State to store student requests 
  const [requests, setRequests] = useState([]);

  const [actionLoading, setActionLoading] = useState(false);

  // Update the requests state when data is successfully fetched
  useEffect(() => {
    if (data) setRequests(data);
  }, [data]);

  // Function to handle 'accept' or 'reject' actions
  const handleAction = async (studentId, action) => {
    if (
      window.confirm(
        `Are you sure you want to ${action} the student with ID ${studentId}?`
      )
    ) {
      setActionLoading(true);
      try {
        // Send a PUT request to backend to accept or reject the student
        const response = await fetch(
          `http://localhost:5000/admin/studentRequests/${action}/${studentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'db-name': DB, // Pass the current DB in the headers
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

        // Update requests state based on action (accept/reject)
        setRequests((prevRequests) => {
          if (action === 'accept') {
            // Remove accepted student from the list
            return prevRequests.filter(
              (request) => request.studentId !== studentId
            );
          } else {
            // Update rejected student status in the list
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
        setActionLoading(false);
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
      {/* Create a table with student request data */}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* Table headers */}
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
          {/* Map through requests and display each as a table row */}
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
                {/* Action buttons for accepting/rejecting requests */}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAction(request.studentId, 'accept')}
                    disabled={request.status !== 'Pending'}
                  >
                    Accept
                  </Button>
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
