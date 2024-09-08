import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@mui/icons-material/PersonAddAlt';
import Alert from '../../../components/Alert/Alert';
import Button from '../../../components/Button/Button';
import './RegistrationPage.scss';

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const year = query.get('year') || '';
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'info',
  });

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

  const [errors, setErrors] = useState({});

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

    if (!formValues.firstName) newErrors.firstName = 'First Name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last Name is required';
    if (!formValues.username) newErrors.username = 'Username is required';
    if (!formValues.email) newErrors.email = 'Email is required';
    if (!formValues.contactNumber)
      newErrors.contactNumber = 'Contact Number is required';
    if (!formValues.transactionId)
      newErrors.transactionId = 'Transaction ID is required';

    const validYears = ['2024', '2025', '2026'];
    if (!formValues.yearOfALs) {
      newErrors.yearOfALs = 'Year of ALs is required';
    } else if (!validYears.includes(formValues.yearOfALs)) {
      newErrors.yearOfALs = 'Please enter a valid year';
    }

    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const [redirectOnClose, setRedirectOnClose] = useState(false);

  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      show: false,
    });
    if (redirectOnClose) {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlert({
        show: true,
        message: 'Please enter correct details.',
        variant: 'error',
      });
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

      const data = await response.json();

      if (response.ok) {
        setAlert({
          show: true,
          message:
            'Your registration request has been sent successfully. It may take some time to review. Please come back and log in after 24 hours.',
          variant: 'success',
        });
        setRedirectOnClose(true);
        /* setTimeout(() => {
          navigate('/');
        }, 2000);  */
      } else {
        const errorMessage =
          data.message ||
          'Registration failed. Please check your details and try again.';
        setAlert({
          show: true,
          message: errorMessage,
          variant: 'error',
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: `An error occurred: ${error.message}. Please try again later.`,
        variant: 'error',
      });
    }
  };

  return (
    <div className="guest-register-container">
      <div className="guest-register-card">
        <div className="register-title">
          <Icon className="register-title-icon" />
          Register Here
        </div>
        {alert.show && (
          <Alert
            variant={alert.variant}
            message={alert.message}
            onConfirm={handleCloseAlert}
            onCancel={handleCloseAlert}
          />
        )}
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
