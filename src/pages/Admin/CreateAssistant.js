import React, { useState } from 'react';
import { Container, Box, TextField, MenuItem, Stack, Alert, Card, CardContent } from '@mui/material';
import { Visibility, VisibilityOff,IconButton,InputAdornment, FormControl  } from '@mui/icons-material';
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
  
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  // const [showPassword, setShowPassword] = useState(false);
  // const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleCreateAccount = () => {
    if (Object.values(formData).some(value => value === '')) {
      setAlert({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    setAlert({ type: 'success', message: 'Assistant account created successfully.' });
    setShowForm(false); // Hide the form after successful creation
  };

  const handleCancel = () => {
    setAlert({ type: 'error', message: 'Assistant creation cancelled.' });
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
              <div>
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
              </div>
            </CardContent>
          </Card>
        </Box>
      )}
      {alert.message && (
        <Alert severity={alert.type} style={{ marginTop: '20px' }}>
          {alert.message}
        </Alert>
      )}
    </Container>
  );
};

export default CreateAssistant;


// Add validations for the passowrd , email, phone number fileds
// check the code for passowrd
// Email --> validation --> @ 
// Phone nu --> 10 characters
// Asssitant Id --> Placeholder format --> like a defined format hint for the admin
// Passowrd --> specific format hint is given

// Only if all the feilds are filled --> the account is created
// slde a error message saying, please fill the fileds is shown

// Canceled --> Info Alter --> "Cancelled"


// The created account should be displayed as a row 


// use drawer for the 3rd page