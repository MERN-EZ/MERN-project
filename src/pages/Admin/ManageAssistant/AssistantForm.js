import React, { useState, useEffect } from 'react';
import { Box, TextField, Stack, Card, CardContent } from '@mui/material';
import Button from '../../../components/common/Button/Button';

const AssistantForm = ({ onSubmit, onCancel, initialData }) => {
  // State to manage form input data
  const [formData, setFormData] = useState({
    assistantId: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  // Populate form with initial data when editing an assistant
  useEffect(() => {
    if (initialData) {
      console.log('Populating form with initial data:', initialData);
      setFormData({
        ...initialData,
        password: '', // Password not populated for security reasons
      });
    }
  }, [initialData]);

  // Expression for validating assistant ID in the format A001
  const assistantIdRegex = /^A\d{3}$/;
  // Expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Handle input changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value })); // Update state with new value
  };

  // Handle form submission
  const handleSubmit = () => {
    // Check if all required fields are filled
    if (
      !formData.assistantId ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      (!initialData && !formData.password) ||  // Password is required only for new accounts
      !formData.email ||
      !formData.phoneNumber
    ) {
      console.log('Required fields not filled');
      alert('Please fill all required fields.');
      return; // Prevent further execution if fields are missing
    }

    // Validate Assistant ID format
    if (!assistantIdRegex.test(formData.assistantId)) {
      alert('Assistant ID must be in the format A001.');
      return; // Prevent further execution if assistant ID format is invalid
    }

    // Validate Email format
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return; // Prevent further execution if email format is invalid
    }

    console.log('Form submitted with data:', formData);
    onSubmit(formData); // Trigger onSubmit callback with form data
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {/* Card container for the assistant form */}
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
                  error={
                    !assistantIdRegex.test(formData.assistantId) &&
                    formData.assistantId !== ''
                  }
                  helperText={
                    !assistantIdRegex.test(formData.assistantId) &&
                    formData.assistantId !== ''
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
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
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
                  required={!initialData} // Require password only if creating a new assistant
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  error={
                    !emailRegex.test(formData.email) && formData.email !== ''
                  }
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
                  text={initialData ? 'Update Account' : 'Create Account'}
                  variant="primary"
                  onClick={handleSubmit}
                />
                <Button text="Cancel" variant="secondary" onClick={onCancel} />
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssistantForm;
