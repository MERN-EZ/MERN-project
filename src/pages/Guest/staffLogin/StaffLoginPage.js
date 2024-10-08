import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '../../../components/Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../components/Alert/Alert';
import './StaffLoginPage.scss';
import { useUserRole } from '../../../context/UserRoleContext';
import useStaffLogin from '../../../hooks/useStaffLogin';
import useAssistantLogin from '../../../hooks/useAssistantLogin';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    role: 'teacher',
    year: '',
  });
  const { login: StaffLogin, loading: StaffLoading } = useStaffLogin();
  const { login: AssistantLogin, loading: AssistantLoading } =
    useAssistantLogin();
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
    const { username, password, role } = formValues;
    if (!username || !password || !role) {
      setAlert({
        show: true,
        message: 'All fields are required.',
        variant: 'error',
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const { username, password, role, year } = formValues;
      let loginSuccess = null;
      if (role === 'assistant') {
        loginSuccess = await AssistantLogin(username, password, year);
      } else {
        loginSuccess = await StaffLogin(username, password, role);
      }
      if (loginSuccess) {
        if (role === 'admin') {
          setUserRole('admin');
          navigate('/');
        } else if (role === 'teacher') {
          setUserRole('teacher');
          navigate('/');
        }else{
          setUserRole('assistant');
          navigate('/');
        }
      } else {
        setAlert({
          show: true,
          message: 'Login failed. Please check your credentials.',
          variant: 'error',
        });
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
          <h2> Staff Log In</h2>
        </div>
        <br></br>
        <div className="inputContainer">
          <FormControl fullWidth>
            <InputLabel id="role-select-label" sx={{ fontSize: '18px' }}>
              Select Role
            </InputLabel>
            <Select
              labelId="role-select-label"
              value={formValues.role}
              onChange={handleChange}
              name="role"
              sx={{ height: 50 }}
            >
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="assistant">Assistant</MenuItem>
            </Select>
          </FormControl>
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
        {formValues.role === 'assistant' && (
          <div className="inputContainer">
            <TextField
              placeholder="Enter Batch"
              value={formValues.year}
              onChange={handleChange}
              name="year"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon className="icon" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </div>
        )}
        <div className="actions">
          <Button text="Log In" variant="secondary" onClick={handleLogin} />
        </div>
        {(AssistantLoading || StaffLoading) && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default LoginPage;
