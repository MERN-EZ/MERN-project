import React, { useState } from 'react';
import { Container, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Button } from '@mui/material';
import './StudentRequests.scss'; 

const StudentRequests = () => {
    // Initialize state for requests
    const [requests, setRequests] = useState([
        {id: 1001, firstName: 'Ravindi', lastName: 'Fernando', email: 'Ravindi.F23@gmail.com', registeredDate: '2024-07-30', transactionId: 'TR001'},
        {id: 1002, firstName: 'Oneli', lastName: 'Perera', email: 'Oneli.F23@gmail.com', registeredDate: '2024-07-30', transactionId: 'TR002'}
    ]);

    // Handle the "Accept" action for a student request
    const handleAccept = (id) => {
        // Remove the accepted request from the list
        setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
        );
        alert(`Student with ID ${id} request successfully accepted.`);
    };

    // Handle the "Reject" action for a student request
    const handleReject = (id) => {
        // Remove the rejected request from the list
        setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
        );
        alert(`Student with ID ${id} request rejected.`);
    };

    return (
        <Container className="container">
            <Paper className="paper" elevation={3}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}> 
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-header">Student ID</TableCell>
                                <TableCell className="table-header">First Name</TableCell>
                                <TableCell className="table-header">Last Name</TableCell>
                                <TableCell className="table-header">Email</TableCell>
                                <TableCell className="table-header">Registered Date</TableCell>
                                <TableCell className="table-header">Transaction ID</TableCell>
                                <TableCell className="table-header">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id} className="table-row">
                                    <TableCell className="table-cell">{request.id}</TableCell>
                                    <TableCell className="table-cell">{request.firstName}</TableCell>
                                    <TableCell className="table-cell">{request.lastName}</TableCell>
                                    <TableCell className="table-cell">{request.email}</TableCell>
                                    <TableCell className="table-cell">{request.registeredDate}</TableCell>
                                    <TableCell className="table-cell">{request.transactionId}</TableCell>
                                    <TableCell className="table-cell">
                                        <Button
                                            className="accept-button action-button"
                                            onClick={() => handleAccept(request.id)}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            className="reject-button action-button"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default StudentRequests;
