import React from 'react';
import { Container, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/system';


// TableContainer - make the table responsive by adding a scrollbar when necessary.
// Make this a EXPANDABLE TABEL LATER


const StyledTableHeader = styled(TableCell)({
    backgroundColor: '#D0F9FF', // Light blue background for headers
    fontWeight: 'bold',
    textAlign: 'center'
  });

  const StyledTableCell = styled(TableCell)({
    textAlign: 'center', // Center the text
  });

  const StyledTableRow = styled(TableRow)({
    backgroundColor: '#9747FF', // Purple Background for rows

  });

  const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  });
  
  const StyledPaper = styled(Paper)({
    padding: '20px',
    width: '100%',
  });
  
const StudentRequests = () => {

    const requests = [
        {id: 1001, firstName: 'Ravindi', lastName: 'Fernando', email: 'Ravindi.F23@gmail.com', registeredDate: '2024-07-30', classroom : 'Saturday', batch : '2024' , slip : 'link_to_payment_slip'}];
        // URL to the payment slip ??
    return(
        <StyledContainer>
            <StyledPaper elevation={3}>
            <TableContainer>
                <Table sx={{ minWidth: 650 }}> 
                    {/*ensures the table has a minimum width and will scroll horizontally if the window size is smaller than the table width.*/}
                    <TableHead>
                        <TableRow>
                            <StyledTableHeader>Student ID</StyledTableHeader>
                            <StyledTableHeader>First Name</StyledTableHeader>
                            <StyledTableHeader>Last Name</StyledTableHeader>
                            <StyledTableHeader>Email</StyledTableHeader>
                            <StyledTableHeader>Registered Date</StyledTableHeader>
                            <StyledTableHeader>Classroom</StyledTableHeader>
                            <StyledTableHeader>Batch</StyledTableHeader>
                            <StyledTableHeader>Payment Slip</StyledTableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {requests.map((request) => (
                        <StyledTableRow key={request.id}>
                            <StyledTableCell>{request.id}</StyledTableCell>
                            <StyledTableCell>{request.firstName}</StyledTableCell>
                            <StyledTableCell>{request.lastName}</StyledTableCell>
                            <StyledTableCell>{request.email}</StyledTableCell>
                            <StyledTableCell>{request.registeredDate}</StyledTableCell>
                            <StyledTableCell>{request.classroom}</StyledTableCell>
                            <StyledTableCell>{request.batch}</StyledTableCell>
                            <StyledTableCell>
                                <a href={request.slip} target="_blank" rel="noopener noreferrer">
                                    <AttachFileIcon />
                                </a>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </StyledPaper >
        </StyledContainer>



    );

};

export default StudentRequests;


// the rows should be updated using the databse.
// when a student registeres, details gets stored in the DB
// These will be fetched ad student regests and displayed in the rows
// the paper clip --> when opened --> must "Accept" the student


// Or remove the clip --> just make it "Action" --> "Accept" button -->then creates an account