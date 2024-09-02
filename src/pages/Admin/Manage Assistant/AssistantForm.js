import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Stack,
} from '@mui/material';
import Button from '../../components/common/Button/Button';
import usePostRequest from '../../hooks/usePostRequest';
import usePutRequest from '../../hooks/usePutRequest';

const AssistantForm = ({ editingAssistant, onClose }) => {
  const [formData, setFormData] = useState({
    assistantId: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  const [putData, setPutData] = useState(null);
  const [postData, setPostData] = useState(null);

  const { response: postResponse, error: postError } = usePostRequest(
    'admin/assistants',
    postData
  );

  const { data: updateResponse, error: updateError } = usePutRequest(
    editingAssistant ? `admin/assistants/${editingAssistant}` : null,
    putData
  );

  useEffect(() => {
    if (editingAssistant) {
      // Fetch data and populate the form for editing
      // Example: setFormData(fetchedData);
    }
  }, [editingAssistant]);

  useEffect(() => {
    if (postResponse) {
      alert('Assistant created successfully.');
      onClose();
    }
    if (postError) {
      alert('Failed to create assistant.');
    }
  }, [postResponse, postError, onClose]);

  useEffect(() => {
    if (updateResponse) {
      alert('Assistant updated successfully.');
      onClose();
    }
    if (updateError) {
      alert('Failed to update assistant.');
    }
  }, [updateResponse, updateError, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editingAssistant) {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      setPutData(updateData);
    } else {
      setPostData(formData);
    }
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
                  inputProps={{ maxLength: 10 }}
                />
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  text={editingAssistant ? 'Update Account' : 'Create Account'}
                  variant="primary"
                  onClick={handleSave}
                />
                <Button
                  text="Cancel"
                  variant="secondary"
                  onClick={onClose}
                />
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssistantForm;
