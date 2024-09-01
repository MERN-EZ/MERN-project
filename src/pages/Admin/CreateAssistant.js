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

  // State to Track the Assistant Being Edited
  const [editingAssistant, setEditingAssistant] = useState(null);
  const [putEndpoint, setPutEndpoint] = useState(null);
  const [putData, setPutData] = useState(null);

  // Create a new Assisitant
  const {
    response: postResponse,
    error: postError,
    loading: post,
  } = usePostRequest('admin/assistants', formData);
  const { data: updateResponse, error: updateError } = usePutRequest(
    putEndpoint,
    putData
  );

  const [deleteEndpoint, setDeleteEndpoint] = useState(null); // State to store the endpoint for deletion

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change - ${name}: ${value}`);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleCreateAccount = () => {
  //   // This is where you would handle the creation of a new assistant.
  //   // For now, we'll just hide the form and show a success message.
  //   //setShowForm(false);
  //   console.log('Form Data on Create:', formData);
  //   alert('Assistant account created successfully.');
  //   setShowForm(false);
  // };

  const handleCreateOrUpdateAccount = () => {
    if (editingAssistant) {
      // Update existing assistant
      const updateData = { ...formData };

      // Log the data being sent
      console.log('Updating assistant with data:', updateData);

      setPutData(updateData);
      if (!updateData.password) {
        delete updateData.password; // Exclude password if not provided
      }
      setPutEndpoint(`admin/assistants/${editingAssistant}`);
    } else {
      // Create new assistant
      //console.log('Creating new assistant with data:', formData);
      post(formData); // Trigger the post request
      //alert('Assistant account created successfully.');
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    alert('Assistant creation cancelled.');
    setShowForm(false); // Hide the form
  };

  // Populate Form with Assistant Data
  const handleEdit = (assistant) => {
    setFormData({
      assistantId: assistant.assistantId,
      firstName: assistant.firstName,
      lastName: assistant.lastName,
      password: '', // Leave password blank for security reasons
      email: assistant.email,
      phoneNumber: assistant.phoneNumber,
    });
    setEditingAssistant(assistant._id);
    setShowForm(true);
  };

  useEffect(() => {
    if (postResponse) {
      alert('Assistant created successfully.');
      // Optionally refetch assistants or update state to reflect changes
    }
    if (postError) {
      alert('Failed to create assistant.');
      console.error(postError);
    }
  }, [postResponse, postError]);

  useEffect(() => {
    if (updateResponse) {
      console.log('Update response:', updateResponse);

      alert('Assistant updated successfully.');
      setEditingAssistant(null); // Reset editing state
      // Optionally refetch assistants or update state to reflect changes
    }
    if (updateError) {
      alert('Failed to update assistant.');
      console.error(updateError);
    }
  }, [updateResponse, updateError]);

  // Fetch created assistants from the database
  const {
    data: assistants,
    error,
    loading,
  } = useGetRequest('admin/assistants');

  console.log('Fetched assistants:', assistants); // Log fetched assistants
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
                    onClick={() => handleEdit(assistant)} //put assistant._id and see
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
