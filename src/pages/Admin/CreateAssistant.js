import React, { useState, useEffect } from 'react';
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
import useGetRequest from '../../hooks/useGetRequest';
import useDeleteRequest from '../../hooks/useDeleteRequest';

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

  const [deleteEndpoint, setDeleteEndpoint] = useState(null); // State to store the endpoint for deletion

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change - ${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateAccount = () => {
    // This is where you would handle the creation of a new assistant.
    // For now, we'll just hide the form and show a success message.
    //setShowForm(false);
    console.log('Form Data on Create:', formData);
    alert('Assistant account created successfully.');
    setShowForm(false);
  };

  const handleCancel = () => {
    alert('Assistant creation cancelled.');
    setShowForm(false); // Hide the form
  };

  // Fetch created assistants from the database
  const {
    data: assistants,
    error,
    loading,
  } = useGetRequest('admin/assistants');

  // console.log('Fetched assistants:', assistants); // Log fetched assistants
  // console.log('Loading state:', loading); // Log loading state
  // console.log('Error state:', error); // Log error state

  // Handle assistant deletion
  const handleDelete = (assistantId) => {
    console.log(`Attempting to delete assistant with ID: ${assistantId}`); // Log the assistant ID
    const confirmed = window.confirm(
      'Are you sure you want to delete this assistant?'
    );
    if (confirmed) {
      const endpoint = `admin/assistants/${assistantId}`;
      console.log(`Delete endpoint set: ${endpoint}`); // Log the delete endpoint
      setDeleteEndpoint(endpoint); // Set the endpoint in state
    }
  };

  // Watch for changes in deleteEndpoint and trigger the delete request
  const {
    data,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  useEffect(() => {
    if (deleteEndpoint && !deleteLoading) {
      if (deleteError) {
        alert('Failed to delete assistant.');
        console.error('Delete error:', deleteError);
      } else if (data) {
        alert('Assistant deleted successfully.');
        // Optionally, you can refetch the assistants list or remove the deleted assistant from state
        console.log('Deleted assistant data:', data); // Log the data of the deleted assistant
        setDeleteEndpoint(null); // Clear the endpoint after successful deletion
      }
    }
  }, [deleteEndpoint, deleteError, deleteLoading, data]);

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
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
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
        {loading && <Typography>Loading...</Typography>}
        {error && (
          <Typography color="error">
            Failed to load assistants: {error}
          </Typography>
        )}
        {assistants &&
          assistants.map((assistant) => (
            <Card
              key={assistant._id}
              sx={{ marginBottom: '10px', boxShadow: 1 }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {assistant.firstName} {assistant.lastName}
                  </Typography>
                  <Typography variant="body2">
                    ID: {assistant.assistantId}
                  </Typography>
                  <Typography variant="body2">
                    Email: {assistant.email}
                  </Typography>
                  <Typography variant="body2">
                    Phone: {assistant.phoneNumber}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    aria-label="edit"
                    onClick={() => console.log('Edit', assistant._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(assistant._id)}
                  >
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
