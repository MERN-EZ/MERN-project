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
import usePutRequest from '../../hooks/usePutRequest';
import Alert from '../../components/common/Alert/Alert';

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

const StudentRequests = () => {
  // Fetch student requests data
  const { data, error, loading } = useGetRequest('student/requests');
  
  const [requests, setRequests] = useState(data || []); // State to store student requests
  const [acceptEndpoint, setAcceptEndpoint] = useState(null); // State to store the accept endpoint URL
  const [rejectEndpoint, setRejectEndpoint] = useState(null); // State to store the reject endpoint URL

  const { data: acceptData } = usePutRequest(acceptEndpoint, {});
  const { data: rejectData } = usePutRequest(rejectEndpoint, {});

  // Update requests state when new data is fetched
  useEffect(() => {
    if (data) setRequests(data);
  }, [data]);

  // Handle the response from accepting a student request
  useEffect(() => {
    if (acceptData) {
      // Remove the accepted request from the list
      setRequests((prevRequests) =>
        prevRequests.filter(
          (request) => request.studentId !== acceptData.studentId
        )
      );
      // setRequests(prevRequests => prevRequests.map(request =>
      //   request.studentId === acceptData.studentId ? { ...request, status: 'Approved' } : request
      // ));

      setAcceptEndpoint(null); // Reset the accept endpoint state
    }
  }, [acceptData]);


   // Handle the response from rejecting a student request
  useEffect(() => {
    if (rejectData) {
      // Update the status of the rejected request
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.studentId === rejectData.studentId
            ? { ...request, status: 'Rejected' }
            : request
        )
      ); 

      setRejectEndpoint(null); // Reset the reject endpoint state // Reset to null after processing
    }
  }, [rejectData]);

  // Handle the "Accept" action for a student request
  const handleAccept = (studentId) => {
    if (
      window.confirm(
        `Are you sure you want to accept the student with ID ${studentId}?`
      )
    ) {

      // Set the accept endpoint URL for the specific student request
      setAcceptEndpoint(`student/requests/accept/${studentId}`);
    }
  };
  // const handleAccept = (studentId) => {
  //   alert(`Student with ID ${studentId} request successfully Approved.`);
  //   setAcceptEndpoint(`student/requests/accept/${studentId}`);
  // };

  // Handle the "Reject" action for a student request
  const handleReject = (studentId) => {
    if (
      window.confirm(
        `Are you sure you want to reject the student with ID ${studentId}?`
      )
    ) {
      // Set the reject endpoint URL for the specific student request
      setRejectEndpoint(`student/requests/reject/${studentId}`);
    }
  };

  // const handleReject = (studentId) => {
  //   alert(`Student with ID ${studentId} request rejected.`);
  //   setRejectEndpoint(`student/requests/reject/${studentId}`);
  // };

  if (loading) return <Alert message="Loading..." variant="message" />;
  if (error) return <p>{error}</p>; // Display error message if there was an error fetching data

  return (
    // Table container for displaying student requests
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
              <StyledTableCell align="right">
                {request.registeredDate}
              </StyledTableCell>
              {/*<StyledTableCell align="center">{new Date(request.registeredDate).toLocaleDateString()}</StyledTableCell> */}

              <StyledTableCell align="center">
                {request.transactionId}
              </StyledTableCell>
              <StyledTableCell>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAccept(request.studentId)}
                    //disabled={request.status !== 'Pending'}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(request.studentId)}
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
