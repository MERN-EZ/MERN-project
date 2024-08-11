import React, { useState } from 'react';
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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StudentRequests = () =>{
    // Initialize state for requests
    const [requests, setRequests] = useState([
    { stId: 1001, firstName: 'Ravindi', lastName: 'Fernando', email: 'Ravindi.F23@gmail.com', registeredDate: '2024-07-30', batch: '2025', transactionId: 'TR001', status: 'pending' },
    { stId: 1002, firstName: 'Oneli', lastName: 'Perera', email: 'Oneli.F23@gmail.com', registeredDate: '2024-07-30', batch: '2024', transactionId: 'TR002', status: 'pending' },
    ]);

    // Handle the "Accept" action for a student request
    const handleAccept = (stId) => {
        setRequests((prevRequests) => prevRequests.filter((request) => request.stId !== stId));
        alert(`Student with ID ${stId} request successfully accepted.`);
    };

    // Handle the "Reject" action for a student request
    const handleReject = (stId) => {
    setRequests((prevRequests) =>
        prevRequests.map((request) =>
        request.stId === stId ? { ...request, status: 'rejected' } : request
        )
    );
    alert(`Student with ID ${stId} request rejected.`);
    };
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
            <StyledTableCell align="center">Batch</StyledTableCell>
            <StyledTableCell align="center">Transaction ID</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <StyledTableRow key={request.stId}>
              <StyledTableCell component="th" scope="row" align="center">
              {request.stId}
              </StyledTableCell>
              <StyledTableCell align="center">{request.firstName}</StyledTableCell>
              <StyledTableCell align="center">{request.lastName}</StyledTableCell>
              <StyledTableCell align="center">{request.email}</StyledTableCell>
              <StyledTableCell align="right">{request.registeredDate}</StyledTableCell>
              <StyledTableCell align="center">{request.batch}</StyledTableCell>
              <StyledTableCell align="center">{request.transactionId}</StyledTableCell>
              <StyledTableCell >
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained" color="success"
                            onClick={() => handleAccept(request.stId)}
                            disabled={request.status !== 'pending'}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="contained" color="error"
                            onClick={() => handleReject(request.stId)}
                            disabled={request.status !== 'pending'}
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
}

export default StudentRequests;