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
} from '@mui/material';
import Button from '../../components/common/Button/Button';
import usePostRequest from '../../hooks/usePostRequest';
import useGetRequest from '../../hooks/useGetRequest';

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

  // State to manage form errors for validation
  const [formErrors, setFormErrors] = useState({});

  // State to control form visibility
  const [showForm, setShowForm] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Validate the form fields before submission
  const validate = () => {
    let errors = {};

    // Assistant ID validation (e.g., A001)
    const assistantIdPattern = /^A\d{3}$/;
    if (!assistantIdPattern.test(formData.assistantId)) {
      errors.assistantId = 'Assistant ID should be in the format A001.';
    }

    // Password validation (6 characters, 4 letters, 2 numbers)
    const passwordPattern = /^(?=.*[A-Za-z]{4,})(?=.*\d{2,})[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      errors.password =
        'Password should be 6 characters long with 4 letters and 2 numbers.';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Phone number validation (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number should be exactly 10 digits.';
    }

    // First Name and Last Name validation
    if (!formData.firstName) {
      errors.firstName = 'First Name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Post the form data - Create an assistant
  const { response} = usePostRequest('/admin/assistants', formData);

   // Fetch created assistants using the useGetRequest hook
   const { data: assistants, error: getError, loading: fetching } = useGetRequest('/admin/assistants');

  const handleCreateAccount = async () => {
    if (validate()) {
      try {
        // Submit the form data to create a new assistant
        await response;
        setShowForm(false);
        alert('Assistant account created successfully.');
      } catch (error) {
        console.error('Error creating assistant:', error);
        alert('Failed to create assistant. Please try again.');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const handleCancel = () => {
    alert('Assistant creation cancelled.');
    setShowForm(false); // Hide the form
  };

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
                      error={!!formErrors.assistantId}
                      helperText={formErrors.assistantId || 'Format: A001'}
                    />
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                    />
                    <TextField
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.password}
                      helperText={
                        formErrors.password ||
                        '6 characters, 4 letters, 2 numbers'
                      }
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
                      error={!!formErrors.email}
                      helperText={
                        formErrors.email || 'e.g., user@example.com'
                      }
                    />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.phoneNumber}
                      helperText={
                        formErrors.phoneNumber || 'Format: 0774567290'
                      }
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
 <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Created Assistants
        </Typography>
        {fetching && <p>Loading...</p>}
        {getError && <p>Error fetching data: {getError.message}</p>}
        {assistants?.map((assistant) => (
          <Card key={assistant._id} sx={{ marginBottom: '10px', boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6">
                {assistant.firstName} {assistant.lastName}
              </Typography>
              <Typography variant="body2">ID: {assistant.assistantId}</Typography>
              <Typography variant="body2">Email: {assistant.email}</Typography>
              <Typography variant="body2">Phone: {assistant.phoneNumber}</Typography>
              <Typography variant="body2">Batch: {assistant.batch}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default CreateAssistant;
