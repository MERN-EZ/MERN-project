import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '../../../components/common/Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import './LoginPage.scss';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = () => {
    console.log('Login button clicked');
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
            value={formValues.email}
            onChange={handleChange}
            name="email"
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
        <div className="actions">
          <Button text="Log In" variant="secondary" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
