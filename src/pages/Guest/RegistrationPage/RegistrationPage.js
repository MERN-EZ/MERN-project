import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate instead of history
  const query = new URLSearchParams(location.search);
  const year = query.get('year'); // Extracts the 'year' query parameter

  // Initialize form state with year if available
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    yearOfOLs: year || '', // Pre-fill year if available
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    transactionId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/guest/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        navigate('/success'); // Redirect to a success page or another route
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="guest-register container">
      <div className="card">
        <div className="cardHeader">
          <h2>Register Here</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
            <TextField
              label="Year of ALs"
              value={formValues.yearOfOLs}
              onChange={handleChange}
              placeholder="2025"
              name="yearOfOLs"
            />
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
            <TextField
              label="Transaction ID of Admission Fee"
              type="text"
              value={formValues.transactionId}
              onChange={handleChange}
              placeholder="Enter Transaction ID"
              name="transactionId"
            />
          </div>
          <div className="actions">
            <Button
              text="Back"
              variant="secondary"
              onClick={() => navigate(-1)}
            />
            <Button text="Submit" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
