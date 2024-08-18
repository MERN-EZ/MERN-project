import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '../../../components/common/Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import useLogin from '../../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import alert from '../../../components/common/Alert/Alert'; // Adjust the path as needed
import './LoginPage.scss';


const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    year: '',
  });
  const { login, loading, error } = useLogin();
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'info' });
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const { username, password, year } = formValues;
      const loginSuccess = await login(username, password, year); // Call your login hook

      if (loginSuccess) {
        navigate('/'); // Redirect to Student Home page on success
      } else {
        setAlert({
          show: true,
          message: 'Login failed. Please check your credentials.',
          variant: 'error',
        });
        // Handle login failure (e.g., show an error message)
        console.error('Login failed');
      }
    } catch (error) {
      setAlert({
        show: true,
        message: 'An error occurred during login. Please try again later.',
        variant: 'error',
      });
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="guest-login container">
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
            placeholder="Enter Username/Email"
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
            placeholder="Enter Year"
            value={formValues.year}
            onChange={handleChange}
            name="year"
            fullWidth
          />
        </div>
        <div className="actions">
          <Button text="Log In" variant="secondary" onClick={handleLogin} />
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
