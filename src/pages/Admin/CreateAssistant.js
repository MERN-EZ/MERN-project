import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '../../components/common/Button/Button';

const CreateAssistant = () => {
  const [formData, setFormData] = useState({
    assistantId: '',
    firstName: '',
    lastName: '',
    batch: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateAccount = () => {
    // This is where you would handle the creation of a new assistant.
    // For now, we'll just hide the form and show a success message.
    //setShowForm(false);
    alert('Assistant account created successfully.');
    setShowForm(false);
  };

  const handleCancel = () => {
    alert('Assistant creation cancelled.');
    setShowForm(false); // Hide the form
  };

  // Dummy data for assistants
  const dummyAssistants = [
    {
      _id: '1',
      assistantId: 'A001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '0774567890',
      batch: '2024',
    },
    {
      _id: '2',
      assistantId: 'A002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '0774567891',
      batch: '2025',
    },
    {
      _id: '3',
      assistantId: 'A003',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '0774567892',
      batch: '2026',
    },
  ];

  return (
    <Container sx={{ position: 'relative', paddingTop: '20px' }}>
      {/* Create Assistant Button */}
      <Box sx={{ position: 'absolute', top: 20, left: -120 }}>
        <Button
          text="Create Assistant Account &nbsp;&nbsp;+"
          variant="primary"
          onClick={() => setShowForm(true)}
        />
      </Box>

      {/* Form Card */}
      {showForm && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Card sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent sx={{ padding: '25px' }}>
              <form noValidate autoComplete="off">
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Assistant ID"
                      name="assistantId"
                      value={formData.assistantId}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      select
                      label="Batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      required
                      sx={{ minWidth: 210 }}
                    >
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2025">2025</MenuItem>
                      <MenuItem value="2026">2026</MenuItem>
                    </TextField>

                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                  >
                    <Button
                      text="Create Account"
                      variant="primary"
                      onClick={handleCreateAccount}
                    />
                    <Button
                      text="Cancel"
                      variant="secondary"
                      onClick={handleCancel}
                    />
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
      {/* Display List of Assistants */}
      <Box sx={{ marginTop: '80px', marginLeft: '-120px' }}>
        <Typography variant="h6" gutterBottom>
          Created Assistants
        </Typography>
        {dummyAssistants.map((assistant) => (
          <Card key={assistant._id} sx={{ marginBottom: '10px', boxShadow: 1 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">
                  {assistant.firstName} {assistant.lastName}
                </Typography>
                <Typography variant="body2">ID: {assistant.assistantId}</Typography>
                <Typography variant="body2">Email: {assistant.email}</Typography>
                <Typography variant="body2">Phone: {assistant.phoneNumber}</Typography>
                <Typography variant="body2">Batch: {assistant.batch}</Typography>
              </Box>
              <Box>
                <IconButton aria-label="edit" onClick={() => console.log('Edit', assistant._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => console.log('Delete', assistant._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default CreateAssistant;
