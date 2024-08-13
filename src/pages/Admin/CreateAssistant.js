import React, { useState } from 'react';
import { Container, Box, TextField, MenuItem, Stack, Alert, Card, CardContent} from '@mui/material';
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
  
  const [formErrors, setFormErrors] = useState({}); // newly added
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  const validate = () => { // newly added
    let errors = {};

    // Assistant ID validation (e.g., A001)
    const assistantIdPattern = /^A\d{3}$/;
    if (!assistantIdPattern.test(formData.assistantId)) {
      errors.assistantId = 'Assistant ID should be in the format A001.';
    }

    // Password validation (6 characters, 4 letters and 2 numbers)
    const passwordPattern = /^(?=.*[A-Za-z]{4,})(?=.*\d{2,})[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      errors.password = 'Password should be 6 characters long with 4 letters and 2 numbers.';
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

  setFormErrors(errors); // newly added
    return Object.keys(errors).length === 0;
  };

  // const handleCreateAccount = () => {
  //   if (Object.values(formData).some(value => value === '')) {
  //     setAlert({ type: 'error', message: 'Please fill in all fields.' });
  //     return;
  //   }
  //   setAlert({ type: 'success', message: 'Assistant account created successfully.' });
  //   setShowForm(false); // Hide the form after successful creation
  // };

  // const handleCreateAccount = () => { // newly added
  //   if (validate()) {
  //     setAlert({ type: 'success', message: 'Assistant account created successfully.' });
  //     setShowForm(false); // Hide the form after successful creation
  //   } else {
  //     setAlert({ type: 'error', message: 'Please correct the errors in the form.' });
  //   }
  // };


  // Newest form handling code
  const handleCreateAccount = () => {
    // Validation for all required fields
    const isFormValid = Object.values(formData).every(value => value !== '');
  
    if (!isFormValid) {
      setAlert({ type: 'error', message: 'Please fill in all fields.' });
      return; // Prevent the form from being submitted
    }
  
    // Additional specific field validations (optional)
    if (!/^A\d{3}$/.test(formData.assistantId)) {
      setAlert({ type: 'error', message: 'Assistant ID should be in the format A001.' });
      return;
    }
  
    if (!/^(?=.*[a-zA-Z]{4,})(?=.*\d{2,})[a-zA-Z\d]{6,}$/.test(formData.password)) {
      setAlert({ type: 'error', message: 'Password should be at least 6 characters with 4 letters and 2 numbers.' });
      return;
    }
  
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formData.email)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
  
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setAlert({ type: 'error', message: 'Phone number should be 10 digits long.' });
      return;
    }
  
    // If everything is valid, show success alert and reset form visibility
    setAlert({ type: 'success', message: 'Assistant account created successfully.' });
    setShowForm(false); // Hide the form after successful creation
  };
  
  const handleCancel = () => {
    setAlert({ type: 'info', message: 'Assistant creation cancelled.' });
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

      {/* Alert Message */}
      {alert.message && (
        <Box sx={{ mt: 8 }}> {/* Adjust the margin-top value as needed */}
          <Alert severity={alert.type}>
            {alert.message}
          </Alert>
        </Box>
      )}

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
                        helperText={formErrors.password || '6 characters, 4 letters, 2 numbers'}
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
                        error={!!formErrors.email}
                        helperText={formErrors.email || 'e.g., user@example.com'}
                      />
                      <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        error={!!formErrors.phoneNumber}
                        helperText={formErrors.phoneNumber || 'Format: 0774567290'}
                    
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
{/* Display Created Assistant Rows */}
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
// Add Comments

// use drawer for the 3rd page



// what is  <form noValidate autoComplete="off"> ??
// Even if the fileds are not filled --> "create account" the form closes --> whcih is wrong.
// Check the fileds validation codes properly
// check the form validation code properly --> should only close the form only if the filefds are 
// fillid properly and fileds are filled.



// the created assiatnt should be stored in the DB and fetched and shown to the user.





