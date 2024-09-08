import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '../../../components/Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import BatchIcon from '@mui/icons-material/School';
import useLogin from '../../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../components/Alert/Alert';
import './LoginPage.scss';
import { useUserRole } from '../../../context/UserRoleContext';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    year: '',
  });
  const { login, loading } = useLogin();
  const { setUserRole } = useUserRole();
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'info',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, password, year } = formValues;
    if (!username || !password || !year) {
      setAlert({
        show: true,
        message: 'All fields are required.',
        variant: 'error',
      });
      return false;
    }

    const validYears = ['2024', '2025', '2026'];
    if (!validYears.includes(year)) {
      setAlert({
        show: true,
        message: 'Invalid year. Please enter a valid year.',
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setAlert({
      show: false,
      message: '',
      variant: 'info',
    });

    if (!validateForm()) return;

    console.log('Form values before login:', formValues);

    try {
      const { username, password, year } = formValues;
      const { success, error } = await login(username, password, year);

      console.log('Success:', success);

      if (success) {
        setUserRole('student');
        navigate('/');
      } else {
        setAlert({
          show: true,
          message: error || 'Login failed. Please check your credentials.',
          variant: 'error',
        });
      }
    } catch (err) {
      console.log('Error caught in handleLogin:', err);

      setAlert({
        show: true,
        message: 'An error occurred during login. Please try again later.',
        variant: 'error',
      });
      console.error('An error occurred during login:', err);
    }
  };

  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      show: false,
    });
  };

  return (
    <div className="guest-login container">
      {alert.show && (
        <Alert
          message={alert.message}
          onConfirm={handleCloseAlert}
          onCancel={handleCloseAlert}
          variant={alert.variant}
        />
      )}
      <div className="card">
        <div className="cardHeader">
          <LoginIcon className="icon" />
          <h2>Log In</h2>
        </div>
        <div className="links">
          Haven't registered yet? <a href="/register"> Register</a>
        </div>
        <div className="inputContainer">
          <TextField
            placeholder="Enter Username"
            value={formValues.username}
            onChange={handleChange}
            name="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon className="icon" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="inputContainer">
          <TextField
            placeholder="Enter Password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="icon" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="inputContainer">
          <TextField
            placeholder="Enter Year of ALs"
            value={formValues.year}
            onChange={handleChange}
            name="year"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BatchIcon className="icon" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="actions">
          <Button text="Log In" variant="secondary" onClick={handleLogin} />
        </div>
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default LoginPage;
