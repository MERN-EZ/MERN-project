import React, { useState } from 'react';
import TextField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';
import RegisterIcon from '@mui/icons-material/HowToReg';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    yearOfOLs: '',
    classLocation: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNext = () => {
    // Handle next button click
    console.log('Next button clicked');
  };

  const handleBack = () => {
    // Handle back button click
    console.log('Back button clicked');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader">
          <RegisterIcon className="icon" />
          <h2>Register Here</h2>
        </div>
        <div className="formGroup">
          <TextField
            label="First Name"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            name="firstName"
          />
          <TextField
            label="Last Name"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            name="lastName"
          />
        </div>
        <div className="formGroup">
          <TextField
            label="Year of OLs"
            value={formValues.yearOfOLs}
            onChange={handleChange}
            placeholder="2025"
            name="yearOfOLs"
          />
          <TextField
            label="Class Location"
            value={formValues.classLocation}
            onChange={handleChange}
            placeholder="ISM Nugegoda"
            name="classLocation"
          />
        </div>
        <TextField
          label="Contact Number"
          value={formValues.contactNumber}
          onChange={handleChange}
          placeholder="Enter Contact Number"
          name="contactNumber"
        />
        <TextField
          label="Email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Enter Email"
          name="email"
        />
        <TextField
          label="Username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        />
        <TextField
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Enter Password"
          name="password"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter Password"
          name="confirmPassword"
        />
        <div className="actions">
          <Button text="Back" variant="secondary" onClick={handleBack} />
          <Button text="Next" variant="secondary" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
