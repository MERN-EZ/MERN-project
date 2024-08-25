import React, { useState } from 'react';
import {
    Box,
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Avatar,
    Grid,
    Paper,
  } from '@mui/material';

const drawerWidth = 200;

const students = [
  { name: 'Ravindi Fernando',email: 'Ravindi.F28@gmail.com', admissionNumber: '1001', password: 'Ravindi123', classroom: 'Saturday Class' },
  { name: 'Lemnini Sadeera',},
  { name: 'Janusha Jayaweera', },
  { name: 'Kavindu Pathiratne', },
  { name: 'Mahela Akbo',},
  { name: 'Anuki Thiyara',},
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
            marginLeft: `50px`,
            marginTop: '69px',
          },
        }}
        variant="permanent"
        // anchor="center"
      >
        <List>
          {students.map((student, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleStudentSelect(student)}>
                <ListItemText primary={student.name} secondary={student.batch} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar sx={{ width: 56, height: 56 }}>N</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">{selectedStudent.name}</Typography>
                  <Typography variant="body2">Admission Number: {selectedStudent.admissionNumber}</Typography>
                  <Typography variant="body2">Password: {selectedStudent.password}</Typography>
                  <Typography variant="body2">Email: {selectedStudent.email}</Typography>
                  <Typography variant="body2">Batch: {selectedStudent.batch}</Typography>
                  <Typography variant="body2">Classroom: {selectedStudent.classroom}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Payment Details</Typography>
              <Box mt={2}>
                {/* Payment details would go here as a table or list */}
                <Typography variant="body2">Payment Id: 10011</Typography>
                <Typography variant="body2">Fees Code: admission-fees</Typography>
                <Typography variant="body2">Due Date: 10/04/2024</Typography>
                <Typography variant="body2">Status: Paid</Typography>
                <Typography variant="body2">Amount: 1000.00</Typography>
                <Typography variant="body2">Date: 08/05/2024</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
 
    </Box>
  );
}
