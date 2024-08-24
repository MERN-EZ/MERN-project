import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@mui/icons-material/AccountCircle';
import Button from '../../../components/common/Button/Button';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const year = query.get('year') || '';

  // Initialize form state with year if available
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    yearOfALs: year,
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    transactionId: '',
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      yearOfALs: year,
    }));
  }, [year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formValues.firstName) newErrors.firstName = 'First Name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last Name is required';
    if (!formValues.yearOfALs) newErrors.yearOfALs = 'Year of ALs is required';
    if (!formValues.username) newErrors.username = 'Username is required';
    if (!formValues.email) newErrors.email = 'Email is required';
    if (!formValues.contactNumber)
      newErrors.contactNumber = 'Contact Number is required';

    // Check password fields
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form has validation errors.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/guest/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'db-name': formValues.yearOfALs,
        },
        body: JSON.stringify(formValues),
      });

      console.log('Response received');
      //console.log('Response Status:', response.status);
      //console.log('Response Headers:', [...response.headers.entries()]);
      //const contentType = response.headers.get('Content-Type');
      //remove
      const data = await response.json();

      //remove later
      if (response.ok) {
        alert('Registration request sent successfully. ');
        navigate('/'); // Redirect to a success page or another route
      } else {
        const errorMessage =
          data.message ||
          'Registration failed. Please check your input and try again.';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert(`An error occurred: ${error.message}. Please try again later.`);
    }
  };

  return (
    <div className="guest-register-container">
      <div className="guest-register-card">
        <div className="register-title">
          <Icon className="register-title-icon" />
          Register Here
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <div className="error-message">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Year of ALs</label>
            <input
              type="text"
              name="yearOfALs"
              value={formValues.yearOfALs}
              onChange={handleChange}
              placeholder="Enter Year of ALs (e.g., 2025)"
            />
            {errors.yearOfALs && (
              <div className="error-message">{errors.yearOfALs}</div>
            )}
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formValues.contactNumber}
              onChange={handleChange}
              placeholder="Enter Contact Number"
            />
            {errors.contactNumber && (
              <div className="error-message">{errors.contactNumber}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
              />
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Transaction ID of Admission Fee</label>
            <input
              type="text"
              name="transactionId"
              value={formValues.transactionId}
              onChange={handleChange}
              placeholder="Enter Transaction ID"
            />
            {errors.transactionId && (
              <div className="error-message">{errors.transactionId}</div>
            )}
          </div>
          <div className="register-actions">
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
