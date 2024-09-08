import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@mui/icons-material/PersonAddAlt';
import Button from '../../../components/Button/Button';
import './StaffReg.scss';

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const year = query.get('year') || '';

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',  // Make sure to initialize confirmPassword as well
    role: '', // Add role initialization
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.username) newErrors.username = 'Username is required';
    if (!formValues.role) newErrors.role = 'Role is required';
    
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.log('Form has validation errors.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/guest/auth/register/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'db-name': formValues.yearOfALs || '', // Ensure db-name is not undefined
        },
        body: JSON.stringify({
          username: formValues.username,
          password: formValues.password,
          role: formValues.role || 'teacher', // Default role if none selected
        }),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (response.ok) {
        alert('Registration successful.');
        navigate('/');
      } else {
        const errorMessage =
          contentType && contentType.includes("application/json")
            ? (await response.json()).message
            : 'Registration failed. Please check your input and try again.';
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
          Staff Register
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formValues.username || ''} // Ensure controlled value
              onChange={handleChange}
              placeholder="Enter Username"
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formValues.role || ''} // Ensure controlled value
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
            {errors.role && (
              <div className="error-message">{errors.role}</div>
            )}
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password || ''} // Ensure controlled value
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
                value={formValues.confirmPassword || ''} // Ensure controlled value
                onChange={handleChange}
                placeholder="Re-enter Password"
              />
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>
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
