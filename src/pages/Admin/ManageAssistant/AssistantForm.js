import React, { useState, useEffect } from 'react';
import { Box, TextField, Stack, Card, CardContent } from '@mui/material';
import Button from '../../../components/common/Button/Button';

const AssistantForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    assistantId: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        password: '', // Don't populate password for security reasons
      });
    }
  }, [initialData]);

  const assistantIdRegex = /^A\d{3}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.assistantId ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      (!initialData && !formData.password) ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (!assistantIdRegex.test(formData.assistantId)) {
      alert('Assistant ID must be in the format A001.');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    onSubmit(formData);
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
                  required={!initialData}
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
