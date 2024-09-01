import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
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
import usePostRequest from '../../hooks/usePostRequest';
import usePutRequest from '../../hooks/usePutRequest';
import useDeleteRequest from '../../hooks/useDeleteRequest';

const CreateAssistant = () => {
  // State to manage form input data
  const [formData, setFormData] = useState({
    assistantId: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  // State to track the assistant being edited
  const [editingAssistant, setEditingAssistant] = useState(null);

  // State to manage PUT request data and endpoint for updating an assistant
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);

  // State to store the endpoint for deleting an assistant
  const [deleteEndpoint, setDeleteEndpoint] = useState(null);

  // Hook for creating a new assistant
  const {
    response: postResponse,
    error: postError,
    loading: post,
  } = usePostRequest('admin/assistants', formData);

  // Hook for updating an assistant
  const { data: updateResponse, error: updateError } = usePutRequest(
    putEndpoint,
    putData
  );

  // Hook for deleting an assistant
  const {
    data,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  // Hook for fetching the list of assistants
  const {
    data: assistants,
    error,
    loading,
  } = useGetRequest('admin/assistants');

  console.log('Fetched assistants:', assistants);

  // Expression for validating assistant ID in the format A001
  const assistantIdRegex = /^A\d{3}$/;
  // Expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change - ${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle creating or updating an assistant
  const handleCreateOrUpdateAccount = () => {
    // Check if all required fields are filled
    if (!formData.assistantId || !formData.firstName || !formData.lastName || !formData.password || !formData.email || !formData.phoneNumber) {
      alert('Please fill all required fields.');
      return; // Prevent further execution if fields are missing
    }

    // Validate assistant ID
    if (!assistantIdRegex.test(formData.assistantId)) {
      alert('Assistant ID must be in the format A001.');
      return; // Prevent further execution if assistant ID format is invalid
    }

    // Validate email
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return; // Prevent further execution if email format is invalid
    }

    // Proceed with creating or updating the assistant
    if (editingAssistant) {
      // If editing, update the existing assistant
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password; // what's happening here??? // Exclude password if not provided
      }
      console.log('Updating assistant with data:', updateData);
      setPutData(updateData);
      setPutEndpoint(`admin/assistants/${editingAssistant}`);
    } else {
      // If not editing, create a new assistant
      console.log('Creating new assistant with data:', formData);
      post(); // Trigger the post request using usePostRequest hook
      alert('Assistant account created successfully.');
    }
    // Hide the form after submission
    setShowForm(false);
  };

  // Handle form cancellation
  const handleCancel = () => {
    alert('Assistant creation cancelled.');
    setShowForm(false); // Hide the form
  };

  // Populate form with the selected assistant's data for editing
  const handleEdit = (assistant) => {
    setFormData({
      assistantId: assistant.assistantId,
      firstName: assistant.firstName,
      lastName: assistant.lastName,
      password: '',
      email: assistant.email,
      phoneNumber: assistant.phoneNumber,
    });
    setEditingAssistant(assistant._id);
    setShowForm(true); // Show the form for editing
  };

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

  // Effect to handle the result of the create assistant request
  // useEffect(() => {
  //   if (postResponse) {
  //     alert('Assistant created successfully.');
  //   }
  //   if (postError) {
  //     alert('Failed to create assistant.');
  //     console.error(postError);
  //   }
  // }, [postResponse, postError]);

  // Effect to handle the result of the update assistant request
  useEffect(() => {
    if (updateResponse) {
      console.log('Update response:', updateResponse);
      alert('Assistant updated successfully.');
      setEditingAssistant(null); // Reset editing state
    }
    if (updateError) {
      alert('Failed to update assistant.');
      console.error(updateError);
    }
  }, [updateResponse, updateError]);

  // Effect to handle the result of the delete assistant request
  useEffect(() => {
    if (deleteEndpoint && !deleteLoading) {
      if (deleteError) {
        alert('Failed to delete assistant.');
        console.error('Delete error:', deleteError);
      } else if (data) {
        alert('Assistant deleted successfully.');
        console.log('Deleted assistant data:', data);
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

      {/* Form Card for creating or editing an assistant */}
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
                      error={!assistantIdRegex.test(formData.assistantId) && formData.assistantId !== ''}
                      helperText={
                        !assistantIdRegex.test(formData.assistantId) && formData.assistantId !== ''
                          ? 'Assistant ID must be in the format A001.'
                          : ''
                      }
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
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      error={!emailRegex.test(formData.email) && formData.email !== ''}
                      helperText={
                        !emailRegex.test(formData.email) && formData.email !== ''
                          ? 'Please enter a valid email address.'
                          : ''
                      }
                    />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      inputProps={{ maxLength: 10 }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      text={
                        editingAssistant ? 'Update Account' : 'Create Account'
                      }
                      variant="primary"
                      onClick={handleCreateOrUpdateAccount}
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
                    onClick={() => handleEdit(assistant)}
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
