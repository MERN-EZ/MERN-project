import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Grid,
  Paper,
} from '@mui/material';

const drawerWidth = 200;

const students = [
  {
    firstName: 'Ravindi',
    lastName: 'Fernando',
    studentId: '1001',
    username: 'ravindiF',
    password: 'Ravindi123',
    email: 'ravindi.fernando@example.com',
    contactNumber: '0771234567',
  },
  {
    firstName: 'Lenmini',
    lastName: 'Sadeera',
    studentId: '1002',
    username: 'lenminiS',
    password: 'Lenmini123',
    email: 'lenmini.sadeera@example.com',
    contactNumber: '0772345678',
  },
  {
    firstName: 'Janusha',
    lastName: 'Jayaweera',
    studentId: '1003',
    username: 'janushaJ',
    password: 'Janusha123',
    email: 'janusha.jayaweera@example.com',
    contactNumber: '0773456789',
  },
  {
    firstName: 'Kavindu',
    lastName: 'Pathiratne',
    studentId: '1004',
    username: 'kavinduP',
    password: 'Kavindu123',
    email: 'kavindu.pathiratne@example.com',
    contactNumber: '0774567890',
  },
  {
    firstName: 'Maahela',
    lastName: 'Akbo',
    studentId: '1005',
    username: 'maahelaA',
    password: 'Maahela123',
    email: 'maahela.akbo@example.com',
    contactNumber: '0775678901',
  },
  {
    firstName: 'Anuki',
    lastName: 'Thiyara',
    studentId: '1006',
    username: 'anukiT',
    password: 'Anuki123',
    email: 'anuki.thiyara@example.com',
    contactNumber: '0776789012',
  },
];

export default function StudentManagementPage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginLeft: `200px`,
            marginTop: '69px',
          },
        }}
        variant="permanent"
      >
        <List>
          {students.map((student, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
              onClick={() => handleStudentSelect(student)}
              sx={{
                height : '80px',
                backgroundColor: selectedStudent === student ? 'blue' : 'inherit', // Green background for selected item
                color: selectedStudent === student ? 'white' : 'inherit', // White text color for selected item
                transition: 'all 0.3s ease', // Smooth transition
              }}
              >
                <ListItemText
                  primary={`${student.firstName} ${student.lastName}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: '150px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar sx={{ marginTop: 5, width: 120, height: 120 }}>
    
                  </Avatar>
                </Grid>
                <Grid item xs>
                  {/* Full name */}
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </Typography>

                  {/* Student ID and Username on one line */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        Student ID: {selectedStudent.studentId}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        Username: {selectedStudent.username}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Password and Email on another line */}
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        Password: {selectedStudent.password}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        Email: {selectedStudent.email}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Contact Number on the last line */}
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        Contact Number: {selectedStudent.contactNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#add8e6' }}>
              <Typography variant="h6">Payment Details</Typography>
              <Box mt={2}>
                {/* Payment details */}
                <Typography variant="body2" sx={{ mb: 1}}>
                  Transaction Id: 10011
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Fees Code: admission-fees
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Due Date: 10/04/2024
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Status: Paid
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Amount: 1000.00
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Paid Date: 08/05/2024
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
